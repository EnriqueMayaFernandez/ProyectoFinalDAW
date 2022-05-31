import React, { useEffect } from "react";
import ListaUsuarios from "../../components/ListaUsuarios/index";
import { useNavigate } from "react-router-dom";

export default function Admin() {
  const navigate = useNavigate();

  const existeUsuario = () => {
    let usuario = JSON.parse(window.localStorage.getItem("usuarioLogin"));
    if (usuario == null) {
      navigate("/login");
    }
  };

  useEffect(() => {
    existeUsuario();
  }, []);

  return (
    <>
      <div className="flex flex-col items-center justify-items-center">
        <ListaUsuarios />
      </div>
    </>
  );
}
