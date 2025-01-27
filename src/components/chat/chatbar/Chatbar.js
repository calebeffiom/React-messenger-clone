import { FaPaperPlane } from "react-icons/fa";

const Chatbar=()=>{
    return (
        <>
        <div className="chat-container">
            <div className="chat-inner">
                <input placeholder="Message"/>
                <button className="chat-button"><FaPaperPlane size={25} color="#fff"/>
                </button>
            </div>
        </div>
        </>
    )
}
export default Chatbar;