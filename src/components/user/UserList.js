import React, { useEffect, useState } from "react";
import { getAllUsers} from "../../components/user/UserManager";
import { UserCard } from "./UserCard";

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
    <div className="container-cards">
      {users.map((user) => (

        <UserCard key={user.user} user={user.first_name} />

      ))}
    </div>
  );
};
