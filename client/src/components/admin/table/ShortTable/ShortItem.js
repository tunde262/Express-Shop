import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteProduct } from '../../../../actions/productActions';


const ShortItem = ({ detailItem, product: { selectedItems }, handleClick, itemList }) => {  
    const [selected, setSelected] = useState(false);
    
    useEffect(() => {
        if(itemList.includes(detailItem._id)) {
            setSelected(true);
        }
    }, []);

    const itemClick = () => {
        handleClick(detailItem._id);
        setSelected(!selected)
    }

    return (
        <tr key={detailItem._id} style={selected ? {background: 'rgb(247,247,247)'} : {background: 'rgb(0,0,0,0)'}} onClick={itemClick}>
            <td>
                <input checked={selected} class="edit_info" type="checkbox" style={{width:'15px'}}/>
            </td>
            <td>{detailItem.img_gallery[0] && <img style={{width: '50px'}} src={`/api/products/image/${detailItem.img_gallery[0].img_name}`} alt="img" />}</td>
            <td><Link to={"/admin/product/" + detailItem._id}>{detailItem.name}</Link></td>
            <td>5 Stock / 2 Variants</td>
        </tr>
    )
}

ShortItem.propTypes = {
    deleteProduct: PropTypes.func.isRequired,
    product: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    product: state.product,
})

export default connect(mapStateToProps, { deleteProduct })(ShortItem);
