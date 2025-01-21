import mongoose from "mongoose";

const folderSchema = new mongoose.Schema(
    {
        Name:{
            type: String,
            required:true,
        },
        parentfolder:{
            type: mongoose.Schema.Types.ObjectId,
            ref:'Folder',
            default: null
        },
        parentUser:{
            type: mongoose.Schema.Types.ObjectId,
            ref:'User',
            required:true
        }
    },
    {
        timestamps:true,
    }
);

export const Folderscheme = mongoose.model('Folder', folderSchema);