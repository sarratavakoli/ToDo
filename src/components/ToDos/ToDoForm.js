import React, { useState, useEffect } from 'react'
import { Formik, Field, Form } from 'formik'
import { todoSchema } from '../../utilities/validationSchemas'
import axios from 'axios'

export default function ToDoForm(props) {
    const [categories, setCategories] = useState([]);
    const getCategories = () => {
        axios.get(`https://localhost:7105/api/Categories`).then(response => setCategories(response.data))
    }
    const handleSubmit = (values) => {
        console.log(values)
        if(!props.toDo){
            const todoToCreate = values;
            axios.post(`https://localhost:7105/api/ToDos`, todoToCreate).then(() => {
                props.getToDos()
                props.setShowCreate(false)
            })
        }
        else {
            //edit code
            const toDoToEdit = {
                toDoId: props.toDo.toDoId,
                name: values.name,
                details: values.details,
                done: values.done,
                categoryId: values.categoryId
            }
            axios.put(`https://localhost:7105/api/ToDos/${props.toDo.toDoId}`, toDoToEdit).then(() => {
                props.getToDos()
                props.setShowEdit(false)
            })
        }
    }

    useEffect(() => {
        getCategories()
    }, [])

  return (
    <Formik
        initialValues={{
            name: props.toDo ? props.toDo.name : '', 
            details: props.toDo ? props.toDo.details : '', 
            done: false,
            categoryId: props.toDo ? props.toDo.categoryId : ''
        }}
        validationSchema={todoSchema}
        onSubmit={(values) => handleSubmit(values)}>
    {({errors, touched}) => (
        <Form id="toDoForm">
            {!props.toDo ? 
            <div className="form-group m-3">
                <h4 className="text-dark">new task</h4>
            </div> : null}
            <div className="form-group m-3">
                <Field name="name" className="form-control" placeholder="name" />
                {errors.name && touched.name ? (
                    <div className="text-danger">{errors.name}</div>
                ) : null}
            </div>
            <div className="form-group m-3">
                <Field component="textarea" rows="4" name="details" className="form-control" placeholder="details" />
                {errors.details && touched.details ? (
                    <div className="text-danger">{errors.details}</div>
                ) : null}
            </div>
            <div className="form-group m-3">
                <Field as="select" name="categoryId" className="form-control">
                <option value="" disabled>category</option>
                {categories.map(cat =>
                    <option key={cat.categoryId} value={cat.categoryId}>
                        {cat.catName.toLowerCase()}
                    </option>
                )}
                </Field>
            </div>

            {props.toDo ? 
            <div className="form-group m-3 custom-checkbox">
                <Field name="done" type="checkbox" className="form-check-input"/>
                <p className="text-dark d-inline">&nbsp;complete</p>
                {errors.done && touched.done ? (
                    <div className="text-danger">{errors.done}</div>
                ) : null}
            </div> : null}


            <div className={props.toDo ? "form-group mb-2 p-3" : "form-group mb-5 pt-3"}>
                <button type="submit" className="btn btn-custom">
                    {!props.toDo ? "Add " : "Update "}</button>
            </div>
        </Form>
    )  }       
    </Formik>

  )
}
