import React from "react";
import enrique from "../../images/enrique.jpeg";
import joselu from "../../images/joselu.jpeg";
import victor from "../../images/victor.jpeg";

export default function Imagenes() {
  return (
    <div className="w-full items-center grid grid-cols-5">
      <div></div>
      <div className="w-3/4 m-auto">
        <img
          src={enrique}
          alt="imagen creador 1"
          className="rounded-full border-2 border-space-cadet shadow-2xl"
        />
      </div>
      <div className="w-3/4 m-auto">
        <img
          src={joselu}
          alt="imagen creador 2"
          className=" rounded-full border-2 border-space-cadet shadow-2xl"
        />
      </div>
      <div className="w-3/4 m-auto">
        <img
          src={victor}
          alt="imagen creador 3"
          className=" rounded-full border-2 border-space-cadet shadow-2xl"
        />
      </div>
      <div></div>
    </div>
  );
}
