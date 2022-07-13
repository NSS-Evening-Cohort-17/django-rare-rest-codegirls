import React, { useState, useEffect} from "react";
import { useHistory } from "react-router-dom";
import { createNewPost } from "./PostManager";
import { getCategory } from "../category/CategoryManager";



export const PostForm = () => {
    const history = useHistory()
    const [categories, setCategories] = useState([])
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1;
    var yyyy = today.getFullYear();
    if(dd<10)
    {
      dd='0'+dd;
    
    }
    if (mm<10)
    {
      mm='0'+mm;
    }
    today = yyyy+ '-'+mm+'-'+dd;

    const [currentPost, setCurrentPost] = useState({
        user : 1,
        category: 1,
        title: "",
        publication_date: today,
        image_url: "",
        content: "",
        approved: "", 
        tags:""

        
    })

    useEffect(() => {
        getCategory().then(setCategories)
    }, [])

    useEffect(() => {
        
    } )

    const changePostState = (domEvent) => {
        const newPost = { ...currentPost}
        let selectedVal = domEvent.target.value

        if (domEvent.target.name.includes("Id")){
            selectedVal = parseInt(selectedVal)
        }

        newPost[domEvent.target.name] = selectedVal

        setCurrentPost(newPost)
    }

    return(
        <form className="postForm">
            <h2 className="postForm_title">Create New Post</h2>
            <fieldset>
            <div className="form-group">
                    <label htmlFor="title">Title:</label>
                    <input type="text" name="title" required autoFocus className="form-control"
                        defaultValue={currentPost.title}
                        onChange={changePostState}
                        />
                </div>
                <div className="form-group">
                    <label htmlFor="category">Category:</label>
                    <select value={currentPost.category} name="category" onChange={changePostState} className="form-control">
                        <option value="0">Select a Category</option>
                        {categories.map(l => (
                            <option key={l.id} value={l.id}>
                                {l.label}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="image_url">Image URL:</label>
                    <input type="text" name="image_url" required autoFocus className="form-control"
                        defaultValue={currentPost.image_url}
                        onChange={changePostState}
                        />
                </div>
                <div className="form-group">
                    <label htmlFor="content">Content:</label>
                    <input type="text" name="content" required autoFocus className="form-control"
                        defaultValue={currentPost.content}
                        onChange={changePostState}
                        />
                </div>
            </fieldset>

            <button type="submit"
                onClick={evt => {
                    evt.preventDefault()
                   

                    const post = {
                        user: 1,
                        title: currentPost.title,
                        category: parseInt(currentPost.category),
                        image_url: currentPost.image_url,
                        content: currentPost.content,
                        tags:[1,2,3],
                        approved:"1",
                        publication_date: currentPost.publication_date
                    }
                    console.log(post)
                    createNewPost(post)
                        .then(() => history.push("/posts"))
                }}
                className="btn btn-primary">Publish</button>
        </form>
    )
}

