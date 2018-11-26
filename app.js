	var express = require('express');
	app = express();
	var server = require('http').Server(app);
	var bodyParser = require('body-parser');
	var urlencodedParser = bodyParser.urlencoded({ extended: true });
	
	var port = process.env.PORT;
	if (port == null || port == "") {
		port = 8000;
	}

	app.get('/', function(req, res){
		res.render('../views/page.ejs');
	})
	.post('/', urlencodedParser, function(req, res){
		
		
		res.redirect('/');
	})
	.use(function(req, res, next){
		res.redirect('/');
	});
	
	server.listen(8000);