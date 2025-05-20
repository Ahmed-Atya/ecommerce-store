import { Outlet } from "react-router-dom";
import NavbarComponent from "./NavbarComponent";
import CartDrawer from "../components/CartDrawer"

const AppLayout = () => {
  return (
    <>
      <NavbarComponent />
      <Outlet />
      <CartDrawer/>

    </>
  );
};

export default AppLayout;
