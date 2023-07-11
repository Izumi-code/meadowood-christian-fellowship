"use strict";

var express = require('express');

var router = express.Router();

var session = require('express-session');

var _require = require("@prisma/client"),
    PrismaClient = _require.PrismaClient;

var crypto = require('crypto');

var prisma = new PrismaClient();
var app = express();
app.set('view engine', 'ejs');
/* GET admin page. */

router.get('/adminview/admindashboard', function _callee(req, res, next) {
  var user, query, users, filteredUsers;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          user = req.session.user; // Fetch the user data from session

          if (!(!user || user.usertype !== 'Admin')) {
            _context.next = 5;
            break;
          }

          // If user is not logged in or not an admin, redirect to login page
          res.redirect('/');
          return _context.abrupt("return");

        case 5:
          query = req.query.q; // Get the value of the 'q' parameter from the query string

          _context.next = 8;
          return regeneratorRuntime.awrap(prisma.user.findMany());

        case 8:
          users = _context.sent;
          filteredUsers = users.filter(function (user) {
            return user.usertype === 'Admin' || user.usertype === 'Manager' || user.usertype === 'User';
          });

          if (query) {
            // If a search query is provided, filter the results
            filteredUsers = filteredUsers.filter(function (user) {
              var fullName = "".concat(user.firstname, " ").concat(user.middlename ? user.middlename + ' ' : '').concat(user.lastname);
              return fullName.toLowerCase().includes(query.toLowerCase()) || user.email.toLowerCase().includes(query.toLowerCase());
            });
          }

          res.render('adminview/admindashboard', {
            title: 'Admin',
            users: filteredUsers,
            isEmpty: filteredUsers.length === 0,
            query: query
          });
          _context.next = 18;
          break;

        case 14:
          _context.prev = 14;
          _context.t0 = _context["catch"](0);
          console.error(_context.t0);
          next(_context.t0);

        case 18:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 14]]);
});
/* GET manager records page. */

router.get('/adminview/managerRecord', function _callee2(req, res, next) {
  var user, query, users, filteredUsers;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          user = req.session.user; // Fetch the user data from session

          if (!(!user || user.usertype !== 'Admin')) {
            _context2.next = 5;
            break;
          }

          // If user is not logged in or not an admin, redirect to login page
          res.redirect('/');
          return _context2.abrupt("return");

        case 5:
          query = req.query.q; // Get the value of the 'q' parameter from the query string

          _context2.next = 8;
          return regeneratorRuntime.awrap(prisma.user.findMany());

        case 8:
          users = _context2.sent;
          filteredUsers = users.filter(function (user) {
            return user.usertype === 'Manager';
          });

          if (query) {
            // If a search query is provided, filter the results
            filteredUsers = filteredUsers.filter(function (user) {
              var fullName = "".concat(user.firstname, " ").concat(user.middlename ? user.middlename + ' ' : '').concat(user.lastname);
              return fullName.toLowerCase().includes(query.toLowerCase()) || user.email.toLowerCase().includes(query.toLowerCase());
            });
          }

          res.render('adminview/managerRecord', {
            title: 'Manager',
            users: filteredUsers,
            isEmpty: filteredUsers.length === 0,
            query: query
          });
          _context2.next = 18;
          break;

        case 14:
          _context2.prev = 14;
          _context2.t0 = _context2["catch"](0);
          console.error(_context2.t0);
          next(_context2.t0);

        case 18:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 14]]);
});
/* GET user records page. */

router.get('/adminview/userRecord', function _callee3(req, res, next) {
  var user, query, users, filteredUsers;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          user = req.session.user; // Fetch the user data from session

          if (!(!user || user.usertype !== 'Admin')) {
            _context3.next = 5;
            break;
          }

          // If user is not logged in or not an admin, redirect to login page
          res.redirect('/');
          return _context3.abrupt("return");

        case 5:
          query = req.query.q; // Get the value of the 'q' parameter from the query string

          _context3.next = 8;
          return regeneratorRuntime.awrap(prisma.user.findMany());

        case 8:
          users = _context3.sent;
          filteredUsers = users.filter(function (user) {
            return user.usertype === 'User';
          });

          if (query) {
            // If a search query is provided, filter the results
            filteredUsers = filteredUsers.filter(function (user) {
              var fullName = "".concat(user.firstname, " ").concat(user.middlename ? user.middlename + ' ' : '').concat(user.lastname);
              return fullName.toLowerCase().includes(query.toLowerCase()) || user.email.toLowerCase().includes(query.toLowerCase());
            });
          }

          res.render('adminview/userRecord', {
            title: 'User',
            users: filteredUsers,
            isEmpty: filteredUsers.length === 0,
            query: query
          });
          _context3.next = 18;
          break;

        case 14:
          _context3.prev = 14;
          _context3.t0 = _context3["catch"](0);
          console.error(_context3.t0);
          next(_context3.t0);

        case 18:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 14]]);
});
/* GET logout */

router.get('/logout', function (req, res) {
  req.session.destroy(function (err) {
    if (err) {
      console.error(err);
    }

    res.redirect('/');
  });
});
/* GET admin records page. */

