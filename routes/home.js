const express = require('express');
const router = express.Router();
const session = require('express-session');
const { PrismaClient } = require("@prisma/client");
const crypto = require('crypto');
const prisma = new PrismaClient();

// Initialize the session middleware
router.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true
}));

router.get('/', function(req, res) {
      res.render('homepage', { title: 'Login' });

  });

  router.get('/login', function(req, res) {
    res.render('login', { title: 'Login' });

});

 
module.exports = router;
