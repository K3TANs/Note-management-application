import { useContext, useEffect, useState } from "react"
import Modal from "../components/Modal";
import axios from "axios";
import toast from "react-hot-toast";
// import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import RefreshContext from "../../Context/RefreshContext";
import Tiptap from "../components/Tiptap";
// import NoteInput from "../components/NoteInput";

// const modules = {
//     toolbar: [
//         [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
//         [{ size: [] }],
//         ['bold', 'italic', 'underline', 'strike', 'blockquote'],
//         [{ 'list': 'bullet' },
//         { 'indent': '-1' }, { 'indent': '+1' }],
//         ['link', 'image'],
//         ['clean']
//     ],
// };

// const formats = [
//     'header', 'font', 'size',
//     'bold', 'italic', 'underline', 'strike', 'blockquote',
//     'list', 'bullet', 'indent',
//     'link', 'image'
// ];

const AddNote = ({ open, operation , id, onclose }) => {

    const [notename, setNotename] = useState('');
    const [loading,setloading] = useState(true);
    const [oldnotename, setOldNotename] = useState('');
    const [content, setContent] = useState('');
    const [oldcontent, setOldContent] = useState('');
    const refreshCtx = useContext(RefreshContext);
    // const quillRef= useRef(null);

    const handleClick = (e) => {
        if(operation === 'update'){
            handleUpdateNote(e);
        }
        else{
            handleSaveNote(e);
        }
    }
    
    const getNoteData = async () => {
        setloading(true);
        try {
            const response = await axios.get(`http://localhost:5000/api/k1/Notes/dirNotes/${id}`,{
                withCredentials:true,
            });
            console.log(response.data.name);
            setNotename(response.data.name);
            setOldNotename(response.data.name);
            setOldContent(response.data.content);
            setContent(response.data.content);
            setloading(false);
        }
        catch (error) {
            console.log(error);
            setloading(false);
        }
    }
    useEffect( () => {
        if(operation === 'update' && open){
            getNoteData();
        }
        else{
            setloading(false)
        }
    } , [id])


    const handleUpdateNote = async (e) => {
        e.preventDefault();
        if(content === oldcontent && oldnotename === notename){
            setContent('')
            setNotename('')
            onclose('')
            return false;
        }
        try {
            const response = await axios.put(`http://localhost:5000/api/k1/Notes/update/${id}`,
                { name: notename, content: content },
                {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    withCredentials: true
                }
            );
            toast.success(response.data.message);
            setContent('')
            setNotename('')
            onclose('')
            refreshCtx.changeRefresh();
        }
        catch (error) {
            toast.error(error);
            onclose('')
        }
        return true;
    }
    
    const handleSaveNote = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:5000/api/k1/Notes/send/${id}`,
                { name: notename , content : content},
                {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    withCredentials: true
                }
            );
            toast.success(response.data.message);
            setContent('')
            setNotename('')
            onclose('')
            refreshCtx.changeRefresh();
        }
        catch (error) {
            toast.error(error);
            onclose('')
        }
    }

    // const handleContent = async (event) => {
    //     setContent(event.target.value);
    // }

    const handleClose = () => {
        setContent('');
        setNotename('');
        onclose('');
    }

    const handleEditorContent = (html) => {
        setContent(html);
    }
    


    return (
        <>
            {!loading && <Modal open={open} className="h-screen">
                <div className="flex flex-col justify-start content-evenly text-black py-2">
                    <h1 className="text-2xl">{operation=== 'add' ? 'New Note' : 'Update note'}</h1>
                    <label className="text-xl" >
                        Enter Name
                    </label>
                    <input type="text" className="rounded-sm bg-white" value={notename} onChange={(event) => setNotename(event.target.value)} />
                    <label htmlFor="text-xl">
                        Add a Note
                    </label>
                    {/* <NoteInput className="rounded-sm overflow-y-auto" onchange={handleContent} val={content} /> */}
                    {/* <ReactQuill ref={quillRef} theme="snow" value={content} onChange={setContent} modules={modules} formats={formats} className={`h-80 bg-white no-scrollbar rounded-sm overflow-y-auto`} /> */}
                    <Tiptap onEditorContentSave={handleEditorContent} initialContent={oldcontent} />
                    <div className="flex justify-end">
                        <button className="border-2 group border-black items-center flex gap-x-2 m-2 rounded-full px-2 hover:bg-black hover:text-purple-200" onClick={handleClose}>
                            Close
                        </button>
                        <button type="submit" className="border-2 group border-black items-center flex gap-x-2 m-2 rounded-full px-2 hover:bg-black hover:text-purple-200" onClick={handleClick}>
                            Save
                        </button>
                    </div>
                </div>

            </Modal>}
        </>
    )
}

export default AddNote