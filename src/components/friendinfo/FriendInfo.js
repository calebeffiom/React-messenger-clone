import profile from "../images/profile.png";
import { FaArrowLeft } from "react-icons/fa6";
import CloseIcon from '@mui/icons-material/Close';
import { useState } from "react";
const FriendInfo = () =>{
    const [openImageView, setOpenImageView] = useState(false)
    const viewImage = () => {
            setOpenImageView(true)   
    }
    const closeImageView = () =>{
        setOpenImageView(false)
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
                <img src={profile}/>
            </div>







            <div className="friendInfo-navbar-cont">
                <div className="friendInfo-navbar-inner">
                    <ul>
                        <li className="friendInfo-back-button"><FaArrowLeft size={20} color="#fff"/></li>
                    </ul>
                    <h2>Friend Info</h2>
                </div>
            </div>


            <div className="friendsInfo">
                <img src={profile} onClick={viewImage}/>
                <h2>Stella</h2>
                <p>07061357458</p>
            </div>
            <div className="friendsInfo-bio-heading"><h2>Bio</h2></div>
            <div className="friendsInfo-bio-cont">
                
                <p>Bio content ahahhshsjjsjjsjsjjs sjsjssssssssss dks dks dks dsks dks dj</p>
            </div>

        </div>
    )
}
export default FriendInfo