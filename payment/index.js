const express = require('express');
const cors = require('cors');
const app = express();
const http = require('http');
require('dotenv').config();
const Stripe = require('stripe');
const stripe = Stripe('sk_test_51MyIpIFhTFEnkTy8M6XsRARLa2TrpDNlQ0J7obv3NOavVWAbboqCd4WzMefYGusWrQTDDQrV7NUarwl2zIehBfGX00WkMx1zfD');


const server = http.createServer(app);

const {Server} = require('socket.io');

const io = new Server(server, {

 cors: '*',

 methods:'*'

})

app.use(cors());

app.use(express.json());


//Stripe payments

app.post('/create-payment', async(req, res)=> {

    const {amount} = req.body;

    console.log(amount);
    try {

        const paymentIntent = await stripe.paymentIntents.create({
            amount,

            currency: 'usd',

        payment_method_types: ['card']
 });

    console.log(amount);

    res.status(200).json(paymentIntent)

 } catch (e) {

    console.log(e.message);

    res.status(400).json(e.message);
}

 })

server.listen(8083, () => {

 console.log("server running at port", 8083);

});

app.set("socketio", io);