import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Header() {
  const state = useSelector((s) => s);
  const dispatch = useDispatch();
  const { cart, orders, user, loggedin } = state;
  const hc = () => dispatch({ type: "menu" });
  return (
    <>
      <header>
        <div onClick={hc}>
          {!state.menu ? (
            <i className="fa fa-bars"></i>
          ) : (
            <i className="fa fa-remove fa-spin"></i>
          )}
        </div>
        <h1>Ecommerce-Gaurav Nasa</h1>
        <div>build.1.0.1</div>
      </header>
      <aside className={state.menu ? "active" : ""}>
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
