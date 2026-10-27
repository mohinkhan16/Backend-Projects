
import { Outlet } from "react-router-dom";
import AppNavbar from "../ui/Navbar";
import Container from "react-bootstrap/Container";

function MainLayout() {
  return (
    <>
      <AppNavbar />

      <Container className="py-4">
        <Outlet />
      </Container>
    </>
  );
}

export default MainLayout;
