const mongoose = require('mongoose');

const TestSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
});

module.exports = Test = mongoose.model('test', TestSchema);