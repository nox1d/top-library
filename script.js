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

const book1 = new Book("The Book", "Andy Man", 420, false);
const book2 = new Book("Dolphin Paradise", "The Deep", 67, true);
const book3 = new Book("Black", "Black Noir", 100, false);

addBookToLibrary(book1);
addBookToLibrary(book2);
addBookToLibrary(book3);

console.log(myLibrary);