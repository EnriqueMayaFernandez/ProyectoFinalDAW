import React from "react";
import StickyFooter from "../../components/StickyFooter/index";
import Multimedia from "../../components/Multimedia/index";
import Explicacion from "../../components/Explicacion/index";
import Banner from "../../components/Banner/index"

export default function Home() {
  return (
    <>
      <div className="flex flex-col items-center m-6 justify-between">
        <Banner></Banner>
        <Explicacion></Explicacion>
        <Multimedia></Multimedia>
        <StickyFooter></StickyFooter>
      </div>
    </>
  );
}
