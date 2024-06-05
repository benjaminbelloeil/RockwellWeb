import React from "react";
import Modal from "react-modal";

Modal.setAppElement("#__next");

export default function DeleteAccountModal({ isOpen, onRequestClose, onDeleteAccount }) {
  const handleDelete = () => {
    onDeleteAccount();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Delete Account"
      className="modal"
      overlayClassName="modal-overlay"
    >
      <h2 className="text-xl font-bold mb-4">Delete Account</h2>
      <p className="mb-4">Are you sure you want to delete your account? This action cannot be undone.</p>
      <div className="flex justify-end">
        <button
          type="button"
          onClick={onRequestClose}
          className="mr-2 py-2 px-4 rounded bg-gray-200 hover:bg-gray-300"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleDelete}
          className="py-2 px-4 rounded bg-red-500 text-white hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </Modal>
  );
}
