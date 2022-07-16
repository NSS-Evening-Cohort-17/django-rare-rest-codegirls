import React, { useState, useEffect } from "react";
// import { getUserById } from '../../modules/AnimalManager';
// import './AnimalDetail.css';
// import { useParams, useNavigate } from "react-router-dom";
import { getUserByName } from "./UserManager";

export const UserDetail = () => {
  const [user, setUser] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
  });
  const [isLoading, setIsLoading] = useState(true);

  const { userId } = useParams();
  // const navigate = useNavigate();

  useEffect(() => {
    //getAnimalById(id) from AnimalManager and hang on to the data; put it into state
    console.log("useEffect", userName);
    getUserByName(userName).then((user) => {
      setUser(user);
      setIsLoading(false);
    });
  }, [userName]);

  return (
    <section className="user">
      <h3 className="username">{user.username}</h3>
      <div className="first_name">{user.first_name}</div>
      {/* What's up with the question mark???? See below.*/}
      <div className="last_name">{user.last_name}</div>
      <div className="email">{user.email}</div>
    </section>
  );
};
