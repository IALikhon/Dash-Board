import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import NavBar from "../components/NavBar";

const RootLayout = () => {
  return (
    <div className="relative">
      <Header />
      <NavBar />
      <Outlet />
    </div>
  );
};

export default RootLayout;
