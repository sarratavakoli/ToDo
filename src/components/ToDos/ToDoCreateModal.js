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
            show={props.showCreateModal}
            onHide={() => props.setShowCreateModal(false)}>
            <Modal.Header closeButton>
                <h4>add task</h4>
            </Modal.Header>
            <Modal.Body>
                <ToDoForm
                    toDo={props.toDo}
                    setShowCreateModal={props.setShowCreateModal}
                    getToDos={props.getToDos} />
            </Modal.Body>
        </Modal>
    )
}
