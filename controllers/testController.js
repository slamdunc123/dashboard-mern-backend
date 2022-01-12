const Test = require('../models/Test');

const getAll = async (req, res) => {
	try {
		const tests = await Test.find();
		res.json(tests);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server error');
	}
};

const getById = async (req, res) => {
	console.log(req.params);
	try {
		const tests = await Test.find({ _id: req.params.id });
		res.json(tests);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server error');
	}
};

const create = async (req, res) => {
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
};

const deleteById = async (req, res) => {
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
};

const updateById = async (req, res) => {
	try {
		// check if test exists
		let test = await Test.findById(req.params.id);

		// if id is a valid format but doesn't exist in database
		if (!test) {
			return res.status(404).json({
				msg: 'Test not found',
			});
		}
        //In Mongoose 4.0, the default value for the new option of findByIdAndUpdate (and findOneAndUpdate) has changed to false, which means returning the old doc (see #2262 of the release notes). So you need to explicitly set the option to true to get the new version of the doc, after the update is applied:
		test = await Test.findByIdAndUpdate(req.params.id, req.body, {new: true});
		await res.json({
			msg: 'Test updated successfully.',
			test: test,
		});
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server error');
	}
};

module.exports = { getAll, getById, create, deleteById, updateById };
