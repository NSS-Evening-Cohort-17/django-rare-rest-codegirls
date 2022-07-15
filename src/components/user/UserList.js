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
    <div className="container-cards">
      {users.map((user) => (
        <UserCard key={user.name} user={user} />
      ))}
    </div>
  );
};
