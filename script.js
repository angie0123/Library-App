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
  new Book("To Kill a Mockingbird", "Harper Lee", 281, false),
  new Book("A Game of Thrones", "George R.R. Martin", 694, true)
);

function renderLibrary() {
  const library = document.querySelector(".grid");
  library.replaceChildren();
  for (let book of myLibrary) {
    library.appendChild(renderBook(book));
  }
}

function renderBook(book) {
  const card = document.createElement("div");
  card.classList.add("book");
  const title = document.createElement("div");
  title.classList.add("title");
  const author = document.createElement("div");
  author.classList.add("author");
  const pages = document.createElement("div");
  pages.classList.add("pages");
  const hasRead = document.createElement("div");
  const buttonsContainer = document.createElement("div");
  buttonsContainer.classList.add("buttons");
  hasRead.classList.add("hasRead", "button");
  if (book.hasRead) hasRead.classList.add("true");
  hasRead.addEventListener("click", () => {
    hasRead.classList.toggle("true");
    book.hasRead = !book.hasRead;
    hasRead.textContent = book.hasRead ? "Completed" : "In Progress";
  });
  const children = [title, author, pages];
  for (let child of children) {
    if (child == pages) {
      child.textContent = `Pages: ${book[child.className]}`;
    } else {
      child.textContent = book[child.className];
    }
    card.appendChild(child);
  }
  buttonsContainer.appendChild(hasRead);
  hasRead.textContent = book.hasRead ? "Completed" : "In Progress";
  const deleteBtn = document.createElement("div");
  deleteBtn.classList.add("button", "delete");
  deleteBtn.textContent = "Delete";
  deleteBtn.addEventListener("click", () => {
    myLibrary.splice(card.getAttribute("data-book-index"), 1);
    renderLibrary();
  });
  buttonsContainer.appendChild(deleteBtn);
  card.setAttribute(
    "data-book-index",
    `${myLibrary.findIndex((item) => {
      return item.title == book.title;
    })}`
  );
  card.appendChild(buttonsContainer);
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
