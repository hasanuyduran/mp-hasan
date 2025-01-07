import React from 'react'
import Table from '../Components/Table'
import api from '../Api'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import Modal from '../Components/Modal'
import { useState } from 'react';


const Admin = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const columns = [
    { name: "ID", key: "id" },
    { name: "Username", key: "username" },
    {
      name: "Is Admin",
      key: "is_admin",
      render: (value) => (value ? "✔️" : "❌"),
    },
    {
      name: "Limit",key: "limit"},
    { name: "Operations", 
      key: "operations", 
      render: (value, row) => (
        <div className="flex justify-center items-center space-x-2">
          <button className="bg-transparent text-gray-800 px-4 py-2 rounded-md" onClick={() => alert(`Edit ${row.username}`)}><FontAwesomeIcon className='text-2xl' icon={faPenToSquare} /></button>
          <button className="bg-transparent text-gray-800 px-4 py-2 rounded-md" onClick={() => handleDeleteClick(row)}><FontAwesomeIcon className='text-xl' icon={faTrash} /></button>
        </div>
      ),
    },
  ];
  
  const [data, setData] = React.useState([]); // Tablo verisi
  

  const getUsers = async () => {
    try {
      const response = await api.get("/users", {});

      // Kullanıcı bilgileri alındığında yapılacak işlemler
      console.log("Kullanıcılar:", response.data);
      setData(response.data.data);
      
    } catch (error) {
      // Hata durumunda yapılacak işlemler
      console.error("Kullanıcılar alınamadı:", error.response?.data || error.message);
    }
  }





  const handleDeleteClick = (row) => {
    setSelectedRow(row); // Silinecek satırı seç
    setIsModalOpen(true); // Modalı aç
  };

  const confirmDelete = () => {
    if (selectedRow) {
      deleteUser(selectedRow.id);
      alert(`Deleted ${selectedRow.username}`);
    }
    setIsModalOpen(false); // Modalı kapat
    setSelectedRow(null); // Seçimi temizle
  };

  const cancelDelete = () => {
    setIsModalOpen(false); // Modalı kapat
    setSelectedRow(null); // Seçimi temizle
  };


  const deleteUser = async (id) => {
    try {
      const response = await api.delete(`/users/${id}`, {});

      // Kullanıcı silindiğinde yapılacak işlemler
      console.log("Kullanıcı silindi:", response.data);
      getUsers();
    } catch (error) {
      // Hata durumunda yapılacak işlemler
      console.error("Kullanıcı silinemedi:", error.response?.data || error.message);
    }
  }

  React.useEffect(() => {
  getUsers();
  }, []);

  return (
    <div className='bg-gradient-to-r from-[#128C7E] via-[#25D366]  to-[#c4f1a1] animate-gradientShift bg-[length:200%_200%] w-full h-screen flex justify-center items-center'>
      <div className='w-4/5'>
        <Table columns={columns} data={data}/>
        <Modal
        isOpen={isModalOpen}
        title="Confirm Delete"
        message={`${selectedRow?.username} isimli kullanıcıyı silmek istiyor musunuz?`}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
        // toastify
      />
      </div>
      
    </div>
  );
};
export default Admin
