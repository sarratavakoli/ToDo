import React from 'react'
import { Modal } from 'react-bootstrap'
import ToDoForm from './ToDoForm'

export default function ToDoEdit(props) {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={props.showEdit}
            onHide={() => props.setShowEdit(false)}>
            <Modal.Header closeButton>
                <h4 className="edit-header">editing task '{props.toDo.name.toLowerCase()}'</h4>
            </Modal.Header>
            <Modal.Body>
                <ToDoForm
                    toDo={props.toDo}
                    setShowEdit={props.setShowEdit}
                    getToDos={props.getToDos} />
            </Modal.Body>
        </Modal>
    )
}
