import React, {useEffect} from "react";
import AdminFormModificar from "../../components/AdminFormModificar/index";
import StickyFooter from "../../components/StickyFooter/index";
import Banner from "../../components/Banner/index";
import { useNavigate } from "react-router-dom";

export default function AdminRegistro() {
  const navigate = useNavigate();
  const existeUsuario = () => {
    let usuario = JSON.parse(window.localStorage.getItem("usuarioLogin"));
    if (usuario == null || usuario.tipo===1) {
      navigate("/login");
    }
  };

  useEffect(() => {
    existeUsuario();
  });

  return (
    <>
      <div className="min-h-screen flex flex-col items-center bg-shadow-blue">
        <Banner></Banner>
        <AdminFormModificar></AdminFormModificar>
        <StickyFooter></StickyFooter>
      </div>
    </>
  );
}
