import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { TiendaTesloAPP } from "./TiendaTesloAPP";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TiendaTesloAPP></TiendaTesloAPP>
  </StrictMode>,
);
