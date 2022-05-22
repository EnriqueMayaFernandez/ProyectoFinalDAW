import React from "react";
import { useNavigate } from "react-router-dom";

export default function Usuario() {

    const navigate = useNavigate();

    const modificar = () => {
      navigate("/adminModificar");
    };

  return (
    <>
      <div className="grid grid-cols-5 gap-4 text-center">
        <div>Monolito</div>
        <div>Manolito@gmail.com</div>
        <div>Normal</div>
        <button className="bg-red-500 rounded p-1 shadow-md">Borrar</button>
        <button onClick={modificar} className="bg-green-500 rounded p-1 shadow-md">Modificar</button>
      </div>
    </>
  );
}
