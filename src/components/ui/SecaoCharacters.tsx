import { motion } from "framer-motion";
import CardCharacters from "./CardCharacters";
import { useTranslation } from 'react-i18next';

export default function SecaoCharacters() {
    const { t } = useTranslation();
    const letters = t("Characters").split("");

  return(<>
  <div className="bg-black gap-5 justify-center py-10">
    <div className="relative">
      {/* Background ungu di belakang tulisan */}
      <div className="absolute inset-0 flex justify-center items-end">
        <div className="w-[370px] h-[65px] bg-gradient-to-t from-purple-600/30 to-transparent rounded-lg blur-sm"></div>
      </div>
      
      <h2 id="characters" className="text-amber-50 text-7xl font-bold text-center relative z-10">
            {letters.map((letter, i) => (
              <motion.span
                key={i}
                initial={{ y: -200, opacity: 0, filter: "blur(20px)" }}
                whileInView={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                transition={{
                  duration: 0.1,
                  delay: i * 0.1, // atraso progressivo
                  type: "spring",
                  stiffness: 20,
                }}
                viewport={{ once: false }}
              >
                {letter}
              </motion.span>
            ))}
      </h2>
    </div>

    <div className="flex gap-3 justify-center py-20">
    <CardCharacters
      name="Frieren"
      description={t('FrierenDesc')}
      image="/Frierenfoto.jpeg"
      tags={["Mage, Elf, Adventurer"]}
    />
    <CardCharacters
      name="Fern"
      description={t('FernDesc')}
      image="/Fern.jpeg"
      tags={["Mage, Human, Adventurer"]}
    />
    <CardCharacters
      name="Stark"
      description={t('StarkDesc')}
      image="/Stark.jpeg"
      tags={["Warrior, Human, Adventurer"]}
    />
    </div>

  </div>
  </>)
}