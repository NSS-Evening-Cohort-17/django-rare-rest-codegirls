export const getPosts = () => {
    return fetch("http://localhost:8000/posts", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("token")}`
        }
    })
        .then(response=> response.json())
}

export const createNewPost = (newPost) => {
    return fetch("http://localhost:8000/posts", {
        method: "POST",
        headers:{
            "Authorization": `Token ${localStorage.getItem("token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newPost)
    }).then(response => response.json())
}

export const updatePost = (editedPost) => {
    return fetch(`http://localhost:8000/posts/${editedPost.id}`, {
        method: "PUT",
        headers:{
            "Authorization": `Token ${localStorage.getItem("token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(editedPost)
    }).then(data => data.jsonO());
}