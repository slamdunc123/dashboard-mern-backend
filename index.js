const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());

let port = process.env.PORT || 5000;

app.listen(port, () => {
	console.log(`App is listening on port http://localhost:${port}`);
});