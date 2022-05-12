import React from "react";

export default function FormRegister() {
  const onSubmit = () => {};
  return (
    <>
      <form onSubmit={onSubmit} className="m-4">
        <div className="m-2">
          Inserta nombre de usuario:
          <input type="text" />
        </div>
        <div className="m-2">
          Inserta la clave:
          <input type="text" />
        </div>
        <div className="m-2">
          Repita la clave:
          <input type="text" />
        </div>
        <input type="submit" value="Registrarse" className="bg-red-500 m-6"></input>
        <button className="bg-red-500 ml-6">Volver</button>
      </form>
    </>
  );
}
