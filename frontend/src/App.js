import Home from "./screens/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./screens/Login";
import SignUp from "./screens/SignUp";
import { CartProvider } from "./Components/ContextReducer";
import MyOrder from "./screens/MyOrder";
import ChangePassword from "./screens/ChangePassword";
import Profile from "./screens/Profile";
import ResetPassword from "./screens/ResetPassword";
import ResetPasswordLink from "./Components/ResetPasswordLink";

function App() {
  return (
    <div className="App">
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<SignUp />} />
            <Route exact path="/myorder" element={<MyOrder />} />
            <Route exact path="/profile" element={<Profile />} />
            <Route exact path="/changepassword" element={<ChangePassword />} />
            <Route exact path="/send-reset-password-email" element={<ResetPasswordLink />} />
            <Route exact path="user/reset/:id/:token" element={<ResetPassword/>} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </div>
  );
}

export default App;
