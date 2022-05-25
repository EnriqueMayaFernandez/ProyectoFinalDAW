import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import getUsuario from "../../services/getUsuario";

export default function FormLogin() {
  const navigate = useNavigate();
  const [usuario,setUsuario]=useState(null);

  async function recibirUsuario(values) {
    let  usuario  = await getUsuario(values.nombreUsuario, values.clave);
    console.log(usuario.tipo)
    if (usuario !== null) {
      if (usuario.tipo == "0") {
        navigate("/admin");
      } else {
        alert("Nos vamos a nodered");
        //navigate("/nodered");
      }
    }
  }

  const volver = () => {
    navigate("/");
  };

  return (
    <Formik
      initialValues={{
        nombreUsuario: "",
        clave: "",
      }}
      validate={(values) => {
        let errores = {};

        //Validacion
        if (!values.nombreUsuario) {
          errores.nombreUsuario = "Por favor ingrese un nombre de usuario";
        }

        if (!values.clave) {
          errores.clave = "Por favor ingrese una contraseña";
          // } else if(!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(values.correo)){
          //     errores.email = 'El correo solo puede contener letras y espacios'
        }

        return errores;
      }}
      onSubmit={(values, { resetForm }) => {
        recibirUsuario(values)
        resetForm();
      }}
    >
      {({ errors }) => (
        <div className="w-2/5 bg-slate-100 p-12 rounded-lg border-black border-2 mt-24">
          <Form className="space-y-2.5 flex flex-col items-center">
            <div className="w-full flex flex-row">
              <label
                htmlFor="nombreUsuario"
                className="text-center bg-slate-400 w-1/4 rounded-l-lg p-1 shadow-md"
              >
                Nombre Usuario
              </label>
              <Field
                type="text"
                id="nombreUsuario"
                name="nombreUsuario"
                placeholder="Manolito14"
                className="bg-slate-200 w-3/4 rounded-r-lg border-black p-1 shadow-md"
              />
            </div>
            <ErrorMessage
              name="nombreUsuario"
              component={() => (
                <div className="text-red-600">{errors.nombreUsuario}</div>
              )}
            />

            <div className="w-full flex flex-row">
              <label
                htmlFor="clave"
                className="text-center bg-slate-400 w-3/12 rounded-l-lg p-1 shadow-md"
              >
                Contraseña
              </label>
              <Field
                type="password"
                id="clave"
                name="clave"
                placeholder=""
                className="bg-slate-200 w-9/12 rounded-r-lg border-black w-3/4 p-1 shadow-md"
              />
            </div>
            <ErrorMessage
              name="clave"
              component={() => (
                <div className="text-red-600">{errors.clave}</div>
              )}
            />
            <div className="w-full flex flex-row">
              <button
                type="submit"
                className="bg-sky-300 w-full rounded p-1 shadow-md mt-6"
              >
                Login
              </button>
            </div>
            <div className="w-full flex flex-row">
              <button
                type="button"
                onClick={volver}
                className="bg-sky-300 w-full rounded p-1 shadow-md"
              >
                Volver
              </button>
            </div>
            <div className="w-full flex flex-row">
              <Link to="/registro" className="m-auto">
                Registrarse
              </Link>
            </div>
            <div className="w-full flex flex-row"></div>
          </Form>
        </div>
      )}
    </Formik>
  );
}
