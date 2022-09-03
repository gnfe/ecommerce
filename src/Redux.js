import React from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";

const intialState = {
  products: [],
  tags: [],
  cart: [],
  orders: [],
  users: [],
  user: null,
  loggedin: null,
};
function reducer(state = intialState, action) {
  switch (action.type) {
    case "products":
      return { ...state, products: action.payload };

    case "tags":
      return { ...state, tags: action.payload };
    case "cart":
      return { ...state, cart: action.payload };
    case "orders":
      return { ...state, orders: action.payload };
    default:
      return state;
  }
}

export default function Redux({ children }) {
  return <Provider store={createStore(reducer)}>{children}</Provider>;
}
