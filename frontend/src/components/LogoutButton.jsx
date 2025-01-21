import { BiLogOut } from 'react-icons/bi';
import useLogout from '../hooks/useLogout';

const LogoutButton = () => {

    const { loading, logout } = useLogout();

    return (
        <div className="mt-2 mx-4 px-2 btn bg-purple-200 btn-circle btn-ghost" >
            {!loading ? (
                <BiLogOut className=' text-2xl  text-black cursor-pointer ' onClick={logout} />
            ) : (
                <span className='loading loading-spinner' ></span>
            )}
        </div>
    )
}

export default LogoutButton