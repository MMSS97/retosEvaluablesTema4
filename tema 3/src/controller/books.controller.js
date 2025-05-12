const { request } = require("http");
const Book = require("../models/books")

let books = [
    new Book(5, 5, "Blcancanieves", "cuento", "disney", 10, "blanca"),
    new Book(2, 1, "Caperucita Roja", "cuento", "disney", 10, "cape"),
    new Book(3, 2, "Cenicienta", "cuento", "disney", 10, "ceni"),
    new Book (4,5, "Así habló Zaratustra","Filosofía","Nietzsche",9,"/assets/imagenes/asi hablo z.jpg"),
    new Book(123,333,"El Principito","Novela corta", "Antoine de Saint-Exupéry",8,"/assets/imagenes/el principito.jpg"),
    new Book (588,4,"El alquimista", "Novela", "Paulo Cohelo", 12,"/assets/imagenes/el alquimissta.jpg"),
    new Book (488,645,"Romper la barrera del no","Manual de negociación","Chris Voss",20,"/assets/imagenes/romper la barrera.jpg"),   
    new Book(92929,933,"BE 2.0","Empresa","Jim Collier y Bill Lazier",25,"/assets/imagenes/be 2.0.jpg"),
    new Book (124,333,"la practica de la inteligencia emocional","Psicologia","D. Goleman",12,"/assets/imagenes/inteligencia.jpg"),
    new Book (233,5544,"Crianza activa","Educacion","Nora Kurtin",15,"/assets/imagenes/crianza.jpg")
]
function getStart(req, res) {
    let answer = { error: true, code: 200, message: "Punto de inicio" };
    res.send(answer);
  }
function getAll (req, res) {
    res.send(books)
};


function getBookQuery(request, response) {
    let id = request.query.id;
    let respuesta;

    if (books.length > 0 && (!id || books.some(book => book.id_book == id))) {
 
        const data = id ? books.find(book => book.id_book == id) : books;
        respuesta = {error: false, codigo: 200, mensaje: data};
    } else {
        respuesta = {error: true, codigo: 200, mensaje: "No se encontraron libros"};
    }

    response.send(respuesta);
}
function getBookById(request, response) {
    let id = request.params.id;
    let respuesta;
    
    let libroEncontrado = books.find(book => book.id_book == id);

    if (libroEncontrado != null) {
        respuesta = {error: false, codigo: 200, mensaje: libroEncontrado};
    } else {
        respuesta = {error: true, codigo: 200, mensaje: "El libro no existe"};
    }

    response.send(respuesta);
}



    
function createBook (req, res) {
    const {id_book, id_user, title, type, author, price, photo } = req.body;
    const newBook = new Book(id_book, id_user, title, type, author, price, photo);
    books.push(newBook);
    res.status(201).send(newBook);
};

function updateBook (req, res) {
    const book = books.find(b => b.id_book === parseInt(req.params.id));
    if (!book) return res.status(404).send('Libro no encontrado');

    const { id_user, title, type, author, price, photo } = req.body;
    book.id_user = id_user;
    book.title = title;
    book.type = type;
    book.author = author;
    book.price = price;
    book.photo = photo;

    

    res.send(book);
};


function deleteBook (req, res) {
    const bookIndex = books.findIndex(b => b.id_book === parseInt(req.params.id));
    if (bookIndex === -1) return res.status(404).send('Libro no encontrado');

    const deletedBook = books.splice(bookIndex, 1);
    res.send(deletedBook);
};

module.exports = {getStart,getBookQuery, getAll, getBookById, deleteBook, updateBook, createBook}