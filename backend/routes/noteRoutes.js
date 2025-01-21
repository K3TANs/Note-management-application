import express from "express";
import ErrorHandler from "../error/error.js";
import { notescheme } from "../models/noteSchema.js";
import protectRoute from "../middleware/protectRoute.js";

const noterouter = express.Router();

noterouter.get("/:id", protectRoute , async (req,res) => {
    try{
        const {id} = req.params;
        const UserId = req.user._id;
        const notebook= await notescheme.find({ parentUser:UserId , folder:id});
        res.status(200).send(notebook);
    }
    catch(error){
        console.log(error.message);
        res.status(500).json({ error: "Internal Server Error" })
    }
} );
noterouter.get("/dirNotes/:id", protectRoute , async (req,res ) => {
    try{
        const {id} = req.params;
        const UserId = req.user._id;
        const notebook= await notescheme.findById(id);
        if(toString(UserId) != toString(notebook.parentUser) ){
            res.status(400).json({error:"User Not Authenticate" })
        }
        res.status(200).send(notebook);
    }
    catch(error){
        console.log(error.message);
        res.status(500).json({ error: "Internal Server Error" })
    }
} );

noterouter.post("/send/:id", protectRoute , async (req,res ) => {
    try{
        const {id} = req.params;
        const { name, content } = req.body;
        if(!name || !content){
            const UserId = req.user._id;
            return res.status(400).json({ error: "please fill name and content" })
        }
        await notescheme.create({ parentUser:UserId , name: name, content: content , folder: id});
        res.status(200).json({success:true , message: "Note saved successfully"})
    }
    catch(error){
        console.log(error.message)
        res.status(500).json({ error: "Internal Server Error" })
    }
});

noterouter.put("/update/:id", async (req,res ) => {
    try{
        const {id} =req.params;
        const {name , content} = req.body;
        if(!name || !content){
            return res.status(400).json({ error: "something is missing" })
        }
        await notescheme.findByIdAndUpdate(id , {name:name,content:content});
        res.status(200).json({success:true , message: "Note Update Successfully"});
    }
    catch(error){
        console.log(error.message)
        res.status(500).json({ error: "Internal Server Error" })
    }
} );

noterouter.delete("/popNotes/:id", async (req,res ) => {
    try{
        const {id} = req.params;
        const note= await notescheme.findById(id);
        if(!note){
            return res.status(404).json({ error: "File Not Found" })
        }
        await notescheme.findByIdAndDelete(id);
        res.status(200).json({success:true , message:"Note Deleted Successfully"});
    }
    catch(error){
        console.log(error.message);
        res.status(500).json({ error: "Internal Server Error" })
    }
})

export default noterouter;