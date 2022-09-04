import React from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { getStorage } from "./util";
let user = null;
let loggedin = false;
if (localStorage.getItem("user")) {
  user = getStorage("user", true);
  loggedin = true;
}
const intialState = {
  products: [],
  tags: [],
  cart: [],
  orders: [],
  users: [],
  tagname: "",
  order: true,
  col: "id",
  search: "",
  user,
  loggedin,
  menu: false,
};
function reducer(state = intialState, action) {
  switch (action?.type) {
    case "products":
      return { ...state, products: action.payload };
    case "tags":
      return { ...state, tags: action.payload };
    case "cart":
      return { ...state, cart: action.payload };
    case "orders":
      return { ...state, orders: action.payload };
    case "tagname":
      return { ...state, tagname: action.payload };
    case "search":
      return { ...state, search: action.payload };
    case "sort":
      return { ...state, ...action.payload };
    case "menu":
      return { ...state, menu: !state.menu };
    case "login":
      return { ...state, loggedin: true, user: action.payload };
    default:
      return state;
  }
}

export default function Redux({ children }) {
  return <Provider store={createStore(reducer)}>{children}</Provider>;
}
