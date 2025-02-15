import { FaArrowLeft } from "react-icons/fa6";
import profile from "../../images/profile.png";
import { useNavigate } from "react-router-dom";

const Navbar = (props) => {
    const navigate = useNavigate();
    const exit=()=>{
        navigate("/chatroom", {state:{username:props.currentUsername, uid: props.currentUseruid, image: props.currentUserImage}})
    }
    const friendProfileInfo=()=>{
        navigate("/friendinfo", {state:{friendUsername: props.friendName, friendUid: props.friendUid, friendImage: props.friendImage, username: props.currentUsername, uid: props.currentUseruid, image: props.currentUserImage, combinedUid: props.combinedUid}})
    }
    return (
        <>
            <div className="navbar-cont">
                <div className="navbar-inner">
                    <ul>
                        <li className="back-button" onClick={exit}><FaArrowLeft size={20} color="#fff"/></li>
                        <li className="profile" onClick={friendProfileInfo}><span><img src={props.friendImage !== "" ? props.friendImage : profile} /></span><span className="username">{props.friendUid !== props.currentUseruid ? props.friendName : props.friendName + " " + "(you)"}</span></li>
                    </ul>
                </div>
            </div>
        </>
    );
};

export default Navbar;