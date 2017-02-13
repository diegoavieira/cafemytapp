var express = require('express'),
	app = express(),
	http = require('http').Server(app),
	io = require('socket.io')(http),
	bodyParser = require('body-parser'),
	path = require('path');

// route
app.use('/', express.static(path.resolve(__dirname+ '/public')));

// server
http.listen(3000, function() {
	console.log('cafeapp lintening on port 3000');
});

// sequelize
var Sequelize = require('sequelize');
var sequelize = new Sequelize('cafeappdb', 'postgres', '12345', {
	host: 'localhost',
	dialect: 'postgres',
	port: '5432',
	schema: 'public'
});

sequelize.authenticate()
 	.then(function() {
    	console.log('Connection white database has been established successfully.');
  	})
  	.catch(function (err) {
    	console.log('Unable to connect to the database: ', err);
  	});

var User = sequelize.define('user', {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	name: {
		type: Sequelize.STRING
	},
	email: {
		type: Sequelize.STRING
	},
	pass: {
		type: Sequelize.STRING
	}
});

var Cafe = sequelize.define('cafe', {
	idCafe: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	idUser: {
		type: Sequelize.INTEGER
	},
	qtdAgua: {
		type: Sequelize.INTEGER
	},
	qtdAcucar: {
		type: Sequelize.INTEGER
	}
});

// var Ingred = sequelize.define('ingred', {
// 	idIngred: {
// 		type: Sequelize.INTEGER,
// 		primaryKey: true,
// 		autoIncrement: true
// 	},
// 	nameIngred: {
// 		type: Sequelize.STRING
// 	}
// });

//Cafe.sync();
// Ingred.sync();


// User.belongsTo(Cafe);
// Cafe.belongsTo(Ingred);

// socket.io
io.on('connection', function(socket) {
	
	socket.on('cadastrar', function(user, cb) {
		sequelize.sync().then(function(){
			return User.create({
				name: user.name,
				email: user.email,
				pass: user.pass
			});
		}).then(function(data) {
			console.log('Usuario criado: ', data.name);
			cb({success: true, data: data});
		}).catch(function(err) {
			console.log(err.toString());
			cb({success: false, err: err.toString()});
		});
	});

	socket.on('login', function(user, cb) {
		if(user != null) {
			User.findOne({where: {
				email: user.email,
				pass: user.pass}
			}).then(function(data) {
				console.log('Usuario logado: ', data.get('name'));
				cb({success: true, data: data});
			}).catch(function(err) {
				console.log(err.toString());
				cb({success: false, data: err.toString()});
			});
		} else {
			console.log('problema com o banco');
		}
	});

	socket.on('cafe', function(cafe, cb) {
		sequelize.sync().then(function(){
			return Cafe.create({
				idUser: cafe.user,
				qtdAgua: cafe.ingred.agua,
				qtdAcucar: cafe.ingred.acucar
			});
		}).then(function(data) {
			console.log('Cafe produzido.');
			cb({success: true, data: data});
		}).catch(function(err) {
			console.log(err.toString());
		});
	});
});



