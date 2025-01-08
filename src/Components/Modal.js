import React from "react";

const Modal = ({ isOpen, type, title, message, onConfirm, onCancel, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white  p-20 rounded-md shadow-md">
        <h2 className="text-3xl font-bold mb-4">{title}</h2>
        <p className="mb-6 text-2xl">{message}</p>
        <div className={type==="confirm"?"justify-evenly flex space-x-4":"justify-center flex space-x-4"}>
          {type === "confirm" && (
            <>
              <button
                className="w-32 py-2 bg-gray-200 text-2xl rounded-md"
                onClick={onCancel}
              >
                İptal
              </button>
              <button
                className="w-32 py-2 bg-red-500 text-white text-2xl rounded-md"
                onClick={onConfirm}
              >
                Sil
              </button>
            </>
          )}
          {type === "info" && (
            <button
              className="w-32 py-2 bg-blue-500 text-white text-2xl rounded-md"
              onClick={onClose}
            >
              Tamam
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
