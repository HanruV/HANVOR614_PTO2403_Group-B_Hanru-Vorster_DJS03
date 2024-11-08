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

    this.shadowRoot.innerHTML = ``;
  }
}

customElements.define("book-preview", BookPreview);

export default BookPreview;
