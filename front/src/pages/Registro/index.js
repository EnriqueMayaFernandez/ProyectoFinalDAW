import React, { useEffect } from "react";
import FormRegistro from "../../components/FormRegistro/index";

export default function Register() {
  useEffect(() => {
    localStorage.removeItem("usuarioLogin");
  }, []);
  return (
    <>
      <div className="min-h-screen flex flex-col items-center bg-shadow-blue">
        <FormRegistro></FormRegistro>
      </div>
    </>
  );
}
