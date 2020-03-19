const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const index = require('./routes/routers');

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }))
const port = process.env.PORT || 5000;
app.use('/', index);
app.listen(port, function() {
    console.log(`Server Starts on ${port}`);
});