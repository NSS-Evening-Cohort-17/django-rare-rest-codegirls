const remoteURL = "http://localhost:8000"

export const getPosts = () => {
    return fetch("http://localhost:8000/posts", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("token")}`
        }
    })
        .then(response=> response.json())
}

export const createNewPost = (newPost) => {
    console.log("new post test",[newPost])
    return fetch("http://localhost:8000/posts", {
        method: "POST",
        headers:{
            "Authorization": `Token ${localStorage.getItem("token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newPost)
    }).then(response => response.json())
}

export const updatePost = (post) => {
    console.log("updatepost",{post})
    return fetch(`${remoteURL}/posts/${post.id}`, {
        method: "PUT",
        headers: {
            "Authorization": `Token ${localStorage.getItem("lu_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(post)
     })
        .then(getPosts)
}

export const deletePost = (id) => {
    console.log(id)
    return fetch(`${remoteURL}/posts/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
     })
        .then(getPosts)
        
}

export const getPostById = (id) => {
    return fetch(`${remoteURL}/posts/${id}`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
        .then(response => response.json())
}