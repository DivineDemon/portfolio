import { Outlet } from "react-router-dom";
import Footer from "./landing/footer";
import Navbar from "./landing/navbar";

const Layout = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
