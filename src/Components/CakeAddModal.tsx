import React, { useState } from 'react';
import { RequestStatus, PostCake } from '../types';
import { Button, Modal, Form } from 'react-bootstrap'

interface CakeAddModalProps {
    addStatus: RequestStatus,
    onAdd: (cake: PostCake) => void
    onCancel: () => void
}

const CakeAddModal = (props: CakeAddModalProps) => {

    return <Modal centered show={true} onHide={() => props.onCancel()} >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
            <h4>Add a New Cake</h4>
            <Form className="mt-3">
                <Form.Group>
                    <Form.Control type="text" placeholder="Enter a name for this cake" />
                </Form.Group>
                <Form.Group>
                    <Form.Control type="text" placeholder="Type a comment about this cake" />
                </Form.Group>
                <Form.Group>
                    <Form.Control type="text" placeholder="Paste the URL of an image of this cake" />
                </Form.Group>
                <Form.Group>
                    <Form.Label className="text-muted" htmlFor="yum">Select the yum factor for this cake</Form.Label>
                    <Form.Control id="yum" as="select">
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                    </Form.Control>
                </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
            {props.addStatus === "NONE" && <Button name="add" variant="success" onClick={(evt: any) => { }}>Save</Button>}
            {props.addStatus !== "PENDING" && <Button name="cancel" variant="secondary" onClick={(evt: any) => { props.onCancel() }}>Cancel</Button>}
        </Modal.Footer>
    </Modal >

}

export default CakeAddModal