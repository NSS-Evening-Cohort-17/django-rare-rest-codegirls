const remoteURL = "http://localhost:8000"

export const getCategory = () => {
    return fetch(`${remoteURL}/category`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
        .then(response => response.json())
}

export const deleteCategory = (id) => {
    console.log("delete22")
    return fetch(`${remoteURL}/category/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
     })
        .then(getCategory)
        
}
