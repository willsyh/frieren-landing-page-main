"use client";
import { motion } from "framer-motion";

export default function Banner() {
  const letters = "Frieren".split("");

  return (
    <div className="flex-1 relative h-[60vh] md:h-full overflow-hidden flex flex-col justify-center items-center pt-20 md:pt-0">
      {/* Gradiente de fundo escuro para a image */}
      <div className="absolute bottom-0 left-0 w-full h-40 md:h-70 bg-gradient-to-t from-black/100 to-transparent pointer-events-none z-2" />

      {/* Animação da image */}
      <motion.img
        src="frieren.png"
        className="absolute w-[60%] md:w-[28%] bottom-0 left-[50%] -translate-x-1/2 md:translate-x-0 scale-150 md:scale-260 z-1"
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
      <h1 className="flex text-[6rem] sm:text-[12rem] md:text-[20rem] lg:text-[30rem] h-[40%] md:h-[60%] font-bold text-white text-shadow-black relative z-0">
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
       className="h-fit text-amber-50 w-full flex justify-center md:justify-between px-6 md:px-45 mt-10 md:mt-0 z-10">
        <motion.div 
        initial={{ y: -200, opacity: 0, filter: "blur(20px)" }}
            animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
            transition={{
              duration: 0.5,
              delay:  0.2, // atraso progressivo
              type: "spring",
              stiffness: 25,
            }}
        className="w-full md:w-100 text-sm md:text-lg h-fit rounded-2xl md:rounded-4xl backdrop-blur-md p-4 bg-black/30 border border-white/10"
        >
          <span className="font-bold">Frieren, the Reaper</span> is a former member of a group of adventurers led by the hero Himmel, who defeated the Demon King and restored harmony to the world after a ten-year journey.
        </motion.div>
      </div>
    </div>
  );
}