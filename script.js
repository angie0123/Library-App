let myLibrary = [];

function Book(title, author, pages, hasRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.hasRead = hasRead;
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

myLibrary.push(
  new Book("A Game of Thrones", "George R.R. Martin", 694, true),
  new Book("To Kill a Mockingbird", "Harper Lee", 281, false)
);

function renderLibrary() {
  const library = document.querySelector(".library");
  library.replaceChildren();
  for (let book of myLibrary) {
    library.appendChild(renderBook(book));
  }
}

function renderBook(book) {
  const card = document.createElement("div");
  card.classList.add("book");
  card.textContent = `${book.title} by ${book.author}; ${book.pages} pages; ${
    book.hasRead ? "Read" : "Not Read"
  }`;
  return card;
}

const form = document.querySelector("form");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const author = form.elements["author"].value;
  const title = form.elements["title"].value;
  const pages = form.elements["pages"].value;
  const hasRead = form.elements["has-read"].checked;
  const book = new Book(author, title, pages, hasRead);
  addBookToLibrary(book);
  renderLibrary();
  form.reset();
});

renderLibrary();
