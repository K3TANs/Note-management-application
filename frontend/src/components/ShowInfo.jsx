import Modal from "./Modal";
// import DOMPurify from "dompurify";
import parse from 'html-react-parser'

const ShowInfo = ({ open, data , type, onclose }) => {

    const handleClick = (e) => {
        e.preventDefault();
        onclose('');
    }

    return (
        <Modal open={open}>
            <div className="flex flex-col justify-start content-evenly py-2 text-black">
                {type === 'folders' && 
                    <>
                        <h1 className="text-xl">Name: {data.Name}</h1> 
                        <h1 className="text-xs">Created at: {new Date(data.createdAt).toString()}</h1> 
                        <h1 className="text-xs">Last Updated: {new Date(data.updatedAt).toString()}</h1> 
                    </>
                }
                {
                    type === 'Notes' &&
                    <>
                        <h1 className="text-xl">Name: {data.name}</h1>
                        <div className="text-xl">
                            content: 
                            <div className="tiptap-editor text-sm">{parse(data.content)}</div>
                        </div>
                        <h1 className="text-xs">Created at: {new Date(data.createdAt).toString()}</h1>
                        <h1 className="text-xs">Last Updated: {new Date(data.updatedAt).toString()}</h1>
                    </>
                }
                <div className="flex justify-end">
                    <button type="submit" className="border-2 group border-black items-center flex gap-x-2 m-2 rounded-full px-2 hover:bg-black hover:text-purple-200" onClick={(e) => handleClick(e)}>
                        CLOSE
                    </button>
                </div>
            </div>
        </Modal>
    )
}

export default ShowInfo