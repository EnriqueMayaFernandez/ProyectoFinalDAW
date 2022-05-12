import React from "react";
import logo from '../../images/logo.png';
import "./index.css"

export default function Explicacion() {
  return (
    <>
      <div className="min-h-screen">
        <div>
            Titulo del banner<span>/Nombre de la empresa</span>
        </div>
        <img src={logo}></img>
      </div>
    </>
  );
}