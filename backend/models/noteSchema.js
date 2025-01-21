import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        folder:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Folder',
            required: true
        },
        content:{
            type: String,
            required:true
        },
        parentUser:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User',
            required:true
        }
    },
    {
        timestamps: true,
    }
);

export const notescheme = mongoose.model("Note" , noteSchema); 