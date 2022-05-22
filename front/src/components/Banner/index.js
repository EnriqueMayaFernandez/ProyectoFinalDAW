import React from "react";
import logo from "../../images/logo.png";
import "./index.css";

export default function Explicacion() {
  return (
    <>
      <div className="min-h-screen w-full flex flex-col items-center text-center bg-slate-200 imagenFondo bg-cover border-2 border-white ">
        <div className="w-full flex flex-col items-center bg-slate-500 border-black border rounded-md p-2">
          Titulo del banner<span>/Nombre de la empresa</span>
          <img src={logo} alt=""></img>
        </div>
      </div>
    </>
  );
}
