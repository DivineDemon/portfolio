import Navbar from "@/components/global/navbar";
import { BOOKING_URL } from "@/lib/constants";

const NavbarShell = async () => {
  return <Navbar bookingUrl={BOOKING_URL} />;
};

export default NavbarShell;
