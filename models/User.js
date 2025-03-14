const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

// auto hash passwords before saving
UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    if (!this.password.startsWith("$2b$")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});


// comparePassword method
UserSchema.methods.comparePassword = function(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);