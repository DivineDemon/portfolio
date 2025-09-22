import Image from "next/image";

const ToolboxItem = ({ item }: { item: { title: string; iconSrc: string } }) => {
  return (
    <div className="inline-flex items-center gap-4 rounded-lg px-3 py-2 outline outline-white/10">
      <div className="relative size-10 overflow-hidden rounded-lg bg-white/10 p-1.5">
        <Image
          src={item.iconSrc}
          alt={item.title}
          width={28}
          height={28}
          className="size-7 transition-all duration-300 hover:scale-110"
        />
      </div>
      <span className="font-semibold">{item.title}</span>
    </div>
  );
};

export default ToolboxItem;
