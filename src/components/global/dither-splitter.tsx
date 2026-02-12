import Dither from "../ui/dither";
import MaxWidthWrapper from "../ui/max-width-wrapper";

const DitherSplitter = () => {
  return (
    <MaxWidthWrapper parentBorder="border-b">
      <div className="h-[55px] w-full">
        <Dither
          colorNum={4}
          waveSpeed={0.05}
          waveFrequency={3}
          waveAmplitude={0.3}
          disableAnimation={false}
          waveColor={[0.5, 0.5, 0.5]}
        />
      </div>
    </MaxWidthWrapper>
  );
};

export default DitherSplitter;
