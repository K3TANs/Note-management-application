import { useContext, useEffect, useState } from 'react';
import {FaFolder} from "react-icons/fa"
// import axios from 'axios';
import { Link } from 'react-router-dom';
import RefreshContext from '../../Context/RefreshContext';
import LogoutButton from './LogoutButton';
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';


const Sidebar = () => {

    const [folders , setFolders]= useState([]);
    const [loading, setLoading] = useState(false);
    const refreshCtx = useContext(RefreshContext);



    useEffect(() => {
        
        const getFileforSidebar = async () => {
            setLoading(true)
            try {
                const res = await fetch("http://localhost:5000/api/k1/folders",{
                    credentials:'include'
                })
                const data = await res.json()
                if(data.error){
                    throw new Error(data.error);
                }
                console.log(data)
                setFolders(data);
                setLoading(false)
            }
            catch (error) {
                console.log(error.message);
                toast.error(error.message);
                setLoading(false)
            }
        }

        getFileforSidebar();

        // axios.get('http://localhost:5000/api/k1/folders')
        //     .then((response) => {
        //         setFolders(response.data)
        //         setLoading(false);
        //     })
        //     .catch((error) => {
        //         console.log(error.message)
        //         setLoading(false);
        //     })
    },[refreshCtx.refresh])

    const {authUser} =  useAuthContext();


    return (
        <div className="w-64 bg-purple-950 text-purple-200 h-screen flex-none">
            <h1 className='text-2xl px-4' >Welcome <span className='font-bold text-white' >{authUser.username}</span></h1>
            <LogoutButton />
            <div className="p-4">
                <h1 className="text-xl font-semibold">Home Directory</h1>
            </div>
            {loading && <span className='loading loading-spinner' ></span>}
            {(folders.length === 0 && !loading) ? "EMPTY" :
                <ul className='mt-2 space-y-2 px-2'>
                    {folders.map((folder) => {
                        return (
                            <Link to={`/Folder/${folder._id}`} key={folder._id} 
                            className=' flex mx-4 justify-between px-6 py-2 hover:bg-black hover:text-purple-200 bg-purple-200 text-black rounded-xl'> 
                                {folder.Name} 
                                <FaFolder className='mt-1'/> 
                            </Link>
                        )
                    })}
                </ul>
            }

            
            
        </div>
    );
}

export default Sidebar