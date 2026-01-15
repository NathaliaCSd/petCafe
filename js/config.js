console.log("config carregado", window.API);

// js/config.js
window.API = {
  base: "http://127.0.0.1:8000",
  endpoints: {
    registerMerchant: "/auth/register-merchant",
    login: "/auth/login",
    me: "/users/me"
  }
};
