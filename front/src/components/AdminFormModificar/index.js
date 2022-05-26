import React, { useState } from "react";
import putUsuarios from "../../services/putUsuarios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";

export default function FormRegister() {
  const [usuario, setUsuario] = useState(
    JSON.parse(window.localStorage.getItem("usuarioModificar"))
  );
  const navigate = useNavigate();

  const volver = () => {
    navigate("/admin");
  };

  console.log(usuario);
  return (
    <Formik
      initialValues={{
        nombreUsuario: usuario.nombreUsuario,
        clave: usuario.clave,
        claveRepetida: usuario.clave,
        tipo: usuario.tipo,
        correo: usuario.correo,
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
        console.log(values);
        putUsuarios(values, usuario._id);
        navigate("/admin");
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
                <div className="text-red-600">{errors.nombreUsuario}</div>
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
              component={() => (
                <div className="text-red-600">{errors.clave}</div>
              )}
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
                <div className="text-red-600">{errors.claveRepetida}</div>
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
              component={() => (
                <div className="text-red-600">{errors.correo}</div>
              )}
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
                Modificar Usuario
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
