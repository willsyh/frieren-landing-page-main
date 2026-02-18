
interface CardCharactersProps {
  name: string;
  description: string;
  image: string;
  tags?: string[]; // Opcional
}

export default function CardCharacters({
  name,
  description,
  image,
  tags = [],
}: CardCharactersProps) {
  return (
    <div className="max-w-xs">
      <div
  className="relative bg-black border border-gray-700 rounded-xl overflow-hidden hover:scale-105 transition-transform duration-300"
  style={{
    boxShadow: "inset 0 -10px 15px -5px rgba(100, 22, 245, 0.6)",
  }}
>
        {/* Image do personagem */}
        <img
          src={image}
          alt="Characters"
          className="w-full h-64 object-cover rounded-t-xl"
        />

        {/* Informações do personagem */}
        <div className="p-4">
          <h2 className="text-xl font-bold text-white">{name}</h2>
          <p className="text-white mt-1 text-sm">
            {description}
          </p>

          {/* Status ou Tags */}
          <div className="mt-3 flex gap-2">
            {tags.map((tag) => 
            <span className="text-xs bg-white backdrop-blur-sm px-2 py-1 rounded-full border border-gray-200">
              {tag}
            </span>)}
          </div>
        </div>
      </div>
    </div>
  );
}
