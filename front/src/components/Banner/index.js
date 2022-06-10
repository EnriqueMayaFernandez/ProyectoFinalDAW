import React from "react";
import "./index.css";
import imagen from "../../images/imagenBanner.png"

export default function Explicacion() {
  return (
    <>
      <div className="w-full flex flex-col items-center text-center imagenFondo bg-cover">

        <div className="w-full ">
                <img src={imagen} alt="Imagen fondo" className="w-full"/>
        </div>
      </div>
    </>
  );
}
