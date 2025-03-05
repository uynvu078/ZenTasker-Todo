const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const authenticateToken = require("../middleware/authenticateToken"); 

const router = express.Router();

/** Register User */
router.post("/register", async (req, res) => {
    try {
        const { username, email, password } = req.body;

        console.log(" Raw incoming password:", password);

        if (password.startsWith("$2b$")) {
            return res.status(400).json({ error: "Password should not be pre-hashed!" });
        }

        if (!username || !email || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(400).json({ error: "Email or Username already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("🔹 Hashed password before storing:", hashedPassword);

        // Check if bcrypt.compare() works before saving
        const isMatch = await bcrypt.compare(password, hashedPassword);
        console.log("🔍 Immediate bcrypt.compare() test:", isMatch);

        if (!isMatch) {
            return res.status(500).json({ error: "Hashing failed!" });
        }

        const newUser = new User({ username, email, password: hashedPassword });

        console.log(" User object BEFORE saving:", newUser);

        await newUser.save();

        const savedUser = await User.findOne({ email });
        console.log(" User retrieved from DB AFTER saving:", savedUser);

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error(" Error registering user:", error);
        res.status(500).json({ error: "Error registering user" });
    }
});


/** Login User */
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        console.log(" Login attempt for:", email);
        console.log(" Incoming password:", password);

        const user = await User.findOne({ email });
        if (!user) {
            console.warn(" User not found!");
            return res.status(400).json({ error: "Invalid email or password" });
        }

        console.log(" Found user in DB:", user);

        console.log(" Stored password (hashed):", user.password);

        const isMatch = await bcrypt.compare(password, user.password);
        console.log(" Password match result:", isMatch);

        if (!isMatch) {
            console.warn(" Password does not match!");
            return res.status(400).json({ error: "Invalid email or password" });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

        console.log(" Login successful, token generated!");
        
        res.json({ token });
    } catch (error) {
        console.error(" Error during login:", error);
        res.status(500).json({ error: "Error logging in" });
    }
});


/** Get Authenticated User */
router.get("/user", authenticateToken, async (req, res) => {
    try {
        console.log("Fetching user for ID:", req.userId);
        const user = await User.findById(req.userId).select("-password");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(user);
    } catch (error) {
        console.error(" Error fetching user:", error);
        res.status(500).json({ message: "Server error" });
    }
});

router.post("/forgot-password", async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Email not found" });
        }

        console.log(`🔗 Password reset requested for: ${email}`);

        res.json({ message: "If this email is registered, you will receive a reset link shortly." });
    } catch (error) {
        console.error(" Forgot password error:", error);
        res.status(500).json({ error: "Server error. Please try again later." });
    }
});


module.exports = router;
