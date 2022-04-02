import { all ,put ,call ,takeLatest } from 'redux-saga/effects';

import { clearAllCartItems } from './cart.action';
import * as USERTYPE from '../user/user.type';
import { CHECKOUT_SUCCESS } from './cart.type';

export function* clearCartStore() {
  yield put(clearAllCartItems());
}

// handle function
export function* onSingOutSuccess() {
  yield takeLatest(USERTYPE.SIGN_OUT_SUCCESS, clearCartStore)
}

export function* cartSaga() {
  yield all([call(onSingOutSuccess)])
}

export function* clearCartItemsOnCheckout() {
  yield put(clearAllCartItems());
}


export function* onCheckoutSuccess() {
  yield takeLatest(CHECKOUT_SUCCESS,clearCartItemsOnCheckout);
}
