import BookingLink from "@/components/analytics/booking-link";
import MaxWidthWrapper from "@/components/ui/max-width-wrapper";
import { getSiteSettings } from "@/lib/cms/get-site-settings";
import Silk from "../ui/silk";
import ContactForm from "./contact-form";

const Contact = async () => {
  const settings = await getSiteSettings();

  return (
    <MaxWidthWrapper parentBorder="border-b">
      <div
        id="contact"
        className="relative w-full min-h-[70vh] overflow-hidden"
      >
        <div className="pointer-events-none absolute inset-0 invert dark:invert-0">
          <Silk
            speed={5}
            scale={1}
            rotation={0}
            color="#7B7481"
            noiseIntensity={1.5}
          />
        </div>
        <div className="relative z-10 mx-auto flex w-full min-w-0 max-w-lg flex-col items-center gap-6 px-4 py-14 sm:px-6 sm:py-16 md:gap-8">
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
