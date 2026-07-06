import Breadcrumbs from "../content/breadcrumbs";
import Navbar from "./navbar";
import { AppSidebar } from "./sidebar/app-sidebar";

const GlobalLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full flex items-start justify-start">
      <AppSidebar />
      <div className="flex-1 flex flex-col items-start justify-start">
        <Navbar />
        <Breadcrumbs />
        <div className="w-full h-[calc(100vh-120px)] overflow-y-auto px-5 pb-5">
          {children}
        </div>
      </div>
    </div>
  );
};

export default GlobalLayout;
