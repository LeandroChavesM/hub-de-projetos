// Seleção de elementos do DOM
const openBtn = document.getElementById("open_btn");
const sidebar = document.getElementById("sidebar");
const sideItems = document.getElementById("side_items");
const projectIframe = document.getElementById("project");
const closeBtn = document.getElementById("close_btn");
const searchInput = document.getElementById("search-bar");
const select = document.getElementById("tagSelector");
const title = document.getElementById("title");

// Lista de projetos
const projetos = [
  {
    name: "Desafio Trilha CSS DIO",
    folder: "projects/trilha-css-desafio-01-final",
    description: "Desafio da trilha de CSS da DIO",
    tag: ["CSS"],
  },
  {
    name: "Jogo do Detona Ralph",
    folder: "projects/detona-ralph",
    description: "Jogo simples com js",
    tag: ["Javascript"],
  },
  {
    name: "Audiobook",
    folder: "projects/audiobook",
    description: "Um audiobook de Dom Casmurro",
    tag: ["Javascript"],
  },
  {
    name: "Clone Spotify",
    folder: "projects/spotify-imersao-alura",
    description: "Um clone do spotify",
    tag: ["React", "CSS", "Javascript"],
  },
];

let itemAtivo = null;

// Inicializa a aplicação
function init() {
  preencherTags();
  renderSidebar(projetos);
}

// Renderiza a lista de projetos na sidebar
function renderSidebar(lista) {
  sideItems.innerHTML = "";

  lista.forEach((proj) => {
    const li = document.createElement("li");
    li.className = "side-item";

    const a = document.createElement("a");
    a.href = `${proj.folder}/index.html`;
    a.className = "projetos";

    const icon = document.createElement("i");
    icon.className = "fa-solid fa-box";

    const span = document.createElement("span");
    span.className = "item-description";
    span.textContent = proj.name;

    a.appendChild(icon);
    a.appendChild(span);
    li.appendChild(a);
    sideItems.appendChild(li);

    if (proj.name === itemAtivo) {
      li.classList.add("active");
    }
  });
}

// Preenche o seletor de tags
function preencherTags() {
  const todasTags = [...new Set(projetos.flatMap((proj) => proj.tag))];

  select.innerHTML = "";

  const defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.textContent = "Filtrar por tag...";
  select.appendChild(defaultOption);

  todasTags.forEach((tag) => {
    const option = document.createElement("option");
    option.value = tag;
    option.textContent = tag;
    select.appendChild(option);
  });
}

// Evento para abrir/fechar a sidebar
openBtn.addEventListener("click", () => {
  sidebar.classList.toggle("open-sidebar");
});

if (itemAtivo === null) {
  closeBtn.classList.add("hidden");
}

// Evento para fechar a sidebar e limpar o iframe
closeBtn.addEventListener("click", () => {
  document.querySelectorAll(".side-item").forEach((item) => {
    item.classList.remove("active");
  });
  projectIframe.src = "";

  title.innerText = "";
  closeBtn.classList.add("hidden");
});

// Evento de clique na sidebar com delegação
sideItems.addEventListener("click", (e) => {
  const link = e.target.closest("a.projetos");
  if (!link) return;

  e.preventDefault();

  document.querySelectorAll(".side-item").forEach((item) => {
    item.classList.remove("active");
  });

  const li = link.closest("li.side-item");
  if (li) li.classList.add("active");

  itemAtivo = link.querySelector(".item-description").textContent;

  title.innerText = itemAtivo;

  projectIframe.src = link.href;
  closeBtn.classList.remove("hidden");
});

// Evento de busca dinâmica
searchInput.addEventListener("input", () => {
  const termo = searchInput.value.toLowerCase().trim();

  if (termo === "") {
    renderSidebar(projetos);
    return;
  }

  const resultado = projetos.filter((proj) =>
    proj.name.toLowerCase().includes(termo)
  );

  renderSidebar(resultado);
});

// Evento de filtro por tag
select.addEventListener("change", (e) => {
  const tagSelecionada = e.target.value;

  if (tagSelecionada === "") {
    renderSidebar(projetos);
    return;
  }

  const resultado = projetos.filter((proj) =>
    proj.tag.includes(tagSelecionada)
  );

  renderSidebar(resultado);
});

// Inicializa a aplicação ao carregar
init();
