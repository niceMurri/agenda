const router = require('express').Router();

const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController');

//home routes

router.get('/', homeController.index);
router.post('/doido', (req,res) => {
    res.send('ee');
})

//login routes


router.get('/login/index', loginController.index)


router.get('/err', (req,res) => res.render('404'));



module.exports = router;