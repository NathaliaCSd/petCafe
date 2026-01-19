// js/protect.js

const token = localStorage.getItem("token");

if (!token) {
  console.log("Usuário não logado → redirecionando");
  window.location.href = "./tela_login.html";
}

// Exemplo de chamada protegida:
async function getMinhaLoja() {
  try {
    const res = await fetch("http://127.0.0.1:8000/petshops/me", {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) throw new Error("Erro ao buscar loja");

    const data = await res.json();
    console.log("Minha loja:", data);

    // você pode mostrar isso no HTML aqui se quiser
  } catch (err) {
    console.error(err);
  }
}

getMinhaLoja();
