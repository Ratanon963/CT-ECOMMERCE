const express = require('express');
const mongoose = require('mongoose')

const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator')

require('dotenv').config({ path: '.env' });

//import routers
const authRoutes = require('./router/auth');
const userRoutes = require('./router/user')

//App
const app = express() //install express to app


//DB
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true 

}).then(() => console.log("DB Connected"));

// middlewares    
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());

//Route middleware

app.use('/api', authRoutes);
app.use('/api', userRoutes);

const port = process.env.PORT || 8000; // just for some reason if we didn't have .env file
// Server
app.listen(port, ()=>{
    console.log(`Server is running on the port ${port}`);
});

