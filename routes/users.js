var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer({ dest: './uploads' });

const userController = require('../controllers/user');
const userValidator = require('../validators/userValidators');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.get('/register', function (req, res, next) {
  res.render('register', { title: 'Register' });
});

router.get('/login', function (req, res, next) {
  res.render('login', { title: 'Login' });
});

router.post(
  '/register',
  upload.single('profileimage'),
  userValidator.createValidator('registerUser'),
  userValidator.checkValidation,
  userController.registerUser
);

module.exports = router;
