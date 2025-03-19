require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const authenticateToken = require("./middleware/authenticateToken");

app.use(express.json());
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:5173");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.header("Access-Control-Allow-Credentials", "true"); 
    next();
});

const authRoutes = require('./routes/auth'); 
const taskRoutes = require('./routes/tasks'); 

app.use('/api/auth', authRoutes); 
app.use('/api/tasks', taskRoutes); 

app.get('/', (req, res) => {
    res.send('Hello there, welcome to the To-Do API App');
});
app.get('/api', (req, res) => {
    res.json({ message: "API is running" });
  });

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ MongoDB connected successfully'))
    .catch(err => console.error('❌ MongoDB connection error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
