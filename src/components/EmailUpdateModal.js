import React, { useState } from "react";
import Modal from "react-modal";

Modal.setAppElement("#__next");

export default function EmailUpdateModal({ isOpen, onRequestClose, onUpdateEmail }) {
  const [newEmail, setNewEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateEmail(newEmail);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Update Email"
      className="modal"
      overlayClassName="modal-overlay"
    >
      <h2 className="text-xl font-bold mb-4">Update Email</h2>
      <form onSubmit={handleSubmit}>
        <label className="block text-gray-700 text-sm font-bold mb-2">
          New Email
          <input
            type="email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
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
            Update
          </button>
        </div>
      </form>
    </Modal>
  );
}
