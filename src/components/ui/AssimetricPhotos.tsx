import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const PhotoRow = ({
  images,
  direction = "left",
  speed = 50, // pixels por segundo
}: {
  images: string[];
  direction?: "left" | "right";
  speed?: number;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [positions, setPositions] = useState<number[]>([]);

  // Inicializa a posição de cada image
  useEffect(() => {
    if (containerRef.current) {
      const width = containerRef.current.offsetWidth;
      setContainerWidth(width);

      const isMobile = window.innerWidth < 768;
      const imgWidth = isMobile ? 160 : 256;
      const margin = 16;
      const initialPositions = images.map((_, i) => i * (imgWidth + margin));
      setPositions(initialPositions);
    }
  }, [images]);

  // Animação contínua
  useEffect(() => {
    const interval = setInterval(() => {
      setPositions((prev) =>
        prev.map((pos) => {
          let newPos = direction === "left" ? pos - speed : pos + speed;
          // Use a variable width based on screen size for resetting position
          const imgWidth = window.innerWidth < 768 ? 160 : 256;
          if (direction === "left" && newPos < -imgWidth)
            newPos = containerWidth;
          if (direction === "right" && newPos > containerWidth)
            newPos = -imgWidth;
          return newPos;
        }),
      );
    }, 16);

    return () => clearInterval(interval);
  }, [containerWidth, direction, speed]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-40 md:h-70 overflow-hidden mt-6"
    >
      {images.map((src, i) => (
        <motion.img
          key={i}
          src={src}
          initial={{ y: 50, opacity: 0, filter: "blur(8px)" }}
          alt={`Gallery image ${i}`}
          whileInView={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          className="w-40 md:w-60 h-full object-cover rounded-lg shadow-md absolute top-0"
          style={{ left: positions[i] }}
          transition={{
            delay: i * 0.1,
            duration: 0.6,
            type: "spring",
          }}
          viewport={{ once: false, amount: 0.2 }}
        />
      ))}
    </div>
  );
};

export default function AssimetricPhotosGallery() {
  const imagesRow1 = [
    "image01.jpeg",
    "image02.jpeg",
    "image03.jpeg",
    "image04.jpeg",
    "image05.jpeg",
    "image06.jpeg",
    "image07.jpeg",
    "image08.jpeg",
  ];

  const imagesRow2 = [
    "image09.jpeg",
    "image10.jpeg",
    "image11.jpeg",
    "image12.jpeg",
    "image13.jpeg",
    "image14.jpeg",
    "image15.jpeg",
    "image16.jpeg",
  ];

  return (
    <div className=" py-12 overflow-hidden">
      <div className="mb-8">
        <PhotoRow images={imagesRow1} direction="right" speed={0.4} />
      </div>
      <div>
        <PhotoRow images={imagesRow2} direction="left" speed={0.4} />
      </div>
    </div>
  );
}
