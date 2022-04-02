import React from "react";
import { useSelector,useDispatch } from "react-redux";
import { createStructuredSelector } from "reselect";

import {
  selecterCartItems,
  selecterCartItemsTotalCount
} from "../../redux/cart/cart.selectors";
import StripeCheckoutButton from '../../components/stripe-button/stripe-button.component';
import CheckoutItem from "../../components/checkout-item/checkout-item.component";
import "./checkout.style.scss";
import { clearAllCartItems } from './../../redux/cart/cart.action';

const CheckoutComponent = () => {
  const { cartItems, total } = useSelector(
    createStructuredSelector({
      cartItems: selecterCartItems,
      total: selecterCartItemsTotalCount
    })
  );
const dispatch=useDispatch();
  return (
    <div className="checkout-page">
      <div className="checkout-header">
        <div className="header-block">Product</div>
        <div className="header-block">Description</div>
        <div className="header-block">Quantity</div>
        <div className="header-block">Price</div>
        <div className="header-block">Remove</div>
      </div>
      {cartItems.map(cartItem => (
        <CheckoutItem key={cartItem.id} cartItem={cartItem} />
      ))}
      <div className="total">${total}</div>
      <div className="note">
        Example
        <br />
        Number: 4242 4242 4242 4242, Exp: 01/22, CVV: 123
      </div>
      <StripeCheckoutButton price={total}  />
    </div>
  );
};

export default CheckoutComponent;
