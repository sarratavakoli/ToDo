import React, { useState } from 'react'
import axios from 'axios'
import CatEdit from './CatEdit'

export default function SingleCategory(props) {
  const [showEdit, setShowEdit] = useState(false);

  const deleteCat = (id) => {
    if(window.confirm(`Are you sure you want to delete ${props.category.catName}?`)){
        axios.delete(`https://localhost:7105/api/Categories/${id}`).then(() => {props.getCategories()})
    }
}

  return (
    <tr>
      <td>{props.category.catName}</td>
      <td>{props.category.catDesc}</td>
      <td>
        <button className="m-1 rounded" id="editLink" onClick={() => setShowEdit(true)}>
          edit
        </button>
        <button className="m-1 rounded" id="deleteLink" onClick={() => deleteCat(props.category.categoryId)}>
          delete
        </button>
        {showEdit &&
          <CatEdit
            setShowEdit={setShowEdit}
            showEdit={showEdit}
            getCategories={props.getCategories}
            category={props.category}
          />
        }
      </td>
    </tr>
  )
}
