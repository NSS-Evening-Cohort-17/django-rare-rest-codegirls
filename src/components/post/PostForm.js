import React, { useState, useEffect} from "react";
import { useHistory, useParams } from "react-router-dom";
import { createNewPost, getPostById, updatePost } from "./PostManager";
import { getCategory } from "../category/CategoryManager";
import { getTags } from "../tags/TagManager";




export const PostForm = () => {
    const history = useHistory()
    const [categories, setCategories] = useState([])
    const [checkedTags, setCheckedTags] = useState([])
    const [ tags, setTags ] = useState([])
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
        approved: "1",
        tags: []
        
    })

    // useEffect(() => {
    //     getCategory().then(setCategories)
    //     getTags().then(setTags)
    //     if (editMode) {
    //         let isMounted = true;
    //         getPostById(id).then((res) => {
    //             console.log('currentres',res)
    //             if (isMounted) {
    //                 setCurrentPost(res)
    //                 const postTags = res.tags.map(tag => parseInt(tag.id))
    //                 console.log('currentPost',postTags)
    //                 setCheckedTags(postTags)

    //             }                
    //         })        
    //     }
        
    // }, [])

    useEffect(() => {
        getCategory().then(setCategories)
        getTags().then(setTags)
        console.log(tags)
        console.log(categories)
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
                        approved: res.approved,
                        tags:res.tags
                    })
                    const postTags = res.tags.map(tag => parseInt(tag.id))
                    setCheckedTags(postTags)
                    console.log('currentPost',currentPost)
                }                
            })        
        }
        
    }, [])

    useEffect(() => {
        const changedPost = { ...currentPost }
        changedPost.tags = checkedTags
        setCurrentPost(changedPost)
    }, [checkedTags])

    const changePostState = (e) => {
        const newPost = { ...currentPost}
        if (e.target.name.includes("tag")) {
            const currentTags = [...checkedTags]
            if (e.target.checked) {
                currentTags.push(parseInt(e.target.value))
            } else {
                const index = currentTags.indexOf(parseInt(e.target.value))
                currentTags.splice(index, 1)
            }

            setCheckedTags(currentTags)
        }

        let selectedVal = e.target.value
        if (e.target.name.includes("Id")){
            selectedVal = parseInt(selectedVal)
        }
        newPost[e.target.name] = selectedVal
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
            <fieldset>
                <div className="form-group">
                    <h3> Tags:</h3>
                    {
                        tags.map(c => {
                            return <div key={c.id} className="tagCheckbox">
                                <input type="checkbox"
                                    name={`tag ${c.id}`}
                                    value={c.id}
                                    checked={checkedTags.includes(c.id)}
                                    onChange={changePostState}
                                ></input>
                                <label htmlFor={c.id}> {c.label}</label>
                            </div>
                        })
                    }
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
                        publication_date: currentPost.publication_date,
                        tags: [...checkedTags]
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

