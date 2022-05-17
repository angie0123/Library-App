import './styles.css';
// Import the functions you need from the SDKs you need

import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  addDoc,
  query,
  orderBy,
  limit,
  onSnapshot,
  setDoc,
  doc,
  serverTimestamp,
} from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: 'AIzaSyAn1fQKVrCUSS4uhb8rsdMXtoiVhZ1y91U',
  authDomain: 'library-9d005.firebaseapp.com',
  projectId: 'library-9d005',
  storageBucket: 'library-9d005.appspot.com',
  messagingSenderId: '309927851294',
  appId: '1:309927851294:web:7a8c9bdcb36a6eab56050f',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

let myLibrary = [];

function Book(title, author, pages, hasRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.hasRead = hasRead;
}

Book.prototype.toggleHasRead = function () {
  this.hasRead = !this.hasRead;
};

async function addBookToFirebaseLibrary(book) {
  try {
    await addDoc(collection(getFirestore(), 'books'), {
      ...book,
    });
  } catch (error) {
    console.error('Error writing new message to Firebase database', error);
  }
}

myLibrary.push(
  new Book('To Kill a Mockingbird', 'Harper Lee', 281, false),
  new Book('A Game of Thrones', 'George R.R. Martin', 694, true)
);

function renderLibrary() {
  const library = document.querySelector('.grid');
  const allBooksInFirestore = query(collection(getFirestore(), 'books'));

  onSnapshot(allBooksInFirestore, (snapshot) => {
    snapshot.docChanges().forEach((change) => {
      if (change.type !== 'removed') {
        myLibrary.push(change.doc.data());
      }
    });
    library.replaceChildren();
    for (let book of myLibrary) {
      library.appendChild(renderBook(book));
    }
  });
}

function renderBook(book) {
  const card = document.createElement('div');
  card.classList.add('book');
  const title = document.createElement('div');
  title.classList.add('title');
  const author = document.createElement('div');
  author.classList.add('author');
  const pages = document.createElement('div');
  pages.classList.add('pages');

  const buttonsContainer = createButtons(book);

  const children = [title, author, pages];
  for (let child of children) {
    if (child === pages) {
      child.textContent = `Pages: ${book[child.className]}`;
    } else {
      console.log(child, child.className, book[child.className]);
      child.textContent = book[child.className];
    }
    card.appendChild(child);
  }
  card.setAttribute(
    'data-book-index',
    `${myLibrary.findIndex((item) => {
      return item.title == book.title;
    })}`
  );
  card.appendChild(buttonsContainer);
  return card;
}

function createButtons(book) {
  const buttonsContainer = document.createElement('div');
  buttonsContainer.classList.add('buttons');
  const hasRead = createHasReadButton(book);
  buttonsContainer.appendChild(hasRead);
  const deleteBtn = createDeleteBtn();
  buttonsContainer.appendChild(deleteBtn);
  return buttonsContainer;
}

function createDeleteBtn() {
  const deleteBtn = document.createElement('div');
  deleteBtn.classList.add('button', 'delete');
  deleteBtn.textContent = 'Delete';
  deleteBtn.addEventListener('click', () => {
    const button = event.target;
    const book = button.parentElement.parentElement;
    myLibrary.splice(book.getAttribute('data-book-index'), 1);
    renderLibrary();
  });
  return deleteBtn;
}

function createHasReadButton(book) {
  const hasRead = document.createElement('div');
  hasRead.classList.add('hasRead', 'button');
  hasRead.textContent = book.hasRead ? 'Completed' : 'In Progress';
  if (book.hasRead) hasRead.classList.add('true');
  hasRead.addEventListener('click', () => {
    hasRead.classList.toggle('true');
    book.toggleHasRead();
    hasRead.textContent = book.hasRead ? 'Completed' : 'In Progress';
  });
  return hasRead;
}

const form = document.querySelector('form');
form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const author = form.elements['author'].value;
  const title = form.elements['title'].value;
  const pages = form.elements['pages'].value;
  const hasRead = form.elements['has-read'].checked;
  const book = new Book(title, author, pages, hasRead);
  await addBookToFirebaseLibrary(book);
  form.reset();
});

renderLibrary();
