import { Folderscheme } from "../models/folderSchema.js"
import { notescheme } from "../models/noteSchema.js";

export const deleteFolderAndContent = async (folderId) => {
    const subfolders = await Folderscheme.find({parentfolder:folderId});
    await notescheme.deleteMany({folder:folderId});

    for(const subfolder of subfolders){
        deleteFolderAndContent(subfolder._id);
    }

    await Folderscheme.findByIdAndDelete(folderId);
}