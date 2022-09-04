import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as services from "../util";
export default function Cart() {
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
  return (
    <div className="my-cart">
      <h4>Your cart ({cart.length})</h4>

      <table cellPadding={10} cellSpacing={0}>
        <thead>
          <tr>
            <th>##</th>
            <th>title</th>
            <th>desc</th>
            <th>price</th>
            <th>qty</th>
            <th>actions</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((x, i) => (
            <tr>
              <td>{i + 1}</td>
              <td>
                {x.title}
                <br />
                <img width={50} src={services.base + x.image} alt="" />
              </td>
              <td>{x.description}</td>
              <td>{x.price}</td>
              <td>
                <button className="plus" onClick={() => hc1(x.cid, x.qty - 1)}>
                  -
                </button>
                <strong>{x.qty}</strong>
                <button className="plus" onClick={() => hc1(x.cid, x.qty + 1)}>
                  +
                </button>
              </td>
              <td>
                <button className="rem" onClick={() => hc2(x.cid)}>
                  <i className="fa fa-trash-o"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h4>Subtotal: {services.subtotal(cart)}</h4>
    </div>
  );
}
