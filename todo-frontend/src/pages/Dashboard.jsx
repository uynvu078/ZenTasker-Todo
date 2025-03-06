import { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import API from "../api/axiosInstance";
import useAuthStore from "../store/authStore";
import Sidebar from "../components/Sidebar";
import ReminderPopup from "../components/ReminderPopup";

const Dashboard = () => {
  const { user } = useAuthStore();
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [newTaskDueDate, setNewTaskDueDate] = useState("");
  const [newTaskPriority, setNewTaskPriority] = useState("normal"); 
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [filter, setFilter] = useState("all"); 
  const [newTaskCategory, setNewTaskCategory] = useState("other");
  const [reminders, setReminders] = useState([]);


  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    const newReminders = [];
  
    tasks.forEach((task) => {
      if (task.dueDate) {
        const message = getDueDateMessage(task.dueDate);
        if (message.includes("Due Today") || message.includes("Due Tomorrow")) {
          newReminders.push({ id: task._id, title: task.title, message });
        }
      }
    });
  
    setReminders(newReminders);
  }, [tasks]);  
  

  const fetchTasks = async () => {
    try {
      const response = await API.get("/tasks");
      console.log(" Fetched tasks from backend:", response.data);
      setTasks(response.data.sort((a, b) => a.order - b.order)); // Sort by order
    } catch (error) {
      console.error(" Error fetching tasks:", error.response?.data || error.message);
    }
  };

  const addTask = async () => {
    if (!newTaskTitle.trim()) return;
  
    try {
      const response = await API.post("/tasks", {
        title: newTaskTitle,
        description: newTaskDescription || "",
        dueDate: newTaskDueDate || null,
        priority: newTaskPriority, 
        category: newTaskCategory 
      });
  
      setTasks([...tasks, response.data]);
      setNewTaskTitle("");
      setNewTaskDescription("");
      setNewTaskDueDate("");
      setNewTaskPriority("normal"); 
      setNewTaskCategory("work");
    } catch (error) {
      console.error(" Error adding task:", error.response?.data || error.message);
    }
  };
  

  const toggleTask = async (id) => {
    try {
        const taskToToggle = tasks.find((task) => task._id === id);
        if (!taskToToggle) return;

        const response = await API.patch(`/tasks/${id}/toggle`, { 
            completed: !taskToToggle.completed
        });

        if (!response.data) throw new Error("No data returned from server");

        setTasks(tasks.map((task) =>
            task._id === id ? response.data : task
        ));

        fetchTasks();
    } catch (error) {
        console.error("Error toggling task completion:", error.response?.data || error.message);
    }
};


  const editTask = (id, title, description, dueDate) => {
    console.log(`✏️ Editing Task ID: ${id}, Title: ${title}, Description: ${description}, Due Date: ${dueDate}`);
  
    setEditingTaskId(id);  
    setEditedTitle(title || "");  
    setNewTaskDescription(description || "");  
    setNewTaskDueDate(dueDate ? new Date(dueDate).toISOString().split("T")[0] : "");  
  
    console.log(`🔄 State Updated: editingTaskId=${id}, editedTitle=${title}`);
  };
  

  const saveTask = async (id) => {
    try {
        const response = await API.put(`/tasks/${id}`, {
            title: editedTitle.trim() || "Untitled Task", 
            description: newTaskDescription.trim() || "", 
            dueDate: newTaskDueDate || null
        });

        if (!response.data) throw new Error("No updated data received");

        setTasks(tasks.map((task) =>
            task._id === id ? response.data : task
        ));

        setEditingTaskId(null);
        setEditedTitle("");
        setNewTaskDescription("");
        setNewTaskDueDate("");

    } catch (error) {
        console.error("Error updating task:", error.response?.data || error.message);
    }
};
  

  const deleteTask = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const onDragEnd = async (result) => {
    if (!result.destination) return;

    const updatedTasks = [...tasks];
    const [movedTask] = updatedTasks.splice(result.source.index, 1);
    updatedTasks.splice(result.destination.index, 0, movedTask);

    updatedTasks.forEach((task, index) => {
      task.order = index;
    });

    setTasks(updatedTasks);

    try {
      await API.put("/tasks/reorder", { tasks: updatedTasks });
    } catch (error) {
      console.error("Error saving task order:", error.response?.data || error.message);
    }
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return true;
    if (filter === "pending") return !task.completed;
    if (filter === "completed") return task.completed;
    if (filter === "highPriority") return task.priority === "high";
    if (filter === "work" || filter === "personal" || filter === "other") return task.category === filter;
    return true;
});

  const isTaskOverdue = (dueDate) => {
    const today = new Date().toISOString().split("T")[0];
    return dueDate < today;
  };

  const getDueDateMessage = (dueDate) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
  
    const taskDate = new Date(dueDate);
    taskDate.setMinutes(taskDate.getMinutes() + taskDate.getTimezoneOffset());
    taskDate.setHours(0, 0, 0, 0);
  
    const oneDay = 1000 * 60 * 60 * 24;
    const daysDiff = (taskDate - today) / oneDay;
  
    if (daysDiff === 0) {
      return "🎯 Due Today!..";
    } 
    if (daysDiff === 1) {
      return `🔔 Due Tomorrow ${taskDate.toLocaleDateString()}!`;
    } 
    if (taskDate < today) {
      return `🔴 Overdue!! Due: ${taskDate.toLocaleDateString()}`;
    } 
    return `Due: ${taskDate.toLocaleDateString()}`;
  };
  
  const removeReminder = (id) => {
    setReminders(reminders.filter((reminder) => reminder.id !== id));
  };
  
  

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <div className="dashboard-wrapper">
        <div className="container mt-4">
          {/* Centered Welcome */}
          <h2 className="welcome-text text-start position-relative" style={{ top: "-20px" }}>
            <span className="welcome-text">Welcome, {user?.username || "User"}!</span>  
            <span className="ms-3 small-part">Time to check off your goals ✔️</span>
          </h2>
      
          {/* Add Task Form */}
          <div className="input-group mb-3">
            <input type="text" className="form-control" placeholder="Task Title"
              value={newTaskTitle} onChange={(e) => setNewTaskTitle(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addTask()} />

            <input type="text" className="form-control small" placeholder="Task Description"
              value={newTaskDescription} onChange={(e) => setNewTaskDescription(e.target.value)} />
            
            <input 
              type="date" 
              className="form-control" 
              value={newTaskDueDate} 
              min={new Date().toISOString().split("T")[0]} 
              onChange={(e) => setNewTaskDueDate(e.target.value)} 
            />


            {/* Priority Selector */}
            <select className="form-select smaller-select color-select" value={newTaskPriority} onChange={(e) => setNewTaskPriority(e.target.value)}>
              <option value="low">🍃 Low</option>
              <option value="normal">⏳ Normal</option>
              <option value="high">🔥 High</option>
            </select>

            {/* Category Selector */}
            <select className="form-select smaller-select color-select" value={newTaskCategory} onChange={(e) => setNewTaskCategory(e.target.value)}>
              <option value="work">🖥 Work</option>
              <option value="personal">🏡 Personal</option>
              <option value="other">📝 Other</option>
            </select>

            <button className="btn btn-primary" onClick={addTask}>Add</button>
          </div>

          <div className="d-flex justify-content-center align-items-center mb-3 gap-3">
            
            {/* Category Tabs */}
            <div className="d-flex">
              <button className={`btn mx-1 border-0 ${filter === "all" ? "btn-category" : "btn-light"}`} 
                onClick={() => setFilter("all")}>
                All
              </button>
              <button className={`btn mx-1 border-0 ${filter === "work" ? "btn-category" : "btn-light"}`} 
                onClick={() => setFilter("work")}>
                🖥 Work
              </button>
              <button className={`btn mx-1 border-0 ${filter === "personal" ? "btn-category" : "btn-light"}`} 
                onClick={() => setFilter("personal")}>
                🏡 Personal
              </button>
              <button className={`btn mx-1 border-0 ${filter === "other" ? "btn-category" : "btn-light"}`} 
                onClick={() => setFilter("other")}>
                📝 Other
              </button>
            </div>


            {/* Filter Dropdown */}
            <div>
              <label className="me-2 fw-bold">Filter By:</label>
              <select 
                  className="form-select d-inline-block w-auto filter-select"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
              >
                  <option value="all">All Tasks</option>
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                  <option value="highPriority">High Priority</option>
              </select>
            </div>
          </div>
      
          {/* Layout: Illustrations Left & Right, Tasks in Center */}
          <div className="d-flex justify-content-center align-items-start task-layout">
            
            {/* Left Illustration */}
            <div className="illustration left-illustration">
            </div>
      
            {/* Centered Task List */}
            <div className="tasks-container">
              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="tasks">
                  {(provided) => (
                    <ul className="list-group" {...provided.droppableProps} ref={provided.innerRef}>
                      {filteredTasks.map((task, index) => (
                        <Draggable key={task._id} draggableId={task._id} index={index}>
                          {(provided) => (
                            <li 
                              className={`task-container ${task.priority}`}
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <div className="d-flex justify-content-between align-items-center">
                                <div className="task-title">
                                  {editingTaskId === task._id ? (
                                    <div>
                                      <input type="text" className="form-control mb-2" value={editedTitle}
                                        onChange={(e) => setEditedTitle(e.target.value)} />
                                      <input type="text" className="form-control mb-2" placeholder="Task Description"
                                        value={newTaskDescription} onChange={(e) => setNewTaskDescription(e.target.value)} />
                                      <input type="date" className="form-control mb-2" value={newTaskDueDate}
                                        onChange={(e) => setNewTaskDueDate(e.target.value)} />
                                      <button className="btn btn-primary btn-sm mt-2" onClick={() => saveTask(task._id)}>Save</button>
                                    </div>
                                  ) : (
                                    <span className={`fw-bold task-text ${task.completed ? "completed" : ""}`}>
                                      {task.priority === "high" ? "🔥 " : task.priority === "normal" ? "⏳ " : "🍃 "} 
                                      {task.title.charAt(0).toUpperCase() + task.title.slice(1)}
                                    </span>
                                  )}
                                </div>
      
                                <div className="task-buttons d-flex gap-2">
                                  <button className={`btn ${task.completed ? "btn-undo" : "btn-complete"} btn-sm`} onClick={() => toggleTask(task._id)}>
                                    {task.completed ? "⏎" : "✅ Finish"}
                                  </button>
                                  <button className="btn btn-edit btn-sm" onClick={() => editTask(task._id, task.title, task.description, task.dueDate)}>
                                  ✏️ 
                                  </button>
                                  <button className="btn btn-delete btn-sm" onClick={() => deleteTask(task._id)}>❌</button>
                                </div>
                              </div>
      
                              {task.description && <p className="task-description">📝 {task.description}</p>}
                              {task.dueDate && (
                                <p className={`task-description ${isTaskOverdue(task.dueDate) ? "overdue" : ""}`}>
                                  📅 {getDueDateMessage(task.dueDate)}
                                </p>
                              )}
                            </li>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </ul>
                  )}
                </Droppable>
              </DragDropContext>
            </div>
      
            {/* Right Illustration */}
            <div className="illustration right-illustration">
              <img src="/check.png" alt="Checkmark" />
              <img src="/color people.jpg" alt="Right Illustration" />
            </div>
          </div>
        </div>
        <ReminderPopup reminders={reminders} removeReminder={removeReminder} />
      </div>
    </div>
  );    
};

export default Dashboard;
