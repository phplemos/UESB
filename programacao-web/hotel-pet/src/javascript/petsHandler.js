const script = import("./script.js");

export function visualizarPet() {
  // Pega o id do pet
  const id = window.sessionStorage.getItem("idPet");
  // busca o objeto pet
  const pet = getDatasetPets().find((pet) => pet.id == id);
  console.log(pet);
  // Pega os elementos do html
  const divId = document.getElementById("id");
  const divProprietario = document.getElementById("proprietario");
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

export function listarPets(pets) {
  const corpoTabela = document.getElementById("lista-pets");
  corpoTabela.innerHTML = "";
  pets.forEach((pet) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
        <td><input type="checkbox" /></td>
        <td>${pet.id}</td>
        <td>${pet.nome}</td>
        <td>${pet.tipo}</td>
        <td>${pet.raca}</td>
        <td>${pet.tamanho}</td>
        <td class="action-buttons">
          <button onclick="navigate('pets/editar',${pet.id})" type="button">
            Editar
          </button>
          <button
            onclick="navigate('pets/visualizar', ${pet.id})" )"
            type="button"
          >
            Visualizar
          </button>
        </td>
    `;
    corpoTabela.appendChild(tr);
  });
}

export async function cadastrarPet() {
  const proprietario = document.getElementById("proprietario").value;
  const nome = document.getElementById("nome").value;
  const tipo = document.getElementById("tipo").value;
  const raca = document.getElementById("raca").value;
  const tamanho = document.getElementById("tamanho").value;
  const datasetPets = getDatasetPets();
  const id = datasetPets.length + 1;
  if (nome == "" || tipo == "" || raca == "" || tamanho == "") {
    alert("Preencha todos os campos");
    return;
  }
  const pet = { id, proprietario, nome, tipo, raca, tamanho };
  datasetPets.push(pet);
  setDatasetPets(datasetPets);
  (await script).navigate("pets");
}

export function editarPet() {
  const id = window.sessionStorage.getItem("idPet");
  const pet = getDatasetPets().find((pet) => pet.id == id);
  const nome = document.getElementById("nome");
  const tipo = document.getElementById("tipo");
  const raca = document.getElementById("raca");
  const tamanho = document.getElementById("tamanho");
  nome.value = pet.nome;
  tipo.value = pet.tipo.toLocaleLowerCase();
  raca.value = pet.raca;
  tamanho.value = pet.tamanho.toLocaleLowerCase();
}

export function listarPetsFiltrados() {
  const text = document.getElementById("busca").value;
  const tipo = document.getElementById("tipo").value;
  const datasetPets = getDatasetPets();
  const petsFiltrado = datasetPets.filter((pet) => {
    if (text == "") {
      return datasetPets;
    }
    if (tipo == "id") {
      return pet.id == text;
    }
    if (tipo == "nome") {
      let sanitizedText = text.toLowerCase();
      return pet.nome.toLocaleLowerCase().includes(sanitizedText);
    }
    if (tipo == "raca") {
      let sanitizedText = text.toLowerCase();
      return pet.raca.toLocaleLowerCase().includes(text);
    }
  });
  listarPets(petsFiltrado);
}

export function getDatasetPets() {
  if (window.sessionStorage.getItem("datasetPets")) {
    return JSON.parse(window.sessionStorage.getItem("datasetPets"));
  }
  window.sessionStorage.setItem("datasetPets", JSON.stringify(datasetPetsBase));
}

export function setDatasetPets(datasetPets) {
  window.sessionStorage.setItem("datasetPets", JSON.stringify(datasetPets));
}

export async function deletePet() {
  const id = window.sessionStorage.getItem("idPet");
  const datasetPets = getDatasetPets();
  const index = datasetPets.findIndex((pet) => pet.id == id);
  datasetPets.splice(index, 1);
  setDatasetPets(datasetPets);
  (await script).navigate("pets");
}

export async function updatePet(){
  const id = window.sessionStorage.getItem("idPet");
  const nome = document.getElementById("nome").value;
  const tipo = document.getElementById("tipo").value;
  const raca = document.getElementById("raca").value;
  const tamanho = document.getElementById("tamanho").value;
  const datasetPets = getDatasetPets();
  const index = datasetPets.findIndex((pet) => pet.id == id);
  datasetPets[index].nome = nome;
  datasetPets[index].tipo = tipo;
  datasetPets[index].raca = raca;
  datasetPets[index].tamanho = tamanho;
  setDatasetPets(datasetPets);
  (await script).navigate("pets");
}

const datasetPetsBase = [
  {
    id: 1,
    proprietario: "João Silva",
    nome: "Rex",
    tipo: "Cachorro",
    raca: "Labrador Retriever",
    tamanho: "Grande",
  },
  {
    id: 2,
    proprietario: "Maria Oliveira",
    nome: "Mingau",
    tipo: "Gato",
    raca: "Persa",
    tamanho: "Médio",
  },
  {
    id: 3,
    proprietario: "Carlos Souza",
    nome: "Bento",
    tipo: "Cachorro",
    raca: "Bulldog Francês",
    tamanho: "Pequeno",
  },
  {
    id: 4,
    proprietario: "Amanda Lima",
    nome: "Luna",
    tipo: "Gato",
    raca: "Siamês",
    tamanho: "Pequeno",
  },
  {
    id: 5,
    proprietario: "Fernanda Santos",
    nome: "Thor",
    tipo: "Cachorro",
    raca: "Golden Retriever",
    tamanho: "Grande",
  },
  {
    id: 6,
    proprietario: "Ana Costa",
    nome: "Simba",
    tipo: "Gato",
    raca: "Maine Coon",
    tamanho: "Grande",
  },
  {
    id: 7,
    proprietario: "Rafael Almeida",
    nome: "Pitchola",
    tipo: "Cachorro",
    raca: "Poodle",
    tamanho: "Pequeno",
  },
  {
    id: 8,
    proprietario: "Juliana Castro",
    nome: "Rubi",
    tipo: "Gato",
    raca: "Bengal",
    tamanho: "Médio",
  },
  {
    id: 9,
    proprietario: "Lucas Martins",
    nome: "Perola",
    tipo: "Cachorro",
    raca: "Beagle",
    tamanho: "Médio",
  },
  {
    id: 10,
    proprietario: "Camila Rocha",
    nome: "Justina",
    tipo: "Gato",
    raca: "Himalaio",
    tamanho: "Pequeno",
  },
];
