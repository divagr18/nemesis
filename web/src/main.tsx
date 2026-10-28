import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import "./index.css";
import Agent from "./pages/Agent";
import Arena from "./pages/Arena";
import Lab from "./pages/Lab";
import Places from "./pages/Places";
import Report from "./pages/Report";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Lab />} />
          <Route path="a/:id" element={<Lab />} />
          <Route path="deploy" element={<Places />} />
          <Route path="arena" element={<Arena />} />
          <Route path="autopilot" element={<Agent />} />
          <Route path="readiness/:version?" element={<Report />} />
          <Route path="agent" element={<Navigate to="/autopilot" replace />} />
          <Route path="report/:version?" element={<Navigate to="/readiness" replace />} />
          <Route path="places" element={<Navigate to={`/deploy${location.search}`} replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
