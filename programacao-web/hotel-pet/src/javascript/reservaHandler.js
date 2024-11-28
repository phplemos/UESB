const script = import("./script.js");

export function visualizarUsuario() {
  // Pega o id do usuario
  const id = window.sessionStorage.getItem("idUsuario");
  // busca o objeto usuario
  const usuario = getDatasetUsuarios().find((usuario) => usuario.id == id);
  // Pega os elementos do html
  const divId = document.getElementById("id");
  const divEmail = document.getElementById("email");
  const divNome = document.getElementById("nome");
  const divTipo = document.getElementById("tipo");
  const divRaca = document.getElementById("raca");
  const divTamanho = document.getElementById("tamanho");
  // Adiciona o conteudo do objeto pet nos elementos do html
  const pId = document.createElement("p");
  pId.innerHTML = " " + pet.id;
  const proprietario = document.createElement("p");
  proprietario.innerHTML = " " + pet.proprietario;
  const nome = document.createElement("p");
  nome.innerHTML = " " + pet.nome;
  const tipo = document.createElement("p");
  tipo.innerHTML = " " + pet.tipo;
  const raca = document.createElement("p");
  raca.innerHTML = " " + pet.raca;
  const tamanho = document.createElement("p");
  tamanho.innerHTML = " " + pet.tamanho;
  // Adiciona os elementos no html
  divId.appendChild(pId);
  divProprietario.appendChild(proprietario);
  divNome.appendChild(nome);
  divTipo.appendChild(tipo);
  divRaca.appendChild(raca);
  divTamanho.appendChild(tamanho);
}

