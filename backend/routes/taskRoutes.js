import express from "express"
import {authMiddleware } from "../middlewares/authMiddleware.js"
import { Task } from "../models/task.model.js"

const router = express.Router();

router.post("/", authMiddleware, async (req,res) => {
    try {
        const {title, description, status} = req.body;
        if(!title) return res.status(400).json({message: "Title is required"})
        
        const task = await Task.create({title, description, status, userId: req.user.id})
        res.status(201).json({message: "Task Created", task})
    } catch (error) {
        res.status(500).json({message: "Server error"})
        console.log(error.message);
        
    }
})

router.get("/", authMiddleware, async (req,res) => {
    try {
         const tasks = await Task.find({userId: req.user.id})
    res.status(200).json({message: "Task fetched", tasks})
    } catch (error) {
        res.status(500).json({message: "Server error"})
    }
})

router.put("/:id", authMiddleware, async (req,res) => {
    try {
        const {id} = req.params;
        const task = await Task.findById(id)

        if(!task) return res.status(404).json({message: "Task not found"})
        
        const updateTask = await Task.findByIdAndUpdate(id, req.body, {returnDocument: "after"})
        res.status(200).json({message: "Task Updtated", updateTask})
    } catch (error) {
        res.status(500).json({message: "Server error"})
    }
})

router.delete("/:id", authMiddleware, async (req,res) => {
    try {
        const {id} = req.params;
        const task = await Task.findById(id)

        if(!task) return res.status(404).json({message: "Task not found"})

        await Task.findByIdAndDelete(id)
        res.status(200).json({message: "Task Deleted"})
    } catch (error) {
        res.status(500).json({message: "Server Error"})  
    }
})

export default router;