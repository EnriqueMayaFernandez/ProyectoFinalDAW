import React, { useEffect } from "react";
import FormLogin from "../../components/FormLogin/index";

export default function Login() {
  useEffect(() => {
    localStorage.removeItem("usuarioLogin");
  }, []);
  return (
    <>
      <div className="min-h-screen flex flex-col items-center bg-shadow-blue">
        <FormLogin></FormLogin>
      </div>
    </>
  );
}
