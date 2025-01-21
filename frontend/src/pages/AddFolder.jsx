import { useContext, useEffect, useState } from "react"
import Modal from "../components/Modal";
import axios from "axios";
import toast from "react-hot-toast";
import RefreshContext from "../../Context/RefreshContext";

const AddFolder = ({open , id , operation , onclose}) => {

    const [foldername , setFoldername] = useState('');
    const [loading,setLoading] = useState(true);
    const [oldfoldername , setOldFoldername] = useState('');
    const refreshCtx = useContext(RefreshContext);

    const handleClick = (e) => {
        if (operation === 'update') {
            handleUpdateFolder(e);
        }
        else {
            handleSaveFolder(e);
        }
    }

    const getFolderData = async () => {
        setLoading(true)
        try {
            const response = await axios.get(`http://localhost:5000/api/k1/folders/dirfolders/${id}`,{
                withCredentials:true,
            });
            setFoldername(response.data.Name);
            setOldFoldername(response.data.Name);
            setLoading(false)
        }
        catch (error) {
            console.log(error);
            setLoading(false)
        }
    }
    useEffect(() => {
        if (operation === 'update' && open) {
            getFolderData();
        }
        else{
            setLoading(false)
        }
    }, [id])

    const handleUpdateFolder = async (e) => {
        e.preventDefault();
        if(oldfoldername === foldername){
            setFoldername('')
            onclose('')
            return false;
        }
        try {
            const {data} = await axios.put(`http://localhost:5000/api/k1/folders/update/${id}`,
                {Name:foldername},
                {
                    headers: {
                        "Content-Type" : "application/json"
                    },
                    withCredential:true
                }
            );
            toast.success(data.message);
            setFoldername('')
            onclose('')
            refreshCtx.changeRefresh();
        }
        catch (error) {
            toast.error(error);
            onclose('')
        }
        return true;
    }
    const handleSaveFolder = async (e) => {
        e.preventDefault();
        try {
            if(id===null){
                const {data} = await axios.post(`http://localhost:5000/api/k1/folders/send`,
                    {Name:foldername},
                    {
                        headers: {
                            "Content-Type" : "application/json"
                        },
                        withCredentials:true,
                    }
                );
                toast.success(data.message);
            }
            else{
                const {data} = await axios.post(`http://localhost:5000/api/k1/folders/send/${id}`,
                    {Name:foldername},
                    {
                        headers: {
                            "Content-Type" : "application/json"
                        },
                        withCredentials:true
                    }
                );
                toast.success(data.message);
                
            }
            setFoldername('')
            onclose('')
            refreshCtx.changeRefresh();
        }
        catch (error) {
            toast.error(error);
            onclose('')
        }
    }

    const handleClose = () => {
        setFoldername('');
        onclose('');
    }

    
    

  return (
    <>   
    { !loading && <Modal open={open} >
        <div className="flex flex-col justify-start content-evenly py-2 text-black">
                  <h1 className="text-2xl">{operation === 'add' ? 'New Folder' : 'Update Folder'}</h1>
            <label className="text-xl" >
                Enter Name
            </label>
            <input type="text" className="rounded-sm bg-white " value={foldername} onChange={(event) => setFoldername(event.target.value)} />
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

export default AddFolder