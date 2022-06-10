import React from "react";
import HomePage from "../src/pages/Home/index";
import Login from "../src/pages/Login/index";
import NodeRed from "../src/pages/NodeRed/index"
import Privacidad from "../src/pages/Privacidad/index"
import Registro from "../src/pages/Registro/index";
import Admin from "../src/pages/Admin/index";
import AdminRegistro from "./pages/AdminRegistro";
import AdminModificar from "./pages/AdminModificar/index";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { UserContextProvider } from "../src/context/UserContext";
import "./App.css";

function App() {
  console.log(JSON.parse(window.localStorage.getItem("usuarioLogin")));
  return (
    <UserContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/login" element={<Login />} />
          <Route path="/nodeRed" element={<NodeRed />} />
          <Route path="/privacidad" element={<Privacidad />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/adminRegistro" element={<AdminRegistro />} />
          <Route path="/adminModificar" element={<AdminModificar />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </UserContextProvider>
  );
}

export default App;
