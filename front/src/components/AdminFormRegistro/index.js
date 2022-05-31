import React, { useState } from "react";
import PostUsuarios from "../../services/postUsuarios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";

export default function FormRegister() {
  const navigate = useNavigate();

  const volver = () => {
    navigate("/admin");
  };

  return (
    <Formik
      initialValues={{
        nombreUsuario: "",
        clave: "",
        claveRepetida: "",
        tipo: "0",
        correo: "",
      }}
      validate={(values) => {
        let errores = {};

        //Validacion
        if (!values.nombreUsuario) {
          errores.nombreUsuario = "Por favor ingrese un nombre de usuario";
        } else if (values.nombreUsuario.length > 25) {
          errores.nombreUsuario =
            "El nombre del usuario no puede ser mayor a 25 caracteres";
        }

        if (!values.clave) {
          errores.clave = "Por favor ingrese una contraseña";
          // } else if(!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(values.correo)){
          //     errores.email = 'El correo solo puede contener letras y espacios'
        } else if (values.clave !== values.claveRepetida) {
          errores.clave = "Las claves deben ser iguales";
        }

        if (!values.clave) {
          errores.claveRepetida = "Por favor ingrese la contraseña otra vez";
        } else if (values.clave !== values.claveRepetida) {
          errores.claveRepetida = "Las claves deben ser iguales";
        }

        if (!values.correo) {
          errores.correo = "Por favor ingrese un correo";
        }

        return errores;
      }}
      onSubmit={(values, { resetForm }) => {
        resetForm();
        PostUsuarios(values);
        let navegar = JSON.parse(window.localStorage.getItem("navegar"));
        if( navegar === 1 ){
          navigate("/admin");
        }
      }}
    >
      {({ errors }) => (
        <div className="w-3/6 bg-white p-12 rounded-lg border-black border-2 mt-24">
          <Form className="formulario space-y-2.5 flex flex-col">
            <div className="w-full flex flex-row">
              <label
                htmlFor="nombreUsuario"
                className="text-center bg-blush w-1/4 rounded-l-lg p-1 shadow-md"
              >
                Nombre Usuario
              </label>
              <Field
                type="text"
                id="nombreUsuario"
                name="nombreUsuario"
                placeholder="Manolito14"
                className="bg-alice-blue w-3/4 rounded-r-lg border-black p-1 shadow-md"
              />
            </div>
            <ErrorMessage
              name="nombreUsuario"
              component={() => (
                <div className="text-red">{errors.nombreUsuario}</div>
              )}
            />
            <div className="w-full flex flex-row">
              <label
                htmlFor="clave"
                className="text-center bg-blush w-3/12 rounded-l-lg p-1 shadow-md"
              >
                Contraseña
              </label>
              <Field
                type="password"
                id="clave"
                name="clave"
                placeholder=""
                className="bg-alice-blue w-9/12 rounded-r-lg border-black w-3/4 p-1 shadow-md"
              />
            </div>
            <ErrorMessage
              name="clave"
              component={() => <div className="text-red">{errors.clave}</div>}
            />
            <div className="w-full flex flex-row">
              <label
                htmlFor="claveRepetida"
                className="text-center bg-blush w-3/12 rounded-l-lg p-1 shadow-md"
              >
                Repita la Contraseña
              </label>
              <Field
                type="password"
                id="claveRepetida"
                name="claveRepetida"
                placeholder=""
                className="bg-alice-blue w-9/12 rounded-r-lg border-black w-3/4 p-1 shadow-md"
              />
            </div>
            <ErrorMessage
              name="claveRepetida"
              component={() => (
                <div className="text-red">{errors.claveRepetida}</div>
              )}
            />
            <div className="w-full flex flex-row">
              <label
                htmlFor="correo"
                className="text-center bg-blush w-3/12 rounded-l-lg p-1 shadow-md"
              >
                Correo
              </label>
              <Field
                type="text"
                id="correo"
                name="correo"
                placeholder=""
                className="bg-alice-blue w-9/12 rounded-r-lg border-black w-3/4 p-1 shadow-md"
              />
            </div>
            <ErrorMessage
              name="correo"
              component={() => <div className="text-red">{errors.correo}</div>}
            />

            <div className="w-full flex flex-row">
              <label
                htmlFor="tipo"
                className="text-center bg-blush w-3/12 rounded-l-lg p-1 shadow-md"
              >
                Tipo
              </label>
              <Field
                as="select"
                name="tipo"
                className="bg-alice-blue w-9/12 rounded-r-lg border-black w-3/4 p-1 shadow-md"
              >
                <option value="0">Admin</option>
                <option value="1">Normal</option>
              </Field>
            </div>

            <div>
              <button
                type="submit"
                className="bg-paradise-pink w-full mt-2 rounded p-1 shadow-md"
              >
                Insertar Usuario
              </button>
              <button
                type="button"
                onClick={volver}
                className="bg-paradise-pink w-full mt-2 rounded p-1 shadow-md"
              >
                Volver
              </button>
            </div>
          </Form>
        </div>
      )}
    </Formik>
  );
}
