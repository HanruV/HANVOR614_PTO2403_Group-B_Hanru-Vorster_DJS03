import { books, authors, genres, BOOKS_PER_PAGE } from "./sources/data.js";
import {
  renderBooks,
  setupDropdowns,
  setInitialTheme,
  loadMoreBooks,
  updateShowMoreButton,
  updateShowMoreButtonText,
  displayBookDetails,
  setupSearchOverlayToggle,
  setupSettingsOverlayToggle,
  setupSearchOverlayClose,
  setupSettingsOverlayClose,
  setupBookDetailsOverlayClose,
} from "./sources/ui.js";
import { changeTheme } from "./sources/settings.js";
import { filterAndDisplayBooks } from "./sources/search.js";

// tracks the current page from 1
let page = 1;
// initialising the list of matched books, showing all books from the start of the load
let matches = books;

// setting up initial book display for page
renderBooks(matches.slice(0, BOOKS_PER_PAGE));
setupDropdowns(genres, authors);

//overlay toggles
setupSearchOverlayToggle();
setupSearchOverlayClose();
setupSettingsOverlayToggle();
setupSettingsOverlayClose();
setupBookDetailsOverlayClose();

// theme initialisation and changing theme
setInitialTheme();
changeTheme();

// // update button (Show more) to display the remaining book count
// document.querySelector("[data-list-button]").innerText = `Show more (${
//   books.length - BOOKS_PER_PAGE
// })`;
// document.querySelector("[data-list-button]").enabled =
//   matches.length - page * BOOKS_PER_PAGE > 0;

// updates the (Show more) button to display the remaining number of books
// document.querySelector("[data-list-button]").innerHTML = `
//     <span>Show more</span>
//     <span class="list__remaining"> (${
//       matches.length - page * BOOKS_PER_PAGE > 0
//         ? matches.length - page * BOOKS_PER_PAGE
//         : 0
//     })</span>
// `;

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

// loads extra books when (Show more) button is clicked and updates the text in the button
const listButton = document.querySelector("[data-list-button]");
const listContainer = document.querySelector("[data-list-items]");

updateShowMoreButtonText(listButton, matches, page, BOOKS_PER_PAGE);

document.querySelector("[data-list-button]").addEventListener("click", () => {
  loadMoreBooks(matches, page, BOOKS_PER_PAGE, authors, listContainer);
  page += 1;
  updateShowMoreButton(listButton, matches, page, BOOKS_PER_PAGE);
});

// shows book details in an overlay when a book preview is clicked
document
  .querySelector("[data-list-items]")
  .addEventListener("click", (event) => {
    displayBookDetails(event, books, authors);
  });
