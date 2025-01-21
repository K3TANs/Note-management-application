import { Link } from "react-router-dom"
import { PiBookOpenTextLight } from 'react-icons/pi';
import { FaFolder } from "react-icons/fa";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";
import { useState } from "react";
import DeleteMode from "../components/DeleteMode";
import AddFolder from "../pages/AddFolder";
import ShowInfo from "../components/ShowInfo";

const FolderCards = ({ items }) => {

    const [iid, setIid] = useState('');
    const [mode, setMode] = useState('');
    const [data,setData] = useState({});

    const handleShowMode = (data) => {
        setMode('show');
        setData(data);
    }
    const handleDeleteMode = (id) => {
        setMode('delete');
        setIid(id);
    }
    const handleUpdateMode = (id) => {
        setMode('update');
        setIid(id);
    }
    const handleCloseDefault = () => {
        setMode('');
        setIid('');
        setData({});
    }

    return (
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 flex-none">
            {items.map((item) => (
                <div key={item._id} className="border-2 border-gray-500 rounded-lg px-4 py-2 m-4 relative hover:shadow-xl">
                    <h4 className="my-2 text-gray-500">
                        {item._id}
                    </h4>
                    <div className="flex justify-start item-center gap-x-2">
                        <PiBookOpenTextLight className="text-black text-2xl" />
                        <h2 className="my-1">{item.Name}</h2>
                    </div>
                    <div className="flex justify-start items-center gap-x-1">
                        <Link to={`/Folder/${item._id}`} className="flex px-6 justify-start items-center gap-x-2 border-2 border-black rounded-xl hover:bg-black text-black hover:text-purple-200">
                            <FaFolder className=" text-2xl " />
                            <h2 className="my-1 ">Open</h2>
                        </Link>
                    </div>
                    <div className="flex justify-between items-center gap-x-2 mt-4 p-4">
                        <button onClick={() => handleShowMode(item)} >
                            <BsInfoCircle className="text-2xl text-green-800 hover:text_black" />
                        </button>
                        <button onClick={() => handleUpdateMode(item._id)}>
                            <AiOutlineEdit className="text-2xl text-yellow-600 hover:text-black" />
                        </button>
                        <button onClick={() => handleDeleteMode(item._id)}>
                            <MdOutlineDelete className="text-2xl text-red-600 hover:text-black" />
                        </button>
                    </div>
                </div>
            ))}
            {mode==='show' && <ShowInfo open={mode === 'show'} data={data} type='folders' onclose={handleCloseDefault} />}
            {mode==='update' && <AddFolder open={mode === 'update'} operation='update' id={iid} onclose={handleCloseDefault} />}
            {mode==='delete' && <DeleteMode open={mode === 'delete'} type='folders' id={iid} onclose={handleCloseDefault} />}
        </div>
    )
}

export default FolderCards