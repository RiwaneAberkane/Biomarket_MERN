import React, { useEffect, useState } from "react";
import { getUser } from "../../api/user";
import { UserType } from "../../models/UserType";
import "./Table.css";

const UserList: React.FC = () => {
  const [users, setUsers] = useState<UserType[]>([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    try {
      const userList = await getUser();
      setUsers(userList);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="table-list">
      <h1>User List</h1>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
