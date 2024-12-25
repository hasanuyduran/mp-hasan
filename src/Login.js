import React from "react";
import { useForm } from "react-hook-form";

function Login() {
  // useForm hook'unu kullanarak form kontrollerini alıyoruz
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Form gönderimi
  const onSubmit = (data) => {
    console.log(data); // Form verilerini konsola yazdır
    alert("Form gönderildi!");
  };

  return (
    <div className="bg-gradient-to-r from-[#128C7E] via-[#25D366]  to-[#DCF8C6] animate-gradientShift bg-[length:200%_200%] w-full h-screen flex justify-center items-center">
      <div className="w-1/3 h-1/2 bg-[#00000049] rounded-xl border-2  flex flex-col justify-center p-5">
        <div><h1 className="text-3xl font-black">LOGIN</h1></div>
        
        <form className="w-full flex flex-col justify-start items-start" onSubmit={handleSubmit(onSubmit)}>
          {/* Ad alanı */}
          <div className="w-full my-10" >
            <input className="w-full text-4xl text-center rounded-xl h-16"
              id="name"
              {...register("name", { required: "Ad zorunludur" })}
            />
            {errors.name && <p className="text-end text-red-600">{errors.name.message}</p>}
          </div>

          {/* E-posta alanı */}
          <div className="w-full " >
            <input className="w-full text-4xl text-center rounded-xl h-16"
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
