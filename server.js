require('dotenv').config()

const express = require('express');
const app = express();
const mongoose = require('mongoose');

//DB CONNECTION PASSWORD 
const connectDB = process.env.CONNECTSTRING;
mongoose.connect(connectDB)
    .then( e => {
        console.log('DB Connected!');
        app.emit('connectDB');
    })
    .catch( e => console.log('error na conexão!.'));


const session = require('express-session');
const flash = require('connect-flash');
const MongoStore = require('connect-mongo');
const csrf = require('csurf');
//const helmet = require('helmet');
const routes = require('./routes.js');
const {  middlewaresGlobal, checkErrCsrf, csrfMiddleware } = require('./src/middlewares/middlewaresGlobal.js');

app.use(flash())
//app.use(helmet());

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(express.static('public'));

app.set('views', './src/views');
app.set('view engine', 'ejs');

const sessionOptions = session({
    secret: '------8***//7456421ad__!',
    store: MongoStore.create({mongoUrl: process.env.CONNECTSTRING}),
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 9999999,
        httpOnly: true
    }
})

app.use(sessionOptions);

app.use(middlewaresGlobal);

app.use(csrf());
app.use(checkErrCsrf);
app.use(csrfMiddleware);


app.use(routes);



//add routes

app.on('connectDB', () => {
    app.listen(5050, () => {
        console.log('server running in port 5050')
    })
});
