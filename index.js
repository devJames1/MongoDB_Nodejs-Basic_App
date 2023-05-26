//Entry point of the app with basic configurations for dependencies

const express = require('express');
const hbs = require('express-handlebars');
const path = require('path');

const studentController = require('./controllers/studentController');
const app = express();

//express use json to encrypt the content
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
  res.send(
    `<h2>Welcome to Students Database!!</h2>
        <h3>Click here to get access to the <b> <a href="/student/list"> Database </a></b></h3>`
  );
});

app.engine(
  'hbs',
  hbs.create({
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
