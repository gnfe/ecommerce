import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import App from "./App";
import Redux from "./Redux";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <Redux>
    <App />
    <ToastContainer />
  </Redux>
);
