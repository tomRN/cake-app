import React, { useState } from 'react';
import './App.css';
import { Container, Navbar, Nav, Alert, Row, Button } from "react-bootstrap";
import CakeListItem from './Components/CakeListItem';
import CakeDeleteModal from './Components/CakeDeleteModal';
import CakeAddModal from './Components/CakeAddModal';
import useCakes from './Hooks/useCakes';
import { PostCake } from './types'

function App() {
  const {
    cakes,
    initialFetchStatus,
    postCake,
    postCakeStatus,
    resetPostCakeStatus
  } = useCakes();
  const [showAddCakeModal, setShowAddCakeModal] = useState<boolean>(false);

  const onAddClick = (evt: any) => {
    setShowAddCakeModal(true);
  }

  return (
    <Container>
      <Navbar className="justify-content-between" fixed="top" bg="dark" variant="dark" onSelect={(e: string | null) => { }}>
        <Nav.Link className="text-light" eventKey="" onClick={() => { window.location.href = "/" }}>
          <strong >Bakr - the app for cake lovers</strong></Nav.Link>
      </Navbar>
      <Container className="mt-5 pt-5">
        <h5>Cakes</h5>
        {initialFetchStatus === "SUCCESS" &&
          <>
            {showAddCakeModal && <CakeAddModal
              addStatus={postCakeStatus}
              onAdd={(cake: PostCake) => { postCake(cake) }}
              onCancel={() => { resetPostCakeStatus(); setShowAddCakeModal(false) }}
            />}
            <Row className="mb-4 mt-2">
              <Button variant="success" onClick={onAddClick}>+ Add a cake</Button>
            </Row>
            {cakes.map((cake) => <CakeListItem
              cake={cake}
              key={cake.ID}
              onDelete={() => { ; }}
            />
            )}
          </>}
        {initialFetchStatus === "PENDING" && <h3>loading cakes, just a sec...</h3>}
        {initialFetchStatus === "ERROR" && <Alert variant="danger">There was an issue loading the cakes, check your internet and refresh the page</Alert>}

      </Container>
    </Container>
  );
}

export default App;
