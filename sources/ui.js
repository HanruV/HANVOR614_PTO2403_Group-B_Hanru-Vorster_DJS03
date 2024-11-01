import { authors, BOOKS_PER_PAGE } from "./data.js";

// tracks the current page from 1
let page = 1;
// list of books to display
let matches = [];

// create and display the initial set of books in preview

export const renderBooks = function (displayedBooks) {
  const starting = document.createDocumentFragment();
  for (const { author, id, image, title } of displayedBooks) {
    const element = document.createElement("button");
    element.classList = "preview";
    element.setAttribute("data-preview", id);

    element.innerHTML = `
          <img
              class="preview__image"
              src="${image}"
          />
    
          <div class="preview__info">
              <h3 class="preview__title">${title}</h3>
              <div class="preview__author">${authors[author]}</div>
          </div>
      `;

    starting.appendChild(element);
  }

  document.querySelector("[data-list-items]").appendChild(starting);
};

// creates the drop down list for genre and authors
export const setupDropdowns = function (genres, authors) {
  const genreHtml = document.createDocumentFragment();
  const firstGenreElement = document.createElement("option");
  firstGenreElement.value = "any";
  firstGenreElement.innerText = "All Genres";
  genreHtml.appendChild(firstGenreElement);

  for (const [id, name] of Object.entries(genres)) {
    const element = document.createElement("option");
    element.value = id;
    element.innerText = name;
    genreHtml.appendChild(element);
  }

  document.querySelector("[data-search-genres]").appendChild(genreHtml);

  const authorsHtml = document.createDocumentFragment();
  const firstAuthorElement = document.createElement("option");
  firstAuthorElement.value = "any";
  firstAuthorElement.innerText = "All Authors";
  authorsHtml.appendChild(firstAuthorElement);

  for (const [id, name] of Object.entries(authors)) {
    const element = document.createElement("option");
    element.value = id;
    element.innerText = name;
    authorsHtml.appendChild(element);
  }

  document.querySelector("[data-search-authors]").appendChild(authorsHtml);
};

//closes any overlay in the argument
export const closeOverlay = function (overlay) {
  document.querySelector(overlay).open = false;
};

export const openOverlay = function (overlay) {
  document.querySelector(overlay).open = true;
};

// loads the theme according to the user preferences
export const setInitialTheme = function () {
  const themeElement = document.querySelector("[data-settings-theme]");

  if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    themeElement.value = "night";
    document.documentElement.style.setProperty("--color-dark", "255, 255, 255");
    document.documentElement.style.setProperty("--color-light", "10, 10, 20");
  } else {
    themeElement.value = "day";
    document.documentElement.style.setProperty("--color-dark", "10, 10, 20");
    document.documentElement.style.setProperty(
      "--color-light",
      "255, 255, 255"
    );
  }
};
