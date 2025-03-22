# 🧘 ZenTasker – Your Peaceful Productivity Partner

**ZenTasker** is a beautifully designed task management app built to help you stay focused, organized, and stress-free. Whether you're tracking work assignments, personal goals, or everyday tasks, ZenTasker brings clarity and calm to your to-do list.

---

## 🚀 Live Demo

🌐 **Frontend (GitHub Pages):**  
[https://uynvu078.github.io/ZenTasker-Todo](https://uynvu078.github.io/ZenTasker-Todo)

🌐 **Backend (Render):**  
[https://zentasker-4ear.onrender.com](https://zentasker-4ear.onrender.com)

---

## ✨ Features

- 🔐 **JWT Authentication** – Secure registration and login
- 📝 **Task Management** – Create, edit, delete, and complete tasks
- 🔀 **Drag & Drop Sorting** – Reorder tasks easily with DnD
- 📊 **Prioritize & Categorize** – Assign priorities and categories like Work, Personal, and Other
- ⏰ **Smart Reminders** – Alerts for tasks due today or tomorrow
- 📱 **Responsive Design** – Optimized for both desktop and mobile

---

## 🛠️ Tech Stack

### Frontend
- **React (Vite)**
- **React Router**
- **Zustand** (state management)
- **Axios**
- **Bootstrap + Custom CSS**

### Backend
- **Node.js + Express.js**
- **MongoDB + Mongoose**
- **JWT + bcrypt.js**
- **CORS + dotenv**

---

## 🧩 Project Setup

### 1. Clone the Repository

```bash
git clone https://github.com/uynvu078/ZenTasker-Todo.git
cd ZenTasker-Todo
```

---

### 2. Backend Setup

1. Create a `.env` file in the root backend directory:
```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
```

2. Install dependencies and run the server:
```bash
npm install
node server.js
```

---

### 3. Frontend Setup

```bash
cd todo-frontend
npm install
```

3. Create a `.env` file in the `todo-frontend` directory:
```env
VITE_API_URL=http://localhost:5000/api
```

4. Start the development server:
```bash
npm run dev
```

---

## 🧪 Usage Guide

- **Register or Login** to get started
- **Add tasks** with title, description, due date, priority, and category
- **Drag tasks** to reorder them
- **Mark tasks** as complete or incomplete
- **Edit/Delete** tasks with a click
- **Receive pop-up reminders** for urgent tasks

---

## 📸 Screenshots

### 🖼️ Welcome Page  
![Welcome](https://github.com/uynvu078/ZenTasker-Todo/blob/main/screenshots/welcome.png)

### 🔐 Login  
![Login](https://github.com/uynvu078/ZenTasker-Todo/blob/main/screenshots/login.png)

### 🧮 Dashboard  
![Dashboard](https://github.com/uynvu078/ZenTasker-Todo/blob/main/screenshots/dashboard.png)

### ✏️ Edit Task  
![Edit Task](https://github.com/uynvu078/ZenTasker-Todo/blob/main/screenshots/tasks.png)

---

## 🧠 Planned Features

- 🌙 Dark Mode  
- 🔁 Recurring Tasks  
- 📅 Calendar View  
- 👥 Task Sharing & Collaboration  
- 🔔 Real-Time Notifications

---

## 🤝 Contributing

Contributions are welcome!  
Here’s how to get started:

```bash
# Fork & clone the repo
git checkout -b your-feature-branch
# Make changes, then:
git commit -m "Add: your feature"
git push origin your-feature-branch
# Create a Pull Request 🎉
```

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).

---

## 🙏 Acknowledgments

Big thanks to the open-source community and libraries that helped bring ZenTasker to life.

---

> **Stay calm. Stay organized. Stay Zen. 🧘✅**
