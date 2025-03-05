require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const errorHandler = require('_middleware/error-handler');

app.use(expresss.json());
app.use(express.urlencoded({ extended:true}));
app.use(cors());

//api routes
app.use('/uers', require('./users/user.controller'));


app.use(errorHandler);

const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) :4000;
app.listen(port, ()=> console.log('Server listening at ports' + port));