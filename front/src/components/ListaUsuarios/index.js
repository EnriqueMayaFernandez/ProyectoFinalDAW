import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Usuario from "../../components/Usuario/index";

const INITIAL_PAGE = 0;

export default function ListaUsuarios({ listaUsuarios }) {
  const [loading, setLoading] = useState();
  const [usuarios, setUsuarios] = useState();
  const [currentPage, setCurrentPage] = useState(INITIAL_PAGE);

  useEffect(() => {
    setUsuarios(listaUsuarios);
  }, []);

  useEffect(() => {}, [currentPage]);

  return (
    <div>
      <header class="sticky top-0 z-50 rounded-sm">
        <div class="bg-slate-500 p-1 grid grid-cols-5 rounded-sm">
          <Link to="/adminRegistro" className="justify-self-start">
            Añadir Usuario
          </Link>
          <Link to="/login" className="">
            Salir
          </Link>
          <div></div>
          <div></div>
          <div className="justify-self-end">Hola Admin</div>
        </div>
        <div>
          <div className="bg-slate-400 grid grid-cols-5 gap-4 text-center p-1 rounded-sm">
            <div>Nombre Usuario</div>
            <div>Correo</div>
            <div>Tipo</div>
            <div></div>
            <div></div>
          </div>
        </div>
      </header>
      <div className="space-y-6 border">
        <div className="space-y-6 pt-2">
          <Usuario></Usuario>
          <Usuario></Usuario>
          <Usuario></Usuario>
          <Usuario></Usuario>
          <Usuario></Usuario>
          <Usuario></Usuario>
          <Usuario></Usuario>
          <Usuario></Usuario>
          <Usuario></Usuario>
          <Usuario></Usuario>
          <Usuario></Usuario>
          <Usuario></Usuario>
          <Usuario></Usuario>
          <Usuario></Usuario>
          <Usuario></Usuario>
          <Usuario></Usuario>
          <Usuario></Usuario>
          <Usuario></Usuario>
          <Usuario></Usuario>
          <Usuario></Usuario>
          <Usuario></Usuario>
          <Usuario></Usuario>
          <Usuario></Usuario>
          <Usuario></Usuario>
          <Usuario></Usuario>
          <Usuario></Usuario>
          <Usuario></Usuario>
          <Usuario></Usuario>
          <Usuario></Usuario>
          <Usuario></Usuario>
          <Usuario></Usuario>
          <Usuario></Usuario>
          <Usuario></Usuario>
          <Usuario></Usuario>
          <Usuario></Usuario>
          <Usuario></Usuario>
          <Usuario></Usuario>
          <Usuario></Usuario>
          <Usuario></Usuario>
          <Usuario></Usuario>
          <Usuario></Usuario>
          <Usuario></Usuario>
          <Usuario></Usuario>
          <Usuario></Usuario>
          <Usuario></Usuario>
          <Usuario></Usuario>
          <Usuario></Usuario>
          <Usuario></Usuario>
          <Usuario></Usuario>
          <Usuario></Usuario>
          <Usuario></Usuario>
          <Usuario></Usuario>
          <Usuario></Usuario>
          <Usuario></Usuario>
          <Usuario></Usuario>
          <Usuario></Usuario>
          <Usuario></Usuario>
          <Usuario></Usuario>
          <Usuario></Usuario>
          <Usuario></Usuario>
          <Usuario></Usuario>
          <Usuario></Usuario>
          <Usuario></Usuario>
          <Usuario></Usuario>
          <Usuario></Usuario>
          <Usuario></Usuario>
          <Usuario></Usuario>
          <Usuario></Usuario>
          <Usuario></Usuario>
          <Usuario></Usuario>
          <Usuario></Usuario>
          <Usuario></Usuario>
          <Usuario></Usuario>
          <Usuario></Usuario>
          <Usuario></Usuario>
          <Usuario></Usuario>
          <Usuario></Usuario>
          <Usuario></Usuario>
          <Usuario></Usuario>
          <Usuario></Usuario>
          <Usuario></Usuario>
          <Usuario></Usuario>
          <Usuario></Usuario>
          <Usuario></Usuario>
          <Usuario></Usuario>
          <Usuario></Usuario>
          <Usuario></Usuario>
          <Usuario></Usuario>
          <Usuario></Usuario>
          <Usuario></Usuario>
          <Usuario></Usuario>
          <Usuario></Usuario>
          <Usuario></Usuario>
          <Usuario></Usuario>
          <Usuario></Usuario>
          <Usuario></Usuario>
          <Usuario></Usuario>
          <Usuario></Usuario>
          <Usuario></Usuario>
          <Usuario></Usuario>
          <Usuario></Usuario>
          <Usuario></Usuario>
          <Usuario></Usuario>
          <Usuario></Usuario>
          <Usuario></Usuario>
          <Usuario></Usuario>
          <Usuario></Usuario>
          <Usuario></Usuario>
          <Usuario></Usuario>
          <Usuario></Usuario>
          <Usuario></Usuario>
          <Usuario></Usuario>
          <Usuario></Usuario>
          <Usuario></Usuario>
          <Usuario></Usuario>
          <Usuario></Usuario>
          <Usuario></Usuario>
          <Usuario></Usuario>
          <Usuario></Usuario>
          <Usuario></Usuario>
          <Usuario></Usuario>
          <Usuario></Usuario>
          <Usuario></Usuario>
          <Usuario></Usuario>
          <Usuario></Usuario>
          <Usuario></Usuario>
          <Usuario></Usuario>
          <Usuario></Usuario>
          <Usuario></Usuario>
          <Usuario></Usuario>
          <Usuario></Usuario>
          <Usuario></Usuario>
          <Usuario></Usuario>
          <Usuario></Usuario>
          <Usuario></Usuario>
          <Usuario></Usuario>
          <Usuario></Usuario>
          <Usuario></Usuario>
          <Usuario></Usuario>
          <Usuario></Usuario>
          <Usuario></Usuario>
          <Usuario></Usuario>
          <Usuario></Usuario>
          <Usuario></Usuario>
          <Usuario></Usuario>
          <Usuario></Usuario>
          <Usuario></Usuario>
          <Usuario></Usuario>
          <Usuario></Usuario>
          <Usuario></Usuario>
          <Usuario></Usuario>
          <Usuario></Usuario>
          <Usuario></Usuario>
          <Usuario></Usuario>
          <Usuario></Usuario>
          <Usuario></Usuario>
          <Usuario></Usuario>
          <Usuario></Usuario>
          <Usuario></Usuario>
          <Usuario></Usuario>
        </div>
      </div>
    </div>
  );
}
