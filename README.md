# ZenTasker Todo App

ZenTasker is your go-to task management companion, designed to keep you organized, focused, and stress-free. With smart features like secure authentication, easy task categorization, helpful reminders, and a smooth drag-and-drop interface, managing your to-dos has never been this effortless!

## Features
- **User Authentication**: Secure registration and login with JWT authentication.
- **Task Management**: Create, edit, complete, and delete tasks.
- **Task Prioritization**: Assign priority levels (Low, Normal, High).
- **Task Categorization**: Organize tasks into Work, Personal, and Other categories.
- **Drag & Drop Sorting**: Easily reorder tasks.
- **Reminders**: Alerts for tasks due today or tomorrow.
- **Responsive UI**: Fully optimized for both desktop and mobile devices.

---

## Tech Stack
### **Frontend:**
- React.js (Vite)
- React Router
- Zustand (for state management)
- Axios (for API calls)
- Bootstrap & Custom CSS

### **Backend:**
- Node.js (Express.js)
- MongoDB (Mongoose ORM)
- JWT Authentication
- bcrypt.js for password hashing
- CORS & dotenv

---

## Installation & Setup
### **1. Clone the Repository**
```sh
git clone https://github.com/your-username/zentasker.git
cd zentasker
```

### **2. Setup Backend**

- Create a **.env** file in the backend root directory and configure it:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

- Start the backend server:
```sh
node server.js
```

### **3. Setup Frontend**
```sh
cd ../todo-frontend
npm install
```

- Create a **.env** file in the frontend root directory:
```env
VITE_API_URL=http://localhost:5000/api
```

- Start the frontend:
```sh
npm run dev
```

---

## Usage
- **Register/Login** to access the dashboard.
- **Add new tasks** with title, description, due date, priority, and category.
- **Drag & Drop** tasks to reorder.
- **Click on a task** to mark it as complete/incomplete.
- **Edit or Delete** tasks as needed.
- **Receive reminders** for tasks due today or tomorrow.

---

## 📷 Screenshots

Get a sneak peek of ZenTasker in action! Below are some screenshots showcasing the app's intuitive and user-friendly interface.

### Welcome Page
![Welcome Page](https://github.com/uynvu078/ZenTasker-Todo/blob/main/screenshots/welcome.png)  
The first screen users see when they visit ZenTasker. It provides a clean and inviting introduction, encouraging users to sign in or register.

### Login Page
![Login Page](https://github.com/uynvu078/ZenTasker-Todo/blob/main/screenshots/login.png)  
The secure login page where users can sign in to access their tasks.

### Dashboard
![Dashboard](https://github.com/uynvu078/ZenTasker-Todo/blob/main/screenshots/dashboard.png)  
The main dashboard where users can manage, categorize, and prioritize their tasks with ease.

### Edit Task Page
![Edit Task Page](https://github.com/uynvu078/ZenTasker-Todo/blob/main/screenshots/tasks.png)  
This page allows users to edit their tasks, update descriptions, set new due dates, and change task priorities.


---

## 🚧 Future Enhancements
- 🛠️ Dark Mode
- 🛠️ Recurring Tasks
- 🛠️ Collaborative Task Sharing
- 🛠️ Push Notifications

---

## Contributing
Contributions are welcome! To contribute:
1. Fork the repository
2. Create a new branch (`git checkout -b feature-branch`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature-branch`)
5. Create a Pull Request

---

## License
This project is licensed under the MIT License.

---

## Acknowledgments
Special thanks to all contributors and open-source libraries that made this project possible!

---

**Happy Tasking! 📝✅**

