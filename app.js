const checkAuthorization = require('./staticMethods/checkAuthorization');
const sendError = require('./staticMethods/sendError');
const headers = require('./staticMethods/headers');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const jsonParser = bodyParser.json();
const express = require('express');
const path = require('path');
const fs = require("fs");
const app = express();

mongoose.connect("mongodb://localhost:27017/VapulusAssem");

const contactsRouter = require("./controllers/contacts");

fs.readdirSync(path.join(__dirname,"models")).forEach(function(filename){
    require('./models/'+filename);
});

app.use(headers.headers);
app.use(jsonParser);
app.use(checkAuthorization.authorization);

app.use('/contacts', contactsRouter);

app.use(sendError);

app.listen(9050 , () => {
  console.log("app is running on port 9050");
});
