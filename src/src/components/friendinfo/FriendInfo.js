import profile from "../images/profile.png";
import { FaArrowLeft } from "react-icons/fa6";
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { collection, query, where, fdb, getDocs, doc, setDoc, rdb, set, ref, getDoc, updateDoc, signOut, auth } from "../hooks/firebase"

const FriendInfo = () =>{
    const navigate = useNavigate();
    const [openImageView, setOpenImageView] = useState(false)
    const location = useLocation();
    const profileInfo = location.state;
    const [additionalInfo, setAdditionalInfo] = useState({
        bio: "",
        phonenumber: ""
    })

useEffect(()=>{
   const fetchData = async() =>{
        const docRef = doc(fdb, "users", profileInfo.friendUid)
        try {
            const docSnap = await getDoc(docRef);
            if(docSnap.exists()){
                const docData = docSnap.data()
                setAdditionalInfo({
                    phonenumber: docData.phonenumber,
                    bio: docData.bio,
            })
            }
            else{
                setAdditionalInfo({
                    phonenumber: "",
                    bio: ""
                })
            }
        } catch (error) {
            console.log(error.message)
        }
    }
    fetchData()
},[])







    const viewImage = () => {
            setOpenImageView(true)   
    }
    const closeImageView = () =>{
        setOpenImageView(false)
    }
    const exit=()=>{
        // console.log( profileInfo.friendUid)
        navigate("/chat",{state: {uid: profileInfo.friendUid, username: profileInfo.friendUsername, image: profileInfo.friendImage, currentUsername: profileInfo.username, currentUseruid: profileInfo.uid, currentUserImage: profileInfo.image, combinedUID: profileInfo.combinedUid}})
    }
    return(
        <div className="friendInfo-container">

            <div className="showFriendImage" style={openImageView === false? {display:"none"}:{display:"block"}}>
            <div className="friendInfo-navbar-cont">
                <div className="friendInfo-navbar-inner">
                    <ul>
                        <li className="friendInfo-back-button" onClick={closeImageView}><CloseIcon size={20} color="#fff"/></li>
                    </ul>
                </div>
            </div>
                <img src={profileInfo.friendImage !== "" ? profileInfo.friendImage : profile}/>
            </div>







            <div className="friendInfo-navbar-cont">
                <div className="friendInfo-navbar-inner">
                    <ul>
                        <li className="friendInfo-back-button" onClick={exit}><FaArrowLeft size={20} color="#fff"/></li>
                    </ul>
                    <h2>Friend Info</h2>
                </div>
            </div>


            <div className="friendsInfo">
                <img src={profileInfo.friendImage !== "" ? profileInfo.friendImage : profile} onClick={viewImage}/>
                <h2>{profileInfo.friendUsername}</h2>
                <p>{additionalInfo.phonenumber}</p>
            </div>
            <div className="friendsInfo-bio-heading"><h2>Bio</h2></div>
            <div className="friendsInfo-bio-cont">
                
                <p>{additionalInfo.bio}</p>
            </div>

        </div>
    )
}
export default FriendInfo