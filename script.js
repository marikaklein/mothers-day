console.log("Hello, Airtable");

var Airtable = require("airtable");

var base = new Airtable({ apiKey: "key36DMlmYm8Ica1w" }).base(
  "appTz1eD3FGxYdsgU"
);
 
base("books").select({
	view: "year"
}).eachPage(gotPageOfBooks, gotAllBooks);

var books = [];

function gotPageOfBooks(records, fetchNextPage){
console.log("gotPageOfBooks()");
books.push(...records);
fetchNextPage();
}

function gotAllBooks(err){
console.log("gotAllBooks()");

if (err) {
	console.log("error loading books");
	console.error(err);
	return;
}

consoleLogBooks();
showBooks();
}

function consoleLogBooks() {
	console.log("consoleLogBooks()");
	books.forEach((book) => {
		console.log("Book:", book);
	});
}

function showBooks() {
	console.log("showBooks()");
	books.forEach((book) => {

		let bookContainer = document.createElement("div");
		bookContainer.classList.add("book-container");
		document.querySelector(".container").append(bookContainer);
	
		let bookTitle = document.createElement("h1");
		bookTitle.classList.add("book-title");
		bookTitle.innerText = book.fields.title;
		bookContainer.append(bookTitle);

		let bookAuthor = document.createElement("h2");
		bookAuthor.classList.add("book-author");
		bookAuthor.innerText = book.fields.author;
		bookContainer.append(bookAuthor);

		let bookYear = document.createElement("h3");
		bookYear.classList.add("book-year");
		bookYear.innerText = book.fields.year;
		bookContainer.append(bookYear);

		var bookCover = document.createElement("img");
		bookCover.classList.add("book-cover");
		bookCover.src = book.fields.cover[0].url;
		bookContainer.append(bookCover);

		bookContainer.addEventListener("click", function() {
			bookYear.classList.toggle("active");
			bookCover.classList.toggle("active");
		})

	});
}
