// Account.js
import Layout from "./Layout";

export default function Account() {
  // Mock user data for demonstration purposes
  const user = {
    name: "Admin",
    email: "admin@example.com",
    username: "admin",
    joinDate: "January 1, 2020"
  };

  return (
    <div className="p-6">
      <h1 className="text-gray-800 text-4xl mb-8 font-bold">Account Details</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <h2 className="text-gray-800 text-xl font-bold mb-4">User Information</h2>
            <div className="text-gray-700 text-lg mb-2"><strong>Name:</strong> {user.name}</div>
            <div className="text-gray-700 text-lg mb-2"><strong>Email:</strong> {user.email}</div>
            <div className="text-gray-700 text-lg mb-2"><strong>Username:</strong> {user.username}</div>
            <div className="text-gray-700 text-lg"><strong>Join Date:</strong> {user.joinDate}</div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <h2 className="text-gray-800 text-xl font-bold mb-4">Account Settings</h2>
            <div className="text-gray-700 text-lg mb-4">
              <button className="text-white bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline">Change Password</button>
            </div>
            <div className="text-gray-700 text-lg mb-4">
              <button className="text-white bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline">Update Email</button>
            </div>
            <div className="text-gray-700 text-lg">
              <button className="text-white bg-red-500 hover:bg-red-700 font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline">Delete Account</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
