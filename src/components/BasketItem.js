import React from 'react';

function BasketItem(props) {

    const { name, id, price, quantity, fromDeleteBasket, decrementQunatity, incrementQuantity } = props;


    return (
        <li className="collection-item basketItem">
            <span className="basketItem">{`${name} x${quantity} Price ${price * quantity} $`}</span>
            <span>            
                <i className="material-icons add" onClick={() => incrementQuantity(id)}>add</i>
                <i className="material-icons remove" onClick={() => decrementQunatity(id)}>remove</i>
                <i className="material-icons delete" onClick={() => fromDeleteBasket(id)}>delete</i>
            </span>
        </li>
    );
}

export default BasketItem;