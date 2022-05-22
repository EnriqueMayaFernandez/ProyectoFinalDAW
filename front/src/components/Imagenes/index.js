import React from "react";
import enrique from "../../images/enrique.jpeg";
import joselu from "../../images/joselu.jpeg";
import victor from "../../images/victor.jpeg"

export default function Imagenes() {
  return (
        <div className="min-h-screen flex items-center space-x-24">
          <img src={enrique} alt="" className="w-72 rounded-full border-2 border-black" />
          <img src={joselu} alt="" className="w-72 rounded-full border-2 border-black"/>
          <img src={victor} alt="" className="w-72 rounded-full border-2 border-black"/>
      </div>
  );
}
