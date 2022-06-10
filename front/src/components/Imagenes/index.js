import React from "react";
import enrique from "../../images/enrique.jpeg";
import joselu from "../../images/joselu.jpeg";
import victor from "../../images/victor.jpeg";
import "./index.css";

export default function Imagenes() {
  return (
    <section className="bg-gray-900 h-screen flex justify-center items-center gap-x-16">
      <div className="w-[300px] h-[420px] bg-transparent cursor-pointer group perspective">
        <div className="relative preserve-3d group-hover:my-rotate-y-180 w-full h-full duration-1000">
          <div className="absolute backface-hidden w-full h-full">
            <img
              alt="Imagen Enrique"
              src={enrique}
              className="w-full h-full border-2 rounded-md"
            />
          </div>
          <div className="absolute my-rotate-y-180 backface-hidden w-full h-full bg-white overflow-hidden border-2 rounded-md">
            <div className="text-center flex flex-col items-center justify-center h-full text-black px-2 pb-24">
              <h1 className="text-3xl font-semibold">Enrique Maya Fernández</h1>
              <p className="mt-2">
                Soy un chico curioso al que siempre
                le gusta aprender cosas nuevas para crecer como persona y como
                un buen profesional dentro de este mundo tan interesante que es
                el de la tecnología
              </p>
              <p className="my-2 font-bold">Linkedin:</p>
              <p>
                <a
                  className="text-blue"
                  href="https://www.linkedin.com/in/enrique-maya-fernandez-4ab50019a/"
                >
                  https://www.linkedin.com/in/enrique-maya-fernandez-4ab50019a/
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-[350px] h-[420px] bg-transparent cursor-pointer group perspective">
        <div className="relative preserve-3d group-hover:my-rotate-y-180 w-full h-full duration-1000">
          <div className="absolute backface-hidden w-full h-full">
            <img
              alt="Imagen Joselu"
              src={joselu}
              className="w-full h-full border-2 rounded-md"
            />
          </div>
          <div className="absolute my-rotate-y-180 backface-hidden w-full h-full bg-white overflow-hidden border-2 rounded-md">
            <div className="text-center flex flex-col items-center justify-center h-full text-black px-2 pb-24">
              <h1 className="text-3xl font-semibold">
                Jose Luis Fernández Sánchez
              </h1>
              <p className="my-2 font-bold">Linkedin:</p>
              <p>
                <a
                  className="text-blue"
                  href="https://www.linkedin.com/in/jozzeludev/"
                >
                  https://www.linkedin.com/in/jozzeludev/
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-[300px] h-[420px] bg-transparent cursor-pointer group perspective">
        <div className="relative preserve-3d group-hover:my-rotate-y-180 w-full h-full duration-1000">
          <div className="absolute backface-hidden w-full h-full">
            <img
              alt="Imagen Victor"
              src={victor}
              className="w-full h-full border-2 rounded-md"
            />
          </div>
          <div className="absolute my-rotate-y-180 backface-hidden w-full h-full bg-white overflow-hidden border-2 rounded-md">
            <div className="text-center flex flex-col items-center justify-center h-full text-black px-2 pb-24">
              <h1 className="text-3xl font-semibold">Víctor Álvarez Ávila</h1>
              <p className="my-2 font-bold">Linkedin:</p>
              <p>
                <a
                  className="text-blue"
                  href="https://www.linkedin.com/in/victor-alvavil"
                >
                  https://www.linkedin.com/in/victor-alvavil
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
