import { useContext } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { NavigationContext } from "../utils/context/NavigationContext";

function HeaderBar() {
  // const { setShowModal } = useContext(ModalContext);
  // const { setIsSignupForm } = useContext(FormContext);
  // const { user, logout } = useContext(AuthContext);
  const { contactSection } = useContext(NavigationContext);

  // function onSignupClick() {
  //   setShowModal(true);
  //   setIsSignupForm(true);
  // }

  // function onLoginClick() {
  //   setShowModal(true);
  //   setIsSignupForm(false);
  // }

  return (
    <Navbar
      bg="dark"
      data-bs-theme="dark"
      expand="md"
      className="bg-body-tertiary"
    >
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>Michael Cornillon</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {/* {!user ? (
              <>
                <Nav.Link onClick={onSignupClick}>S'inscrire</Nav.Link>
                <Nav.Link onClick={onLoginClick}>Se connecter</Nav.Link>
              </>
            ) : (
              <Nav.Link onClick={logout}>Se déconnecter</Nav.Link>
            )} */}
            <Nav.Link
              href="#contact"
              onClick={() => contactSection?.scrollIntoView()}
            >
              Me contacter
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default HeaderBar;
