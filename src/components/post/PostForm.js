import React, { useState, useEffect} from "react";
import { useHistory, useParams } from "react-router-dom";
import { createNewPost, getPostById, updatePost } from "./PostManager";
import { getCategory } from "../category/CategoryManager";



export const PostForm = () => {
    const history = useHistory()
    const [categories, setCategories] = useState([])
    const { id } = useParams()
    const editMode = id ? true : false

    var today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    
    today = `${yyyy}-${mm}-${dd}`;
    //     user : localStorage.getItem("lu_token"),

    const [currentPost, setCurrentPost] = useState({
        category: "",
        title: "",
        publication_date: today,
        image_url: "",
        content: "",
        approved: "1"
        
    })

    useEffect(() => {
        if (editMode) {
            let isMounted = true;
            getPostById(id).then((res) => {
                if (isMounted) {
                    setCurrentPost({
                        category: res.category.id,
                        title: res.title,
                        publication_date: res.publication_date,
                        image_url: res.image_url,
                        content: res.content,
                        approved: res.approved
                    })
                    console.log(currentPost)
                }
                
            })
        
        }
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
                        title: currentPost.title,
                        category: parseInt(currentPost.category),
                        image_url: currentPost.image_url,
                        content: currentPost.content,
                        approved:currentPost.approved,
                        publication_date: currentPost.publication_date
                    }

                    {editMode ?
                        (updatePost({...post, id})
                        .then(() => history.push("/posts"))):
                        (createNewPost(post)
                        .then(() => history.push("/posts")))
                    }
                    
                }}
                className="btn btn-primary">{editMode ? "Update" : "Add a new post"}</button>
        </form>
    )
}

