import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App.jsx";
import "./styles.css";

// Wheel gestures must never change the value of a focused number field.
document.addEventListener(
  "wheel",
  (event) => {
    if (
      event.target instanceof HTMLInputElement &&
      event.target.type === "number" &&
      event.target === document.activeElement
    )
      event.preventDefault();
  },
  { passive: false },
);
createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
