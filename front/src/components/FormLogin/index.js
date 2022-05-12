import React from "react";

export default function FormLogin() {
  const onSubmit = () => {
    
  };

  return (
    <>
      <form onSubmit={onSubmit} className="m-4">
        <div className="m-2">
          Nombre de Usuario:
          <input type="text" />
        </div>
        <div className="m-2">
          Clave:
          <input type="text" />
        </div>
        <div className="">
          <input type="submit" value="Login" className="bg-red-500 m-6" />
          <button className="bg-red-500 ml-6">Volver</button>
        </div>
      </form>
    </>
  );
}
