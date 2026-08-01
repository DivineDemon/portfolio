interface QuoteProps {
  text: string;
}

const Quote = ({ text }: QuoteProps) => {
  return (
    <p className="w-full text-pretty border-primary border-l-2 pl-4 text-muted-foreground text-sm italic leading-relaxed">
      {text}
    </p>
  );
};

export default Quote;
