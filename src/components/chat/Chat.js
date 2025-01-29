import { useState, useEffect } from "react";
import Chatbar from "./chatbar/Chatbar";
import Navbar from "./navbar/Navbar";
import { collection, query, where, fdb, getDocs, doc, setDoc, rdb, set, ref, getDoc, updateDoc, arrayUnion } from "../hooks/firebase"
// import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
const Chat = () => {
    const [loadMessages, setLoadMessages] = useState([])
    const [messages, setMessages] = useState(null)
    const [message, setMessage] = useState("")
    const location = useLocation();
    const [noChat, setNoChat] = useState(true)
    const info = location.state;
    const combinedUID = info.currentUseruid > info.uid ? info.currentUseruid + info.uid : info.uid + info.currentUseruid


    const onChange = (e) =>{
        const text = e.target.value;
        setMessage(text)
    }

    const sendMessages = async () =>{
        
        try{
            await updateDoc(doc(fdb,"chats",combinedUID), {
                messages: arrayUnion({
                    userUid: info.currentUseruid,
                    userName: info.currentUsername,
                    message: message
                })
            })
        }
        catch(err){
            alert(err.message)
            console.log(err)
        }
    }




    useEffect(()=>{
        const fetchData = async () =>{
            const docRef = doc(fdb, "chats", combinedUID);
            try{
                const docSnap = await getDoc(docRef);
                if(docSnap.exists()) {
                    const docData = docSnap.data();
                    if (Object.keys(docData).length === 0) {
                        setNoChat(true);
                    } else {
                        const usersArray = docData.messages;
                        setMessages(usersArray);
                        // console.log(usersArray)
                        setNoChat(false);
                    }
                }
            }
            
            catch (err) {
                console.log("Error fetching document:", err.message);
            }
        }
        // console.log(messages)
        fetchData()
    },[messages])








    return (
        <div className="container">
            <Navbar friendName={info.username} currentUsername={info.currentUsername} currentUseruid={info.currentUseruid}/>
            <div className="chats-cont">
                {
                    messages && messages.map((chat, index) =>(
                        <div key={index} className={chat.userUid === info.currentUseruid ? "sent" : "received"}><p>{chat.message}<span className="sent-time">10:35AM</span></p></div>
                    ))
                }
                {/* <div className="sent"><p>hello, how are you doing fam<span className="sent-time">10:35AM</span></p></div>
                <div className="received"><p>hi Caleb!!!</p><span className="received-time">10:35AM</span></div>
                <div className="sent"><p>Are you there?<span className="sent-time">10:37AM</span></p></div>
                <div className="received"><p>Yeah, sorry i popped out for a bit</p><span className="received-time">10:38AM</span></div> */}
            </div>
            <Chatbar message={message} onChange={onChange} sendMessages={sendMessages}/>
        </div>)
}
export default Chat