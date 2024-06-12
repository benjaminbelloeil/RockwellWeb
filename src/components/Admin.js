import { useState, useEffect } from 'react';
import axios from 'axios';

const Admin = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersResponse = await axios.get('/api/getAllUsers');
        setUsers(usersResponse.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="admin-dashboard p-6 bg-gray-100 min-h-screen">
      <header className="bg-red-600 text-white p-4 rounded-md mb-6">
        <h1 className="text-3xl font-bold text-center">Admin Dashboard</h1>
      </header>

      <div className="container mx-auto px-4">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Users</h2>
          <table className="min-w-full bg-white border border-gray-300">
            <thead className="bg-gray-200">
              <tr>
                <th className="py-2 px-4 border-b border-gray-300 text-left">ID</th>
                <th className="py-2 px-4 border-b border-gray-300 text-left">Username</th>
                <th className="py-2 px-4 border-b border-gray-300 text-left">Email</th>
                <th className="py-2 px-4 border-b border-gray-300 text-left">Role</th>
                <th className="py-2 px-4 border-b border-gray-300 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border-b border-gray-300">{user.id}</td>
                  <td className="py-2 px-4 border-b border-gray-300">{user.username}</td>
                  <td className="py-2 px-4 border-b border-gray-300">{user.email}</td>
                  <td className="py-2 px-4 border-b border-gray-300">{user.isAdmin ? 'Admin' : 'Regular User'}</td>
                  <td className="py-2 px-4 border-b border-gray-300">
                    {user.isAdmin ? (
                      <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700">
                        Demote to User
                      </button>
                    ) : (
                      <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
                        Promote to Admin
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Admin;
