"use client";
import { motion } from "framer-motion";

export default function Banner() {
  const letters = "Frieren".split("");

  return (
    <div className="flex-1 relative h-full overflow-hidden flex flex-col justify-center items-center">
      {/* Gradiente de fundo escuro para a image */}
      <div className="absolute bottom-0 left-0 w-full h-70 bg-gradient-to-t from-black/100 to-transparent pointer-events-none z-2" />

      {/* Animação da image */}
      <motion.img
        src="frieren.png"
        className="absolute w-[28%] bottom-0 left-[50%] scale-260 z-1"
        initial={{ y: 200, opacity: 0, filter: "blur(20px)" }}
        animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
        transition={{
          duration: 0.4,
          delay: 3.5,
          type: "spring",
          stiffness: 20,
        }}
      />

      {/* Animação do texto */}
      <h1 className="flex text-[30rem] h-[60%] font-bold text-white text-shadow-black relative">
        {letters.map((letter, i) => (
          <motion.span
            key={i}
            initial={{ y: -200, opacity: 0, filter: "blur(20px)" }}
            animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
            transition={{
              duration: 0.5,
              delay: i * 0.2, // atraso progressivo
              type: "spring",
              stiffness: 10,
            }}
          >
            {letter}
          </motion.span>
        ))}
      </h1>

      

      <div
       className="h-full text-amber-50 w-full flex justify-between px-45 ">
        <motion.div 
        initial={{ y: -200, opacity: 0, filter: "blur(20px)" }}
            animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
            transition={{
              duration: 0.5,
              delay:  0.2, // atraso progressivo
              type: "spring",
              stiffness: 25,
            }}
        className="w-100 text-lg h-fit rounded-4xl backdrop-blur-md p-4"
        >
          <span className="font-bold">Frieren, the Reaper</span> is a former member of a group of adventurers led by the hero Himmel, who defeated the Demon King and restored harmony to the world after a ten-year journey.
        </motion.div>
      </div>
    </div>
  );
}