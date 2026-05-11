import "./Card.css";

const getViews = () => JSON.parse(localStorage.getItem("views")) || {};
const saveViews = (views) =>
  localStorage.setItem("views", JSON.stringify(views));

export const createCard = (item) => {
  const li = document.createElement("li");
  li.className = "card";
  li.style.backgroundImage = `url(${item.urls.small})`;

  li.setAttribute(
    "aria-label",
    `Imagen de ${item.user.name}, ${item.likes} likes`
  );

  const overlay = document.createElement("div");
  overlay.className = "overlay";

  const info = document.createElement("div");
  info.className = "info";

  const author = document.createElement("p");
  author.textContent = item.user.name;

  const avatar = document.createElement("img");
  avatar.className = "profileimg";
  avatar.src = item.user.profile_image.small;
  avatar.alt = item.user.name;

  avatar.onerror = () => {
    avatar.src = "https://via.placeholder.com/40";
  };

  const likes = document.createElement("p");
  likes.textContent = `❤️ ${item.likes}`;

  const views = document.createElement("p");

  let storedViews = getViews();

  if (!storedViews[item.id]) {
    storedViews[item.id] = Math.floor(
      item.likes * 25 + Math.random() * 800
    );
    saveViews(storedViews);
  }

  views.textContent = `👁️ ${storedViews[item.id]}`;

  const date = document.createElement("p");
  date.textContent = new Date(item.created_at).toLocaleDateString();

  const favBtn = document.createElement("button");
  favBtn.textContent = "⭐";

  let favs = JSON.parse(localStorage.getItem("favs")) || [];

  if (favs.some((f) => f.id === item.id)) {
    favBtn.textContent = "💛";
  }

  favBtn.addEventListener("click", (e) => {
    e.stopPropagation();

    favs = JSON.parse(localStorage.getItem("favs")) || [];

    const exists = favs.some((f) => f.id === item.id);

    if (exists) {
      favs = favs.filter((f) => f.id !== item.id);
      favBtn.textContent = "⭐";
    } else {
      favs.push(item);
      favBtn.textContent = "💛";
    }

    localStorage.setItem("favs", JSON.stringify(favs));
  });

  info.append(author, avatar, likes, views, date, favBtn);
  overlay.appendChild(info);
  li.appendChild(overlay);

  return li;
};
