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
        bio: "",
    });
    const [imageURL, setImageURL] = useState("")



    useEffect (()=>{
        const fetchData = async () => {
            const docRef = doc(fdb, "users", userProfile.useruid)
            try{
                const docSnap = await getDoc(docRef);
                if(docSnap.exists()){
                    const docData = docSnap.data()
                   setImageURL(docData.imageURL)
                    setProfileInfo({
                        phonenumber: docData.phonenumber,
                        bio: docData.bio,
                })
                }
                else{
                    setImageURL("")
                    setProfileInfo({
                        phonenumber: "",
                        bio: "",
                        
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
        navigate("/chatroom", {state:{username: userProfile.username, uid: userProfile.useruid, image: userProfile.userimage}})
    }





    const changeProfileInfo = (e) =>{
        const {name, value, files} = e.target
        setProfileInfo((prev)=>({
            ...prev,
            [name]: value,
        }))
    }


    const handleImageUpload = async (e) =>{
        const file = e.target.files[0]
        if(!file) return;
        const apiKey = "95bcc86d4aeffff6669ed0857ebd21d1";
        const formData = new FormData();
        formData.append("action", "upload");
        formData.append("format", "json");
        formData.append("image", file);
        formData.append("key", apiKey); 

        try {
            const response = await fetch("https://api.imgbb.com/1/upload", {
              method: "POST",
              body: formData,
            //   mode: "no-cors"
            });
           
            const data = await response.json();
            // console.log(data.data.image.url)
            if (data.success) {
            const imageUrl = data.data.image.url
              setImageURL(imageUrl);
            //   await updateDoc(doc(fdb, "users", userProfile.useruid), {
            //     imageURL: imageUrl,
            // });
            console.log("done uploading")
               // Get the direct image URL
            } else {
              console.error("Upload failed:", data.error.message);
            }
          } catch (error) {
            console.error("Error uploading image:", error.message);
          }

    }


    const submitEdittedProfile = async () =>{
        
        try{
            if(imageURL != "" || profileInfo.phonenumber != "" || profileInfo.bio != ""){
                await updateDoc(doc(fdb, "users", userProfile.useruid),{
                    imageURL: imageURL,
                    phonenumber: profileInfo.phonenumber,
                    bio: profileInfo.bio
                })
                alert("profile editted")
            }
            else{
                alert("edit all profile details")
            }
        }
        catch(err){
            console.log(err.message)
        }
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
                    <span className="image-span"><img src={imageURL !== "" ? imageURL : profile } /></span> <span className="guide-text-span"><p>Edit your dipslay photo and your username</p></span>
                </div>
                <div className="profile-edit-input-cont">
                    <input style={{ display: "none" }} type="file" id="edit" onChange={handleImageUpload}/>
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
                <input value={profileInfo.phonenumber} type="text" name="phonenumber" placeholder="Enter Number" onChange={changeProfileInfo}/>
            </div>
            <div className="profile-bio">
                <h2>About</h2>
                <textarea type="text" name="bio" placeholder="Enter Bio" value={profileInfo.bio} onChange={changeProfileInfo}></textarea>
            </div>
            <div className="profile-save-btn">
                <button onClick={submitEdittedProfile}>Save</button>
            </div>
        </div>
    )
}
export default Profile;