const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: true,
	},
});

module.exports = Customer = mongoose.model('customer', CustomerSchema);
