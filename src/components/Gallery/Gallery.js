import { createCard } from "../Card/Card";

export const createGallery = () => {
  const main = document.querySelector("main");
  main.innerHTML = "";

  const ul = document.createElement("ul");
  ul.className = "gallery";

  main.appendChild(ul);
};

export const renderGallery = (items, reset = false) => {
  const gallery = document.querySelector(".gallery");

  if (!items.length) {
    gallery.innerHTML = "<p>No results found</p>";
    return;
  }

  if (reset) gallery.innerHTML = "";

  items.forEach((item) => {
    const card = createCard(item);
    gallery.appendChild(card);
  });
};