const Customer = require('../models/Customer');

const getAll = async (req, res) => {
	try {
		const customers = await Customer.find();
        res.json(customers)
	} catch (err) {
		console.error(err.error);
		res.status(500).send('Server error');
	}
};

module.exports = { getAll };
