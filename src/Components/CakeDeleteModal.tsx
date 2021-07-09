import React from 'react';
import { RequestStatus } from '../types';
import { Button, Modal } from 'react-bootstrap'



interface CakeDeleteModalProps {
    onConfirm: () => void
    onCancel: () => void
    cakeName: string
    deleteStatus: RequestStatus
}

const CakeDeleteModal = (props: CakeDeleteModalProps) => {
    let message = `Are you sure you want to delete ${props.cakeName}?`
    if (props.deleteStatus === "PENDING") {
        message = "Deleting your cake, just a sec..."
    }
    if (props.deleteStatus === "ERROR") {
        message = "Sorry, there was an error deleting the cake"
    }
    if (props.deleteStatus === "SUCCESS") {
        message = `${props.cakeName} has been deleted`
    }
    return <Modal centered show={true} onHide={() => props.onCancel()} >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body><h5>{message}</h5></Modal.Body>
        <Modal.Footer>
            {props.deleteStatus === "NONE" && <Button name="delete" variant="danger" onClick={(evt: any) => { props.onConfirm() }}>Delete</Button>}
            {props.deleteStatus !== "PENDING" && <Button name="cancel" variant="secondary" onClick={(evt: any) => { props.onCancel() }}>{props.deleteStatus === "SUCCESS" ? "Done" : "Cancel"}</Button>}
        </Modal.Footer>
    </Modal >

}

export default CakeDeleteModal;