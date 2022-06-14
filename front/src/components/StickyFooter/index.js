import React from "react";
import iconoTelefono from "../../images/iconoTelefono.png";
import iconoCasa from "../../images/iconoCasa.png";
import iconoCorreo from "../../images/iconoCorreo.png";

export default function Footer() {
  return (
    <div className="h-44 w-full bg-space-cadet text-center text-white grid grid-cols-3">
      <div className="flex align-middle m-auto">
        <span>
          <img src={iconoTelefono} alt="" className="w-9 bg-white rounded-md" />
        </span>
        <span className="ml-3">64780925</span>
      </div>
      <div className="flex align-middle m-auto">
        <span>
          <img src={iconoCorreo} alt="" className="w-9 bg-white rounded-md" />
        </span>
        <span className="ml-3"><a href="mailto:fernandez_sanchez.jose@tiernoparla.es?Subject=Información">fernandez_sanchez.jose@tiernoparla.es</a></span>
      </div>
      <div className="flex align-middle m-auto">
        <span>
          <img src={iconoCasa} alt="" className="w-9 bg-white rounded-md"  />
        </span>
        <span className="ml-3">Calle Tierno Galvan Nº12</span>
      </div>
    </div>
  );
}
