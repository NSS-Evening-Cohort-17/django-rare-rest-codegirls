import React, { useState, useEffect } from "react"
import { useHistory, useParams } from 'react-router-dom'
import { createCategory, getCategory, getCategoryById, updateCategory } from "./CategoryManager"
const initialState = {
    label:""}
export const CategoryForm = () => {
    const [currentCategory, setCurrentCategory] = useState(initialState)
    const history = useHistory()
    const { id } = useParams()
    const editMode = id ? true : false

    useEffect(() => {
        if (editMode) {      
            let isMounted = true;
            getCategoryById(id).then((res) => {
              if (isMounted)  {
                setCurrentCategory(
                    {
                        label: res.label
                    }
                )

                console.log(res)
              }
            })
        }        
    }, [])

    const changeCategoryState = (category) => {
        const newCategory = Object.assign({}, currentCategory)
        newCategory[category.target.name] = category.target.value
        setCurrentCategory(newCategory)
    }
    return (

        <form className="categoryForm">
        <h2 className="categoryForm__title">Register New Category</h2>
        <fieldset>
            <div className="form-group">
                <label htmlFor="label">Label: </label>
                <input type="text" name="label" required autoFocus className="form-control"
                    value={currentCategory.label}
                    onChange={changeCategoryState}
                />
            </div>
        </fieldset>
        <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const category = {
                        label: currentCategory.label                      
                    }

                    // Send POST request to your API
                    {editMode ?                         
                        (updateCategory({...category,id})
                            .then(() => history.push("/categories"))) :
                        (createCategory(category)
                            .then(() => history.push("/categories")))

                    }
                }}
                className="btn btn-primary">{editMode ? "Updates" : "Add a new category"}</button>
        </form>
    )
    }