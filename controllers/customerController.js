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

const deleteById = async (req, res) => {
	console.log(req);
	try {
		// check if customer exists
		const customer = await Customer.findById(req.params.id);

		// if id is a valid format but doesn't exist in database
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

module.exports = { getAll, deleteById };
