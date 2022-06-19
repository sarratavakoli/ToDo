import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Container } from 'react-bootstrap'
import SingleToDo from './SingleToDo'
import './ToDos.css'
import FilterToDo from './FilterToDo';
import { useAuth } from '../../contexts/AuthContext'
import ToDoCreate from './ToDoCreate'

export default function ToDos() {
  const [toDos, setToDos] = useState([]);
  const [filter, setFilter] = useState(0);
  const { currentUser } = useAuth();
  const [showCreate, setShowCreate] = useState(false);

  const getToDos = () => {

    axios.get(`https://localhost:7105/api/ToDos`).then(response => {

      console.log(response)
      setToDos(response.data);
    })
  }

  useEffect(() => {
    getToDos();
  }, []);

  return (
    <section className="todos">
      {currentUser && <>
        <Container className="p-2 mt-4">

          <article className="row justify-content-center todo-gallery">      
            
            {/* Quick Add ToDo Functionality here */}
            <div className="quick-add-container col-md-7 mb-3 mt-2">
              <button className="btn btn-secondary" onClick={() => setShowCreate(!showCreate)}>
                {!showCreate ? 'quick add' : 'Cancel'}
              </button>
              <div className="create-container">
                {showCreate && 
                  <ToDoCreate
                    getToDos={getToDos}
                    setShowCreate={setShowCreate} />
                }
              </div>
            </div>
            
            <FilterToDo setFilter={setFilter} />

            {filter === 0 ?
              toDos.map(x => <SingleToDo key={x.toDoId} toDo={x} getToDos={getToDos}/>) :
              toDos.filter(x => x.categoryId === filter).map(x => <SingleToDo key={x.toDoId} toDo={x} getToDos={getToDos} />)}

            {filter !== 0 && toDos.filter(x => x.categoryId === filter).length === 0 &&
              <h2 className="alert alert-warning text-dark">
                There are no results to display for this category.
              </h2>
            }
          </article>

        </Container>
      </>}
    </section>
  )
}
