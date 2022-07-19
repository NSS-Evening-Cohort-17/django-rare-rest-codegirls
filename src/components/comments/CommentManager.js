export const getComments = () => {
    return fetch("http://localhost:8000/comments", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("token")}`
        }
    })
        .then(response => response.json())
}

export const createNewComment = (newComment) => {
    return fetch("http://localhost:8000/comments", {
        method: "POST",
        headers:{
            "Authorization": `Token ${localStorage.getItem("token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newComment)
    }).then(response => response.json())
}

export const updateComment = (comment) => {
    return fetch("http://localhost:8000/comments", {
        method: "PUT",
        headers: {
            "Authorization": `Token ${localStorage.getItem("lu_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(comment)
    })
}

export const deleteComment = (id) => {
    return fetch(`http://localhost:8000/comments/${id}`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
        .then(response => response.json())
}