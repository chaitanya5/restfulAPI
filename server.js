require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
//Connecting the database
mongoose.connect(process.env.DATABASE_URL,{ useNewUrlParser: true,useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error',error => console.error(`Error: ${error}`));
db.once('open',() => console.log(`Database connected`));

//Allow app to use json
app.use(express.json());

// Create router
const subscriberRouter = require('./routes/subscriberRouter');
app.use('/subscribers',subscriberRouter);

app.listen(8000,()=> console.log(`Server at 8000`));