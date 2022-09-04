import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Header() {
  const state = useSelector((s) => s);
  const { cart, orders, user, loggedin } = state;
  return (
    <>
      <header>
        <h1>Ecommerce-Gaurav Nasa</h1>
        <div>build.1.0.1</div>
      </header>
      <aside>
        <Link to="/">Home</Link>
        {!state.loggedin ? (
          <>
            <Link to="/Login">Login</Link>
            <Link to="/Signup">Signup</Link>
          </>
        ) : (
          <>
            <Link to="/Cart">Cart ({cart.length})</Link>
            <Link to="/Orders">Orders ({orders.length})</Link>
            <Link to="/Profile">Profile</Link>
            <Link to="/Checkout">Checkout</Link>
            <Link to="/Logout">Logout {user?.name || "Guest"}</Link>
          </>
        )}
      </aside>
    </>
  );
}
