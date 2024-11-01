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
