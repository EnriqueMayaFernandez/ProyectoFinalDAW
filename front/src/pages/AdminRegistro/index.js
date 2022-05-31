import React, { useEffect } from "react";
import FormRegistroAdmin from "../../components/AdminFormRegistro/index";
import { useNavigate } from "react-router-dom";

export default function AdminRegistro() {
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
      <div className="min-h-screen flex flex-col items-center bg-shadow-blue">
        <FormRegistroAdmin></FormRegistroAdmin>
      </div>
    </>
  );
}
