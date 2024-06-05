import { useEffect, useState } from "react";
import EmailUpdateModal from "./EmailUpdateModal";
import PasswordChangeModal from "./PasswordChangeModal";
import DeleteAccountModal from "./DeleteAccountModal";

export default function Account() {
  const [user, setUser] = useState(null);
  const [isEmailModalOpen, setEmailModalOpen] = useState(false);
  const [isPasswordModalOpen, setPasswordModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  useEffect(() => {
    async function fetchUserInfo() {
      try {
        const response = await fetch('/api/getUserInfo');
        const data = await response.json();
        if (data.user) {
          setUser(data.user);
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    }

    fetchUserInfo();
  }, []);

  const handleUpdateEmail = async (newEmail) => {
    if (newEmail) {
      try {
        const response = await fetch('/api/updateEmail', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ newEmail }),
        });
        if (response.ok) {
          setUser({ ...user, email: newEmail });
          alert('Email updated successfully');
          setEmailModalOpen(false);
        } else {
          alert('Failed to update email');
        }
      } catch (error) {
        console.error("Error updating email:", error);
        alert('Failed to update email');
      }
    }
  };

  const handleChangePassword = async (newPassword) => {
    if (newPassword) {
      try {
        const response = await fetch('/api/changePassword', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ newPassword }),
        });
        if (response.ok) {
          alert('Password changed successfully');
          setPasswordModalOpen(false);
        } else {
          alert('Failed to change password');
        }
      } catch (error) {
        console.error("Error changing password:", error);
        alert('Failed to change password');
      }
    }
  };

  const handleDeleteAccount = async () => {
    if (confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      try {
        const response = await fetch('/api/deleteAccount', {
          method: 'POST',
        });
        if (response.ok) {
          alert('Account deleted successfully');
          setDeleteModalOpen(false);
          // Optionally, redirect the user to the login page or home page
        } else {
          alert('Failed to delete account');
        }
      } catch (error) {
        console.error("Error deleting account:", error);
        alert('Failed to delete account');
      }
    }
  };

  if (!user) {
    return (
      <div className="centered-container">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-gray-800 text-4xl mb-8 font-bold">Account Details</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <h2 className="text-gray-800 text-2xl font-bold mb-4">User Information</h2>
            <div className="text-gray-700 text-lg mb-2"><strong>Name:</strong> {user.username}</div>
            <div className="text-gray-700 text-lg mb-2"><strong>Email:</strong> {user.email}</div>
            <div className="text-gray-700 text-lg mb-2"><strong>Username:</strong> {user.username}</div>
            <div className="text-gray-700 text-lg"><strong>Join Date:</strong> {new Date(user.createdAt).toLocaleDateString()}</div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <h2 className="text-gray-800 text-2xl font-bold mb-4">Account Settings</h2>
            <div className="text-gray-700 text-lg mb-4">
              <button 
                onClick={() => setPasswordModalOpen(true)} 
                className="text-white bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline w-full"
              >
                Change Password
              </button>
            </div>
            <div className="text-gray-700 text-lg mb-4">
              <button 
                onClick={() => setEmailModalOpen(true)} 
                className="text-white bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline w-full"
              >
                Update Email
              </button>
            </div>
            <div className="text-gray-700 text-lg">
              <button 
                onClick={() => setDeleteModalOpen(true)} 
                className="text-white bg-red-500 hover:bg-red-700 font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline w-full"
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>

      <EmailUpdateModal 
        isOpen={isEmailModalOpen} 
        onRequestClose={() => setEmailModalOpen(false)} 
        onUpdateEmail={handleUpdateEmail} 
      />
      <PasswordChangeModal 
        isOpen={isPasswordModalOpen} 
        onRequestClose={() => setPasswordModalOpen(false)} 
        onChangePassword={handleChangePassword} 
      />
      <DeleteAccountModal 
        isOpen={isDeleteModalOpen} 
        onRequestClose={() => setDeleteModalOpen(false)} 
        onDeleteAccount={handleDeleteAccount} 
      />
    </div>
  );
}
