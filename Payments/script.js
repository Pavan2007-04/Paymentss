const stripe = Stripe('YOUR_STRIPE_PUBLIC_KEY'); // Replace with your own public key
const elements = stripe.elements();
const cardElement = elements.create('card');
cardElement.mount('#card-element');

const form = document.getElementById('payment-form');
form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const { paymentMethod, error } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
    });

    if (error) {
        // Show error in payment result
        document.getElementById('payment-result').innerText = error.message;
    } else {
        // Send paymentMethod.id to your server (see server code below)
        const response = await fetch('/charge', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ paymentMethodId: paymentMethod.id }),
        });

        const paymentResult = await response.json();
        document.getElementById('payment-result').innerText = paymentResult.message;
    }
});