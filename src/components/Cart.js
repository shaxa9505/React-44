import React from 'react';

function Cart(props) {

    const {quantity = 0, toggleBasket = Function.prototype} = props

    return (
        <div className="cart blue white-text" onClick={toggleBasket}>
            <i className="material-icons">add_shopping_cart</i>
            {quantity ? <span className="cart-quantity">{quantity}</span> : null}
        </div>
    );
}

export default Cart;