const Customer = require('../models/Customer');

const getAll = async (req, res) => {
	try {
		const customers = await Customer.find();
		res.json(customers);
	} catch (err) {
		console.error(err.error);
		res.status(500).send('Server error');
	}
};

const getById = async (req, res) => {
	try {
		const customers = await Customer.find({ _id: req.params.id });
		res.json(customers);
	} catch (err) {
		console.error(err.error);
		res.status(500).send('Server error');
	}
};

const create = async (req, res) => {
	try {
		let customer = await Customer.findOne({
			name: req.body.name,
		});
		if (customer) {
			return res.status(400).json({
				errors: [{ msg: 'Customer already exists' }],
			});
		}
		const newCustomer = new Customer({
			name: req.body.name,
			email: req.body.email,
			plan: req.body.plan,
		});

		customer = await newCustomer.save();
		res.json({ customer: customer, msg: 'Customer created' });
	} catch (err) {
		console.error(err.error);
		re.status(500).send('Server error');
	}
};

const deleteById = async (req, res) => {
	console.log(req);
	try {
		const customer = await Customer.findById(req.params.id);

		if (!customer) {
			return res.status(404).json({
				msg: 'Customer not found',
			});
		}

		await customer.remove();

		res.json({
			msg: 'Customer deleted successfully',
		});
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server error');
	}
};

const updateById = async (req, res) => {
	try {
		let customer = await Customer.findById(req.params.id);

		if (!customer) {
			return res.status(404).json({
				msg: 'Customer not found',
			});
		}
		customer = await Customer.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
		});
		await res.json({
			msg: 'Customer updated successfully.',
			customer: customer,
		});
	} catch (err) {
		console.error(err.error);
		res.status(500).send('Server error');
	}
};

module.exports = { getAll, getById, create, deleteById, updateById };
