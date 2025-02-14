import { FaArrowLeft } from "react-icons/fa6";
import profile from "../../images/profile.png";
import { useNavigate } from "react-router-dom";

const Navbar = (props) => {
    const navigate = useNavigate();
    const exit=()=>{
        navigate("/chatroom", {state:{username:props.currentUsername, uid: props.currentUseruid, image: props.currentUserImage}})
    }
    return (
        <>
            <div className="navbar-cont">
                <div className="navbar-inner">
                    <ul>
                        <li className="back-button" onClick={exit}><FaArrowLeft size={20} color="#fff"/></li>
                        <li className="profile"><span><img src={props.friendImage !== "" ? props.friendImage : profile} /></span><span className="username">{props.friendUid !== props.currentUseruid ? props.friendName : props.friendName + " " + "(you)"}</span></li>
                    </ul>
                </div>
            </div>
        </>
    );
};

export default Navbar;