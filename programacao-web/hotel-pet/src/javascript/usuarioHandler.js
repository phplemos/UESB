const script = import("./script.js");

export function visualizarUsuario() {
  const idSess = window.sessionStorage.getItem("idUsuario");
  const usuario = getDatasetUsuarios().find((usuario) => usuario.id == idSess);
  const id = document.getElementById("id");
  const email = document.getElementById("email");
  const nome = document.getElementById("nome");
  const sobrenome = document.getElementById("sobrenome");
  const telefone = document.getElementById("telefone");
  const funcao = document.getElementById("funcao");
  const status = document.getElementById("status");
  const senha = document.getElementById("senha");
  const pId = document.createElement("p");
  pId.innerHTML = " " + usuario.id;
  pEmail = document.createElement("p");
  pEmail.innerHTML = " " + usuario.email;
  const pNome = document.createElement("p");
  pNome.innerHTML = " " + usuario.nome;
  const psobrenome = document.createElement("p");
  psobrenome.innerHTML = " "+ usuario.sobrenome;
  const ptelefone = document.createElement("p");
  ptelefone.innerHTML = " " + usuario.telefone;
  const pfuncao = document.createElement("p");
  pfuncao.innerHTML = " " +usuario.funcao;
  const pStatus = document.createElement("p");
  pStatus.innerHTML = " " + usuario.status;
  const psenha = document.createElement("p");
  psenha.innerHTML = "  "+ usuario.senha;
  email.appendChild(pEmail);
  nome.appendChild(pNome);
  sobrenome.appendChild(psobrenome);
  telefone.appendChild(ptelefone);
  funcao.appendChild(pfuncao);
  status.appendChild(pStatus);
  senha.appendChild(psenha);
  id.appendChild(pId)
}

