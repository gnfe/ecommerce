import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import * as services from "../util";
export default function Header() {
  const state = useSelector((s) => s);
  const dispatch = useDispatch();
  const { cart, orders, user, loggedin } = state;
  const hc = () => dispatch({ type: "menu" });
  const hc2 = () => dispatch({ type: "tc" });
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
        <div onClick={hc2}>
          <i className="fa fa-cart-plus">({cart.length})</i>
        </div>
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
      <StickyCart />
    </>
  );
}

export const StickyCart = (props) => {
  const state = useSelector((s) => s);
  const { cart } = state;
  const dispatch = useDispatch();
  const hc1 = (cid, qty) => {
    services
      ._updateCart(cid, qty)
      .then((d) => d.data)
      .then((d) => dispatch({ type: "cart", payload: d }))
      .catch((e) => services.t(e.message, 0));
  };
  const hc2 = (cid) => {
    services
      ._removeFromCart(cid)
      .then((d) => d.data)
      .then((d) => dispatch({ type: "cart", payload: d }))
      .catch((e) => services.t(e.message, 0));
  };
  if (!state.tc) return null;
  return (
    <summary className="sticky-cart">
      <h4>Your cart ({cart.length})</h4>
      <div className="overflow">
        {state?.cart?.map((x, i) => (
          <div className="cart-line" key={i}>
            <img width={50} src={services.base + x.image} alt="" />
            <button className="min" onClick={() => hc1(x.cid, x.qty - 1)}>
              -
            </button>
            <strong>{x.qty}</strong>
            <button className="plus" onClick={() => hc1(x.cid, x.qty + 1)}>
              +
            </button>
            <button className="rem" onClick={() => hc2(x.cid)}>
              <i className="fa fa-trash-o"></i>
            </button>
          </div>
        ))}
      </div>
      <h4>Subtotal: {services.subtotal(cart)}</h4>
    </summary>
  );
};
