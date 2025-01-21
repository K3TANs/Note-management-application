import { useContext, useEffect, useState } from "react";
import { HiFolderPlus } from "react-icons/hi2";
import axios from "axios";
import FolderCards from "../format/FolderCards";
import AddFolder from "./AddFolder";
import RefreshContext from "../../Context/RefreshContext";
import Sidebar from "../components/Sidebar";
// import Tiptap from "../components/Tiptap";

const Home = () => {

  const [folders, setFolders] = useState([]);
  const [openModal, setOpenModal] = useState('');
  const refreshCtx = useContext(RefreshContext);

  useEffect(() => {
    getFolders();
  }, [refreshCtx.refresh]);

  const getFolders = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/k1/folders`,{
        withCredentials:true,
      });
      setFolders(response.data);
      console.log(response.data);
    }
    catch (error) {
      console.log(error.message);
    }
  }

  const toggleModalMode = (mode) => {
    setOpenModal((prevMode) => {
      return prevMode === mode ? '' : mode;
    })
  }

  // const handleEditorContent = (html) => {
  //   console.log(html);
  // }

  return (
    <div className="flex text-black" >
      <Sidebar />
      <div className="bg-purple-200 w-screen no-scrollbar overflow-y-auto">
        <div className="sticky top-0 flex justify-between items-center gap-x-1 bg-purple-200 z-30 ">
          <h2 className="group flex gap-x-2 m-2 rounded-full p-2 text-2xl text-pretty">
            HOME DIRECTORY
          </h2>
          <button className="border-2 group border-black items-center flex gap-x-2 m-2 rounded-full p-2 hover:bg-black hover:text-purple-200"
            onClick={() => toggleModalMode('addfolder')}
          >
            <HiFolderPlus className="text-2xl " />
            <h1 className="text-xl">Add Folder</h1>
          </button>
        </div>

        <AddFolder open={openModal === 'addfolder'} operation='add' id={null} onclose={toggleModalMode} />

        {folders.length === 0 && <section className="flex justify-evenly" >
          <div className="flex flex-col justify-center items-center">
            <img src="/notFound.svg" alt="notFound" className="flex-none w-full" />
            <h1 className="text-8xl">{`EMPTY`}</h1>
            <p className="text-4xl" >{`Please Add Home Directory`}</p>
          </div>
        </section>}

        <FolderCards items={folders} />
        {/* <Tiptap onEditorContentSave={handleEditorContent} />   */}
      </div>
    </div>
    
  )
}

export default Home