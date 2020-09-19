import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

import mixpanel from 'mixpanel-browser';

import { Container } from '../../auth/Form';

const Success = () => {

    // Mixpanel
    const [sentMixpanel, setSentMixpanel] = useState(false);

    const next = e => {
        e.preventDefault();
        // Process Form
        this.props.nextStep();
    }

    const back = e => {
        e.preventDefault();
        this.props.prevStep();
    };

    // const handleMixpanel = () => {
    //     let cartIds = [];
    //     let cartNames = [];
    //     let cartCategories = [];

    //     cart.map(cartItemId => {
    //         cartIds.push(cartItemId.item._id);
    //     });

    //     cart.map(cartItemCategory => {
    //         cartCategories.push(cartItemCategory.item.category);
    //     });

    //     cart.map(cartItemName => {
    //         cartNames.push(cartItemName.item.name);
    //     })
        
    //     mixpanel.track("Complete Purchase", {
    //         // "Entry Point": "Home Page",
    //         "Delivery Method": deliveryMethod,
    //         "Delivery Amount": deliveryAmount,
    //         "Cart Size": cartQty,
    //         "Cart Value": cartSubtotal,
    //         "Cart Item IDs": cartIds,
    //         "Cart Item Categories": cartCategories,
    //         "Cart Item Names": cartNames,
    //         "Total Amount": cartTotal,
    //         "Tax Amount": cartTax,
    //         // "Payment Type": paymentMethod,
    //     });
        
    //     mixpanel.people.increment("Lifetime Value", cartTotal);
    // }

    // if(!sentMixpanel) {
    //     handleMixpanel();
    //     setSentMixpanel(true);
    // }

    return (
        <Fragment>
            <Container>
                <div className="container">
                    <h1>Thank You For Your Purchase</h1>
                    <p>You Will Be Receiving Your Order Shortly :)</p>
                    <Link to="/profile">View All Orders</Link>
                </div>
            </Container>
        </Fragment>
    )
}

export default Success;
