
import { NavLink } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";

function AppNavbar() {
  return (
    <Navbar
      bg="white"
      expand="lg"
      className="border-bottom shadow-sm py-3"
    >
      <Container>
        <Navbar.Brand
          as={NavLink}
          to="/"
          className="fw-bold text-primary fs-4"
        >
          Employee Management
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="employee-navbar" />

        <Navbar.Collapse id="employee-navbar">
          <Nav className="ms-auto align-items-lg-center gap-lg-3 mt-3 mt-lg-0">
            <Nav.Link
              as={NavLink}
              to="/"
              end
              className="fw-semibold"
            >
              Dashboard
            </Nav.Link>

            <Button
              as={NavLink}
              to="/add"
              variant="primary"
              className="fw-semibold px-3 py-2"
            >
              + Add Employee
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;
