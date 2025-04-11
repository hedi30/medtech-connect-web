const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const User = require("../Models/User");

// Sign In Function
const signIn = async (req, res) => {
    const { email, password } = req.body;
    try {
        const foundUser = await User.findOne({ email });
        if (!foundUser) {
            return res.status(400).json({ msg: "User not registered" });
        }

        // ✅ Compare the hashed password
        const isMatch = await bcrypt.compare(password, foundUser.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Wrong password" });
        }
        // ✅ Generate JWT token
        const token = jwt.sign(
            { id: foundUser._id, role: foundUser.role },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.status(200).json({ user: foundUser, token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server error" });
    }
};

// Sign Up Function
const signUp = async (req, res) => {
    const { userName, email, password } = req.body;

    try {
        // ✅ Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ msg: "Email already registered" });
        }

        // ✅ Hash the password before saving
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // ✅ Create new user
        const newUser = new User({
            userName,
            email,
            password: hashedPassword,  // Store hashed password
        });

        await newUser.save();  // ✅ Save to database

        res.status(201).json({ msg: "User registered successfully", user: newUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server error" });
    }
};

// ✅ Export both functions
module.exports = { signIn, signUp };
