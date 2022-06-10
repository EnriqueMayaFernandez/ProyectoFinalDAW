import React, {useEffect} from "react";
import StickyFooter from "../../components/StickyFooter/index";
import TextoPrivacidad from "../../components/TextoPrivacidad/index";
import Banner from "../../components/Banner/index";
import { useNavigate } from "react-router-dom";


export default function Home() {
    const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("usuarioLogin");
  }, []);


  function volver(){
    navigate("/registro")
  }
  return (
    <>
      <div className="bg-shadow-blue flex flex-col items-center space-y-24">
        <Banner></Banner>
        <button className="bg-paradise-pink w-1/4 mt-2 rounded p-1 shadow-md" onClick={volver}> Volver</button>
        <TextoPrivacidad></TextoPrivacidad>
        <StickyFooter></StickyFooter>
      </div>
    </>
  );
}