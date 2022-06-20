import React, { useState, useEffect } from 'react'
import { Container } from 'react-bootstrap'
import axios from 'axios'
import SingleCategory from './SingleCategory';
import './Categories.css'
import CatCreate from './CatCreate'

export default function Categories() {
  const [categories, setCategories] = useState([]);

  const [showCreate, setShowCreate] = useState(false);

  const getCategories = () => {

    axios.get(`https://localhost:7105/api/Categories`).then(response => {

      console.log(response)
      setCategories(response.data);
    })
  }

  useEffect(() => { getCategories() }, [])

  return (
    <section className="categories  m-auto">
      <article className="p-5">
        <h1 className="text-center text-uppercase">categories</h1>
      </article>
      <div className="p-2 mb-3 text-center">
        {showCreate ?
          <>
            <button onClick={() => setShowCreate(false)} className="btn btn-custom">Cancel</button>
            <CatCreate
              getCategories={getCategories}
              setShowCreate={setShowCreate} />
          </>
          : <button className="btn btn-custom" onClick={() => setShowCreate(true)}>Add Category</button>}
      </div>
      
      <Container className="p-2">
        <table className="table bg-info table-light mt-3 mb-3">
          <thead className="table-secondary text-uppercase">
            <tr>
              <th>Category</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map(x =>
              <SingleCategory key={x.categoryId} category={x} getCategories={getCategories} />
            )}
          </tbody>
        </table>
      </Container>
    </section>
  )
}
