const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');

// get all customers - eg http://localhost:5000/api/customers
router.get('/', customerController.getAll);

// delete customer by id - eg http://localhost:5000/api/tests/624307d6280daad241023611
router.delete('/:id', customerController.deleteById)

module.exports = router;
