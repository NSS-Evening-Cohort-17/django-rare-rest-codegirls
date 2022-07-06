import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { deleteCategory, getCategory} from "./CategoryManager.js"
import { useHistory } from 'react-router-dom';
import { VscTrash, VscEdit } from "react-icons/vsc";
import "../styles/category.css"

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
        // if (method === 'edit') {
        //     console.log("edit")
        //     <Link to={`/editcategory/${category.id}`}></Link>
        //   }
      };

    return (
        <div>
            <button className="btn btn-2 btn-sep icon-create"
                onClick={() => {
                    history.push({ pathname: "/categorynew" })
                }}
            >Register New Category</button>
            <article className="card">
                {  
                    categories.map(category => {
                        return <section key={`category--${category.id}`} className="card">
                            <div className="game__title"> 
                            <VscTrash onClick={() => handleMethod('delete',category.id)}/>
                            <Link to={`/categoryedit/${category.id}`} ><VscEdit/ > </Link>
                            {category.label}</div>
                            {/* <Link to={`/editgame/${game.id}`} > Edit</Link>
                            <button type="button"  onClick={() => handleMethod('delete',game.id)} > Delete</button> */}
                        </section>
                    })
                }
            </article>
        </div>
    )
}