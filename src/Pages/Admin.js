import React, { useState, useEffect } from 'react';
import Table from '../Components/Table';
import api from '../Api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import Modal from '../Components/Modal';

const Admin = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("confirm"); // 'confirm' veya 'info'
  const [modalTitle, setModalTitle] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [selectedRow, setSelectedRow] = useState(null);
  const [data, setData] = useState([]); // Tablo verisi

  const columns = [
    { name: "ID", key: "id" },
    { name: "Username", key: "username" },
    {
      name: "Is Admin",
      key: "is_admin",
      render: (value) => (value ? "✔️" : "❌"),
    },
    { name: "Limit", key: "limit" },
    {
      name: "Operations",
      key: "operations",
      render: (value, row) => (
        <div className="flex justify-center items-center space-x-2">
          <button
            className="bg-transparent text-gray-800 px-4 py-2 rounded-md"
            onClick={() => alert(`Edit ${row.username}`)}
          >
            <FontAwesomeIcon className="text-2xl" icon={faPenToSquare} />
          </button>
          <button
            className="bg-transparent text-gray-800 px-4 py-2 rounded-md"
            onClick={() => handleDeleteClick(row)}
          >
            <FontAwesomeIcon className="text-xl" icon={faTrash} />
          </button>
        </div>
      ),
    },
  ];

  const getUsers = async () => {
    try {
      const response = await api.get("/users", {});
      setData(response.data.data);
    } catch (error) {
      console.error("Kullanıcılar alınamadı:", error.response?.data || error.message);
    }
  };

  const handleDeleteClick = (row) => {
    setSelectedRow(row);
    setModalType("confirm");
    setModalTitle("");
    setModalMessage(`${row.username} isimli kullanıcıyı silmek istiyor musunuz?`);
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    if (selectedRow) {
      try {
        await api.delete(`/users/${selectedRow.id}`, {});
        setModalType("info");
        setModalTitle("Silindi");
        setModalMessage(`${selectedRow.username} isimli kullanıcı başarıyla silindi.`);
        getUsers(); // Tabloyu güncelle
      } catch (error) {
        setModalType("info");
        setModalTitle("Hata");
        setModalMessage("Kullanıcı silinemedi. Lütfen tekrar deneyin.");
        console.error("Kullanıcı silinemedi:", error.response?.data || error.message);
      }
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRow(null);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="bg-gradient-to-r from-[#128C7E] via-[#25D366] to-[#c4f1a1] animate-gradientShift bg-[length:200%_200%] w-full h-screen flex justify-center items-center">
      <div className="w-4/5">
        <Table columns={columns} data={data} />
        <Modal
          isOpen={isModalOpen}
          type={modalType} // 'confirm' veya 'info'
          title={modalTitle}
          message={modalMessage}
          onConfirm={modalType === "confirm" ? confirmDelete : undefined}
          onCancel={modalType === "confirm" ? closeModal : undefined}
          onClose={modalType === "info" ? closeModal : undefined}
        />
      </div>
    </div>
  );
};

export default Admin;
