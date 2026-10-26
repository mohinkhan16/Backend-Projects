import { NavLink } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./Navbar.css";

function AppNavbar() {
  return (
    <Navbar className="custom-navbar" expand="lg">
      <Container>
        <Navbar.Brand as={NavLink} to="/" className="navbar-brand-custom">
          Employee Management
        </Navbar.Brand>

        <Nav className="ms-auto navbar-links">
          <Nav.Link as={NavLink} to="/" end>
            Dashboard
          </Nav.Link>

          <Nav.Link as={NavLink} to="/add">
            + Add Employee
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;