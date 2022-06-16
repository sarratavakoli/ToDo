import React, { useState, useEffect } from 'react'
import { Container } from 'react-bootstrap'
import axios from 'axios'
import SingleCategory from './SingleCategory';

export default function Categories() {
  const [categories, setCategories] = useState([]);

  const getCategories = () => {

    axios.get(`https://localhost:7105/api/Categories`).then(response => {

    console.log(response)
    setCategories(response.data);
    })
  }

  useEffect(() => {getCategories()}, [])

  return (
    <section className="categories">
      <article className="bg-info p-5">
        <h1 className="text-center">Categories</h1>
      </article>
      <Container className="p-2">
        <table className="table bg-info table-dark mt-3 mb-3">
          <thead className="table-secondary text-uppercase">
            <tr>
              <th>Name</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {categories.map(x => 
              <SingleCategory key={x.categoryId} category={x}/>
            )}
          </tbody>
        </table>
      </Container>
    </section>
  )
}