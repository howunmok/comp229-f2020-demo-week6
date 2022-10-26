let express = require('express');
let router = express.Router();

let indexController = require('../controllers/index');

/* GET Home page. */
/*router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home' });
});*/
//simplify it to 
router.get('/', indexController.displayHomePage);

/* Also works to GET Home page. */
router.get('/home', indexController.displayHomePage);

/* GET About page. */
router.get('/about', indexController.displayAboutPage);

/* GET Products page. */
router.get('/products', indexController.displayProductsPage);

/* GET Services page. */
router.get('/services', indexController.displayServicesPage);

/* GET Contact page. */
router.get('/contact', indexController.displayContactPage);

/* GET Route for displaying the Login page */
router.get('/login', indexController.displayLoginPage);

/* POST Route for processing the Login page */
router.post('/login', indexController.processLoginPage);

/* GET Route for displaying the Register page */
router.get('/register', indexController.displayRegisterPage);

/* POST Route for processing the Register page */
router.post('/register', indexController.processRegisterPage);

/* GET to perform userLogout */
router.get('/logout', indexController.performLogout);

module.exports = router;
