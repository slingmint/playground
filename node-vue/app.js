var express = require('express');
var appController = require('./controllers/appController');


var app = express();
app.set('view engine', 'ejs');


//static files
app.use(express.static('./public'));

//controllers
appController(app);

//listen to port
app.listen(3000);
console.log('Listening to 3000...');
