const path = require('path');
const express = require('express');
const bodyparser = require('body-parser');
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'));
app.use(bodyparser.json());
app.use('/static', express.static(path.join(__dirname, 'static')));

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/controller', (req, res) => {
	res.sendFile(path.join(__dirname, 'views', 'controller.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Running at port ${port}`));
