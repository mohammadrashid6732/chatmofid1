import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import UserData from "./components/UserData";
import ChatList from "./components/ChatList";
import ChatPage from "./components/ChatPage";

const App = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/userdata" element={<UserData />} />
    <Route path="/chatlist" element={<ChatList />} />
    <Route path="/chat/:channel_id" element={<ChatPage />} />
  </Routes>
);

export default App;
