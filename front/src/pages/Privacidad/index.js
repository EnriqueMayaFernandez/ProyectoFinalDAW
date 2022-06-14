import React, {useEffect} from "react";
import StickyFooter from "../../components/StickyFooter/index";
import TextoPrivacidad from "../../components/TextoPrivacidad/index";
import Banner from "../../components/Banner/index";
import { Link } from "react-router-dom";


export default function Home() {

  useEffect(() => {
    localStorage.removeItem("usuarioLogin");
  }, []);

  return (
    <>
      <div className="bg-shadow-blue flex flex-col items-center space-y-24">
        <Banner></Banner>
        <Link
          className="text-5xl text-white bg-paradise-pink rounded-xl hover:bg-blush active:bg-blush focus:outline-none p-3"
          to="/registro"
        >Volver</Link>
        <TextoPrivacidad></TextoPrivacidad>
        <StickyFooter></StickyFooter>
      </div>
    </>
  );
}