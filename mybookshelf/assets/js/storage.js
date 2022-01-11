const storageKey = "MY_BOOKSHELF";

let bookshelfs = [];

function isStorageExist() {
    if(typeof(Storage) === undefined) {
        alert("Browser Anda tidak mendukung Web Storage");
        return false;
    }
    return true;
}

function saveData() {
    const parsed = JSON.stringify(bookshelfs);
    localStorage.setItem(storageKey, parsed);
    document.dispatchEvent(new Event("ondatasaved"));
}

function loadDataFromStorage() {
    const serializedData = localStorage.getItem(storageKey);

    let storage = JSON.parse(serializedData);

    if(storage !== null) 
        bookshelfs = storage;
    
    document.dispatchEvent(new Event("ondataloaded"));
}

function updateDataToStorage() {
    if(isStorageExist()) 
        saveData();
    
}

function composeBookshelfObject(title, author, year, isComplete) {
    return {
        id: +new Date(),
        title,
        author,
        year,
        isComplete
    };
}

function findBookshelf(bookshelfId) {
    for(bookshelf of bookshelfs) {
        if(bookshelf.id === bookshelfId)
            return bookshelf;
    }
    return null;
}

function findBookshelfIndex(bookshelfId) {
    let index = 0;
    for(bookshelf of bookshelfs) {
        if(bookshelf.id === bookshelfId)
            return index;

        index++;
    }

    return -1;
}

function refreshDataFromBookshelfs() {
    const bookUnread = document.getElementById(UNREAD_BOOKSHELF_ID);
    let readBookshelf = document.getElementById(READ_BOOKSHELF_ID);

    for(bookshelf of bookshelfs) {
        const newBookshelf = makeBookshelf(bookshelf.title, bookshelf.author, bookshelf.year, bookshelf.isComplete);
        newBookshelf[BOOKSHELF_BOOKID] = bookshelf.id;

        if(bookshelf.isComplete) {
            readBookshelf.append(newBookshelf);
        } else {
            bookUnread.append(newBookshelf);
        }
    }
}