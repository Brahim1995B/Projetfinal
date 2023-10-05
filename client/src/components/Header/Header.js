import react, { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { current } from "../../Redux/Actions/AuthActions";
import logo from "../../assets/images/logo.png"
import "./styles.css";

export default function Headers() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(current());
  }, []);
  const user = useSelector((state) => state.AuthReducer.user);

  return (
    <Navbar bg="light" data-bs-theme="light">
      <Container>
        <Navbar.Brand href="/"><img className="rounded-circle" style={{maxHeight:50}} src={logo}/></Navbar.Brand>
        <Nav>
          <Nav.Link href="/">Accueil</Nav.Link>
        </Nav>
        <div
          className="form-inputs align-items-center"
          style={{ width: "50%" }}
        >
          <input
            style={{ width: "100%" }}
            className="form-control"
            type="text"
            placeholder="Chercher votre voiture de rêve"
          />
          <i class="bx bx-search" />
        </div>
        <Nav>
          {user ? (
            <Nav.Link href="/profile">Profil</Nav.Link>
          ) : (
            <Nav.Link href="/signin">Connexion</Nav.Link>
          )}
          <Nav.Link href="/addCar">Publier une annonce</Nav.Link>
          {user && <Nav.Link href="/deconnexion">Deconnexion</Nav.Link>}
        </Nav>
      </Container>
    </Navbar>
  );
}
