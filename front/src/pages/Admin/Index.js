import React from "react";
import ListaUsuarios from "../../components/ListaUsuarios/index"

export default function Admin() {

    let {usuarios}="";//getUsuarios();

  return (
    <>
      <div className="flex flex-col items-center justify-items-center m-6">
        <ListaUsuarios usuarios={usuarios}></ListaUsuarios>
      </div>
    </>
  );
}