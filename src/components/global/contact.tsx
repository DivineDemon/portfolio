import BookingLink from "@/components/analytics/booking-link";
import MaxWidthWrapper from "@/components/ui/max-width-wrapper";
import { getSiteSettings } from "@/lib/cms/get-site-settings";
import { resolveContactCopy } from "@/lib/cms/parse-site-settings";
import Silk from "../ui/silk";
import ContactForm from "./contact-form";

const Contact = async () => {
  const settings = await getSiteSettings();
  const { availabilityText, projectMinimumText, responseTimeText } =
    resolveContactCopy(settings);

  return (
    <MaxWidthWrapper parentBorder="border-b">
      <div
        id="contact"
        className="w-full relative min-h-[70vh] md:min-h-[60vh]"
      >
        <div className="absolute inset-0 invert dark:invert-0 w-full h-full">
          <Silk
            speed={5}
            scale={1}
            rotation={0}
            color="#7B7481"
            noiseIntensity={1.5}
          />
        </div>
        <div className="absolute inset-0 w-full max-w-[90%] md:max-w-2/3 mx-auto flex flex-col items-center justify-center py-12 px-4 gap-8">
          <div className="w-full max-w-md flex flex-col gap-2 text-center font-mono text-sm text-muted-foreground">
            <p>{availabilityText}</p>
            <p>{projectMinimumText}</p>
            <p>{responseTimeText}</p>
          </div>
          {settings?.bookingUrl?.trim() ? (
            <BookingLink url={settings.bookingUrl.trim()} />
          ) : null}
          <ContactForm />
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default Contact;
