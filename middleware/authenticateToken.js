const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
    const authHeader = req.header("Authorization");

    if (!authHeader) {
        return res.status(401).json({ error: "Access Denied. No token provided." });
    }

    try {
        const token = authHeader.replace("Bearer ", "").trim();
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        req.userId = decoded.userId; 

        next();
    } catch (error) {
        console.error("JWT verification error:", error);
        res.status(403).json({ error: "Invalid token" });
    }
};

module.exports = authenticateToken;
