const conteudo = document.getElementById("content");
const petsHandler = import("./petsHandler.js");
const usuarioHandler = import("./usuarioHandler.js");
const reservaHandler = import("./reservaHandler.js");

// Exportando modulos de petsHandler
window.listarPetsFiltrados = async () =>
  (await petsHandler).listarPetsFiltrados();
window.cadastrarPet = async () => (await petsHandler).cadastrarPet();
window.deletarPet = async () => (await petsHandler).deletePet();
window.updatePet = async () => (await petsHandler).updatePet();

// Exportando modulos de login e logout
window.login = login;
window.logout = logout;
window.navigate = navigate;
// Exportando modulos de usuarioHandler
window.updateUsuario = async () => (await usuarioHandler).updateUsuario();
window.listarUsuariosFiltrados = async () =>
  (await usuarioHandler).listarUsuariosFiltrados();
window.cadastrarUsuario = async () => (await usuarioHandler).cadastrarUsuario();
window.deletarUsuario = async () => (await usuarioHandler).deleteUsuario();
// Exportando modulos reservaHandler
window.updateReserva = async () => (await reservaHandler).updateReserva();
window.deletarReserva = async () => (await reservaHandler).deleteReserva();
// Inicializa o site
document.addEventListener("DOMContentLoaded", () => {
  console.log(window.sessionStorage.getItem("session"));

  if (window.sessionStorage.getItem("session")) {
    if (window.sessionStorage.getItem("historico")) {
      navigate(window.sessionStorage.getItem("historico"));
    } else {
      navigate("pets");
    }
  } else {
    navigate("login");
  }
});

// Funções de login e logout do usuário
function login() {
  window.sessionStorage.setItem("session", true);
  navigate("pets");
}

function logout() {
  window.sessionStorage.removeItem("session");
  window.sessionStorage.removeItem("historico");
  window.sessionStorage.removeItem("datasetPets");

  navigate("login");
}

// Função que gerencia a navegação entre as páginas
export async function navigate(uri, id) {
  switch (uri) {
    case "pets":
      window.sessionStorage.setItem("historico", "pets");
      await carregarPagina("pets/pets");
      (await petsHandler).listarPets((await petsHandler).getDatasetPets());
      break;
    case "pets/cadastrar":
      window.sessionStorage.setItem("historico", "pets/cadastrar");
      carregarPagina("pets/cadastrar-pet");
      break;
    case "pets/editar":
      window.sessionStorage.setItem("historico", "pets/editar");
      if (id) {
        window.sessionStorage.setItem("idPet", id);
      }
      await carregarPagina("pets/editar-pet");
      (await petsHandler).editarPet();
      break;
    case "pets/visualizar":
      window.sessionStorage.setItem("historico", "pets/visualizar");
      if (id) {
        window.sessionStorage.setItem("idPet", id);
      }
      await carregarPagina("pets/visualizar-pet");
      (await petsHandler).visualizarPet();
      break;
    case "usuarios":
      window.sessionStorage.setItem("historico", "usuarios");
      await carregarPagina("usuario/usuarios");
      (await usuarioHandler).listarUsuarios(
        (await usuarioHandler).getDatasetUsuarios()
      );
      break;
    case "usuarios/cadastrar":
      window.sessionStorage.setItem("historico", "usuarios/cadastrar");
      carregarPagina("usuario/cadastrar-usuarios");
      break;
    case "usuarios/editar":
      window.sessionStorage.setItem("historico", "usuarios/editar");
      if (id) {
        window.sessionStorage.setItem("idUsuario", id);
      }
      await carregarPagina("usuario/editar-perfil");
      (await usuarioHandler).editarUsuario();
      break;
    case "usuarios/visualizar":
      if (id) {
        window.sessionStorage.setItem("idUsuario", id);
      }
      window.sessionStorage.setItem("historico", "usuarios/visualizar");
      await carregarPagina("usuario/visualizar-perfil");
      (await usuarioHandler).visualizarUsuario();
      break;
    case "configuracoes":
      window.sessionStorage.setItem("historico", "configuracoes");
      await carregarPagina("configuracoes");
      break;
    case "reservas":
      window.sessionStorage.setItem("historico", "reservas");
      await carregarPagina("reserva/ver-reservas");
      (await reservaHandler).listarReservas(
        (await reservaHandler).getDatasetReservas()
      );
      break;
    case "reservas/cadastrar":
      window.sessionStorage.setItem("historico", "reservas/cadastrar");
      carregarPagina("reserva/cadastrar-reserva");
      break;
    case "reservas/editar":
      window.sessionStorage.setItem("historico", "reservas/editar");
      if (id) {
        window.sessionStorage.setItem("idReserva", id);
      }
      await carregarPagina("reserva/editar-reserva");
      (await reservaHandler).editarReserva();
      break;
    case "login":
      window.sessionStorage.setItem("historico", "login");
      carregarPagina("login");
      break;
    case "criar-conta":
      window.sessionStorage.setItem("historico", "criar-conta");
      carregarPagina("criar-conta");
      break;
    default:
      conteudo.innerHTML = "<h1>Página não encontrada</h1>";
      break;
  }
}

// Função que manipula o html para chamar a pagina desejada
async function carregarPagina(pagina) {
  if (pagina === "login" || pagina === "criar-conta") {
    try {
      const resposta = await fetch(`pages/${pagina}.html`);
      const html = await resposta.text();
      conteudo.innerHTML = html;
    } catch (erro) {
      conteudo.innerHTML = "<h1>Erro ao carregar página</h1>";
    }
  } else {
    try {
      // Se ja tiver carregado alguma pagina, reseta e limppa a tag main
      conteudo.innerHTML = " ";
      // Adicionando layout base do site
      const base = await fetch("pages/base.html");
      const baseHtml = await base.text();
      conteudo.innerHTML = baseHtml;
      // Adicionando conteúdo da página
      const resposta = await fetch(`pages/${pagina}.html`);
      const html = await resposta.text();
      const mainElement = document.getElementById("main-content");
      mainElement.innerHTML = html;
    } catch (erro) {
      conteudo.innerHTML = "<h1>Erro ao carregar página</h1>";
    }
  }
}
