import React, { useState, useEffect, Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import Usuario from "../../components/Usuario/index";
import getUsuarios from "../../services/getUsuarios";
import { useNavigate } from "react-router-dom";
import deleteUsuario from "../../services/deleteUsuarios";
import { Link } from "react-router-dom";
import "./index.css";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ListaUsuarios() {
  const [usuarios, setUsuarios] = useState("");
  const [usuario, setUsuario] = useState(
    JSON.parse(window.localStorage.getItem("usuarioLogin"))
  );
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      setUsuarios(await getUsuarios());
    })();
  }, []);

  const modificar = (usuario) => {
    window.localStorage.setItem("usuarioModificar", JSON.stringify(usuario));
    navigate("/adminModificar");
    //crear objeto usuarioModificar
  };

  const logout = () => {
    window.localStorage.removeItem("usuarioLogin")
  }

  const borrar = (id) => {
    const usuariosNuevos = [];
    usuarios.forEach((usuario) => {
      if (usuario._id !== id) {
        usuariosNuevos.push(usuario);
      }
    });
    setUsuarios(usuariosNuevos);
    deleteUsuario(id);
  };

  

  return (
    <div className="border w-3/4 min-h-screen mt-12 mb-12">
      <header className="sticky top-0 z-50 rounded-sm">
        <div className="bg-space-cadet p-4 grid grid-cols-5 rounded-sm">
          <Link
            to="/adminRegistro"
            className="inline-flex justify-center w-full rounded-md border bg-paradise-pink shadow-sm px-4 py-2 bg-white text-sm font-medium text-white"
          >
            Añadir Usuario
          </Link>
          <div></div>
          <div></div>
          <div></div>
          <div className="justify-self-end text-white">
            <Menu as="div" className=" relative inline-block text-left">
              <div>
                <Menu.Button className="inline-flex justify-center w-full rounded-md border bg-paradise-pink shadow-sm px-4 py-2 bg-white text-sm font-medium">
                  Hola Admin {usuario && usuario.nombreUsuario}
                  <ChevronDownIcon
                    className="-mr-1 ml-2 h-5 w-5"
                    aria-hidden="true"
                  />
                </Menu.Button>
              </div>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="bg-paradise-pink border border-white text-center origin-top-right absolute right-0 mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          to="/login"
                          onClick={logout}
                          className={classNames(
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700",
                            "block px-4 py-2 text-sm"
                          )}
                        >
                          Salir
                        </Link>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
        <div>
          <div className="bg-shadow-blue grid grid-cols-5 gap-4 text-center p-1 pr-4 rounded-sm">
            <div>Nombre Usuario</div>
            <div>Correo</div>
            <div>Tipo</div>
            <div></div>
            <div></div>
          </div>
        </div>
      </header>
      <div className="space-y-6 bg-alice-blue divide-y-2 pr-3 pl-3 pb-3">
        {usuarios &&
          usuarios.map((usuario) =>
            usuario.nombreUsuario !== "SuperAdmin" && usuario.nombreUsuario!==JSON.parse(window.localStorage.getItem("usuarioLogin")).nombreUsuario ? (
              <Usuario
                key={usuario._id}
                id={usuario._id}
                nombreUsuario={usuario.nombreUsuario}
                clave={usuario.clave}
                tipo={usuario.tipo}
                correo={usuario.correo}
                funcionBorrar={borrar}
                funcionModificar={modificar}
                usuario={usuario}
              />
            ) : null
          )}
      </div>
    </div>
  );
}
