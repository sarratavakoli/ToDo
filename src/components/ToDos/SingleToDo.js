import React from 'react'

export default function SingleToDo(props) {
    return (
        <div className="singleToDo col-md-7 mb-3">
            <div className="p-2">
                <h5>{props.toDo.name}</h5>
                {props.toDo.details !== null ?
                    <p>{props.toDo.details}</p> :
                    <p> </p>}
                {props.toDo.done === true ? <div>DONE</div> : <div></div>}
            </div>
        </div>
    )
}
