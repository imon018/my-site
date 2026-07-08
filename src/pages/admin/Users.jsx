import { useEffect, useState } from "react";

import {
  getUsers,
  changeRole,
  deleteUser,
} from "../../services/adminService";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
  loadUsers();
}, [search]);

  async function loadUsers() {
  try {
    const data = await getUsers(search);
    setUsers(data);
  } catch (error) {
    console.error(error);
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
  
  async function removeUser(user) {

  const ok = window.confirm(
    `Delete ${user.email}?`
  );

  if (!ok) return;

  await deleteUser(user.id);

  await loadUsers();

}

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">
        Users
      </h1>
      <div className="mb-6">

  <input
    type="text"
    placeholder="Search user by email..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="w-full border rounded-xl px-4 py-3"
  />

</div>

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
                    <button
  onClick={() => removeUser(user)}
  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg ml-2"
>
  Delete
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
