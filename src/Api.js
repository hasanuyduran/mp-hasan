import axios from "axios";

// Axios Instance Oluşturma
const api = axios.create({
  baseURL: "http://localhost:3000/api", // API adresiniz
  timeout: 10000, // Maksimum bekleme süresi (ms)
  withCredentials: true, // Çerezlerin gönderilmesi
  headers: {
    "Content-Type": "application/json", // Varsayılan içerik türü
  },
});

// Request Interceptor: Her isteğin öncesinde çalışır
api.interceptors.request.use(
  (config) => {
    // Örneğin, Authorization token ekleyin
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // İstek hatalarını yakalayın
    return Promise.reject(error);
  }
);

// Response Interceptor: Her isteğin sonrasında çalışır
api.interceptors.response.use(
  (response) => {
    // Başarılı yanıtları işleyin
    return response;
  },
  (error) => {
    // Hata yanıtlarını işleyin
    if (error.response) {
      if (error.response.status === 401) {
        console.error("Yetkilendirme hatası! Giriş yapmanız gerekiyor.");
        // Örneğin, kullanıcıyı giriş sayfasına yönlendirin
      }
    }
    return Promise.reject(error);
  }
);

export default api;
