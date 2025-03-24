const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();

const uc = require('../controllers/usercontroller');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// uuden tunnarit
// http://localhost:3000/users/register
router.post('/register', uc.registerUser);

// kirjautuminen
router.post('/login', uc.authenticateUser);


module.exports = router;
