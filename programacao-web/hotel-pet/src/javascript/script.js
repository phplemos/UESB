const conteudo = document.getElementById("content");

window.addEventListener("load", () => {
  carregarPagina("pets");
});

async function carregarPagina(pagina) {
  if (pagina === "login") {
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
