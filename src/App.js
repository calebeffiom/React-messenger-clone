// import "./styles.css";
import Login from "./components/signup and login/Login";
import Signup from "./components/signup and login/Signup";
import Chatroom from "./components/chatroom/Chatroom";
import Chat from "./components/chat/Chat";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Profile from "./components/profile/Profile";
export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="signup" element={<Signup />} />
          <Route path="chatroom" element={<Chatroom />} />
          <Route path="chat" element={<Chat />} />
          <Route path="profile" element={ <Profile/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
