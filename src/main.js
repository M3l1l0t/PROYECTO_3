import "./style.css";
import { createApi } from "unsplash-js";

// ================= API =================
const unsplash = createApi({
  accessKey: import.meta.env.VITE_ACCESS_KEY,
});

// ================= STATE =================
let currentPage = 1;
let currentQuery = "nature";
let isLoading = false;

// ================= LOADER =================
const loader = document.querySelector("#loader");

const showLoader = () => (loader.style.display = "block");
const hideLoader = () => (loader.style.display = "none");

// ================= API =================
const searchPhotos = async (keyword, page = 1) => {
  return await unsplash.search.getPhotos({
    query: keyword,
    page,
    perPage: 30,
  });
};

// ================= HEADER =================
const headerTemplate = () => `
  <h1>P</h1>

  <input id="searchinput" placeholder="Search images..." />

  <button id="searchbtn" class="icon-btn">🔍</button>
  <button id="darkmodebtn" class="icon-btn">🌙</button>
`;

const headerListeners = () => {
  document.querySelector("#darkmodebtn").addEventListener("click", () => {
    document.body.classList.toggle("dark");
  });
};

const printHeader = () => {
  document.querySelector("header").innerHTML = headerTemplate();
  headerListeners();
};

// ================= FOOTER =================
const footerTemplate = () => `
  <h4>Inspirest - Pinterest Clone</h4>
`;

const printFooter = () => {
  document.querySelector("footer").innerHTML = footerTemplate();
};

// ================= CARD PRO =================
const cardTemplate = (item) => `
  <li class="card"
    style="background-image:url(${item.urls.small}); border: 10px solid ${item.color};"
  >

    <button class="save-btn">Guardar</button>

    <div class="overlay">

      <a class="link" href="${item.links.html}" target="_blank">
        Ver
      </a>

      <a class="link" href="${item.urls.full}" target="_blank">
        Descargar
      </a>

    </div>

  </li>
`;

// ================= RENDER =================
const printItems = (items, reset = false) => {
  const gallery = document.querySelector(".gallery");

  if (reset) gallery.innerHTML = "";

  let html = "";
  items.forEach(item => html += cardTemplate(item));

  gallery.innerHTML += html;
};

// ================= SEARCH =================
const galleryListeners = () => {
  const input = document.querySelector("#searchinput");
  const btn = document.querySelector("#searchbtn");

  const search = async () => {
    if (!input.value.trim()) return;

    currentQuery = input.value;
    currentPage = 1;

    showLoader();

    const res = await searchPhotos(currentQuery, currentPage);

    hideLoader();

    if (res?.response?.results) {
      printItems(res.response.results, true);
    }
  };

  btn.addEventListener("click", search);
  input.addEventListener("keypress", e => e.key === "Enter" && search());
};

// ================= SCROLL =================
const handleScroll = async () => {
  if (isLoading) return;

  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  if (scrollTop + clientHeight >= scrollHeight - 120) {
    isLoading = true;
    currentPage++;

    const res = await searchPhotos(currentQuery, currentPage);

    if (res?.response?.results) {
      printItems(res.response.results);
    }

    isLoading = false;
  }
};

// ================= INIT =================
const init = async () => {
  document.querySelector("main").innerHTML = `<ul class="gallery"></ul>`;

  printHeader();
  printFooter();
  galleryListeners();

  showLoader();

  const res = await searchPhotos(currentQuery, currentPage);

  hideLoader();

  if (res?.response?.results) {
    printItems(res.response.results, true);
  }

  window.addEventListener("scroll", handleScroll);
};

init();