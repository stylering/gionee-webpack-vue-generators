module.exports = function(app) {

	app.use('/auth/pshop', require('./pshop'));
	app.use('/auth/draw', require('./draw'));
	app.use('/ucsr-api/auth/service', require('./service'));
	app.use('/service', require('./service'));
	app.use('/ucsr-api/auth', require('./auth'));

}