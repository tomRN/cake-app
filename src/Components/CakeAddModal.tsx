import React, { useState } from 'react';
import { RequestStatus, PostCake } from '../types';
import { Button, Modal, Form, Col, Alert } from 'react-bootstrap'

interface CakeAddModalProps {
    addStatus: RequestStatus,
    onAdd: (cake: PostCake) => void
    onCancel: () => void
}

const CakeAddModal = (props: CakeAddModalProps) => {
    const [cake, setCake] = useState<PostCake>({
        name: "",
        comment: "",
        imageURL: "",
        yumFactor: 1
    })

    const handleSubmit = () => {
        //html validation should have validated the form, so just submit what we have in state
        props.onAdd(cake);
    }

    return <Modal centered show={true} onHide={() => props.onCancel()} >
        <Form onSubmit={(e: React.SyntheticEvent) => { e.preventDefault(); handleSubmit() }}>
            <Modal.Header closeButton><h4 className="mb-0">Add a New Cake</h4></Modal.Header>
            <Modal.Body className="px-4">

                {props.addStatus === "SUCCESS" ?
                    <h5 className="text-center">Your cake has been added</h5>
                    : props.addStatus === "PENDING" ?
                        <>
                            <h5 className="text-center">Saving your cake, just a sec...</h5>
                        </> :
                        <>
                            <Form.Row>
                                <Form.Label column="sm" lg={2} htmlFor="name">Name</Form.Label>
                                <Col>
                                    <Form.Control required type="text" id="name" minLength={3} placeholder="Enter a name for this cake" value={cake.name} onChange={(evt) => { setCake({ ...cake, name: evt.target.value }) }} />
                                    <Form.Text className="text-muted">(at least 3 chars)</Form.Text>
                                </Col>
                            </Form.Row>
                            <Form.Row className="mt-2">
                                <Form.Label column="sm" lg={2} htmlFor="comment">Comment</Form.Label>
                                <Col>
                                    <Form.Control required type="text" id="comment" minLength={10} placeholder="Type a comment about this cake" value={cake.comment} onChange={(evt) => { setCake({ ...cake, comment: evt.target.value }) }} />
                                    <Form.Text className="text-muted">(at least 10 chars)</Form.Text>
                                </Col>
                            </Form.Row>
                            <Form.Row className="mt-2">
                                <Form.Label column="sm" lg={2} htmlFor="imageURL" >Image Url</Form.Label>
                                <Col>
                                    <Form.Control required type="text" id="imageURL" pattern="(http:|https:)+[^\s]+[\w]" placeholder="Paste the URL of an image of this cake" value={cake.imageURL} onChange={(evt) => { setCake({ ...cake, imageURL: evt.target.value }) }} />
                                    <Form.Text className="text-muted">(a valid url starts with 'http://' or 'https://')</Form.Text>
                                    <Form.Text className="text-muted">try https://via.placeholder.com/400x300.png</Form.Text>

                                </Col>
                            </Form.Row>
                            <Form.Row className="mt-2">
                                <Form.Label column="sm" lg={6} htmlFor="yum">Select the yum factor for this cake</Form.Label>
                                <Col>
                                    <Form.Control id="yum" as="select" value={cake.yumFactor} onChange={(evt) => { setCake({ ...cake, yumFactor: parseInt(evt.target.value, 10) }) }} >
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Form.Control>
                                </Col>
                            </Form.Row>
                            {
                                props.addStatus === "ERROR" ?
                                    <Alert variant="danger"><small>Sorry, there was a problem saving your cake, please try again</small></Alert>
                                    : null
                            }
                        </>
                }
            </Modal.Body>
            <Modal.Footer>
                {props.addStatus !== "PENDING" && props.addStatus !== "SUCCESS" && <Button type="submit" name="add" variant="success" onClick={(evt: any) => { }}>Save</Button>}
                {props.addStatus !== "PENDING" && <Button type="button" name="cancel" variant="secondary" onClick={(evt: any) => { props.onCancel() }}>{props.addStatus === "SUCCESS" ? "Done" : "Cancel"}</Button>}
            </Modal.Footer>
        </Form>
    </Modal >


}

export default CakeAddModal