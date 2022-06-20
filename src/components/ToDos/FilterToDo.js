import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Dropdown } from 'react-bootstrap'
import ToDoCreateModal from './ToDoCreateModal'

export default function FilterToDo(props) {
  const [categories, setCategories] = useState([]);
  const [filterCat, setFilterCat] = useState(`category`);
  const [filterStatus, setFilterStatus] = useState('status');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const updateItem = (catId, catName) => {
    props.setFilter(catId);
    setFilterCat(catName);
  }

  //done will be null, true, or false
  //to set the completion filter, we must convert to text: 'all', 'done', 'to  do'
  const updateStatus = (done) => {
    props.setCompletion(done);
    setFilterStatus(done === null ? 'any status' : 
      (done === true ? 'complete' : 'incomplete'));
  }

  useEffect(() => {
    axios.get(`https://localhost:7105/api/Categories`).then(response => {

      // console.log(response)
      setCategories(response.data);
    })
  }, []);

  return (
    <div className="filter-container">
      <div className="row">
        <div className="col-md-6 todo-header">
          {/* <button className="btn btn-custom" onClick={() => setShowCreateModal(true)}>
            <strong>+</strong> add new task
          </button> */}
          {/* my tasks */}
        </div>

        <div className="col-md-6 dropdown-container">
          
        <Dropdown>
            <Dropdown.Toggle className="custom-dropdown" >
              {filterCat.toLowerCase()}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() =>
                updateItem(0, "All Categories")}>All</Dropdown.Item>


              {categories.map(cat =>
                <Dropdown.Item key={cat.categoryId} onClick={() =>
                  updateItem(Number(cat.categoryId), cat.catName)}>{cat.catName}
                </Dropdown.Item>)}

              {/* Use this if we want to add Create Category to Filter Dropdown
              <Dropdown.Divider />
              <Dropdown.Item>Add new category</Dropdown.Item> */}

            </Dropdown.Menu>
          </Dropdown>
          
          <Dropdown >
            <Dropdown.Toggle className="custom-dropdown" >
              {filterStatus}
            </Dropdown.Toggle>
            <Dropdown.Menu >
              <Dropdown.Item onClick={() => updateStatus(null)}>All</Dropdown.Item>
              <Dropdown.Item onClick={() => updateStatus(false)}>Incomplete</Dropdown.Item>
              <Dropdown.Item onClick={() => updateStatus(true)}>Complete</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

        </div>
      </div>

      {/* pop up create modal */}
      {/* {showCreateModal && 
        <ToDoCreateModal
          toDo={props.toDo}  
          showCreateModal={showCreateModal}
          setShowCreateModal={setShowCreateModal}
          getToDos={props.getToDos} />
      } */}
    </div>
  )
}
