import "./style.css";
import { searchPhotos } from "./components/Services/Unsplash";
import { createHeader } from "./components/Header/Header";
import { createGallery, renderGallery } from "./components/Gallery/Gallery";

let currentPage = 1;
let currentQuery = "nature";
let isLoading = false;

// ---------- DARK MODE ----------
const toggleDarkMode = () => {
  document.body.classList.toggle("dark");
  localStorage.setItem("darkMode", document.body.classList.contains("dark"));
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
  const photos = await searchPhotos(query, currentPage);
  renderGallery(photos, reset);
};

// ---------- SEARCH ----------
const handleSearch = async (query) => {
  if (!query.trim()) return;

  currentQuery = query;
  currentPage = 1;

  await loadPhotos(query, true);
  window.scrollTo(0, 0);
};

// ---------- HOME ----------
const handleHome = async () => {
  currentQuery = "nature";
  currentPage = 1;

  await loadPhotos(currentQuery, true);
};

// ---------- SCROLL ----------
const handleScroll = async () => {
  if (isLoading) return;

  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  if (scrollTop + clientHeight >= scrollHeight - 100) {
    isLoading = true;
    currentPage++;

    await loadPhotos(currentQuery);

    isLoading = false;
  }
};

// ---------- SCROLL TOP ----------
const scrollTopBtn = document.createElement("button");
scrollTopBtn.textContent = "⬆️";
scrollTopBtn.className = "scroll-top";

scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

document.body.appendChild(scrollTopBtn);

// ---------- INIT ----------
const init = async () => {
  initDarkMode();

  createHeader(handleSearch, handleHome, handleFavorites, toggleDarkMode);
  createGallery();

  await loadPhotos(currentQuery, true);

  window.addEventListener("scroll", handleScroll);
};

init();