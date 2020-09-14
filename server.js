const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path'); // It allows us to dinamically build when we call it from our current directory to where we're actually trying to go.

if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const app = express();
const port = process.env.PORT || 5000; //When we deploy to Heroku, it sets up the process PORT for us!

app.use(bodyParser.json()); //Any of request coming in, I want to process their body tag and convert it to JSON.
app.use(bodyParser.urlencoded({ extended: true })); //Make sure that the URL string were getting in and we're passing out do not contain things like spaces or symbols right.

app.use(cors()); //Allows to make request from our local host (in my case 3000) to PORT (in my case 5000).

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client/build'))); // Poinst to 'client/build'.
    app.get('*', function(req, res) {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
};

app.listen(port, error => {
    if (error) throw error;
    console.log('Server running on port' + port);
});

app.post('/payment', (req, res) => {
    const body = {
        source: req.body.token.id,
        amount: req.body.amount,
        currency: 'usd'
    };

    stripe.charges.create(body, (stripeErr, stripeRes) => {
        if (stripeErr) {
            res.status(500).send({ error: stripeErr });
        } else {
            res.status(200).send({ success: stripeRes });
        };
    });

});