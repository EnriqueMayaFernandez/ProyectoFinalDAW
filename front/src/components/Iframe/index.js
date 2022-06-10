import React, { useState, useEffect, Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Iframe() {
  const [usuario, setUsuario] = useState(
    JSON.parse(window.localStorage.getItem("usuarioLogin"))
  );

  const logout = () => {
    window.localStorage.removeItem("usuarioLogin");
  };

  return (
    <div className="min-h-screen border w-3/4">
      <header className="sticky top-0 z-50 rounded-sm">
        <div className="bg-space-cadet p-4 grid grid-cols-5 rounded-sm">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div className="justify-self-end text-white">
            <Menu as="div" className=" relative inline-block text-left">
              <div>
                <Menu.Button className="inline-flex justify-center w-full rounded-md border bg-paradise-pink shadow-sm px-4 py-2 bg-white text-sm font-medium">
                  Hola {usuario && usuario.nombreUsuario}
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
      </header>
      <div className="grid grid-rows">
        <div className="m-auto border-2 border-space-cadet rounded-md bg-space-cadet p-1 mt-6">
          <iframe
            src="http://192.168.103.1:1880/ui"
            height="680"
            width="380"
            title="Iframe Nodered"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
