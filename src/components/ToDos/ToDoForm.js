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
            <div className="form-group m-3">
                <Field name="name" className="form-control" placeholder="Name" />
                {errors.name && touched.name ? (
                    <div className="text-danger">{errors.name}</div>
                ) : null}
            </div>
            <div className="form-group m-3">
                <Field name="details" className="form-control" placeholder="Details" />
                {errors.details && touched.details ? (
                    <div className="text-danger">{errors.details}</div>
                ) : null}
            </div>
            <div className="form-group m-3">
                <Field as="select" name="categoryId" className="form-control">
                <option value="" disabled>[--Please choose--]</option>
                {categories.map(cat =>
                    <option key={cat.categoryId} value={cat.categoryId}>
                        {cat.catName}
                    </option>
                )}
                </Field>
            </div>
            <div className="form-group m-3">
                <Field name="done" type="checkbox" />
                <p className="text-dark d-inline">&nbsp;Complete</p>
                {errors.done && touched.done ? (
                    <div className="text-danger">{errors.done}</div>
                ) : null}
            </div>
            <div className="form-group m-3">
                <button type="submit" className="btn btn-info m-3">
                    {!props.toDo ? "Add " : "Update "} ToDo</button>
            </div>
        </Form>
    )  }       
    </Formik>

  )
}
