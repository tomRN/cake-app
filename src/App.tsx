import React, { useState } from 'react';
import './App.css';
import { Container, Navbar, Nav, Alert, Row, Button } from "react-bootstrap";
import CakeListItem from './Components/CakeListItem';
import CakeDeleteModal from './Components/CakeDeleteModal';
import CakeAddModal from './Components/CakeAddModal';
import useCakes from './Hooks/useCakes';
import { PostCake, Cake } from './types'

function App() {
  const {
    cakes,
    initialFetchStatus,
    postCake,
    postCakeStatus,
    resetPostCakeStatus,
    deleteCake,
    deleteCakeStatus,
    resetDeleteCakeStatus
  } = useCakes();
  const [showAddCakeModal, setShowAddCakeModal] = useState<boolean>(false);
  const [showDeleteCakeModal, setShowDeleteCakeModal] = useState<boolean>(false);
  const [cakeToDelete, setCakeToDelete] = useState<Cake | undefined>(undefined);

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
            {showDeleteCakeModal && <CakeDeleteModal
              cakeName={cakeToDelete!.name}
              deleteStatus={deleteCakeStatus}
              onConfirm={() => { deleteCake(cakeToDelete!.ID) }}
              onCancel={() => { resetDeleteCakeStatus(); setShowDeleteCakeModal(false); setCakeToDelete(undefined); }}
            />}
            {showAddCakeModal && <CakeAddModal
              addStatus={postCakeStatus}
              onAdd={(cake: PostCake) => { postCake(cake) }}
              onCancel={() => { resetPostCakeStatus(); setShowAddCakeModal(false) }}
            />}
            <Row className="mb-4 mt-2">
              <Button variant="success" onClick={onAddClick}>+ Add a cake</Button>
            </Row>
            {cakes.length === 0 && <h3 className="text-muted text-center">No cakes, try adding one!</h3>}
            {cakes.map((cake) => <CakeListItem
              cake={cake}
              key={cake.ID}
              onDelete={() => { setCakeToDelete(cake); setShowDeleteCakeModal(true); }}
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
