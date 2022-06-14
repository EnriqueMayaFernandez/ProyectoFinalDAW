import React, { useEffect } from "react";
import FormLogin from "../../components/FormLogin/index";
import StickyFooter from "../../components/StickyFooter/index";
import Banner from "../../components/Banner/index";

export default function Login() {
  useEffect(() => {
    localStorage.removeItem("usuarioLogin");
  }, []);
  return (
    <>
      <div className="flex flex-col items-center bg-shadow-blue">
        <Banner></Banner>
        <FormLogin></FormLogin>
        <StickyFooter></StickyFooter>
      </div>
    </>
  );
}
