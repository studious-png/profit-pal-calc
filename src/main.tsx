import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { applyBranding, BRANDING } from "./branding";
import "./index.css";

applyBranding(BRANDING);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
