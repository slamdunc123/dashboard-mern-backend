const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	plan: {
		type: String,
		required: true,
	},
});

module.exports = Customer = mongoose.model('customer', CustomerSchema);
