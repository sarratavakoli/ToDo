import React, {useState, useEffect} from 'react'
import axios from 'axios'

export default function FilterToDo(props) {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios.get(`https://localhost:7105/api/Categories`).then(response => {
    
        console.log(response)
        setCategories(response.data);
        })
    }, []);
  return (
    <div className="text-center mt-5">
            <button onClick={() => props.setFilter(0)} className="m-1 mb-4">
                All
            </button>
            {categories.map(cat => 
            <button key={cat.categoryId} className="m-1 mb-4" 
            onClick={() => props.setFilter(Number(cat.categoryId))}>{cat.catName}</button> )}
        
        </div>
  )
}
