import validator from 'validator';
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'
import crypto from "crypto";
import nodemailer from "nodemailer";
import userModel from '../models/userModel.js'
import transporter from '../config/nodemailer.js';

//generate token function 
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)
}

// -------- Route for user login -------------
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "User doesn't exists" })
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            const token = createToken(user._id)
            res.json({ success: true, token })
        }
        else {
            res.json({ success: false, message: 'Invalid credentials' })
        }

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

// ---------- Route for user register ----------- 
const registerUser = async (req, res) => {
    try {
        const { name, email, password ,securityAnswer} = req.body;

        //Validate all required fields
        if(!name || !email || !password || !securityAnswer){
            return res.status(400).json({success:false,message:"All fields are required"});
        }
        //check if user already exists
        const exists = await userModel.findOne({email})
        if (exists) {
            return res.status(400).json({ success: false, message: "User already exists"})
        }
        // Validate email format
         if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: "Please enter a valid email" });
        }
        // Validate password strength
        if (password.length < 8) {
            return res.status(400).json({ success: false, message: "Please enter a strong password (min 8 characters)" });
        }
        // Hash the password and security answer
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const hashedSecurityAnswer = await bcrypt.hash(securityAnswer, salt); //  hash this
       // Store new user in the database
        const newUser = new userModel({
        name,
        email,
        password: hashedPassword,
        securityAnswer: hashedSecurityAnswer, // store hashed answer
        });
        const user = await newUser.save();
        // Generate auth token
        const token = createToken(user._id);
        res.status(201).json({ success: true, token });
    } catch (error) {
        console.error("Registration Error:", error);
        res.status(500).json({ success: false, message: "Server error. Please try again later." });
    }
}

// ---------- Route for admin login ---------- 
const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email + password, process.env.JWT_SECRET);
            res.json({ success: true, token })
        }
        else {
            res.json({ success: false, message: "Invalid creadentials" })
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }
    // generate reset token (valid for 15 min)
    const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "15m" });
    // save token and expiry to DB
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 15 * 60 * 1000; // 15 min
    await user.save();
    // Return reset link in response for testing or frontend use
    res.json({ 
      success: true, 
      message: "Reset token generated", 
      resetLink: `${process.env.FRONTEND_URL}/reset-password/${resetToken}` 
    });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Reset password via token (unchanged)
const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded.id);
    if (!user) {
      return res.json({ success: false, message: "Invalid or expired token" });
    }
    if (user.resetPasswordExpires && user.resetPasswordExpires < Date.now()) {
      return res.json({ success: false, message: "Token expired" });
    }
    // hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();
    res.json({ success: true, message: "Password reset successful" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Reset password via security answer (unchanged)
const resetPasswordWithSecurityAnswer = async (req, res) => {
  try {
    const { email, securityAnswer, newPassword } = req.body;

    if (!email || !securityAnswer || !newPassword) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    // compare hashed security answer
    const isMatch = await bcrypt.compare(securityAnswer, user.securityAnswer);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Security answer is incorrect' });
    }
    // hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;
    await user.save();

    res.json({ success: true, message: 'Password reset successful via security question' });

  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};


export { loginUser, registerUser, adminLogin , forgotPassword ,resetPassword,resetPasswordWithSecurityAnswer }