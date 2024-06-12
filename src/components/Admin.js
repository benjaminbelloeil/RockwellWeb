import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function Admin() {
  const { data: session, status } = useSession();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (status === "authenticated") {
      console.log('User:', session.user); // Log user session details

      async function fetchUsers() {
        try {
          const response = await fetch('/api/getAllUsers', {
            credentials: 'include', // Ensure credentials are included
          });
          const data = await response.json();
          setUsers(data);
        } catch (error) {
          console.error("Error fetching users:", error);
        }
      }

      fetchUsers();
    }
  }, [status]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-gray-800 text-4xl mb-8 font-bold">All Users</h1>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b border-gray-200 bg-gray-50">ID</th>
              <th className="py-2 px-4 border-b border-gray-200 bg-gray-50">Username</th>
              <th className="py-2 px-4 border-b border-gray-200 bg-gray-50">Email</th>
              <th className="py-2 px-4 border-b border-gray-200 bg-gray-50">Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td className="py-2 px-4 border-b border-gray-200">{user.id}</td>
                <td className="py-2 px-4 border-b border-gray-200">{user.username}</td>
                <td className="py-2 px-4 border-b border-gray-200">{user.email}</td>
                <td className="py-2 px-4 border-b border-gray-200">{user.isAdmin ? 'Admin' : 'Regular User'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
