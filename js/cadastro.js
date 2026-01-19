// js/user.js
console.log("user.js carregado");

function setMsg(text, ok = false) {
  const el = document.getElementById("msg");
  if (!el) return;
  el.textContent = text;
  el.style.color = ok ? "green" : "red";
}

async function registerMerchant({ name, email, password }) {
  const res = await fetch(`${window.API.base}${window.API.endpoints.registerMerchant}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });

  const data = await res.json().catch(() => null);
  if (!res.ok) throw new Error(data?.detail || data?.message || `Erro (${res.status})`);
  return data;
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registerForm");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("senha").value;

    if (!name || !email || !password) {
      setMsg("Preencha nome, email e senha.");
      return;
    }

    setMsg("Enviando...", true);

    try {
      await registerMerchant({ name, email, password });
      setMsg("Lojista cadastrado com sucesso!", true);
      form.reset();
    } catch (err) {
      setMsg(err.message || "Erro ao cadastrar");
      console.error(err);
    }
  });
});
