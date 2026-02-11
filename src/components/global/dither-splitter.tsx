import Dither from "../ui/dither";
import MaxWidthWrapper from "../ui/max-width-wrapper";

const DitherSplitter = () => {
  return (
    <MaxWidthWrapper parentBorder="border-b">
      <div className="w-full h-[55px] relative">
        <Dither
          colorNum={4}
          waveSpeed={0.05}
          waveFrequency={3}
          mouseRadius={0.3}
          waveAmplitude={0.3}
          enableMouseInteraction
          disableAnimation={false}
          waveColor={[0.5, 0.5, 0.5]}
        />
      </div>
    </MaxWidthWrapper>
  );
};

export default DitherSplitter;
