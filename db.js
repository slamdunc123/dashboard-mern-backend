const mongoose = require('mongoose');
const { config } = require('dotenv'); 

config();
const db = process.env.DB_URI;

const conn = async () => {
	try {
		await mongoose.connect(db, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log('mongoDB connected successfully');
	} catch (err) {
		console.error(err.message);
		// exit process with a failure
		process.exit(1);
	}
};

module.exports = conn;