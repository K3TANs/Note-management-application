import { Link, useParams } from "react-router-dom"
import { IoIosArrowDropleftCircle } from "react-icons/io";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Cards from "../format/Cards";
import FolderCards from "../format/FolderCards";
import { HiFolderPlus } from "react-icons/hi2";
import { FaRegEdit } from "react-icons/fa";
import AddFolder from "./AddFolder";
import AddNote from "./AddNote";
import RefreshContext from "../../Context/RefreshContext";
import Sidebar from "../components/Sidebar";

const Folder = () => {

    const [folders,setFolders] = useState([]);
    const [Notes,setNotes] = useState([]);
    const [currentfolder,setCurrentfolder] = useState({});
    const [openModal,setOpenModal] = useState('');
    const {id} = useParams();
    const refreshCtx = useContext(RefreshContext);

    useEffect( () => {
        getNotes();
        getFolders();
        getcurrentFolder()
    } ,[id, refreshCtx.refresh ] );

    const getcurrentFolder = async () => {
        try{
            const response = await axios.get(`http://localhost:5000/api/k1/folders/dirfolders/${id}`,{
                withCredentials:true,
            });
            setCurrentfolder(response.data);
        }
        catch(error){
            console.log(error.message);
        }
    }

    const getNotes = async () => {
        try{
            const response = await axios.get(`http://localhost:5000/api/k1/Notes/${id}`,{
                withCredentials:true,
            });
            setNotes(response.data);
            console.log(response.data);
        }
        catch(error){
            console.log(error.message);
        }
    }

    const getFolders = async () => {
        try{
            const response = await axios.get(`http://localhost:5000/api/k1/folders/${id}`,{
                withCredentials:true,
            });
            setFolders(response.data);
            console.log(response.data);
        }
        catch(error){
            console.log(error.message);
        }
    }

    const toggleModalMode = (mode) => {
        setOpenModal((prevMode) => {
            return prevMode === mode ? '' : mode;
        })
    }

  return (
    <div className="flex text-black" >
        <Sidebar />
          <div className="bg-purple-200 w-screen no-scrollbar overflow-y-auto">
              <div className="sticky top-0 flex justify-between items-center gap-x-1 bg-purple-200 z-30 ">
                  <Link to={currentfolder.parentfolder === null ? `/` : `/folder/${currentfolder.parentfolder}`}
                      className="border-2 group border-black flex items-center gap-x-2 m-2 rounded-full p-2 hover:bg-black hover:text-purple-200"
                  >
                      <IoIosArrowDropleftCircle className="text-3xl " />
                      <h1 className="text-xl">Go Back</h1>
                  </Link>
                  <div className="flex ">
                      <button className="border-2 group border-black items-center flex gap-x-2 m-2 rounded-full p-2 hover:bg-black hover:text-purple-200"
                          onClick={() => toggleModalMode('addnote')}
                      >
                          <FaRegEdit className="text-2xl" />
                          <h1 className="text-xl">Add Notes</h1>
                      </button>
                      <button className="border-2 group border-black items-center flex gap-x-2 m-2 rounded-full p-2 hover:bg-black hover:text-purple-200"
                          onClick={() => toggleModalMode('addfolder')}
                      >
                          <HiFolderPlus className="text-2xl" />
                          <h1 className="text-xl">Add Folder</h1>
                      </button>
                  </div>
              </div>

              {openModal === 'addfolder' && <AddFolder open={openModal === 'addfolder'} operation='add' id={id} onclose={toggleModalMode} />}
              {openModal === 'addnote' && <AddNote open={openModal === 'addnote'} operation='add' id={id} onclose={toggleModalMode} />}

              {folders.length === 0 && Notes.length === 0 && <section className="flex justify-evenly" >
                  <div className="flex flex-col justify-center items-center">
                      <img src="/notFound.svg" alt="notFound" className="flex-none w-full" />
                      <h1 className="text-8xl">{`EMPTY`}</h1>
                      <p className="text-4xl" >{`Please Add Note or Folder`}</p>
                  </div>
              </section>}

              <FolderCards items={folders} />
              <Cards items={Notes} />
          </div>
    </div>
  )
}

export default Folder