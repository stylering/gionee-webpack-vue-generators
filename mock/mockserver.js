let express = require('express');
let app = express();
let defaults = require('../cfg/defaults');
let routes = require('./routes')(app);

app.use(express.static(__dirname))

let server = app.listen(defaults.proxyPort, () => {
	console.log('app listening at http://localhost:' + defaults.proxyPort)
})