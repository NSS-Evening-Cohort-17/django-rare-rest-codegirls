import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { deleteCategory, getCategory} from "./CategoryManager.js"
import { useHistory } from 'react-router-dom';


export const CategoryList = (props) => {
    const [ categories, setCategories] = useState([])
    const history = useHistory()

    useEffect(() => {
        getCategory().then(data => setCategories(data))
    }, [])
    const handleMethod= (method,id) => {
        if (method === 'delete') {
          console.log("delete")
          deleteCategory(id)
          .then(() => getCategory().then(setCategories));
        }
      };

    return (
        <div>
            <button className="btn btn-2 btn-sep icon-create"
                onClick={() => {
                    history.push({ pathname: "/" })
                }}
            >Register New Category</button>
            <article className="card">
                {  
                    categories.map(category => {
                        return <section key={`category--${category.id}`} className="card">
                            <div className="game__title">{category.label}</div>
                            {/* <Link to={`/editgame/${game.id}`} > Edit</Link>
                            <button type="button"  onClick={() => handleMethod('delete',game.id)} > Delete</button> */}
                        </section>
                    })
                }
            </article>
        </div>
    )
}