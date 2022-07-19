
const remoteURL = "http://localhost:8000";

export const getUserByName = (userName) => {
  //be sure your animals have good data and related to a location and customer
  return fetch(`${remoteURL}/users/${userName}`).then((res) => res.json());
};

export const getAllUsers = () => {
  return fetch(`${remoteURL}/users`, {
      headers:{
          "Authorization": `Token ${localStorage.getItem("lu_token")}`
      }
  })
      .then(response => response.json())
}

