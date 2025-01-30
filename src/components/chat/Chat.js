import { useState, useEffect } from "react";
// import { DateTime } from 'luxon';
import Chatbar from "./chatbar/Chatbar";
import Navbar from "./navbar/Navbar";
import { collection, query, where, fdb, getDocs, doc, setDoc, rdb, set, ref, getDoc, updateDoc, arrayUnion, serverTimestamp } from "../hooks/firebase"
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


    const onChange = (e) => {
        const text = e.target.value;
        setMessage(text)
    }

    const sendMessages = async () => {

        // console.log(date)
        try {
            await updateDoc(doc(fdb, "chats", combinedUID), {
                messages: arrayUnion({
                    userUid: info.currentUseruid,
                    userName: info.currentUsername,
                    message: message,
                    timeStamp: new Date().toISOString() 
                })
            })
            setMessage("")

            const docRef = doc(fdb, "chats", combinedUID);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const arrayLastVal = docSnap.data().messages.length - 1;
                const latestText = docSnap.data().messages[arrayLastVal].message
                await updateDoc(doc(fdb, "chatRooms", info.currentUseruid), {
                    [`${combinedUID}.latestText`]: latestText
                })
                
                
            } else {
                console.log("No such document!");
            }

           

        }
        catch (err) {
            alert(err.message)
            console.log(err)
        }

    }




    useEffect(() => {
        const fetchData = async () => {
            const docRef = doc(fdb, "chats", combinedUID);
            try {
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const docData = docSnap.data();
                    if (Object.keys(docData).length === 0) {
                        setNoChat(true);
                    } else {
                        const usersArray = docData.messages;
                        setMessages(usersArray);
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
    }, [messages])








    return (
        <div className="container">
            <Navbar friendName={info.username} friendUid={info.uid} currentUsername={info.currentUsername} currentUseruid={info.currentUseruid} />
            <div className="chats-cont">
                {
                    messages && messages.map((chat, index) =>{ 
                        const utcDate = new Date(chat.timeStamp);
      
                        // Convert the Date object to local time (the browser automatically handles this)
                        const localTimestamp = utcDate.toLocaleString('en-US', {
                        //   weekday: 'short', // e.g., "Wed"
                        //   year: 'numeric', // e.g., "2025"
                        //   month: 'short', // e.g., "Jan"
                        //   day: 'numeric', // e.g., "30"
                          hour: 'numeric', // e.g., "7 AM"
                          minute: 'numeric', // e.g., "00"
                          hour12: true, // Set to false for 24-hour format
                        });

                        return(
                        <div key={index} className={chat.userUid === info.currentUseruid ? "sent" : "received"}><p>{chat.message}<span className="sent-time">{localTimestamp}</span></p></div>
                    )})
                }
                {
                    noChat === true && <p className="nochat">No chat 🥲</p>
                }
                {/* <div className="sent"><p>hello, how are you doing fam<span className="sent-time">10:35AM</span></p></div>
                <div className="received"><p>hi Caleb!!!</p><span className="received-time">10:35AM</span></div>
                <div className="sent"><p>Are you there?<span className="sent-time">10:37AM</span></p></div>
                <div className="received"><p>Yeah, sorry i popped out for a bit</p><span className="received-time">10:38AM</span></div> */}
            </div>
            <Chatbar message={message} onChange={onChange} sendMessages={sendMessages} />
        </div>)
}
export default Chat