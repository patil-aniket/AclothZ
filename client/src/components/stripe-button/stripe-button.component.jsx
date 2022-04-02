import React from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import { checkOutSuccess } from "../../redux/cart/cart.action";
import { useDispatch } from 'react-redux';

// 3 party payment from stripe.com
export default function({ price }) {
  // your Publishable key
  const dispatch=useDispatch()
  const publicKey = "pk_test_51JY2BdSDtGDwNOCj61XZZKtLbj2ny1WelLNCHPCgxS3CIdGhajUJ612fqVJWciS4NDtP3vniQuuKbhPCXuwF8rKi00NIdF2VrT";
  const priceForStripe = price * 100;
  const onToken = async token => {
    try {
      await axios.post("http://localhost:5000/api/payment", {
        token: token,
        amount: price
      });

      dispatch(checkOutSuccess());
      alert("success payment!");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <StripeCheckout
      label='Pay Now'
      name='Aclothz'
      billingAddress
      shippingAddress
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel='Pay Now'
      token={onToken}
      stripeKey={publicKey}
      image="https://i.ibb.co/92nrDWw/logo.png"
      />
  );
}
