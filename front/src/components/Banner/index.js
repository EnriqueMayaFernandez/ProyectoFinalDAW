import React from "react";
import logo from "../../images/logo.png";
import "./index.css";

export default function Explicacion() {
  return (
    <>
      <div className="min-h-screen w-full flex flex-col items-center text-center imagenFondo bg-cover">
        <div className="w-full flex flex-col items-center bg-space-cadet p-2 text-white">
          Titulo del banner<span>/Nombre de la empresa</span>
          <img src={logo} alt=""></img>
        </div>
      </div>
    </>
  );
}
