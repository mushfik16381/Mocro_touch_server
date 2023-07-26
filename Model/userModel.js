const mongoose = require("mongoose");
const userSchema = mongoose.Schema(
    {
        name: { type: String, trim: true },
        email: { type: String, trim: true, require: true, unique: true },
        password: { type: String, trim: true, required: true },
        phone: { type: Number, unique: true },
        verified: { type: Boolean, trim: true }
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model("User", userSchema);

module.exports = User;