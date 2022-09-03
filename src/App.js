import React from "react";
import { BrowserRouter } from "react-router-dom";
import "./style.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import Profile from "./pages/Profile";
import Checkout from "./pages/Checkout";
import Errorpage from "./pages/Errorpage";
export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="container">
        <Routes>
          <Route path="" element={<Home />} />
          <Route path="Login" element={<Login />} />
          <Route path="Signup" element={<Signup />} />
          <Route path="Cart" element={<Cart />} />
          <Route path="Orders" element={<Orders />} />
          <Route path="Profile" element={<Profile />} />
          <Route path="Checkout" element={<Checkout />} />
          <Route path="*" element={<Errorpage />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}
