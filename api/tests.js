const express = require('express');
const router = express.Router();
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

// @router  GET api/tests/:id - http://localhost:5000/api/tests/:id
// @desc    Get aspecific test
// @access  Public

router.get('/:id', async (req, res) => {
	console.log(req.params);
	try {
		const tests = await Test.find({ _id: req.params.id });
		res.json(tests);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server error');
	}
});

// @route POST api/tests
// @desc Create an test
// @access Public

router.post('/', async (req, res) => {
	console.log('req.body', req.body);
	// const { userId, name, desc } = req.body;
	try {
		// check if test name already exists
		let test = await Test.findOne({
			name: req.body.name,
		});
		if (test) {
			return res.status(400).json({
				errors: [{ msg: 'Test already exists' }],
			});
		}

		const newTest = new Test({
			name: req.body.name,
		});
		console.log('newTest', newTest);
		// save item to database
		test = await newTest.save();
		res.json({ test: test, msg: 'Test created' });
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server error');
	}
});

// @route DELETE api/tests
// @desc Delete an test
// @access Public

router.delete('/:id', async (req, res) => {
	console.log(req);
	try {
		// check if pet exists
		const test = await Test.findById(req.params.id);

		// if id is a valid format but doesn't exist in database
		if (!test) {
			return res.status(404).json({
				msg: 'Pet not found',
			});
		}

		await test.remove();

		res.json({
			msg: 'Test deleted successfully.',
		});
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server error');
	}
});

// @route UPDATE api/tests
// @desc Update an test
// @access Public

router.put('/:id', async (req, res) => {
	try {
		// check if test exists
		let test = await Test.findById(req.params.id);

		// if id is a valid format but doesn't exist in database
		if (!test) {
			return res.status(404).json({
				msg: 'Test not found',
			});
		}
		test = await Test.findByIdAndUpdate(req.params.id, req.body);
		await res.json({
			msg: 'Test updated successfully.',
			test: test,
		});
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server error');
	}
});

module.exports = router;
