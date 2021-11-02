const express = require('express');
const router = express.Router();
const testController = require('../controllers/testController')
const Test = require('../models/Test');


// @router  GET api/tests - http://localhost:5000/api/tests
// @desc    Get all tests
// @access  Public
router.get('/', async (req, res) => {
	try {
		const tests = await Test.find();
		res.json(tests);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server error');
	}
});


// router.get('/', testController.getAll)

// @router  GET api/tests/:id - http://localhost:5000/api/tests/:id
// @desc    Get test by id
// @access  Public

router.get('/:id', testController.getById)

// @route POST api/tests- http://localhost:5000/api/tests/:id
// @desc Create an test
// @access Public

router.post('/', testController.create)

// @route DELETE api/tests- http://localhost:5000/api/tests
// @desc Delete an test
// @access Public

router.delete('/:id', testController.deleteById)

// @route PUT api/tests- http://localhost:5000/api/tests/:id
// @desc Update an test
// @access Public

router.put('/:id', testController.updateById)

module.exports = router;
