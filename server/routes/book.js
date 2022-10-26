let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let passport = require('passport');

//connect to our Book Model
//let Book = require('../models/book');

let bookController = require('../controllers/book');

// helper function for guard purposes
function requireAuth(req, res, next) {
    // check if the user is logged in
    if(!req.isAuthenticated()) {
        return res.redirect('/login')
    }
    next();
}

/* GET Route for the Book List page - READ Operation */
/*router.get('/', (req, res, next) => {
    Book.find((err, bookList) => {
        if(err) {
            return console.error(err);
        } else {
            //console.log(bookList);
            res.render('book/list', { title: 'Books',  BookList: bookList});
        }
    })
})*/
//^move the logic to the controller/book.js

// simplify as follow:
router.get('/', bookController.displayBookList);

/* GET Route for displaying the Add page - CREATE Operation */
router.get('/add', requireAuth, bookController.displayAddPage);

/* POST Route for processing the Add page - CREATE Operation */
router.post('/add', requireAuth, bookController.processAddPage);

/* GET Route for displaying the Edit page - UPDATE Operation */
router.get('/edit/:id', requireAuth, bookController.displayEditPage);

/* POST Route for processing the Edit page - UPDATE Operation */
router.post('/edit/:id', requireAuth, bookController.processEditPage);

/* GET to perform Deletion - DELETE Operation */
router.get('/delete/:id', requireAuth, bookController.performDelete);

module.exports = router;