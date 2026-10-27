import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import "./index.css";
import Agent from "./pages/Agent";
import Arena from "./pages/Arena";
import Lab from "./pages/Lab";
import Report from "./pages/Report";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Lab />} />
          <Route path="arena" element={<Arena />} />
          <Route path="agent" element={<Agent />} />
          <Route path="report/:version?" element={<Report />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
