const express = require('express');
const stripe = require('stripe')('YOUR_STRIPE_SECRET_KEY'); // Replace with your own secret key
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files from the public directory

app.post('/charge', async (req, res) => {
    try {
        const { paymentMethodId } = req.body;

        const paymentIntent = await stripe.paymentIntents.create({
            amount: 1000, // Amount in cents (e.g., $10.00)
            currency: 'usd',
            payment_method: paymentMethodId,
            confirm: true,
        });

        res.json({ message: 'Payment successful!' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});