import { toast } from "react-toastify";
import instance from "axios";
const axios = instance.create({
  baseURL: "https://endothermic-fetches.000webhostapp.com/index.php",
});

export const t = (m = "", status = true) => {
  toast(m, { type: status ? "success" : "error" });
};

export const getStorage = (k, p = false) => {
  let data = localStorage.getItem(k);
  return p ? JSON.parse(data) : data;
};
export const setStorage = (k, v, p = false) => {
  localStorage.setItem(k, v, p ? JSON.stringify(v) : v);
  return true;
};
export const getUser = (k) => {
  let user = getStorage("user", true);
  return user["id"] || "";
};

export const _products = async () => {
  return await axios
    .get(`?q=products`)
    .then((res) => res.data)
    .then((d) => d.data);
};
export const _tags = async () => {
  return await axios
    .get(`?q=tags`)
    .then((res) => res.data)
    .then((d) => d.data);
};
export const _login = async (payload) => {
  const url = `?q=login&email=${payload.email}&password=${payload.password}`;
  return await axios.get(url).then((res) => res.data);
};
export const _signup = async (payload) => {
  const url = `?q=signup&email=${payload.email}&password=${payload.password}&name=${payload.name}&phone=${payload.phone}`;
  return await axios.get(url).then((res) => res.data);
};
export const _cart = async () => {
  const uid = getUser("uid");
  const url = `?q=cart&uid=${uid}`;
  return await axios.get(url).then((res) => res.data);
};
export const _orders = async () => {
  const uid = getUser("uid");
  const url = `?q=orders&uid=${uid}`;
  return await axios.get(url).then((res) => res.data);
};
export const _addToCart = async (pid = 0) => {
  const uid = getUser("uid");
  const url = `?q=addToCart&uid=${uid}&pid=${pid}`;
  return await axios.get(url).then((res) => res.data);
};
export const _removeFromCart = async (cid = 0) => {
  const uid = getUser("uid");
  const url = `?q=removeFromCart&uid=${uid}&cid=${cid}`;
  return await axios.get(url).then((res) => res.data);
};
export const _updateCart = async (pid = 0, qty = 0) => {
  const uid = getUser("uid");
  const url = `?q=updateCart&uid=${uid}&pid=${pid}&qty=${qty}`;
  return await axios.get(url).then((res) => res.data);
};
export const _checkout = async () => {
  const uid = getUser("uid");
  const url = `?q=checkout&uid=${uid}`;
  return await axios.get(url).then((res) => res.data);
};
