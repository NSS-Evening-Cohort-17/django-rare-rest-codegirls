import React, { useEffect } from "react";
import { getAllUsers, getUserByName } from "../../components/user/UserManager";

export const UserList = () => {
  const [users, setUsers] = useState([]);

  const getUserByName = () => {
    return getAllUsers().then((usersFromAPI) => {
      // We'll do something more interesting with this data soon.
      setUsers(usersFromAPI);
    });
  };

  useEffect(() => {
    getUserByName();
  }, []);

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
