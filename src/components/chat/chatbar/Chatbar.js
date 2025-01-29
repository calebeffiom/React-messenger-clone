import { FaPaperPlane } from "react-icons/fa";

const Chatbar=(props)=>{
    return (
        <>
        <div className="chat-container">
            <div className="chat-inner">
                <input placeholder="Message" value={props.message} onChange={props.onChange}/>
                <button className="chat-button" onClick={props.sendMessages}><FaPaperPlane size={25} color="#fff"/>
                </button>
            </div>
        </div>
        </>
    )
}
export default Chatbar;