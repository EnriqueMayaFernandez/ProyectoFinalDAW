import React, { useState, useEffect } from "react";
import Usuario from "../../components/Usuario/index";
import getUsuarios from "../../services/getUsuarios";
import { useNavigate } from "react-router-dom";
import deleteUsuario from "../../services/deleteUsuarios"
import { Link } from "react-router-dom";

export default function ListaUsuarios() {
  
  const [usuarios, setUsuarios] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    (async()=>{
      setUsuarios(await getUsuarios())
    })();
  }, []);


  const modificar = () => {
    navigate("/adminModificar");
    //crear objeto usuarioModificar
  };

  const borrar = (id) => {
    const usuariosNuevos=[];
    usuarios.forEach(usuario => {
      if(usuario._id!==id){
        usuariosNuevos.push(usuario)
      }
    });
    setUsuarios(usuariosNuevos)
    deleteUsuario(id)
  }

  return (
    <div className="border w-3/4">
      <header className="sticky top-0 z-50 rounded-sm">
          <div className="bg-slate-500 p-4 grid grid-cols-5 rounded-sm">
            <Link to="/adminRegistro" className="justify-self-start bg-rose-500 rounded-sm shadow-md p-1 text-center">
              Añadir Usuario
            </Link>
            <Link to="/login" className="bg-rose-500 rounded-sm shadow-md p-1 text-center">
              Salir
            </Link>
            <div></div>
            <div></div>
            <div className="justify-self-end">Hola Admin</div>
          </div>
          <div>
            <div className="bg-slate-400 grid grid-cols-5 gap-4 text-center p-1 pr-4 rounded-sm">
              <div>Nombre Usuario</div>
              <div>Correo</div>
              <div>Tipo</div>
              <div></div>
              <div></div>
            </div>
          </div>
        </header>
      <div className="space-y-6 pt-3 bg-white pr-3">
          {usuarios &&
            usuarios.map((usuario) => ( usuario.nombreUsuario!=="Admin" ? 
              <Usuario
                key={usuario._id}
                id={usuario._id}
                nombreUsuario={usuario.nombreUsuario}
                clave={usuario.clave}
                tipo={usuario.tipo}
                correo={usuario.correo}
                funcionBorrar={borrar}
                funcionModificar={modificar}
              /> : null
            ))}
      </div>
    </div>
  );
}
