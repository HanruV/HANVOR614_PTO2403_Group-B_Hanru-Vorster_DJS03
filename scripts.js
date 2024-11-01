import { books, authors, genres, BOOKS_PER_PAGE } from "./sources/data.js";
import {
  renderBooks,
  setupDropdowns,
  closeOverlay,
  openOverlay,
  setInitialTheme,
} from "./sources/ui.js";
import { applyTheme } from "./sources/settings.js";
import { filterAndDisplayBooks } from "./sources/search.js";

// tracks the current page from 1
let page = 1;
// initialising the list of matched books, showing all books from the start of the load
let matches = books;

// setting up initial book display and theme for page
renderBooks(matches.slice(0, BOOKS_PER_PAGE));
setupDropdowns(genres, authors);
setInitialTheme();

// theme change when settings form is submitted
document
  .querySelector("[data-settings-form]")
  .addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const { theme } = Object.fromEntries(formData);

    applyTheme(theme);
    closeOverlay("[data-settings-overlay]");
  });

// update button (Show more) to display the remaining book count
document.querySelector("[data-list-button]").innerText = `Show more (${
  books.length - BOOKS_PER_PAGE
})`;
document.querySelector("[data-list-button]").enabled =
  matches.length - page * BOOKS_PER_PAGE > 0;

// updates the (Show more) button to display the remaining number of books
document.querySelector("[data-list-button]").innerHTML = `
    <span>Show more</span>
    <span class="list__remaining"> (${
      matches.length - page * BOOKS_PER_PAGE > 0
        ? matches.length - page * BOOKS_PER_PAGE
        : 0
    })</span>
`;

// closes the search overlay when the cancel button is clicked
document.querySelector("[data-search-cancel]").addEventListener("click", () => {
  closeOverlay("[data-search-overlay]");
});

// closes the settings overlay when the cancel button is clicked
document
  .querySelector("[data-settings-cancel]")
  .addEventListener("click", () => {
    closeOverlay("[data-settings-overlay]");
  });

// openens the search overlay and focus the search input
document.querySelector("[data-header-search]").addEventListener("click", () => {
  openOverlay("[data-search-overlay]");
  document.querySelector("[data-search-title]").focus();
});

// opens the settings overlay
document
  .querySelector("[data-header-settings]")
  .addEventListener("click", () => {
    openOverlay("[data-settings-overlay]");
  });

// closes the book details overlay when the close button is clicked
document.querySelector("[data-list-close]").addEventListener("click", () => {
  closeOverlay("[data-list-active]");
});

// // filters the book list based on the search criteria and updates the display
document
  .querySelector("[data-search-form]")
  .addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const filters = Object.fromEntries(formData);

    // filtering and updating display
    const result = filterAndDisplayBooks(
      books,
      filters,
      page,
      BOOKS_PER_PAGE,
      authors
    );
    matches = result.matches;
    page = result.page;
  });

// loads extra books when (Show more) button is clicked
document.querySelector("[data-list-button]").addEventListener("click", () => {
  const fragment = document.createDocumentFragment();

  for (const { author, id, image, title } of matches.slice(
    page * BOOKS_PER_PAGE,
    (page + 1) * BOOKS_PER_PAGE
  )) {
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

    fragment.appendChild(element);
  }

  document.querySelector("[data-list-items]").appendChild(fragment);
  page += 1;
});

// shows book details in an overlay when a book preview is clicked
document
  .querySelector("[data-list-items]")
  .addEventListener("click", (event) => {
    const pathArray = Array.from(event.path || event.composedPath());
    let active = null;

    for (const node of pathArray) {
      if (active) break;

      if (node?.dataset?.preview) {
        let result = null;

        for (const singleBook of books) {
          if (result) break;
          if (singleBook.id === node?.dataset?.preview) result = singleBook;
        }

        active = result;
      }
    }

    if (active) {
      document.querySelector("[data-list-active]").open = true;
      document.querySelector("[data-list-blur]").src = active.image;
      document.querySelector("[data-list-image]").src = active.image;
      document.querySelector("[data-list-title]").innerText = active.title;
      document.querySelector("[data-list-subtitle]").innerText = `${
        authors[active.author]
      } (${new Date(active.published).getFullYear()})`;
      document.querySelector("[data-list-description]").innerText =
        active.description;
    }
  });
