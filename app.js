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
		var sparky = new SparkPost(); // uses process.env.SPARKPOST_API_KEY

		sparky.transmissions.send({
			options: {
			  sandbox: true
			},
			content: {
			  from: 'testing@' + process.env.SPARKPOST_SANDBOX_DOMAIN, // 'testing@sparkpostbox.com'
			  subject: 'Oh hey!',
			  html:'<html><body><p>Testing SparkPost - the world\'s most awesomest email service!</p><p>'+req.body.mail+'</p></body></html>'
			},
			recipients: [
			  {address: req.body.adress}
			]
		  })
		  .then(data => {
			console.log('Woohoo! You just sent your first mailing!');
			console.log(data);
		  })
		  .catch(err => {
			console.log('Whoops! Something went wrong');
			console.log(err);
		  });
		
		res.redirect('/');
	})
	.use(function(req, res, next){
		res.redirect('/');
	});
	
	server.listen(port);