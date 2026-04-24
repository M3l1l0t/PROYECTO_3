import "./Card.css";
export const createCard = (item) => {
  const li = document.createElement("li");
  li.className = "card";
  li.style.backgroundImage = `url(${item.urls.small})`;

  li.setAttribute("aria-label", `Photo by ${item.user.name}`);

  const overlay = document.createElement("div");
  overlay.className = "overlay";

  const info = document.createElement("div");
  info.className = "info";

  const author = document.createElement("p");
  author.textContent = item.user.name;

  const likes = document.createElement("p");
  likes.textContent = `❤️ ${item.likes}`;

 const views = document.createElement("p");
views.textContent = `👁️ ${Math.floor(item.likes * 10)}`;

  const date = document.createElement("p");
  date.textContent = new Date(item.created_at).toLocaleDateString();

  const favBtn = document.createElement("button");
favBtn.textContent = "⭐";

// cargar favoritos existentes
let favs = JSON.parse(localStorage.getItem("favs")) || [];

// marcar si ya es favorito
if (favs.some(f => f.id === item.id)) {
  favBtn.textContent = "💛";
}

favBtn.addEventListener("click", (e) => {
  e.stopPropagation();

  let favs = JSON.parse(localStorage.getItem("favs")) || [];

  const exists = favs.some(f => f.id === item.id);

  if (exists) {
    favs = favs.filter(f => f.id !== item.id);
    favBtn.textContent = "⭐";
  } else {
    favs.push(item);
    favBtn.textContent = "💛";
  }

  localStorage.setItem("favs", JSON.stringify(favs));
});

  info.append(author, likes, views, date, favBtn);
  overlay.appendChild(info);
  li.appendChild(overlay);

  return li;
};