require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const authenticateToken = require("./middleware/authenticateToken");

app.use(express.json());
app.use(cors());

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
