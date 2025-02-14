import { useState } from "react";
import profile from "../images/profile.png";
import { useLocation } from 'react-router-dom';
import Userinput from "../signup and login/Userinput";
// import { set, get, child, ref, database } from "../hooks/firebase";
import { useNavigate } from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';
import EditIcon from '@mui/icons-material/Edit';
import { collection, query, where, fdb, getDocs, doc, setDoc, rdb, set, ref, getDoc, updateDoc, signOut, auth } from "../hooks/firebase"
// import { serverTimestamp } from "firebase/database";
import React, { useEffect } from 'react';
const Chatroom = () => {
    const [search, setSearch] = useState("")
    const location = useLocation();
    const user = location.state;
    const [searchedUserName, setSearchedUserName] = useState([]);
    const [noChat, setNoChat] = useState(true)
    const [chatList, setChatList] = useState(null)
    const [userFound, setUserFound] = useState(null)
    const [unread, setUnread] = useState(false)
    const navigate = useNavigate();
    const onChange = (e) => {
        const search = e.target.value;
        setSearch(search)
    }
    // this is to search for a particular user
    const searchUser = async () => {
        setSearchedUserName([]);
        const usersRef = collection(fdb, "users");
        const q = query(usersRef, where("username", "==", `${search}`));
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
            setUserFound(false)
            // console.log(userFound)
        }
        else {
            setUserFound(true)
            querySnapshot.forEach((doc) => {
                setSearchedUserName(prev => [...prev, { username: doc.data().username, uid: doc.data().uid, image: doc.data().imageURL }])
            })
        }

    }

    // this is to check if a particular user already has a chat open with someone. If he does it will just open the chat up else it creates a new chat and navigates to their chat space
    const onClick = async (i) => {
        // console.log(searchedUserName[i])
        const combinedUID = user.uid > searchedUserName[i].uid ? user.uid + searchedUserName[i].uid : searchedUserName[i].uid + user.uid
        try {
            const res = getDoc(doc(fdb, "chats", combinedUID))
            if (!(await res).exists()) {
                await setDoc(doc(fdb, "chats", combinedUID), {
                    messages: []
                });
                await updateDoc(doc(fdb, "chatRooms", user.uid), {
                    [combinedUID]: {
                        uid: searchedUserName[i].uid,
                        username: searchedUserName[i].username,
                        latestText: "",
                        imageURL: searchedUserName[i].image
                    }
                });
                await updateDoc(doc(fdb, "chatRooms", searchedUserName[i].uid), {
                    [combinedUID]: {
                        uid: user.uid,
                        username: user.username,
                        latestText: "",
                        imageURL: user.image
                    },
                });

                navigate("/chat", { state: { uid: searchedUserName[i].uid, username: searchedUserName[i].username, image: searchedUserName[i].image, currentUsername: user.username, currentUseruid: user.uid, currentUserImage: user.image, chat: combinedUID } });

            }
            else {
                alert("chat exists")
                navigate("/chat", { state: { uid: searchedUserName[i].uid, username: searchedUserName[i].username, image: searchedUserName[i].image, currentUsername: user.username, currentUseruid: user.uid, currentUserImage: user.image, chat: combinedUID } });
            }



        }
        catch (err) {
            alert(err.message)
            console.log(err)

        }
    }

    // const checkUnreadMesasge = (i, lastMessageuid) =>{
    //     // console.log(lastMessageuid)
    //     if(chatList[i].uid === lastMessageuid){
    //         // console.log(i.uid)
    //         setUnread(true)
    //     }
    //     else{
    //         setUnread(false)
    //     }
    //     return(i, lastMessageuid)
    // }



    // this is to update the chats opened 
    useEffect(() => {
        const fetchData = async () => {
            // this is to get the chats created
            const docRef = doc(fdb, "chatRooms", user.uid);
            try {
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {

                    const docData = docSnap.data();
                    if (Object.keys(docData).length === 0) {
                        setNoChat(true);
                    }
                    else {
                        // this is to check for the lastmessages dropped in each others dms
                        const usersArray = Object.values(docData);
                        usersArray.map(async (users, index) => {
                            
                            const combinedUID = user.uid > users.uid ? user.uid + users.uid : users.uid + user.uid
                            const docRef2 = doc(fdb, "chats", combinedUID);
                            const docSnap2 = await getDoc(docRef2);

                            if (docSnap2.exists()) {
                                
                                if (docSnap2.data().messages.length !== 0) {
                                    // console.log("why")
                                    const arrayLastVal = docSnap2.data().messages.length - 1;
                                    const latestText = docSnap2.data().messages[arrayLastVal].message
                                    await updateDoc(doc(fdb, "chatRooms", user.uid), {
                                        [`${combinedUID}.latestText`]: latestText
                                    });
                                }
                                else {
                                    const latestText = ""
                                    await updateDoc(doc(fdb, "chatRooms", user.uid), {
                                        [`${combinedUID}.latestText`]: latestText
                                    });
                                }

                            } else {
                                console.log("No such document!");
                            }
                        })
                        // console.log(usersArray)
                        setChatList(usersArray);
                        setNoChat(false);
                    }

                }

                else {
                    setNoChat(true)
                }
                // console.log(noChat)
            } catch (error) {
                console.log("Error fetching document:", error.message);
            }
        }
        fetchData()
    }, [chatList])


    const logout = async () => {
        try {
            await signOut(auth)
            navigate("/");
        }
        catch (err) {
            console.log(err.message)
        }
    }


    const chatOnClick = (i) => {
        const combinedUID = user.uid > chatList[i].uid ? user.uid + chatList[i].uid : chatList[i].uid + user.uid
        navigate("/chat", { state: { uid: chatList[i].uid, username: chatList[i].username, image: chatList[i].imageURL, currentUsername: user.username, currentUseruid: user.uid, currentUserImage: user.image, combinedUID: combinedUID } })

    }



    const editProfile = () => {
        navigate("/profile", { state: { username: user.username, useruid: user.uid, userimage: user.image} })
    }


    return (
        <div className="chatroom-cont">
            <div className="greetings-cont">
                <div className="user-image-cont"><img src={user.image !== "" ? user.image : profile} /><span className="edit-icon" onClick={editProfile}><EditIcon fontSize="8px" className="editicon-colour" /></span></div>
                {user.username != null ? <h2>Hi {user.username}</h2> : <h2>Hi</h2>}
                <h1>Welcome Back!</h1>
            </div>
            <div className="search-cont">
                <div className="search-cont-inner">
                    <Userinput
                        type="text"
                        placeholder="search contact"
                        name="search"
                        value={search}
                        onChange={onChange}
                    />
                    <button onClick={searchUser}>Search</button>

                </div>

                {searchedUserName && searchedUserName.map((users, index) => (
                    <div key={users.uid} onClick={() => { onClick(index) }} className="searched-contact"><span><img src={users.image !== "" ? users.image : profile} /></span><span className="username">{users.username}</span></div>
                ))}
                {userFound === false && <p className="userNotFound">User Not Found 🤔</p>}
                <div className="chat-cont">
                    <h1>Chats</h1>
                    <ul>

                        {chatList && chatList.map((users, index) => (
                            <li key={index} onClick={() => { chatOnClick(index) }}>
                                {
                                    // unread === true && <span className="unread"></span>
                                }
                                <span><img src={users.imageURL !== "" ? users.imageURL : profile} /></span><span className="username">{users.uid !== user.uid ? users.username : users.username + " " + "(you)"}<p className="last-message">{users.latestText != "" ? users.latestText : null}</p></span></li>

                        ))}
                        {noChat === true && <p className="nochat">No chat 🥲</p>}
                    </ul>
                </div>
            </div>
            <div className="logout-cont" onClick={logout}>
                <p>Logout</p> <LogoutIcon className="exitIcon" />
            </div>
        </div>
    );
}
export default Chatroom;