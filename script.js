// DOM Elements
const container = document.getElementById('grid-container')
const dialog = document.querySelector('dialog')
const newBookButton = document.querySelector('dialog + button')
const closeButton = document.getElementById('close')
const form = document.getElementById('book-form')

// New class declaration
class Book {
    constructor(title, author, numPages, read) {
        this.title = title,
        this.author = author,
        this.numPages = numPages
        this.read = read
    }

    info = () => {
        let hasRead = read == true ? "has read" : "has not read"
        return `${title} by ${author}, ${numPages} pages, ${hasRead}`
    }

    toggleRead = () => {
        return this.read = !this.read
    }
}

// Old Object declaration for reference
// function Book(title, author, numPages, read) {
//     this.title = title,
//     this.author = author,
//     this.numPages = numPages
//     this.read = read

//     this.info = function() {
//         let hasRead = read == true ? "has read" : "has not read"
//         return `${title} by ${author}, ${numPages} pages, ${hasRead}`
//     }
// }

// Book.prototype.toggleRead = function() {
//     return this.read = !this.read
// }

// Define library array
const myLibrary = []

// Function to add book to library
function addToLibrary(book) {
    myLibrary.push(book)
}

// Function to display books
function displayBooks(library) {
    container.innerText = ''
    library.forEach((book, index) => addCardToDisplay(book, index))
}

function addCardToDisplay(book, index) {
    let card = document.createElement('div')
    card.id = index
    card.innerText = `${book.title}
                      by ${book.author} 
                      ${book.numPages} pages 
                      Read book? ${book.read}`
    card.appendChild(createButton('Toggle Read', index, 'edit'))
    card.appendChild(createButton('Remove', index, 'remove'))            
    container.appendChild(card)
}

function createButton(text, id, className) {
    const button = document.createElement('button')
    button.textContent = text
    button.id = id
    button.classList.add(className)
    return button
}

function removeCardFromDisplay(id) {
    let element = document.getElementById(`${id}`)
    element.remove()
}

// Update book info in display
function updateBook(book, id) {
    const element = document.getElementById(id)
    element.innerText = `${book.title}
                          by ${book.author} 
                          ${book.numPages} pages 
                          Read book? ${book.read}`
    element.appendChild(createButton('Toggle Read', id, 'edit'))
    element.appendChild(createButton('Remove', id, 'remove'))
}

// Event Listeners
document.body.addEventListener('click', (event) => {
    if(event.target.classList.contains('remove')) {
        removeCardFromDisplay(event.target.id)
        myLibrary.splice(event.target.id, 1)
    } else if(event.target.classList.contains('edit')) {
        const id = event.target.id
        myLibrary[id].toggleRead()
        updateBook(myLibrary[id], id)
    }
})

newBookButton.addEventListener('click', () => { dialog.showModal() })
closeButton.addEventListener('click', () => { dialog.close() })

form.addEventListener("submit", (event) => {
    const data = new FormData(form)
    let values = Array.from(data.values())
    const newBook = new Book(...values)
    addToLibrary(newBook)
    addCardToDisplay(newBook, myLibrary.length - 1)
    newBook.toggleRead()
    form.reset()
    dialog.close()
    displayBooks(myLibrary)
    event.preventDefault()
})

// Initial Display
let hobbit = new Book("The Hobbit", "JRR Tolkein", 295, false)
let asoif = new Book("A Song of Ice and Fire", "George RR Martin", 1222, true)
let hots = new Book("House of the Scorpion", "Nancy Farmer", 350, true)

addToLibrary(hobbit)
addToLibrary(asoif)
addToLibrary(hots)
displayBooks(myLibrary)