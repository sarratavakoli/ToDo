import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Container } from 'react-bootstrap'
import SingleToDo from './SingleToDo'
import './ToDos.css'
import FilterToDo from './FilterToDo';

export default function ToDos() {
  const [toDos, setToDos] = useState([]);
  const [filter, setFilter] = useState(0);

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
      <FilterToDo setFilter={setFilter} />
      <Container className="p-2">
        <article className="ToDoCards row justify-content-center">
          {/* {toDos.map(x =>
        <SingleToDo key={x.toDoId} toDo={x}/> )} */}

          {filter === 0 ?
            toDos.map(x => <SingleToDo key={x.toDoId} toDo={x} />) :
            toDos.filter(x => x.categoryId === filter).map(x => <SingleToDo key={x.toDoId} toDo={x} />)}
          {filter !== 0 && toDos.filter(x => x.categoryId === filter).length === 0 &&
            <h2 className="alert alert-warning text-dark">
              There are no results to display for this category.
            </h2>
          }
        </article>
      </Container>
    </section>
  )
}
