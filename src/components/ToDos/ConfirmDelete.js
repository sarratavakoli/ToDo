import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import ToDoForm from './ToDoForm'
import axios from 'axios'

const deleteToDo = (props) => {
    axios.delete(`https://localhost:7105/api/ToDos/${props.toDo.toDoId}`).then(() => { props.getToDos() })
    props.setShowConfirmDelete(false);
}

export default function ConfirmDelete(props) {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={props.showConfirmDelete}
            onHide={() => props.setShowConfirmDelete(false)}>
            <Modal.Header closeButton>
                <h3 className="text-lower">delete '{props.toDo.name.toLowerCase()}'?</h3>
            </Modal.Header>
            <Modal.Body>
                <Button className="btn-danger btn" onClick={() =>
                    deleteToDo(props)}>
                    {/* props.setShowConfirmDelete(false)}> */}
                    Confirm
                </Button>
            </Modal.Body>
        </Modal>
    )
}
