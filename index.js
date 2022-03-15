const express = require('express');
const cors = require('cors');
require('./db')();

const app = express();

app.use(cors());

// init middleware (inc bodyParser which allows data to be retrieved in req.body)
// app.use(express.json({ extended: false }));
app.use(express.json({ limit: '50mb', extended: true }));
app.use(
	express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 })
);

// test api
app.get('/', (req, res) => {
	res.send('Express Backend Up And Running');
});

// define api routes
app.use('/api/tests', require('./routes/testRoutes')); //localhost:5000/api/tests
app.use('/api/customers', require('./routes/customerRoutes')); //localhost:5000/api/customer

let port = process.env.PORT || 5000;

app.listen(port, () => {
	console.log(`App is listening on port http://localhost:${port}`);
});