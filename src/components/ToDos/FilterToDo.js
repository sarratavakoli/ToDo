import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Dropdown } from 'react-bootstrap'

export default function FilterToDo(props) {
  const [categories, setCategories] = useState([]);
  const [filterCat, setFilterCat] = useState(`all`);

  const updateItem = (catId, catName) => {
    props.setFilter(catId);
    setFilterCat(catName);
  }

  const updateStatus = (done) => {
    props.setCompletion(done);
  }

  useEffect(() => {
    axios.get(`https://localhost:7105/api/Categories`).then(response => {

      console.log(response)
      setCategories(response.data);
    })
  }, []);

  return (
    <div className="filter-container">
      <div className="row">
        <div className="col-md-6 todo-header">
          {filterCat} tasks
        </div>

        <div className="col-md-6 dropdown-container">
          <Dropdown >
            <Dropdown.Toggle className="custom-dropdown" >
              status
            </Dropdown.Toggle>
            <Dropdown.Menu >
              <Dropdown.Item onClick={() => updateStatus(null)}>All</Dropdown.Item>
              <Dropdown.Item onClick={() => updateStatus(false)}>Incomplete</Dropdown.Item>
              <Dropdown.Item onClick={() => updateStatus(true)}>Complete</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown>
            <Dropdown.Toggle className="custom-dropdown" >
              category
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() =>
                updateItem(0, "All")}>All</Dropdown.Item>


              {categories.map(cat =>
                <Dropdown.Item key={cat.categoryId} onClick={() =>
                  updateItem(Number(cat.categoryId), cat.catName)}>{cat.catName}
                </Dropdown.Item>)}

              {/* Use this if we want to add Create Category to Filter Dropdown
              <Dropdown.Divider />
              <Dropdown.Item>Add new category</Dropdown.Item> */}

            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </div>
  )
}
