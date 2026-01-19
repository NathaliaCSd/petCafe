// js/login.js
console.log("login.js carregado");

const $ = (sel) => document.querySelector(sel);

function setMsg(text, ok = false) {
  const el = $("#msg");
  if (!el) return;
  el.textContent = text;
  el.style.color = ok ? "green" : "red";
}

async function apiLogin(email, password) {
  const res = await fetch(`${window.API.base}${window.API.endpoints.login}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json().catch(() => null);
  if (!res.ok) throw new Error(data?.detail || data?.message || `Erro (${res.status})`);
  return data;
}

async function apiGetMyPetshop(token) {
  const res = await fetch(`${window.API.base}${window.API.endpoints.myPetshop}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });

  if (res.status === 404) return null;

  const data = await res.json().catch(() => null);
  if (!res.ok) throw new Error(data?.detail || data?.message || `Erro (${res.status}) ao buscar petshop`);
  return data;
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  if (!form) return;

  form.addEventListener("submit", async (ev) => {
    ev.preventDefault();

    const email = $("#login").value.trim();
    const password = $("#senha").value;

    if (!email || !password) {
      setMsg("Preencha email e senha.");
      return;
    }

    setMsg("Entrando...", true);

    try {
      const loginData = await apiLogin(email, password);

      const token = loginData?.access_token || loginData?.token;
      if (!token) {
        console.log("Resposta do login:", loginData);
        setMsg("Login OK, mas não veio token. Veja o console.");
        return;
      }

      localStorage.setItem("token", token);

      setMsg("Verificando sua loja...", true);
      const myPetshop = await apiGetMyPetshop(token);

      if (myPetshop) {
        localStorage.setItem("myPetshop", JSON.stringify(myPetshop));
        window.location.href = "./menu.html";
      } else {
        window.location.href = "./cadastrar_petshop.html";
      }
    } catch (err) {
      console.error(err);
      setMsg(err.message || "Erro no login");
    }
  });
});