export function listarUsuarios(usuarios) {
  console.log(usuarios);
  const corpoTabela = document.getElementById("lista-usuarios");
  corpoTabela.innerHTML = "";
  usuarios.forEach((usuario) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
        <td><input type="checkbox" /></td>
          <td>${usuario.id}</td>
          <td><img src="${usuario.foto}" alt="Foto do usuário" /></td>
          <td>${usuario.email}</td>
          <td>${usuario.nome}</td>
          <td>${usuario.funcao}</td>
          <td>${usuario.status}</td>
          <td>${usuario.dataCriacao}</td>
          <td class="action-buttons">
            <button onclick="navigate('usuarios/editar',${usuario.id})" type="button">
              Editar
            </button>
            <button onclick="navigate('usuarios/visualizar')" type="button">
              Visualizar
            </button>
          </td>
    `;
    corpoTabela.appendChild(tr);
  });
}

export async function cadastrarUsuario() {
  const email = document.getElementById("email");
  const nome = document.getElementById("nome");
  const sobrenome = document.getElementById("sobrenome");
  const telefone = document.getElementById("telefone");
  const funcao = document.getElementById("funcao");
  const senha = document.getElementById("senha");

  const datasetUsuario = getDatasetUsuarios();
  const id = datasetUsuario.length + 1;
  if (
    email.value == "" ||
    nome.value == "" ||
    sobrenome.value == "" ||
    telefone.value == "" ||
    funcao.value == "" ||
    senha.value == ""
  ) {
    alert("Preencha todos os campos");
    return;
  }
  const usuario = {
    id: id,
    foto: "img.jpg",
    email: email.value,
    nome: nome.value,
    sobrenome: sobrenome.value,
    telefone: telefone.value,
    funcao: funcao.value,
    dataCriacao: new Date().toISOString().split("T")[0],
    status: "ativo",
    senha: senha.value,
  };
  datasetUsuario.push(usuario);
  setDatasetUsuarios(datasetUsuario);
  (await script).navigate("usuarios");
}

export function editarUsuario() {
  const id = window.sessionStorage.getItem("idUsuario");
  const usuario = getDatasetUsuarios().find((usuario) => usuario.id == id);
  console.log(usuario);
  const email = document.getElementById("email");
  const nome = document.getElementById("nome");
  const sobrenome = document.getElementById("sobrenome");
  const telefone = document.getElementById("telefone");
  const funcao = document.getElementById("funcao");
  const status = document.getElementById("status");
  const senha = document.getElementById("senha");
  email.value = usuario.email;
  nome.value = usuario.nome;
  sobrenome.value = usuario.sobrenome;
  telefone.value = usuario.telefone;
  funcao.value = usuario.funcao.toLocaleLowerCase();
  status.value = usuario.status.toLocaleLowerCase();
  senha.value = usuario.senha;
}

export function listarUsuariosFiltrados() {
  // Captura os valores dos filtros
  const emailText = document.getElementById("emailFilter").value.trim();
  const nomeText = document.getElementById("nomeFilter").value.trim();
  const idText = document.getElementById("idFilter").value.trim();
  const criadoEmText = document.getElementById("criadoFilter").value.trim();
  const statusText = document
    .getElementById("statusFilter")
    .value.trim()
    .toLowerCase();
  const funcaoText = document
    .getElementById("funcaoFilter")
    .value.trim()
    .toLowerCase();

  const datasetUsuarios = getDatasetUsuarios();

  // Filtra os usuários
  const usuariosFiltrados = datasetUsuarios.filter((usuario) => {
    // Aplica cada filtro somente se o campo correspondente estiver preenchido
    const filtrarId = idText ? usuario.id == idText : true;
    const filtraEmail = emailText
      ? usuario.email.toLowerCase().includes(emailText.toLowerCase())
      : true;
    const filtraNome = nomeText
      ? usuario.nome.toLowerCase().includes(nomeText.toLowerCase())
      : true;
    const filtraId = idText ? usuario.id?.toString() === idText : true;
    const filtraData = criadoEmText
      ? usuario.dataCriacao === criadoEmText
      : true;
    const filtraStatus = statusText
      ? usuario.status.toLowerCase() === statusText
      : true;
    const filtraFuncao = funcaoText
      ? usuario.funcao.toLowerCase() === funcaoText
      : true;

    // Retorna true apenas se TODOS os filtros aplicáveis forem satisfeitos
    return (
      filtraEmail &&
      filtraNome &&
      filtraId &&
      filtraData &&
      filtraStatus &&
      filtraFuncao
    );
  });

  // Atualiza a exibição com os resultados filtrados
  listarUsuarios(usuariosFiltrados);
}

export function getDatasetUsuarios() {
  if (window.sessionStorage.getItem("datasetUsuarios")) {
    return JSON.parse(window.sessionStorage.getItem("datasetUsuarios"));
  }
  window.sessionStorage.setItem(
    "datasetUsuarios",
    JSON.stringify(datasetUsuarioBase)
  );
}

export function setDatasetUsuarios(datasetUsuarios) {
  window.sessionStorage.setItem(
    "datasetUsuarios",
    JSON.stringify(datasetUsuarios)
  );
}

export async function deleteUsuario() {
  const id = window.sessionStorage.getItem("idUsuario");
  const datasetUsuarios = getDatasetUsuarios();
  const index = datasetUsuarios.findIndex((usuario) => usuario.id == id);
  datasetUsuarios.splice(index, 1);
  setDatasetUsuarios(datasetUsuarios);
  (await script).navigate("usuarios");
}

export async function updateUsuario() {
  const id = window.sessionStorage.getItem("idUsuario");
  const email = document.getElementById("email");
  const nome = document.getElementById("nome");
  const sobrenome = document.getElementById("sobrenome");
  const telefone = document.getElementById("telefone");
  const funcao = document.getElementById("funcao");
  const status = document.getElementById("status");
  const senha = document.getElementById("senha");
  const datasetUsuarios = getDatasetUsuarios();
  const index = datasetUsuarios.findIndex((usuario) => usuario.id == id);
  datasetUsuarios[index].email = email.value;
  datasetUsuarios[index].nome = nome.value;
  datasetUsuarios[index].sobrenome = sobrenome.value;
  datasetUsuarios[index].telefone = telefone.value;
  datasetUsuarios[index].funcao = funcao.value;
  datasetUsuarios[index].status = status.value;
  datasetUsuarios[index].senha = senha.value;
  console.log(datasetUsuarios[index]);
  setDatasetUsuarios(datasetUsuarios);
  (await script).navigate("usuarios");
}

const datasetUsuarioBase = [
  {
    id: 1,
    foto: "https://example.com/foto1.jpg",
    email: "joao.silva@example.com",
    nome: "João",
    sobrenome: "Silva",
    funcao: "Gerente",
    status: "Ativo",
    dataCriacao: "2023-01-15",
    telefone: "(11) 91234-5678",
    senha: "123456",
  },
  {
    id: 2,
    foto: "https://example.com/foto2.jpg",
    email: "maria.oliveira@example.com",
    nome: "Maria",
    sobrenome: "Oliveira",
    funcao: "Funcionário",
    status: "Ativo",
    dataCriacao: "2022-11-10",
    telefone: "(21) 98765-4321",
    senha: "123456",
  },
  {
    id: 3,
    foto: "https://example.com/foto3.jpg",
    email: "carlos.souza@example.com",
    nome: "Carlos",
    sobrenome: "Souza",
    funcao: "Cliente",
    status: "Inativo",
    dataCriacao: "2021-05-25",
    telefone: "(31) 99874-1234",
    senha: "123456",
  },
  {
    id: 4,
    foto: "https://example.com/foto4.jpg",
    email: "fernanda.lima@example.com",
    nome: "Fernanda",
    sobrenome: "Lima",
    funcao: "Funcionário",
    status: "Ativo",
    dataCriacao: "2022-03-19",
    telefone: "(41) 91234-9876",
    senha: "123456",
  },
  {
    id: 5,
    foto: "https://example.com/foto5.jpg",
    email: "paulo.santos@example.com",
    nome: "Paulo",
    sobrenome: "Santos",
    funcao: "Cliente",
    status: "Ativo",
    dataCriacao: "2023-07-08",
    telefone: "(51) 93456-7890",
    senha: "123456",
  },
  {
    id: 6,
    foto: "https://example.com/foto6.jpg",
    email: "ana.costa@example.com",
    nome: "Ana",
    sobrenome: "Costa",
    funcao: "Gerente",
    status: "Inativo",
    dataCriacao: "2020-02-14",
    telefone: "(61) 98765-1234",
    senha: "123456",
  },
  {
    id: 7,
    foto: "https://example.com/foto7.jpg",
    email: "rafael.almeida@example.com",
    nome: "Rafael",
    sobrenome: "Almeida",
    funcao: "Funcionário",
    status: "Ativo",
    dataCriacao: "2021-12-01",
    telefone: "(71) 97654-3210",
    senha: "123456",
  },
  {
    id: 8,
    foto: "https://example.com/foto8.jpg",
    email: "juliana.castro@example.com",
    nome: "Juliana",
    sobrenome: "Castro",
    funcao: "Cliente",
    status: "Ativo",
    dataCriacao: "2023-04-22",
    telefone: "(81) 94567-8910",
    senha: "123456",
  },
  {
    id: 9,
    foto: "https://example.com/foto9.jpg",
    email: "lucas.martins@example.com",
    nome: "Lucas",
    sobrenome: "Martins",
    funcao: "Gerente",
    status: "Inativo",
    dataCriacao: "2019-09-30",
    telefone: "(91) 99876-5432",
    senha: "123456",
  },
  {
    id: 10,
    foto: "https://example.com/foto10.jpg",
    email: "camila.rocha@example.com",
    nome: "Camila",
    sobrenome: "Rocha",
    funcao: "Funcionário",
    status: "Ativo",
    dataCriacao: "2022-06-15",
    telefone: "(31) 92345-6789",
    senha: "123456",
  },
];