router.get('/adminview/adminRecord', function _callee4(req, res, next) {
  var user, query, users, filteredUsers;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          user = req.session.user; // Fetch the user data from session

          if (!(!user || user.usertype !== 'Admin')) {
            _context4.next = 5;
            break;
          }

          // If user is not logged in or not an admin, redirect to login page
          res.redirect('/');
          return _context4.abrupt("return");

        case 5:
          query = req.query.q; // Get the value of the 'q' parameter from the query string

          _context4.next = 8;
          return regeneratorRuntime.awrap(prisma.user.findMany());

        case 8:
          users = _context4.sent;
          filteredUsers = users.filter(function (user) {
            return user.usertype === 'Admin';
          });

          if (query) {
            // If a search query is provided, filter the results
            filteredUsers = filteredUsers.filter(function (user) {
              var fullName = "".concat(user.firstname, " ").concat(user.middlename ? user.middlename + ' ' : '').concat(user.lastname);
              return fullName.toLowerCase().includes(query.toLowerCase()) || user.email.toLowerCase().includes(query.toLowerCase());
            });
          }

          res.render('adminview/adminRecord', {
            title: 'User',
            users: filteredUsers,
            isEmpty: filteredUsers.length === 0,
            query: query
          });
          _context4.next = 18;
          break;

        case 14:
          _context4.prev = 14;
          _context4.t0 = _context4["catch"](0);
          console.error(_context4.t0);
          next(_context4.t0);

        case 18:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 14]]);
});
/* GET admin profile page. */

router.get('/adminview/adminProfile', function _callee5(req, res, next) {
  var user;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          user = req.session.user; // Fetch the user data from session

          if (!(!user || user.usertype !== 'Admin')) {
            _context5.next = 5;
            break;
          }

          // If user is not logged in or not an admin, redirect to login page
          res.redirect('/');
          return _context5.abrupt("return");

        case 5:
          res.render('adminview/adminProfile', {
            title: 'Admin Profile',
            user: user
          });
          _context5.next = 12;
          break;

        case 8:
          _context5.prev = 8;
          _context5.t0 = _context5["catch"](0);
          console.error(_context5.t0);
          next(_context5.t0);

        case 12:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 8]]);
});
/* GET admin profile delete confirmation page. */

router.get('/adminview/deleteAdminProfile', function _callee6(req, res, next) {
  var user;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          user = req.session.user; // Fetch the user data from session

          if (!(!user || user.usertype !== 'Admin')) {
            _context6.next = 5;
            break;
          }

          // If user is not logged in or not an admin, redirect to login page
          res.redirect('/');
          return _context6.abrupt("return");

        case 5:
          // Check if the user email matches the email to be protected
          //   if (user.email === 'mjpcsuguitan@tip.edu.ph') {
          //     // Redirect to admin profile page
          //     res.redirect('/adminview/deleteAdminProfile');
          //     return;
          //   }
          res.render('adminview/deleteAdminProfile', {
            title: 'Delete Admin Profile',
            user: user
          });
          _context6.next = 12;
          break;

        case 8:
          _context6.prev = 8;
          _context6.t0 = _context6["catch"](0);
          console.error(_context6.t0);
          next(_context6.t0);

        case 12:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[0, 8]]);
});
/* POST admin profile delete confirmation page. */

router.post('/admin/adminProfileDeleteConfirm', function _callee7(req, res, next) {
  var user, password, dbUser, storedPassword, hash, enteredPassword;
  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          user = req.session.user; // Fetch the user data from session

          if (!(!user || user.usertype !== 'Admin')) {
            _context7.next = 5;
            break;
          }

          // If user is not logged in or not an admin, redirect to login page
          res.redirect('/');
          return _context7.abrupt("return");

        case 5:
          password = req.body.password; // Get the password from the request body
          // Retrieve the hashed password from the database

          _context7.next = 8;
          return regeneratorRuntime.awrap(prisma.user.findUnique({
            where: {
              id: user.id
            }
          }));

        case 8:
          dbUser = _context7.sent;
          storedPassword = dbUser.password; // Hash the entered password using SHA256

          hash = crypto.createHash('sha512');
          hash.update(password);
          enteredPassword = hash.digest('hex'); // Check if the entered password matches the stored password

          if (!(enteredPassword !== storedPassword)) {
            _context7.next = 15;
            break;
          }

          return _context7.abrupt("return", res.render('adminview/deleteAdminProfile', {
            title: 'Delete Admin Profile',
            user: user,
            error: 'Incorrect password. Deletion failed.'
          }));

        case 15:
          if (!(enteredPassword == storedPassword)) {
            _context7.next = 18;
            break;
          }

          _context7.next = 18;
          return regeneratorRuntime.awrap(prisma.user["delete"]({
            where: {
              id: user.id
            }
          }));

        case 18:
          // Clear the user data from the session and redirect to login page
          req.session.user = null;
          res.redirect('/');
          _context7.next = 26;
          break;

        case 22:
          _context7.prev = 22;
          _context7.t0 = _context7["catch"](0);
          console.error(_context7.t0);
          next(_context7.t0);

        case 26:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[0, 22]]);
}); // Delete a user

router.post('/adminview/admindashboard/:id/delete', function _callee8(req, res) {
  var userId, deletedUser;
  return regeneratorRuntime.async(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          userId = req.params.id;
          _context8.prev = 1;
          _context8.next = 4;
          return regeneratorRuntime.awrap(prisma.user["delete"]({
            where: {
              id: userId
            }
          }));

        case 4:
          deletedUser = _context8.sent;
          // Handle successful deletion (e.g., redirect to a success page)
          res.redirect('/adminview/admindashboard');
          _context8.next = 12;
          break;

        case 8:
          _context8.prev = 8;
          _context8.t0 = _context8["catch"](1);
          // Handle any errors
          console.error(_context8.t0);
          res.status(500).send('Error deleting user.');

        case 12:
        case "end":
          return _context8.stop();
      }
    }
  }, null, null, [[1, 8]]);
}); // Edit a user

router.get('/adminview/admindashboard/edituser', function (req, res) {
  // Render the specific page
  res.render('edituser');
});
/* GET logout */

router.get('/logout', function (req, res) {
  req.session.destroy(function (err) {
    if (err) {
      console.error(err);
    }

    res.redirect('/');
  });
});
module.exports = router;