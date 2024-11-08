class BookPreview extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get observedAttributes() {
    return ["image", "title", "author", "id"];
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const image = this.getAttribute("image");
    const title = this.getAttribute("title");
    const author = this.getAttribute("author");
    const id = this.getAttribute("id");

    this.shadowRoot.innerHTML = /*html*/ `
    <button class="preview" data-preview="${id}">
        <img class="preview__image" src="${image}" />
        <div class="preview__info">
          <h3 class="preview__title">${title}</h3>
          <div class="preview__author">${author}</div>
        </div>
      </button>`;
  }
}

customElements.define("book-preview", BookPreview);

export default BookPreview;
