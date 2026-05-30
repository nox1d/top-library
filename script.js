const grid = document.getElementsByClassName("wrapper")[0];
const dialog = document.getElementById("add-book-dialog");
const closeBtn = document.getElementById("close-btn");
const confirmBtn = document.getElementById("confirm-btn");
const myLibrary = [];

function Book(title, author, pages, read) {
  if (!new.target) {
    throw "You must use the new keyword to instantiate new books!"
  }
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

Book.prototype.setReadStatus = function() {
  this.read = !this.read;
  showBooks(myLibrary, grid);
  console.log(`${this.title} read status: ${this.read}`);
}

closeBtn.addEventListener("click", (e) => {
  e.preventDefault();
  dialog.close()
});

dialog.addEventListener("submit", (e) => {
  const form = dialog.querySelector("form");
  const formData = new FormData(form);
  const bookData = Object.fromEntries(formData.entries());

  addBookToLibrary(new Book(bookData.title, bookData.author, bookData.pages, bookData.read));
  showBooks(myLibrary, grid);


  dialog.close(JSON.stringify(bookData));
});

dialog.addEventListener("close", () => {
  console.log(dialog.returnValue);
})


const book1 = new Book("The Book", "Andy Man", 420, false);
const book2 = new Book("Dolphin Paradise", "The Deep", 67, true);
const book3 = new Book("Black", "Black Noir", 100, false);
const book4 = new Book("Scorched Earth", "Homelander", 1234, true);

addBookToLibrary(book1);
addBookToLibrary(book2);
addBookToLibrary(book3);
addBookToLibrary(book4);

console.log(myLibrary);


function removeBook(id) {
  const bookCard = document.querySelector(`[data-id="${id}"]`);
  const index = myLibrary.findIndex(book => book.id === id);
  if (index > -1) {
    myLibrary.splice(index, 1);
    bookCard.remove();
  }
}

function createBookCard(book) {
  const card = document.createElement("div");
  card.classList.add("card");
  
  const id = document.createElement("p");
  const idText = document.createTextNode(book.id);
  id.classList.add("id");
  id.appendChild(idText);

  const title = document.createElement("p");
  const titleText = document.createTextNode(book.title);
  title.classList.add("title");
  title.appendChild(titleText);
  
  const author = document.createElement("p");
  const authorText = document.createTextNode(book.author);
  author.classList.add("author");
  author.appendChild(authorText);

  const pages = document.createElement("p");
  const pagesText = document.createTextNode(book.pages);
  pages.classList.add("pages");
  pages.appendChild(pagesText);


  const read = document.createElement("p");
  const readText = document.createTextNode(book.read ? "Already read." : "Haven't been read.");
  read.classList.add("read");
  read.appendChild(readText);

  const readBtn = document.createElement("button");
  readBtn.classList.add("read-btn");
  readBtn.textContent = "Change Read Status";

  const removeBtn = document.createElement("button");
  removeBtn.textContent = "Remove";
  
  card.append(id, title, author, pages, read, readBtn, removeBtn);
  card.dataset.id = book.id;

  readBtn.addEventListener("click", () => book.setReadStatus());
  removeBtn.addEventListener("click", () => removeBook(book.id));

  return card

}

function showBooks(arr, grid) {
  grid.textContent = "";
  for (let i of arr) {
    let card = createBookCard(i);
    grid.appendChild(card);
  }

}

showBooks(myLibrary, grid); 