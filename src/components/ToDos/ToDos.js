import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Container } from 'react-bootstrap'
import SingleToDo from './SingleToDo'
import './ToDos.css'
import FilterToDo from './FilterToDo';
import { useAuth } from '../../contexts/AuthContext'
import ToDoCreate from './ToDoCreate'
// import ProgressBar from '../../utilities/progressBar'

// import FilterSelections from './FilterSelections'

export default function ToDos() {
  const [toDos, setToDos] = useState([]);
  const { currentUser } = useAuth();
  const [showCreate, setShowCreate] = useState(false);

  //this filter is for filtering categories by index, where 0 is ALL categories
  const [filter, setFilter] = useState(0);
  //this is a filter for filtering completion status, where null is both true and false, true is done, and false is incomplete.
  const [completion, setCompletion] = useState(null);

  const getToDos = () => {

    axios.get(`https://localhost:7105/api/ToDos`).then(response => {
      const arr = response.data;
      // const trueFirst = arr.sort((a, b) => Number(b.done) - Number(a.done))
      const falseFirst = arr.sort((a, b) => Number(a.done) - Number(b.done))
      setToDos(falseFirst);
    })
  }

  // const [total, setTotal] = useState(Number(toDos.length));
  // const [now, setNow] = useState(Number(toDos.filter(x => x.categoryId) === 1));
  // const [percentage, setPercentage] = useState(Number(total/now));
  // console.log(total);
  // console.log(now);

  const filterBySelections = (filter, completion) => {
    if ((filter === 0) && (completion === null)) {
      return toDos.map(x =>
        <SingleToDo key={x.toDoId} toDo={x} getToDos={getToDos} />)
    }
    else if (filter === 0 && completion !== null) {
      return toDos.filter(x => x.done === completion).map(x =>
        <SingleToDo key={x.toDoId} toDo={x} getToDos={getToDos} />)
    }
    else if (filter !== 0 && completion === null) {
      return toDos.filter(x => x.categoryId === filter).map(x =>
        <SingleToDo key={x.toDoId} toDo={x} getToDos={getToDos} />)
    }
    else {
      return toDos.filter(x => x.categoryId === filter && x.done === completion).map(x =>
        <SingleToDo key={x.toDoId} toDo={x} getToDos={getToDos} />)
    }
  }

  useEffect(() => {
    getToDos();
  }, []);

  return (
    <section className="todos">
      {currentUser && <>
        <section className="row page-body">
          <section className="sidebar-container col-md-2">
            <div className="quick-add-container mb-3 mt-2">
              <button className="btn btn-custom mr-0" onClick={() => setShowCreate(!showCreate)}>
                {!showCreate ? 'quick add' : 'Cancel'}
              </button>
              <div className={showCreate ? "create-container" : "create-container no-border"}>
                {showCreate &&
                  <ToDoCreate
                    getToDos={getToDos}
                    setShowCreate={setShowCreate} />
                }
              </div>
            </div>
          </section>

          <section className="main-content col-md-10">
            <article className="row justify-content-center todo-gallery">

              {/* Quick Add ToDo Functionality here */}
              {/* <div className="quick-add-container col-md-7 mb-3 mt-2">
                <button className="btn btn-custom" onClick={() => setShowCreate(!showCreate)}>
                  {!showCreate ? 'quick add' : 'Cancel'}
                </button>
                <div className="create-container">
                  {showCreate &&
                    <ToDoCreate
                      getToDos={getToDos}
                      setShowCreate={setShowCreate} />
                  }
                </div>
              </div> */}
              <div className="col">
                <FilterToDo setFilter={setFilter} setCompletion={setCompletion} toDos={toDos} />

                {/* <ProgressBar now={toDos.filter(x => x.done === true).length} total={toDos.length}/> */}
                <div id="checklist">
                  {filterBySelections(filter, completion)}
                </div>

                {filter !== 0 && toDos.filter(x => x.categoryId === filter).length === 0 &&
                  <h5 className="alert alert-warning text-dark col-md-7 offset-mb-3">
                    There are no results to display for this category.
                  </h5>
                }
              </div>
              <div className="disappearing-column col-md-3"></div>
            </article>
          </section>

        </section>
      </>}
    </section>
  )
}
