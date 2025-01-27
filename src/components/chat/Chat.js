import Chatbar from "./chatbar/Chatbar";
import Navbar from "./navbar/Navbar";
// import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
const Chat = () => {
    const location = useLocation();
    const info = location.state;
    // const navigate = useNavigate()
    return (
        <div className="container">
            <Navbar friendName={info.username} currentUsername={info.currentUsername} currentUseruid={info.currentUseruid}/>
            <div className="chats-cont">
                <div className="sent"><p>hello, how are you doing fam<span className="sent-time">10:35AM</span></p></div>
                <div className="received"><p>hi Caleb!!!</p><span className="received-time">10:35AM</span></div>
                <div className="sent"><p>Are you there?<span className="sent-time">10:37AM</span></p></div>
                <div className="received"><p>Yeah, sorry i popped out for a bit</p><span className="received-time">10:38AM</span></div>
            </div>
            <Chatbar />
        </div>)
}
export default Chat