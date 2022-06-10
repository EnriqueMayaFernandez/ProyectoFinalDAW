import React, { useEffect } from "react";
import Iframe from "../../components/Iframe/index";
import { useNavigate } from "react-router-dom";

export default function NodeRed() {
  const navigate = useNavigate();
  const existeUsuario = () => {
    let usuario = JSON.parse(window.localStorage.getItem("usuarioLogin"));
    if (usuario == null || usuario.tipo===0) {
      navigate("/login");
    }
  };

  useEffect(() => {
    existeUsuario();
  });
  return (
    <>
      <div className="flex flex-col items-center bg-shadow-blue">
        <Iframe></Iframe>
      </div>
    </>
  );
}