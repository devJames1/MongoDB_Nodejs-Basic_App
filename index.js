const express = require('express');
const path = require('path');
const handlebars = require('handlebars');
const hbs = require('express-handlebars');
const {
  allowInsecurePrototypeAccess,
} = require('@handlebars/allow-prototype-access');
const bodyparser = require('body-parser');

const studentController = require('./controllers/studentController');

const app = express();

// const mongo = require('./models/db');
// mongo.connectToDatabase();

//body parser use json to encrypt the content
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

app.get('/', (req, res) => {
  res.send(
    `<h2>Welcome to Students Database!!</h2>
        <h3>Click here to get access to the <b> <a href="/student/list"> Database </a></b></h3>`
  );
});

app.engine(
  'hbs',
  hbs.create({
    handlebars: allowInsecurePrototypeAccess(handlebars),
    extname: 'hbs',
    defaultLayout: 'MainLayout',
    layoutsDir: __dirname + '/views/layouts',
  }).engine
);

//Default enviroment settings
app.set('views', path.join(__dirname + '/views/'));
app.set('view engine', 'hbs');

app.listen(3000, () => console.log('Server started at port 3000'));

app.use('/student', studentController);
