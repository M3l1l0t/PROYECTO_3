import "./Header.css";
export const createHeader = (onSearch, onHome, onFavs, onDark) => {
  const header = document.querySelector("header");
  header.innerHTML = "";

  const title = document.createElement("h1");
  title.textContent = "MP";

  const input = document.createElement("input");
  input.placeholder = "Search images...";

  const searchBtn = document.createElement("button");
  searchBtn.textContent = "🔍";

  const homeBtn = document.createElement("button");
  homeBtn.textContent = "🏠";

  const favBtn = document.createElement("button");
  favBtn.textContent = "⭐";

  const darkBtn = document.createElement("button");
  darkBtn.textContent = "🌙";

  const nav = document.createElement("div");
  nav.className = "nav";

  const handleSearch = () => {
    if (!input.value.trim()) return;
    onSearch(input.value);
    input.value = "";
  };

  searchBtn.addEventListener("click", handleSearch);
  input.addEventListener("keydown", (e) => e.key === "Enter" && handleSearch());

  homeBtn.addEventListener("click", onHome);
  favBtn.addEventListener("click", onFavs);
  darkBtn.addEventListener("click", onDark);

  nav.append(input, searchBtn, homeBtn, favBtn, darkBtn);
  header.append(title, nav);
};