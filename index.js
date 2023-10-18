const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const server  = express();
const port = 8080;


// Middlewares
server.use( morgan('dev') );
server.use( cors() );
server.use( bodyParser.json() );
server.use( helmet() );


// Routes
const UserRouter = require('./routes/users');
const AuthRouter = require('./routes/auth');
// const breakRouter = require('./routes/breaks');
// const agentOutRouter = require('./routes/agentOuts');


// Database connection
mongoose.connect('mongodb://127.0.0.1:27017/dbAgentTimeMonitor');


server.get('/', ( request, response ) => {
    response.send(`Welcome to Agent Time Monitor API`);
});


// endpoints
server.use('/api/v1/auth', AuthRouter );
server.use('/api/v1/users', UserRouter );
// server.use('/api/v1/breaks', breakRouter );
// server.use('/api/v1/agentOuts', agentOutRouter );


server.listen(port, () => {
        console.log(`Server running on port ${ port }`);
    }
);


