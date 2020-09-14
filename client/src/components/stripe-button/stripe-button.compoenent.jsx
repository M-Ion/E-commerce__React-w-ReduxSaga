import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_51HPQnLHDB2Jy7PbQzbwvSGEYsEKyr1Uc9XpsNRpmlnLA9OZtTg1zIPs7TZmMJrHq58PcIA82Gnye4cEi4NO67ieU002k3ezTGF';

    const onToken = token => {
        axios({
            url: 'payment',
            method: 'post',
            data: {
                amount: priceForStripe,
                token
            }
        }).then(response => {
            alert('Payment successful')
        }).catch(error => {
            console.log('Paymen error: ', JSON.parse(error) );
            alert('There was an issue with your payment.Please sure you use the provided credit card');
        });
    };

    return (
        <StripeCheckout
            label='Pay Now'
            name='CRWN Clothing'
            billingAddress
            shippingAddress
            image='https://sendeyo.com/up/d/f3eb2117da'
            description={`Your total is $${ price }`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={ onToken } //The 'token' is the on success callback that triggers is when we submit.
            stripeKey={publishableKey}
        />
    );
};

export default StripeCheckoutButton;