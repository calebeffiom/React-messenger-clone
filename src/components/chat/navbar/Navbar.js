import { FaArrowLeft } from "react-icons/fa6";
import profile from "../../images/profile.png";
import { useNavigate } from "react-router-dom";

const Navbar = (props) => {
    const navigate = useNavigate();
    const exit=()=>{
        navigate("/chatroom", {state:{username:props.currentUsername, uid: props.currentUseruid}})
    }
    return (
        <>
            <div className="navbar-cont">
                <div className="navbar-inner">
                    <ul>
                        <li className="back-button" onClick={exit}><FaArrowLeft size={20} color="#fff"/></li>
                        <li className="profile"><span><img src={profile} /></span><span className="username">{props.friendName}</span></li>
                    </ul>
                </div>
            </div>
        </>
    );
};

export default Navbar;