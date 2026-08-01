import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface QuoteProps {
  text: string;
}

const Quote = ({ text }: QuoteProps) => {
  return (
    <div className="w-full text-pretty border-primary border-l-2 pl-4 text-muted-foreground text-xs italic leading-relaxed sm:text-sm [&_a]:text-primary [&_a]:underline [&_p]:inline [&_strong]:font-semibold [&_strong]:text-primary">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{text}</ReactMarkdown>
    </div>
  );
};

export default Quote;
