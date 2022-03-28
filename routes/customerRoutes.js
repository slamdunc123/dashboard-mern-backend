const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');

// get all customers - http://localhost:5000/api/customers

router.get('/', customerController.getAll);
router.delete('/:id', customerController.deleteById)

module.exports = router;
