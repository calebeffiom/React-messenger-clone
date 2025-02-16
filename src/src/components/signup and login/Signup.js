import { Link } from "react-router-dom";
import { auth, createUser, setDoc, fdb, doc} from "../hooks/firebase";
import { useState } from "react";
import Userinput from "./Userinput";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
const Signup = () => {
  const [inputFields, setInputFields] = useState({
    username: "",
    email: "",
    phonenumber: "",
    password: ""
  });
  const navigate = useNavigate();
  

  const changeInputs = (e) => {
    const { name, value } = e.target;
    setInputFields((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const  signup = () => {
    if (inputFields.username && inputFields.password && inputFields.phonenumber && inputFields.email) {
      createUser(auth, inputFields.email, inputFields.password)
        .then(async (userCredential) => {
          const user = userCredential.user;
          await setDoc(doc(fdb, "users", user.uid), {
            uid: user.uid,
            username: inputFields.username,
            email: inputFields.email,
            phonenumber: inputFields.phonenumber,
            bio: "",
            imageURL: "",
            // password: inputFields.password
          });
          await setDoc(doc(fdb,"chatRooms",user.uid))


          alert("Account Created")
          navigate("/")

        })
        .catch((error) => {
          alert(error.message);
        });
    } else {
      alert("Please fill in all the fields");
    }
  };

  return (
    <div className="signup-cont">
      <div className="signup-inner-cont">
        <h2>Create Your Account</h2>
        <Userinput
          type="text"
          placeholder="Create Username"
          name="username"
          value={inputFields.username}
          onChange={changeInputs}
        />
        <Userinput
          type="email"
          placeholder="Create Email"
          name="email"
          value={inputFields.email}
          onChange={changeInputs}
        />
        <Userinput
          type="tel"
          placeholder="Create Phone Number"
          name="phonenumber"
          value={inputFields.phonenumber}
          onChange={changeInputs}
        />
        <Userinput
          type="password"
          placeholder="Create Password"
          name="password"
          value={inputFields.password}
          onChange={changeInputs}
        />
        <Button onClick={signup} name="Sign up"/>
        <p>
          Already have an account?{" "}
          <Link to="/" className="signup-link">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
