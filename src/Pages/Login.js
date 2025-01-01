import React from "react";
import { useForm } from "react-hook-form";
import api from "../Api";
import { useNavigate } from "react-router-dom";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();


  const onSubmit = async (data) => {
    try {
      const response = await api.post("/login", {
        username: data.username,
        password: data.password,
      });

      // Giriş başarılı olduğunda yapılacak işlemler
      console.log("Giriş başarılı:", response.data.message);
      // Örnek: Token saklama
      localStorage.setItem("token", response.data.token);
      if (response.data?.token) {
        getUser();
      }
    } catch (error) {
      // Hata durumunda yapılacak işlemler
      console.error("Giriş başarısız:", error.response?.data || error.message);
    }
  };

  const getUser = async () => { 
    try {
      const response = await api.get("/user", {});

      // Kullanıcı bilgileri alındığında yapılacak işlemler
      console.log("Kullanıcı bilgileri:", response.data);
      if(response.data.is_admin === true){
        navigate("/admin");
      }
    }
    catch (error) {
      // Hata durumunda yapılacak işlemler
      console.error("Kullanıcı bilgileri alınamadı:", error.response?.data || error.message);
    }
  };

  return (
    <div className="bg-gradient-to-r from-[#128C7E] via-[#25D366]  to-[#c4f1a1] animate-gradientShift bg-[length:200%_200%] w-full h-screen flex justify-center items-center">
      <div className="w-1/3 h-1/2 bg-[#00000049] rounded-xl border-2  flex flex-col justify-center p-5">
        <div><h1 className="text-4xl font-black text-white">LOGIN</h1></div>
        
        <form className="w-full flex flex-col justify-start items-start" onSubmit={handleSubmit(onSubmit)}>
          {/* Ad alanı */}
          <div className="w-full my-10" >
            <input className="w-full text-3xl text-green-700 text-center rounded-xl h-16"
              id="username"
              {...register("username", { required: "Ad zorunludur" })}
            />
            {errors.username && <p className="text-end text-red-600">{errors.username.message}</p>}
          </div>

          {/* E-posta alanı */}
          <div className="w-full " >
            <input className="w-full text-3xl text-center text-green-700 rounded-xl h-16"
              id="password"
              type="password"
              {...register("password", {
                required: "Şifre zorunludur",
                minLength: {
                  value: 6,
                  message: "Şifre en az 6 karakter olmalıdır",
                },
              })}
            />
            {errors.password && <p className="text-end text-red-600">{errors.password.message}</p>}
          </div>

          {/* Gönder butonu */}
          <button className="bg-[#22962c] text-3xl text-white p-5 rounded-xl m-auto w-1/2 mt-10" type="submit">Gönder</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
