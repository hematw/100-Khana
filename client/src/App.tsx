import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedPages from "./pages/ProtectedPages";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import Logout from "./components/Logout";
import MyHomes from "./components/MyHomes";

function App() {
  document.title = "100 Khana";

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/" element={<ProtectedPages />}>
          <Route index element={<Home />} />
          <Route path="profile/me" element={<Profile />} />
          <Route path="profile/homes" element={<MyHomes />} />
          <Route path="profile/:id" element={<Profile />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
