const INCOMPLETE_BOOKSHELF_LIST_ID = "incompleteBookshelfList";

function addBook() {
    const incompleteBookshelfList = document.getElementById(INCOMPLETE_BOOKSHELF_LIST_ID);

    const bookTitle = document.getElementById("inputBookTitle").value;
    const bookAuthor = document.getElementById("inputBookAuthor").value;
    const bookYear = document.getElementById("inputBookYear").value;
    // const bookIsComplete = document.getElementById("inputBookIsComplete");

    for(let i = 0; i < 5; i++) {
        const bookshelf = makeListBook();
        incompleteBookshelfList.append(bookshelf);
    }
}

function makeListBook() {
    const booksTitle = document.createElement("h3");
    booksTitle.innerText = "Book Title";

    const booksAuthor = document.createElement("p");
    booksAuthor.innerText = "Penulis: John Doe";

    const booksYear = document.createElement("p");
    booksYear.innerText = "Tahun: 2002";

    const buttonDone = document.createElement("button");
    buttonDone.classList.add("green");
    buttonDone.innerText = "Selesai dibaca";

    const buttonDelete = document.createElement("button");
    buttonDelete.classList.add("red");
    buttonDelete.innerText = "Hapus buku";

    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("action");
    buttonContainer.append(buttonDone, buttonDelete);

    const container = document.createElement("article");
    container.classList.add("book_item");
    container.append(booksTitle, booksAuthor, booksYear, buttonContainer);

    return container;
}