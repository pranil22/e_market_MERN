const express = require('express');
const app = express();
const mongoose = require('mongoose');
const PORT = 5000;
const { MONGO_URL } = require('./keys');
const bodyParser = require('body-parser');


mongoose
    .connect(MONGO_URL, { useUnifiedTopology: true })
    .then(() => {
        console.log("Connected to database");

    })
    .catch((err) => {
        console.log(err);
        console.log("Something went wrong");
    });


app.use(bodyParser.json());
require('./models/user');
require('./models/product');
require('./models/order');


app.use(require('./routes/auth'));
app.use(require('./routes/product'));
app.get('/receipt', (req, res) => {
    res.sendFile(`${__dirname}/documents/output.pdf`);
});

app.listen(PORT, () => {
    console.log("Server started");
})
