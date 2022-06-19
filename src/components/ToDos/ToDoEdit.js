import React from 'react'
import { Modal } from 'react-bootstrap'
import ToDoForm from './ToDoForm'

export default function ToDoEdit(props) {
  return (
    <Modal
        show={props.showEdit}
        onHide={() => props.setShowEdit(false)}>
            <Modal.Header closeButton>
                <h3>Editing {props.toDo.name}</h3>
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
