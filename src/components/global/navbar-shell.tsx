import Navbar from "@/components/global/navbar";
import { getSiteSettings } from "@/lib/cms/get-site-settings";

const NavbarShell = async () => {
  const settings = await getSiteSettings();
  const bookingUrl = settings?.bookingUrl?.trim() || null;

  return <Navbar bookingUrl={bookingUrl} />;
};

export default NavbarShell;
