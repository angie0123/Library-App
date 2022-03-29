let myLibrary = [];

function Book(title, author, pages) {
  this.title = title;
  this.author = author;
  this.pages = pages;
}

function addBookToLibrary(
  title = prompt("Title"),
  author = prompt("Author"),
  pages = prompt("Pages")
) {
  myLibrary.push(new Book(title, author, pages));
  alert(myLibrary);
}

myLibrary.push(
  new Book("A Game of Thrones", "George R.R. Martin", 694),
  new Book("To Kill a Mockingbird", "Harper Lee", 281)
);

function renderLibrary() {
  const library = document.querySelector(".library");
  for (let book of myLibrary) {
    library.appendChild(renderBook(book));
  }
}

function renderBook(book) {
  const card = document.createElement("div");
  card.classList.add("book");
  card.textContent = `${book.title} by ${book.author}; ${book.pages} pages`;
  return card;
}

renderLibrary();