export function listarReservas(reservas) {
  const corpoTabela = document.getElementById("lista-reservas");
  corpoTabela.innerHTML = "";
  reservas.forEach((reserva) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
        <td><input type="checkbox" /></td>
          <td>${reserva.id}</td>
          <td>${reserva.proprietario}</td>
          <td>${reserva.pet}</td>
          <td>${reserva.chegada}</td>
          <td>${reserva.partida}</td>
          <td>${reserva.notas}</td>
          <td>${reserva.anotacoesFuncionarios}</td>
          <td>${reserva.imagens.length}</td>
          <td>${reserva.status}</td>
          <td>${reserva.totalDiarias}</td>
          <td>${reserva.recibo}</td>
          <td>${reserva.criadoEm}</td>
          <td>${reserva.atualizadoEm}</td>
          <td class="action-buttons">
            <button onclick="navigate('reservas/editar',${reserva.id})" type="button">
              Editar
            </button>
            <button onclick="navigate('reservas/visualizar')" type="button">
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

export function editarReserva() {
  const id = window.sessionStorage.getItem("idReserva");
  const reserva = getDatasetReservas().find((reserva) => reserva.id == id);
  const proprietario = document.getElementById("proprietario");
  const pet = document.getElementById("pet");
  const chegada = document.getElementById("data-inicio");
  const partida = document.getElementById("data-fim");
  const notas = document.getElementById("notas");
  const status = document.getElementById("status");
  const totalDiarias = document.getElementById("total-diarias");

  proprietario.value = reserva.proprietario;
  pet.value = reserva.pet;
  chegada.value = reserva.chegada;
  partida.value = reserva.partida;
  notas.value = reserva.notas;
  status.value = reserva.status.toLowerCase();
  totalDiarias.value = reserva.totalDiarias;
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

export function getDatasetReservas() {
  if (window.sessionStorage.getItem("datasetReservas")) {
    return JSON.parse(window.sessionStorage.getItem("datasetReservas"));
  }
  window.sessionStorage.setItem(
    "datasetReservas",
    JSON.stringify(datasetReservaBase)
  );
}

export function setDatasetReservas(datasetReserva) {
  window.sessionStorage.setItem(
    "datasetReservas",
    JSON.stringify(datasetReserva)
  );
}

export async function deleteReserva() {
  const id = window.sessionStorage.getItem("idReserva");
  const datasetReservas = getDatasetReservas();
  const index = datasetReservas.findIndex((reserva) => reserva.id == id);
  datasetReservas.splice(index, 1);
  setDatasetReservas(datasetReservas);
  (await script).navigate("reservas");
}

export async function updateReserva() {
  const id = window.sessionStorage.getItem("idReserva");
  const proprietario = document.getElementById("proprietario");
  const pet = document.getElementById("pet");
  const chegada = document.getElementById("data-inicio");
  const partida = document.getElementById("data-fim");
  const notas = document.getElementById("notas");
  const status = document.getElementById("status");
  const totalDiarias = document.getElementById("total-diarias");
  const datasetReservas = getDatasetReservas();
  const index = datasetReservas.findIndex((reserva) => reserva.id == id);

  datasetReservas[index].id = id;
  datasetReservas[index].proprietario = proprietario.value;
  datasetReservas[index].pet = pet.value;
  datasetReservas[index].chegada = chegada.value;
  datasetReservas[index].partida = partida.value;
  datasetReservas[index].notas = notas.value;
  datasetReservas[index].status = status.value;
  datasetReservas[index].totalDiarias = totalDiarias.value;
  setDatasetReservas(datasetReservas);
  (await script).navigate("reservas");
}

const datasetReservaBase = [
  {
    id: 1,
    proprietario: "João da Silva",
    pet: "Max",
    chegada: "2023-01-10",
    partida: "2023-01-15",
    notas: "Pet muito amigável e dócil.",
    anotacoesFuncionarios: "Precisa de cuidados especiais na alimentação.",
    imagens: [
      "https://example.com/pet1-img1.jpg",
      "https://example.com/pet1-img2.jpg",
    ],
    status: "Finalizada",
    totalDiarias: "R$ 200,00",
    recibo: "recibo1.pdf",
    criadoEm: "2023-01-09",
    atualizadoEm: "2023-01-16",
  },
  {
    id: 2,
    proprietario: "Maria Oliveira",
    pet: "Bella",
    chegada: "2023-02-05",
    partida: "2023-02-10",
    notas: "Pet com dificuldade para socializar.",
    anotacoesFuncionarios: "Reage melhor quando passeia ao ar livre.",
    imagens: [
      "https://example.com/pet2-img1.jpg",
      "https://example.com/pet2-img2.jpg",
    ],
    status: "Em andamento",
    totalDiarias: "R$ 250,00",
    recibo: "recibo2.pdf",
    criadoEm: "2023-02-01",
    atualizadoEm: "2023-02-05",
  },
  {
    id: 3,
    proprietario: "Carlos Souza",
    pet: "Luna",
    chegada: "2023-03-15",
    partida: "2023-03-20",
    notas: "Precisa de acompanhamento veterinário.",
    anotacoesFuncionarios: "Foi administrado remédio contra pulgas.",
    imagens: ["https://example.com/pet3-img1.jpg"],
    status: "Cancelada",
    totalDiarias: "R$ 0,00",
    recibo: "recibo3.pdf",
    criadoEm: "2023-03-10",
    atualizadoEm: "2023-03-12",
  },
  {
    id: 4,
    proprietario: "Fernanda Lima",
    pet: "Toby",
    chegada: "2023-04-12",
    partida: "2023-04-18",
    notas: "Pet hiperativo, precisa de atenção constante.",
    anotacoesFuncionarios:
      "Foi necessário ajustar a dieta para evitar problemas digestivos.",
    imagens: [
      "https://example.com/pet4-img1.jpg",
      "https://example.com/pet4-img2.jpg",
      "https://example.com/pet4-img3.jpg",
    ],
    status: "Finalizada",
    totalDiarias: "R$ 300,00",
    recibo: "recibo4.pdf",
    criadoEm: "2023-04-10",
    atualizadoEm: "2023-04-19",
  },
];
