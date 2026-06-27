import MaxWidthWrapper from "@/components/ui/max-width-wrapper";
import { getSiteSettings } from "@/lib/cms/get-site-settings";
import { parseWhoThisIsFor } from "@/lib/cms/parse-site-settings";

const WhoThisIsFor = async () => {
  const settings = await getSiteSettings();
  const bullets = parseWhoThisIsFor(settings?.whoThisIsFor);

  return (
    <MaxWidthWrapper parentBorder="border-b">
      <section className="w-full">
        <h2 className="w-full border-b p-5 text-left font-mono text-2xl font-semibold tracking-tight">
          This is for you if
        </h2>
        <ul className="flex flex-col gap-3 p-5 font-mono text-sm leading-relaxed">
          {bullets.map((bullet) => (
            <li key={bullet} className="flex gap-3">
              <span
                aria-hidden
                className="mt-2 size-1.5 shrink-0 rounded-full bg-primary"
              />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      </section>
    </MaxWidthWrapper>
  );
};

export default WhoThisIsFor;
