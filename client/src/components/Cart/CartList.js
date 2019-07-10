import React from 'react';
import CartItem from './CartItem';

export default function CartList({cart}) {

    return (
        <div className="container-fluid">
            {cart.map(item => {
                return <CartItem key={item.item.id} item={item} />;
            })}
        </div>
    )
}
