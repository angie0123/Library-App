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

myLibrary.push(new Book("Game of Thrones", "George R.R. Martin", 429));
addBookToLibrary();
