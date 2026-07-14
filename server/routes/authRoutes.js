const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const crypto = require("crypto");

const router = express.Router();
const transporter = nodemailer.createTransport({

    service: "gmail",

    auth: {

        user: process.env.EMAIL_USER,

        pass: process.env.EMAIL_PASS

    }

});
module.exports = router;
// ======================
// FORGOT PASSWORD
// ======================
router.post("/forgot-password", async (req, res) => {

    try {

        const { email } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: "No account found with that email."
            });
        }

        // Generate reset token
        const resetToken = crypto.randomBytes(32).toString("hex");

        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = Date.now() + (60 * 60 * 1000); // 1 hour

        await user.save();

        const resetLink =
            `https://blarh-ali-store.onrender.com/reset-password.html?token=${resetToken}`;

        await transporter.sendMail({

            from: process.env.EMAIL_USER,

            to: user.email,

            subject: "BLARH ALI STORE - Password Reset",

            html: `
                <h2>Password Reset</h2>

                <p>Hello ${user.username},</p>

                <p>You requested to reset your password.</p>

                <p>
                    Click the link below to create a new password:
                </p>

                <a href="${resetLink}">
                    ${resetLink}
                </a>

                <br><br>

                <p>
                    This link will expire in 1 hour.
                </p>

                <p>
                    If you did not request this, simply ignore this email.
                </p>
            `

        });

        res.json({
            message: "Password reset link has been sent to your email."
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: error.message
        });

    }

});
module.exports = router;
// ======================
// RESET PASSWORD
// ======================
router.post("/reset-password", async (req, res) => {

    try {

        const { token, password } = req.body;

        const user = await User.findOne({

            resetPasswordToken: token,

            resetPasswordExpires: { $gt: Date.now() }

        });

        if (!user) {

            return res.status(400).json({

                message: "Invalid or expired reset link."

            });

        }

        user.password = await bcrypt.hash(password, 10);

        user.resetPasswordToken = null;

        user.resetPasswordExpires = null;

        await user.save();

        res.json({

            message: "Password has been reset successfully."

        });

    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

});

// ======================
// REGISTER
// ======================
router.post("/register", async (req, res) => {
    try {

        const { username, email, password } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "Email already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            username,
            email,
            password: hashedPassword
        });

        await user.save();

        res.status(201).json({
            message: "User registered successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
});

// ======================
// TEST ROUTE
// ======================
router.get("/test", (req, res) => {

    res.json({
        message: "Auth route working"
    });

});

// ======================
// LOGIN
// ======================
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "Invalid email or password"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid email or password"
            });
        }

        const token = jwt.sign(
            {
                id: user._id,
                email: user.email
            },
            "blarhali-secret-key",
            {
                expiresIn: "7d"
            }
        );

        res.json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                profileImage: user.profileImage,
                role: user.role
            }
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

module.exports = router;
