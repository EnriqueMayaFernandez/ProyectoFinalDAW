import React, { useEffect } from "react";
import FormRegistro from "../../components/FormRegistro/index";
import StickyFooter from "../../components/StickyFooter/index";
import Banner from "../../components/Banner/index";

export default function Register() {
  useEffect(() => {
    localStorage.removeItem("usuarioLogin");
  }, []);
  return (
    <>
      <div className="min-h-screen flex flex-col items-center bg-shadow-blue">
        <Banner></Banner>
        <FormRegistro></FormRegistro>
        <StickyFooter></StickyFooter>
      </div>
    </>
  );
}
