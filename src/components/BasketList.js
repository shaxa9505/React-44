import React from 'react';
import BasketItem from './BasketItem';

function BasketList(props) {

    const {order = [], toggleBasket = Function.prototype, incrementQuantity, decrementQunatity, fromDeleteBasket} = props;
    const totalPrice = order.reduce((sum, el) => {
       return sum + el.price * el.quantity  
    }, 0)

    return (

            <ul className="collection basketList">
                <li className="collection-item active cancel">Shop Market<i class="material-icons can" onClick={toggleBasket}>cancel</i></li>
                    {order.length ? order.map(item => (
                        <BasketItem key={item.id} {...item} incrementQuantity={incrementQuantity}   decrementQunatity={decrementQunatity} fromDeleteBasket={fromDeleteBasket} />
                    )) : <li className="basketItem">Nothing here</li>}
                <li className="collection-item active">Total Price: {totalPrice} </li>
            </ul>
    );
}

export default BasketList;