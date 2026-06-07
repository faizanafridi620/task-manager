import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs"
import { User } from "../models/user.model.js"

const router = express.Router();

router.post("/signup", async (req,res) => {
    try {
         const {name, email, password} = req.body;

    if(!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required" })
    }
    const existingUser = await User.findOne({ email })
    if(existingUser) {
       return res.status(400).json({ message: "User already exist" })
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({name, email, password: hashedPassword})
    res.status(201).json({ message: "User created Successfully", user })
        
    } catch (error) {
        res.status(500).json({ message: "Server Error" })
    }
   
})

router.post("/login", async (req,res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email})
        // console.log("Email", email);
        // console.log("User",user);
        
        
        if(!user) return res.status(400).json({ message: "User not found" })
        
        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch) return res.status(400).json({message: "Invalid credentials"})

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: "1d"})
        res.status(200).json({message: "Login Successful", token})
    } catch (error) {
        res.status(500).json({message: "Server Error"})
        console.log(error);
        
    }
})

export default router;