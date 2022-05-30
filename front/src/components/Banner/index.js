import React from "react";
import "./index.css";
import logo from "../../images/logo.png"

export default function Explicacion() {
  return (
    <>
      <div className="min-h-screen w-full flex flex-col items-center text-center imagenFondo bg-cover">
        <div className="w-full h-1/5 flex flex-col items-center bg-space-cadet p-2 text-white text-4xl">
          Somos/TermoUP
          <img src={logo} alt="" className="h-32 rounded-lg mt-4 mb-4"></img>
        </div>
        
      </div>
    </>
  );
}
