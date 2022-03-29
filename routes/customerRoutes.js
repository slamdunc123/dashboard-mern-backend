const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');

// get all customers - http://localhost:5000/api/customers
router.get('/', customerController.getAll);

// get customer by id - http://localhost:5000/api/tests/:id
router.get('/:id', customerController.getById)

// create customer - http://localhost:5000/api/customers
router.post('/', customerController.create)

// delete customer by id - http://localhost:5000/api/tests/:id
router.delete('/:id', customerController.deleteById)

// update customer by id - http://localhost:5000/api/tests/:id
router.put('/:id', customerController.updateById)

module.exports = router;
