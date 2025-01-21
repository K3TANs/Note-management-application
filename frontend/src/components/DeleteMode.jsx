import Modal from "./Modal"
import toast from "react-hot-toast";
import axios from "axios";
import { useContext } from "react";
import RefreshContext from "../../Context/RefreshContext";

const DeleteMode = ({open , id , type , onclose}) => {

    const refreshCtx = useContext(RefreshContext);

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.delete(`http://localhost:5000/api/k1/${type}/pop${type}/${id}`);
            toast.success(data.message);
            onclose('')
            refreshCtx.changeRefresh();
        }
        catch (error) {
            toast.error(error);
            onclose('')
        }
    }

  return (
    <Modal open={open}>
          <div className="flex flex-col justify-start content-evenly py-2 text-black ">
              <h1 className="text-2xl">Are you sure you want to delete this </h1>
              <div className="flex justify-end">
                  <button className="border-2 group border-black items-center flex gap-x-2 m-2 rounded-full px-2 hover:bg-black hover:text-purple-200" onClick={() => onclose('')}>
                      NO
                  </button>
                  <button type="submit" className="border-2 group border-black items-center flex gap-x-2 m-2 rounded-full px-2 hover:bg-black hover:text-purple-200" onClick={handleClick}>
                      YES
                  </button>
              </div>
          </div>
    </Modal>
  )
}

export default DeleteMode