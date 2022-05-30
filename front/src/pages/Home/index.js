import React from "react";
import StickyFooter from "../../components/StickyFooter/index";
import Multimedia from "../../components/Multimedia/index";
import Explicacion from "../../components/Explicacion/index";
import Banner from "../../components/Banner/index";
import Imagenes from "../../components/Imagenes/index";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <div className="bg-shadow-blue flex flex-col items-center space-y-24">
        <Banner></Banner>
        <Imagenes></Imagenes>
        <Explicacion></Explicacion>
        <Multimedia></Multimedia>
        <Link
          className="text-6xl text-white bg-paradise-pink rounded-xl hover:bg-blush active:bg-blush focus:outline-none p-3"
          to="/login"
        >
          Para logearte pincha aqui
        </Link>
        <StickyFooter></StickyFooter>
      </div>
    </>
  );
}
