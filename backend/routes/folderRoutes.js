import express from "express";
import ErrorHandler from "../error/error.js";
import { Folderscheme } from "../models/folderSchema.js";
import { notescheme } from "../models/noteSchema.js";
import { deleteFolderAndContent } from "../controller/deleteDirectory.js";
import protectRoute from "../middleware/protectRoute.js";

const folderrouter = express.Router();

folderrouter.get("/",protectRoute, async (req,res) => {
    try{
        const UserId= req.user._id;
        if(!UserId){
            console.log(";)")
        }
        const folders= await Folderscheme.find({ parentUser: UserId , parentfolder: null});
        res.status(200).send(folders);
    }
    catch(error){
        console.log(error.message)
        res.status(500).json({ error: "Internal Server Error" })
    }
} );
folderrouter.get("/dirfolders/:id", protectRoute , async (req,res) => {
    try{
        const {id} = req.params;
        const UserId = req.user._id;
        const folder= await Folderscheme.findById(id);
        if(toString(UserId) != toString(folder?.parentUser)){
            console.log(';)))))))))' , folder.parentUser , " ;>>>>" , UserId);
            return res.status(400).json({error: "User not Logged_In"})
        }
        res.status(200).send(folder);
    }
    catch(error){
        console.log(error.message)
        res.status(500).json({ error: "Internal Server Error" })
    }
} );
folderrouter.get("/:id", protectRoute , async (req,res) => {
    const UserId = req.user._id;
    const {id} = req.params;
    try{
        const folders= await Folderscheme.find({ parentUser:UserId , parentfolder: id});
        res.status(200).send(folders);
    }
    catch(error){
        console.log(error.message)
        res.status(500).json({ error: "Internal Server Error" })
    }
} );

folderrouter.post("/send", protectRoute , async (req,res ) => {
    const {Name} = req.body;
    const UserId = req.user._id;
    if(!Name){
        return res.status(400).json({error:"please give name"})
    }
    try{
        await Folderscheme.create({ parentUser:UserId , Name:Name});
        res.status(200).json({success:true , message:'Folder Created Successfully'});
    }
    catch(error){
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" })
    }
} );

folderrouter.post("/send/:id", protectRoute , async (req,res) => {
    const {id} = req.params;
    const {Name} = req.body;
    const UserId = req.user._id
    if(!Name){
        return res.status(400).json({ error: "please give name" });
    }
    try{
        await Folderscheme.create({ parentUser: UserId , Name , parentfolder:id});
        res.status(200).json({success:true , message:'Folder Created Successfully'});
    }
    catch(error){
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" })
    }
} );

folderrouter.put("/update/:id", protectRoute , async (req,res) => {
    const {id} = req.params;
    const {Name} = req.body;
    const UserId = req.user._id;
    if(!Name){
        return res.status(400).json({ error: "please provide name" })
    }
    try{
        await Folderscheme.findByIdAndUpdate(id , {Name});
        res.status(200).json({success:true , message:'updated successfully'});
    }
    catch(error){
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" })
    }
} );

folderrouter.delete("/popfolders/:id" , async (req,res) => {
    const {id} = req.params;
    try{
        const folder = await Folderscheme.findById(id);
        if(!folder){
            return res.status(400).json({ error: "Folder Not Found" })
        }
        await deleteFolderAndContent(id);
        res.status(200).json({success:true , message:"Folder and all associated contents deleted successfully"});
    }
    catch(error){
        console.log(error.message);
        res.status(500).json({ error: "Internal Server Error" })
    }
})

export default folderrouter;