import { useEffect, useState } from "react";

import {
  getUsers,
  changeRole,
} from "../../services/adminService";

export default function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  async function loadUsers() {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (error) {
      console.error("Load Users Error:", error);
    }
  }

  async function makeAdmin(user) {
    try {
      await changeRole(
        user.id,
        user.role === "admin" ? "user" : "admin"
      );

      await loadUsers();
    } catch (error) {
      console.error("Change Role Error:", error);
    }
  }

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">
        Users
      </h1>

      <div className="bg-white rounded-2xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-slate-900 text-white">

            <tr>

              <th className="p-4 text-left">
                Email
              </th>

              <th className="p-4 text-center">
                Role
              </th>

              <th className="p-4 text-center">
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {users.length === 0 ? (
              <tr>
                <td
                  colSpan="3"
                  className="text-center p-8"
                >
                  No Users Found
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr
                  key={user.id}
                  className="border-b"
                >

                  <td className="p-4">
                    {user.email}
                  </td>

                  <td className="text-center">
                    {user.role}
                  </td>

                  <td className="text-center">

                    <button
                      onClick={() => makeAdmin(user)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                    >
                      {user.role === "admin"
                        ? "Remove Admin"
                        : "Make Admin"}
                    </button>

                  </td>

                </tr>
              ))
            )}

          </tbody>

        </table>

      </div>
    </div>
  );
}
