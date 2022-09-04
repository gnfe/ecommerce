import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
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
import { useDispatch, useSelector } from "react-redux";
import * as services from "./util";
export default function App() {
  const state = useSelector((s) => s);
  const dispatch = useDispatch();
  const { user } = state;
  const boot = () => {
    services
      ._products()
      .then((d) => dispatch({ type: "products", payload: d }));

    services._tags().then((d) => dispatch({ type: "tags", payload: d }));
    if (state.loggedin) {
      services._cart().then((d) => dispatch({ type: "cart", payload: d.data }));
      services._orders().then((d) => dispatch({ type: "orders", payload: d.data }));
    }
  };
  useEffect(boot, [user]);
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
