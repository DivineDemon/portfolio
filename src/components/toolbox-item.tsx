import TechIcon from "./tech-icon";

const ToolboxItem = ({ item }: { item: { title: string; iconType: React.ElementType } }) => {
  return (
    <div className="inline-flex items-center gap-4 rounded-lg px-3 py-2 outline outline-white/10">
      <TechIcon component={item.iconType} />
      <span className="font-semibold">{item.title}</span>
    </div>
  );
};

export default ToolboxItem;
