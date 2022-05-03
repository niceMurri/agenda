const router = require('express').Router();

const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController');
const contactController = require('./src/controllers/contactController');
const { loginRequired } = require('./src/middlewares/middlewaresGlobal')

//home routes

router.get('/', homeController.index);


//login routes
router.get('/login/index', loginController.index);
router.post('/login/register', loginController.register);
router.post('/login/login', loginController.login);
router.get('/login/logout', loginController.logout);

//contact routes
router.get('/contact/index', loginRequired ,contactController.index);
router.post('/contact/register', loginRequired, contactController.register);
router.get('/contact/index/:id', loginRequired ,contactController.editIndex);
router.post('/contact/edit/:id', loginRequired, contactController.edit);
router.get('/contact/delete/:id', loginRequired, contactController.delete);



module.exports = router;