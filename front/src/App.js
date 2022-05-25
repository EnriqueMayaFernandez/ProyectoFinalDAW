import React from "react";
import HomePage from "../src/pages/Home/index";
import Login from "../src/pages/Login/index";
import Registro from "../src/pages/Registro/index";
import Admin from "../src/pages/Admin/index";
import AdminRegistro from "./pages/AdminRegistro";
import AdminModificar from "./pages/AdminModificar/index";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserContextProvider } from "../src/context/UserContext";
import "./App.css";

function App() {
  return (
    <UserContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/adminRegistro" element={<AdminRegistro />} />
          <Route path="/adminModificar" element={<AdminModificar />} />
          {/* <Route path="/admin" render={()=>{
          return user ? null : <Redirect to="/admin"/> : <Login/>
        }}/> */}
        </Routes>
      </BrowserRouter>
    </UserContextProvider>
  );
}

export default App;
