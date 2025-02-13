import profile from "../images/profile.png";
import { FaArrowLeft } from "react-icons/fa6";
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, query, where, fdb, getDocs, doc, setDoc, rdb, set, ref, getDoc, updateDoc, signOut, auth } from "../hooks/firebase"
const Profile = () => {
    
    const location = useLocation();
    const userProfile = location.state;
    const navigate = useNavigate();
    const [profileInfo, setProfileInfo] = useState({
        phonenumber: "",
        bio: ""
    });

    useEffect (()=>{
        const fetchData = async () => {
            const docRef = doc(fdb, "users", userProfile.useruid)
            try{
                const docSnap = await getDoc(docRef);
                if(docSnap.exists()){
                    const docData = docSnap.data()
                    setProfileInfo({
                        phonenumber: docData.phonenumber,
                        bio: "some text"
                })
                }
            }
            catch (err){
                console.log(err.message)
            }
        }
        fetchData()
    },[])

    const exit=()=>{
        navigate("/chatroom", {state:{username:userProfile.username, uid: userProfile.useruid}})
    }
    const changeProfileInfo = (e) =>{
        const {name, value} = e.target
        setProfileInfo((prev)=>({
            ...prev,
            [name]: value,
        }))
    }


    return (
        <div className="profile-container">

            <div className="profile-navbar-cont">
                <div className="profile-navbar-inner">
                    <ul>
                        <li className="profile-back-button" onClick={exit}><FaArrowLeft size={20} color="#fff"/></li>
                    </ul>
                    <h2>Edit Profile</h2>
                </div>
            </div>


            <div className="profile-name-photo-cont">
                <div className="profile-photo-cont">
                    <span className="image-span"><img src={profile} /></span> <span className="guide-text-span"><p>Edit your dipslay photo and your username</p></span>
                </div>
                <div className="profile-edit-input-cont">
                    <input style={{ display: "none" }} type="file" id="edit" />
                    <label htmlFor="edit">
                        Edit
                    </label>
                </div>


                <div className="profile-name">
                    <h2>{userProfile.username}</h2>
                </div>
            </div>


            <div className="profile-number">
                <h2>Phone Number</h2>
                {/* <span>{phoneNumber}</span> */}
                <input value={profileInfo.phonenumber} type="text" name="phonenumber" onChange={changeProfileInfo}/>
            </div>
            <div className="profile-bio">
                <h2>About</h2>
                <textarea type="text" name="bio" placeholder="Enter Bio" value={profileInfo.bio} onChange={changeProfileInfo}></textarea>
            </div>
            <div className="profile-save-btn">
                <button>Save</button>
            </div>
        </div>
    )
}
export default Profile;