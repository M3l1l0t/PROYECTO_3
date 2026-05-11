import "./style.css";
import { searchPhotos } from "./components/Services/Unsplash";
import { createHeader } from "./components/Header/Header";
import { createGallery, renderGallery } from "./components/Gallery/Gallery";

let currentPage = 1;
let currentQuery = "nature";
let isLoading = false;

// ---------- LOADER ----------
const loader = document.getElementById("loader");

const showLoader = () => (loader.style.display = "block");
const hideLoader = () => (loader.style.display = "none");

// ---------- DARK MODE ----------
const toggleDarkMode = () => {
  document.body.classList.toggle("dark");
  localStorage.setItem(
    "darkMode",
    document.body.classList.contains("dark")
  );
};

const initDarkMode = () => {
  if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark");
  }
};

// ---------- FAVORITES ----------
const handleFavorites = () => {
  const favs = JSON.parse(localStorage.getItem("favs")) || [];
  renderGallery(favs, true);
};

// ---------- LOAD ----------
const loadPhotos = async (query, reset = false) => {
  showLoader();

  const photos = await searchPhotos(query, currentPage);

  renderGallery(photos, reset);

  hideLoader();
};

// ---------- DEBOUNCE ----------
const debounce = (fn, delay = 500) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };
};

// ---------- SEARCH ----------
const handleSearch = async (query) => {
  if (!query.trim()) return;

  currentQuery = query;
  currentPage = 1;

  await loadPhotos(query, true);

  window.scrollTo({ top: 0, behavior: "smooth" });
};

const handleSearchDebounced = debounce(handleSearch, 500);

// ---------- HOME ----------
const handleHome = async () => {
  currentQuery = "nature";
  currentPage = 1;

  await loadPhotos(currentQuery, true);
};

// ---------- SCROLL INFINITE ----------
const sentinel = document.createElement("div");
document.querySelector("main").appendChild(sentinel);

const observer = new IntersectionObserver(async (entries) => {
  if (entries[0].isIntersecting && !isLoading) {
    isLoading = true;
    currentPage++;

    await loadPhotos(currentQuery);

    isLoading = false;
  }
});

observer.observe(sentinel);

// ---------- SCROLL TOP ----------
const scrollTopBtn = document.createElement("button");
scrollTopBtn.textContent = "⬆️";
scrollTopBtn.className = "scroll-top";
scrollTopBtn.setAttribute("aria-label", "Ir arriba");

scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

window.addEventListener("scroll", () => {
  scrollTopBtn.style.display =
    window.scrollY > 300 ? "block" : "none";
});

document.body.appendChild(scrollTopBtn);

// ---------- INIT ----------
const init = async () => {
  initDarkMode();

  createHeader(handleSearchDebounced, handleHome, handleFavorites, toggleDarkMode);
  createGallery();

  await loadPhotos(currentQuery, true);
};

init();
