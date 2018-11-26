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
		var SparkPost = require('sparkpost');
		var sparky = new SparkPost();

		sparky.transmissions.send({
			options: {
				sandbox: true
			},
			content: {
				from: 'todo@' + process.env.SPARKPOST_SANDBOX_DOMAIN,
				subject: "Oh hey!",
				html:"<html><body><h1>Email from todo list</h1><p>In order to validate your account please click on this link : </p><a href='http://localhost:8000/signup/25/54574fg4f5g47GF65454GFffg54854'></a></p></body></html>";
			},
			recipients: [
				{address: 'developers+nodejs@sparkpost.com'}
			]
		})
 
		
		
		
		
		
		
		console.log('ici');
		var mail = "<!DOCTYPE html>"+
			"<html>"+
			"	<body>"+
			"		<div>"+
			"			<h1>Email from todo list</h1>"+req.body.mail+
			"		</div>"+
			"	</body>"+
			"</html>";
		
		nodemailer = require('nodemailer');
		
		var transporter = nodemailer.createTransport({
			host: 'localhost',
			port: 1025,
			ignoreTLS: true
		});
		
		mailOptions = {
			from: '"Todo list" <foo@example.com>',
			to: 'svd115@yahoo.fr',
			subject: 'Bla',
			html: mail
		};
		
		transporter.sendMail(mailOptions);
		
		res.redirect('/');
	})
	.use(function(req, res, next){
		res.redirect('/');
	});
	
	server.listen(8000);