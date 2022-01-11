const UNREAD_BOOKSHELF_ID = "unread";
const READ_BOOKSHELF_ID = "read";
const BOOKSHELF_BOOKID = "bookId";

function addBook() {
    const unreadBookshelf = document.getElementById(UNREAD_BOOKSHELF_ID);

    const titleBook = document.getElementById("inputBookTitle").value;
    const authorBook = document.getElementById("inputBookAuthor").value;
    const yearBook = document.getElementById("inputBookYear").value;

    const bookshelf = makeBookshelf(titleBook, authorBook, yearBook, false);
    const bookshelfObject = composeBookshelfObject(titleBook, authorBook, yearBook, false);
    
    bookshelf[BOOKSHELF_BOOKID] = bookshelfObject.id;
    bookshelfs.push(bookshelfObject);
    
    unreadBookshelf.append(bookshelf);
    updateDataToStorage();

}

function makeBookshelf(title, author, year, isComplete) {
    const textTitle = document.createElement("h3");
    textTitle.innerText = title;

    const textAuthor = document.createElement("p");
    textAuthor.innerText = author;

    const textYear = document.createElement("span");
    textYear.innerText = year;

    const textContainer = document.createElement("div");
    textContainer.classList.add("book-detail");
    textContainer.append(textTitle, textAuthor, textYear);

    const container = document.createElement("article");
    container.classList.add("book-item");
    container.append(textContainer);

    if (isComplete) {
        container.append(
            createUndoButton(),
            createDeleteButton()
        );
    } else {
        container.append(
            createReadButton(),
            createDeleteButton()
            );
    }

    return container;
}

function createButton(buttonTypeClass, eventListener) {
    const button = document.createElement("button");
    button.classList.add(buttonTypeClass);
    button.addEventListener("click", function (event) {
        eventListener(event);
    });
    return button;
}

function addBookRead(readElement) {
    const readBookshelf = document.getElementById(READ_BOOKSHELF_ID);
    const readTitle = readElement.querySelector(".book-detail > h3").innerText;
    const readAuthor = readElement.querySelector(".book-detail > p").innerText;
    const readYear = readElement.querySelector(".book-detail > span").innerText;

    const newBookshelf = makeBookshelf(readTitle, readAuthor, readYear, true);
    const bookshelf = findBookshelf(readElement[BOOKSHELF_BOOKID]);
    bookshelf.isComplete = true;
    newBookshelf[BOOKSHELF_BOOKID] = bookshelf.id;

    readBookshelf.append(newBookshelf);
    readElement.remove();

    updateDataToStorage();
}

function createReadButton() {
    return createButton("btn-read", function (event) {
        addBookRead(event.target.parentElement);
    });
}

function removeBookFromRead(readElement) {
    let span = document.getElementsByClassName("close")[0];
    let modal = document.getElementById("modal");
    let btnCancel = document.getElementById("nodelete");
    let btnDelete = document.getElementById("vdelete");

    modal.style.display = "block";
    btnDelete.addEventListener("click", function () {
        modal.style.display = "none";

        const bookshelfPosition = findBookshelfIndex(readElement[BOOKSHELF_BOOKID]);
        bookshelfs.splice(bookshelfPosition, 1);
        readElement.remove();
        updateDataToStorage();
    });

    btnCancel.addEventListener("click", function () {
        modal.style.display = "none";
        updateDataToStorage();
    });

    span.onclick = function () {
        modal.style.display = "none";
    }

}

function createDeleteButton() {
    return createButton("btn-delete", function (event) {
        removeBookFromRead(event.target.parentElement);
    });
}

function undoBookRead(readElement) {
    const bookUnread = document.getElementById(UNREAD_BOOKSHELF_ID);
    const readTitle = readElement.querySelector(".book-detail > h3").innerText;
    const readAuthor = readElement.querySelector(".book-detail > p").innerText;
    const readYear = readElement.querySelector(".book-detail > span").innerText;

    
    const newBookshelf = makeBookshelf(readTitle, readAuthor, readYear, false);

    const bookshelf = findBookshelf(readElement[BOOKSHELF_BOOKID]);
    bookshelf.isComplete = false;
    newBookshelf[BOOKSHELF_BOOKID] = bookshelf.id;

    bookUnread.append(newBookshelf);
    readElement.remove();

    updateDataToStorage();
}

function createUndoButton() {
    return createButton("btn-undo", function (event) {
        undoBookRead(event.target.parentElement);
    });
}

function searchBookTitle() {
    let input, filter, inner, article, h3, titleValue;
    input = document.getElementById('searchBook');
    filter = input.value.toUpperCase();
    inner = document.getElementById("filter");
    article = inner.getElementsByTagName('article');

    for (let i = 0; i < article.length; i++) {
        h3 = article[i].getElementsByTagName("h3")[0];
        titleValue = h3.textContent || h3.innerText;
        console.log(h3);
        if (titleValue.toUpperCase().indexOf(filter) > -1) {
            article[i].style.display = "";
        } else {
            article[i].style.display = "none";
        }
    }
}