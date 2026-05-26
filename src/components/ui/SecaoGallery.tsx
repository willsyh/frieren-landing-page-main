import { motion } from "framer-motion";
import AssimetricPhotos from "./AssimetricPhotos";
import { useTranslation } from 'react-i18next';

export default function SecaoGaleria() {
  const { t } = useTranslation();
  const letters = t("Gallery").split("");

  return (
    <>
      <div className="w-full min-h-screen bg-black flex flex-col text-center pt-20 md:pt-25">
        <div className="relative">
          {/* Background ungu di belakang tulisan */}
          <div className="absolute inset-0 flex justify-center items-end">
            <div className="w-[150px] md:w-[255px] h-[40px] md:h-[65px] bg-gradient-to-t from-purple-600/30 to-transparent rounded-lg blur-sm"></div>
          </div>

          <h2 id="gallery" className="text-amber-50 text-4xl md:text-7xl font-bold text-center relative z-10">
            {letters.map((letter, i) => (
              <motion.span
                key={i}
                initial={{ y: -200, opacity: 0, filter: "blur(20px)" }}
                // Usa whileInView para animar quando o elemento está visível
                whileInView={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                transition={{
                  duration: 0.1,
                  delay: i * 0.1, // atraso progressivo
                  type: "spring",
                  stiffness: 20,
                }}
                // viewport uma vez para que a animação ocorra apenas na primeira vez
                viewport={{ once: true }}
              >
                {letter}
              </motion.span>
            ))}
          </h2>
        </div>

        <p className="text-white font-bold mt-2">@YooWill</p>
        <AssimetricPhotos />
      </div>
    </>
  );
}