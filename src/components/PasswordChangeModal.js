import React, { useState } from "react";
import Modal from "react-modal";

Modal.setAppElement("#__next");

export default function PasswordChangeModal({ isOpen, onRequestClose, onChangePassword }) {
  const [newPassword, setNewPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onChangePassword(newPassword);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Change Password"
      className="modal"
      overlayClassName="modal-overlay"
    >
      <h2 className="text-xl font-bold mb-4">Change Password</h2>
      <form onSubmit={handleSubmit}>
        <label className="block text-gray-700 text-sm font-bold mb-2">
          New Password
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </label>
        <div className="mt-4 flex justify-end">
          <button
            type="button"
            onClick={onRequestClose}
            className="mr-2 py-2 px-4 rounded bg-gray-200 hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="py-2 px-4 rounded bg-blue-500 text-white hover:bg-blue-700"
          >
            Change
          </button>
        </div>
      </form>
    </Modal>
  );
}
