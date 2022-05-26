import React, { useEffect, useState } from "react";
import Popup from "reactjs-popup";
import "./index.css";

export default function Usuario({
  id,
  nombreUsuario,
  clave,
  tipo,
  correo,
  funcionBorrar,
  funcionModificar,
  usuario,
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
    <div className="grid grid-cols-5 gap-4 text-center pt-4">
      <div>{nombreUsuario}</div>
      <div>{correo}</div>
      <div>{tipoUser}</div>
      <Popup
        trigger={
          <button className="w-3/4 bg-red rounded p-1 shadow-md">Borrar</button>
        }
        modal
        nested
      >
        {(close) => (
          <div className="modal bg-shadow-blue border-shadow-blue border rounded-lg">
            <button className="close" onClick={close}>
              &times;
            </button>
            <div className="header bg-space-cadet text-white rounded-t-lg">
              {" "}
              Aviso{" "}
            </div>
            <div className="content">
              {" "}
              ¿Esta seguro que quiere borrar el usuario?
            </div>
            <div className="actions">
              <button
                onClick={() => {
                  funcionBorrar(id);
                }}
                className="button  bg-paradise-pink rounded-md mr-1 p-1"
              >
                {" "}
                Aceptar
              </button>
              <button
                className="button bg-red rounded-md ml-1 p-1"
                onClick={() => {
                  close();
                }}
              >
                Cancelar
              </button>
            </div>
          </div>
        )}
      </Popup>
      <button
        onClick={() => {
          funcionModificar(usuario);
        }}
        className="w-3/4 bg-blue rounded p-1 shadow-md"
      >
        Modificar
      </button>
    </div>
  );
}
