import React, { useEffect, useState } from "react";

export default function Usuario({
  id,
  nombreUsuario,
  clave,
  tipo,
  correo,
  funcionBorrar,
  funcionModificar,
  usuario
}) {
  const [tipoUser, setTipoUser] = useState();

  useEffect(() => {
    if (tipo === 0) {
      setTipoUser("Admin");
    } else {
      setTipoUser("Normal");
    }
  }, []);

  return (
    <div className="grid grid-cols-5 gap-4 text-center">
      <div>{nombreUsuario}</div>
      <div>{correo}</div>
      <div>{tipoUser}</div>
      <button
        onClick={() => {
          funcionBorrar(id);
        }}
        className="bg-red-500 rounded p-1 shadow-md"
      >
        Borrar
      </button>
      <button
        onClick={() => {
          funcionModificar(usuario);
        }}
        className="bg-green-500 rounded p-1 shadow-md"
      >
        Modificar
      </button>
    </div>
  );
}
