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

  useEffect(() => {
    axios.get(`https://localhost:7105/api/Categories`).then(response => {

      console.log(response)
      setCategories(response.data);
    })
  }, []);

  return (
    <div className="col-md-7 filter-container">
      <div className="row">
        <div className="col-md-7 todo-header">
          {filterCat} tasks
        </div>
        <div className="col-md-5">
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
                <Dropdown.Divider />


              <Dropdown.Item>Add new category</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </div>
  )
}
