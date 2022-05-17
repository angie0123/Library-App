import './styles.css';
// Import the functions you need from the SDKs you need

import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  addDoc,
  query,
  onSnapshot,
  deleteDoc,
  doc,
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
const db = getFirestore();

function Book(title, author, pages, hasRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.hasRead = hasRead;
}

Book.prototype.toggleHasRead = function () {
  this.hasRead = !this.hasRead;
};

//adding data
async function addBookToFirebaseLibrary(book) {
  const booksRef = collection(getFirestore(), 'Books');
  try {
    await (doc(booksRef),
    {
      ...book,
    });
  } catch (error) {
    console.error('Error writing new message to Firebase database', error);
  }
}

//reading data from db
function renderLibrary() {
  const library = document.querySelector('.grid');
  const allBooksInFirestore = query(collection(db, 'Books'));

  //adds listener to query
  onSnapshot(allBooksInFirestore, (snapshot) => {
    library.replaceChildren();
    snapshot.docs.forEach((doc) => {
      library.appendChild(renderBook(doc));
    });
  });
}

function renderBook(doc) {
  const book = doc.data();
  const id = doc.id;
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
      child.textContent = book[child.className];
    }
    card.appendChild(child);
  }
  card.setAttribute('data-id', `${id}`);
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
  deleteBtn.addEventListener('click', async (event) => {
    const id = event.target.parentElement.parentElement.getAttribute('data-id');
    await deleteDoc(doc(db, 'Books', id));
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
  const bookID = await addBookToFirebaseLibrary(book);
  form.reset();
});

renderLibrary();
