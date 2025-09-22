import StarIcon from "@/assets/icons/star.svg";
import { words } from "@/lib/constants";

const TapeSection = () => {
  return (
    <div className="overflow-x-clip py-16 lg:py-24">
      <div className="-mx-1 -rotate-3 bg-gradient-to-r from-emerald-300 to-sky-400">
        <div className="flex [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="flex flex-none animate-move-left gap-4 py-3 [animation-duration:30s]">
            {words.map((word, idx) => (
              <div key={idx} className="inline-flex items-center gap-4">
                <span className="font-bold text-gray-900 text-sm uppercase">{word}</span>
                <StarIcon className="-rotate-12 size-6 text-gray-900" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TapeSection;
