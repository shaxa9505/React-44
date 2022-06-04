import React, { useState, useEffect } from 'react';
import { API_KEY, API_URL } from '../config';
import BasketList from './BasketList';
import Cart from './Cart';
import GoodList from './GoodList';
import Loader from './Loader';
import {toast} from "react-toastify" 

function Shop(props) {

    const [goods, setGoods] = useState([]);
    const [loading, setLoading] = useState(true);
    const [order, setOrder] = useState([])
    const [isBasketShow, setBasketShow] = useState(false)

    function addToBasket(item) {
        const itemIndex = order.findIndex(orderItem => orderItem.id === item.id);

        if (itemIndex < 0) {
            const newItem = {
                ...item,
                quantity: 1
            }
            setOrder([...order, newItem])
        } else{
            const newOrder = order.map((orderItem, index) => {
                if(index === itemIndex){
                    return {
                        ...orderItem,
                        quantity: orderItem.quantity + 1
                    }
                } else{
                    return orderItem
                }
            })
            setOrder(newOrder)
        }


        toast.success("Sizni korzinkangizga nimadur quwildi")
    }
    
    function toggleBasket () {
        setBasketShow(!isBasketShow)
        console.log("Man ciqdim");
    }

    function fromDeleteBasket (itemId) {
        setOrder(order.filter(item => item.id !== itemId))
        toast.error("Sizni korzinkezdan nimadur ucirildi")
    }

    function incrementQuantity (itemId) {
        const newOrder = order.map(item => {
            if(item.id === itemId){
                const newQuantity = item.quantity + 1;
                return {
                    ...item,
                    quantity: newQuantity
                }
            } else{
                return item
            }
        })   
        setOrder(newOrder)    
    }

    function decrementQunatity (itemId) {
        const newOrder = order.map(item => {
            if(item.id === itemId){
                const newQuantity = item.quantity - 1
                return {
                    ...item,
                    quantity: newQuantity >= 0 ? newQuantity : 0  
                }
            } else{
                return item
            }
        })
        setOrder(newOrder)
    }



    useEffect(() => {
        fetch(API_URL, {
            headers: {
                Authorization: API_KEY
            }
        })
            .then(response => response.json())
            .then(data => {
                data.featured && setGoods(data.featured)
                setLoading(false)
            })
    }, [])



    return (
        <div className="container content">
            <Cart toggleBasket={toggleBasket} quantity={order.length} />
            {loading ? <Loader /> : <GoodList goods={goods} addToBasket={addToBasket} />}
            {isBasketShow ? <BasketList decrementQunatity={decrementQunatity} incrementQuantity={incrementQuantity} fromDeleteBasket={fromDeleteBasket} toggleBasket={toggleBasket} order={order}/> : null }
        </div>
    );
}

export default Shop;