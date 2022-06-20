import React, { useState } from 'react'
import ToDoEdit from './ToDoEdit'
import ConfirmDelete from './ConfirmDelete'
import axios from 'axios'

export default function SingleToDo(props) {
    const [showEdit, setShowEdit] = useState(false);
    const [showConfirmDelete, setShowConfirmDelete] = useState(false);
    // const [isChecked, setIsChecked] = useState(props.toDo.done);

    const handleOnChange = () => {
        // setIsChecked(!props.toDo.done);
        const toDoToEdit = {
            toDoId: props.toDo.toDoId,
            name: props.toDo.name,
            details: props.toDo.details,
            done: !props.toDo.done,
            categoryId: props.toDo.categoryId
        }
        axios.put(`https://localhost:7105/api/ToDos/${props.toDo.toDoId}`, toDoToEdit).then(() => {
            props.getToDos()            
        })
    }    

    return (
        <div className={props.toDo.done ? `completed singleToDo mt-2` : 'singleToDo mt-2'}>
            <div className="p-2 row" onClick={handleOnChange}>
                <div className="col-md-11">
                {/* x delete icon in top right */}
                {/* <span onClick={() => deleteToDo(props.toDo.toDoId)} alt="x mark"> */}
                <span onClick={
                    () => setShowConfirmDelete(true)
                } alt="x mark">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-circle" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                    </svg>
                </span>

                {/* ToDo card content */}
                <strong>{props.toDo.name}&nbsp;</strong>
                <button id="editLink" className="d-inline" onClick={() => setShowEdit(true)}>
                    <i style={{ fontSize: 20 }} className="bi bi-gear"></i>
                    <i style={{ fontSize: 20}} className="bi bi-check"></i>
                </button>
                {props.toDo.details !== null ? <p>{props.toDo.details}</p> : ''}

                {/* pop up edit ToDo modal */}
                {showEdit &&
                    <ToDoEdit
                        toDo={props.toDo}
                        showEdit={showEdit}
                        setShowEdit={setShowEdit}
                        getToDos={props.getToDos} />
                }

                {/* pop up delete ToDo modal */}
                {showConfirmDelete && 
                    <ConfirmDelete
                        toDo={props.toDo}
                        showConfirmDelete={showConfirmDelete}
                        setShowConfirmDelete={setShowConfirmDelete}
                        getToDos={props.getToDos}
                    />
                }
                </div>
            </div>
        </div>
    )
}
