import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Container, Navbar, Nav } from "react-bootstrap";

function App() {
  return (
    <Container>
      <Navbar className="justify-content-between" fixed="top" bg="dark" variant="dark" onSelect={(e: string | null) => { }}>
        <Nav.Link className="text-light" eventKey="" onClick={() => { window.location.href = "/" }}>
          <strong >Bakr - the app for cake lovers</strong></Nav.Link>
      </Navbar>
      <Container className="mt-5 pt-5">
        <h5>Cakes</h5>
      </Container>
    </Container>
  );
}

export default App;
