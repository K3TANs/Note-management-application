import { PiBookOpenTextLight } from 'react-icons/pi';
import { BiUserCircle } from 'react-icons/bi';
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";
// import DOMPurify from "dompurify";
import parse from 'html-react-parser'
import { useState } from "react";
import DeleteMode from "../components/DeleteMode";
import AddNote from "../pages/AddNote";
import ShowInfo from "../components/ShowInfo";

const Cards = ({ items }) => {

    const [iid,setIid] = useState('');
    const [mode,setMode] = useState('');
    const [data,setData] = useState({})

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
        setData({})
        setIid('');
    }


    return (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 flex-none">
            {items.map((item) => {

                // const sanitizedContent = DOMPurify.sanitize(item.content, {
                //     ALLOWED_TAGS: ['b', 'i', 'u', 'a', 'li', 'ol'], // Include 'ul', 'ol', 'li' as needed
                //     ALLOWED_ATTR: ['href', 'src', 'alt'],
                // });

                let parcontent = parse(item.content);
                

                return(
                    <div key={item._id} className="border-2 border-gray-500 rounded-lg px-4 py-2 m-4 relative hover:shadow-xl">
                        <h4 className="my-2 text-gray-500">
                            {item._id}
                        </h4>
                        <div className="flex justify-start item-center gap-x-2">
                            <PiBookOpenTextLight className="text-black text-2xl" />
                            <h2 className="my-1">{item.name}</h2>
                        </div>
                        <div className="flex justify-start items-center gap-x-2 h-9 overflow-hidden">
                            <BiUserCircle className="text-black text-2xl" />
                            <h2>{parcontent}</h2>
                        </div>
                        
                        <div className="flex justify-between items-center gap-x-2 mt-4 p-4">
                            <button onClick={() =>handleShowMode(item)} >
                                <BsInfoCircle className="text-2xl text-green-800 hover:text_black" />
                            </button>
                            <button onClick={() => handleUpdateMode(item._id)}>
                                <AiOutlineEdit className="text-2xl text-yellow-600 hover:text-black" />
                            </button>
                            <button onClick={() => handleDeleteMode(item._id)} >
                                <MdOutlineDelete className="text-2xl text-red-600 hover:text-black" />
                            </button>
                        </div>
                    </div>
                )
            })}

            {mode==='show' && <ShowInfo open={mode === 'show'} data={data} type='Notes' onclose={handleCloseDefault} />}
            {mode==='update' && <AddNote open={mode === 'update'} operation='update' id={iid} onclose={handleCloseDefault} />}
            {mode==='delete' && <DeleteMode open={mode === 'delete'} type='Notes' id={iid} onclose={handleCloseDefault} />}

        </div>
    )
}

export default Cards