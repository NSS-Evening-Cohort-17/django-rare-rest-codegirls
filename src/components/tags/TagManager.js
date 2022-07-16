const remoteURL = "http://localhost:8000"

export const getTags = () => {
    return fetch(`${remoteURL}/tags`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
        .then(response => response.json())
}