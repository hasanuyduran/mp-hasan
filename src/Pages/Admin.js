import React from 'react'
import Table from '../Components/Table'
import api from '../Api'

const Admin = () => {
  const columns = ["Ad", "Soyad", "Yaş"]; // Sütun isimleri
  const data = [
    { Ad: "Ahmet", Soyad: "Yılmaz", Yaş: 30 },
    { Ad: "Ayşe", Soyad: "Kara", Yaş: 25 },
    { Ad: "Mehmet", Soyad: "Demir", Yaş: 40 },
  ]; // Tablo verisi

  const getUsers = async () => {
    try {
      const response = await api.get("/users", {});

      // Kullanıcı bilgileri alındığında yapılacak işlemler
      console.log("Kullanıcılar:", response.data);
    } catch (error) {
      // Hata durumunda yapılacak işlemler
      console.error("Kullanıcılar alınamadı:", error.response?.data || error.message);
    }
  }

  

  return (
    <div className='bg-gradient-to-r from-[#128C7E] via-[#25D366]  to-[#c4f1a1] animate-gradientShift bg-[length:200%_200%] w-full h-screen flex justify-center items-center'>
      <div className='w-4/5'>
        <Table columns={columns} data={data}/>
      </div>
      
    </div>
  );
};
export default Admin
