import React from 'react'
import Table from '../Components/Table'
import api from '../Api'

const Admin = () => {
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
          <button className="bg-green-500 text-white px-4 py-2 rounded-md" onClick={() => alert(`Edit ${row.username}`)}>Edit</button>
          <button className="bg-red-500 text-white px-4 py-2 rounded-md" onClick={() => alert(`Delete ${row.username}`)}>Delete</button>
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

  React.useEffect(() => {
  getUsers();
  }, []);

  return (
    <div className='bg-gradient-to-r from-[#128C7E] via-[#25D366]  to-[#c4f1a1] animate-gradientShift bg-[length:200%_200%] w-full h-screen flex justify-center items-center'>
      <div className='w-4/5'>
        <Table columns={columns} data={data}/>
      </div>
      
    </div>
  );
};
export default Admin
