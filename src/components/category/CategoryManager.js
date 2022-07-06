const remoteURL = "http://localhost:8000"

export const getCategory = () => {
    return fetch(`${remoteURL}/category`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
        .then(response => response.json())
}

export const getCategoryById = (id) => {
    return fetch(`${remoteURL}/category/${id}`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
        .then(response => response.json())
}

export const deleteCategory = (id) => {
    console.log(id)
    return fetch(`${remoteURL}/category/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
     })
        .then(getCategory)
        
}

export const createCategory = (newcategory) => {
    return fetch("http://localhost:8000/category", {
        method: "POST",
        headers: {
            "Authorization": `Token ${localStorage.getItem("lu_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newcategory)
     })
        .then(getCategory)
}

export const updateCategory = (category) => {
    console.log("updatecategory",category)
    return fetch(`${remoteURL}/category/${category.id}`, {
        method: "PUT",
        headers: {
            "Authorization": `Token ${localStorage.getItem("lu_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(category)
     })
        .then(getCategory)
}