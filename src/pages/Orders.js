import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as services from "../util";
import moment from "moment";
export default function Orders() {
  const state = useSelector((s) => s);
  const { orders } = state;
  const dispatch = useDispatch();
  return (
    <div className="my-cart">
      <h4>Your orders ({orders.length})</h4>

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
          {orders.map((x, i) => (
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
                <strong>{x.qty}</strong>
              </td>
              <td>{moment(x.boughton).toNow()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h4>Subtotal: {services.subtotal(orders)}</h4>
    </div>
  );
}
