const {Router} = require("express")
const router = Router();
const booksCtrl = require("../controller/books.controller")

router.get("/", booksCtrl.getStart)
router.get("/books", booksCtrl.getAll)
router.get("/books", booksCtrl.getBookQuery)
router.get("/books/:id", booksCtrl.getBookById)
router.post("/books", booksCtrl.createBook);
router.put("/books/:id", booksCtrl.updateBook);
router.delete("/books/:id", booksCtrl.deleteBook);
module.exports = router