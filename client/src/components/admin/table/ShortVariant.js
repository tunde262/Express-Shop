import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../../common/Spinner';
import 'react-responsive-modal/styles.css';


const ShortVariant = ({ variant: {loading, sortedVariants}, handleClick, variantList }) => {  
    const [listForColor, setListForColor] = useState([]);
    const [colorSwitch, setColorSwitch] = useState(false);

    const itemClick = (newVariant) => {
        handleClick(newVariant);
        setColorSwitch(!colorSwitch)
        if(listForColor.includes(newVariant)) {
            // Get remove index
            const removeIndex = listForColor.indexOf(newVariant);

            const newList = listForColor.splice(removeIndex, 1);

            setListForColor([...newList]);
        } else {
            setListForColor([...listForColor, newVariant]);
        }
    }

    let varList;
    if(sortedVariants === null || loading) {
        varList = <Spinner />; 
    } else {
        if(sortedVariants.length > 0) {
            
            varList = sortedVariants.map(variant => {
                let rowStyle;
                if(listForColor.includes(variant._id)){
                    rowStyle = {background: 'rgb(0,0,255,0.2)'};
                }
                if(listForColor.includes(!variant._id)){
                    rowStyle = {background: 'rgb(0,0,0,0)'};
                }

                return (
                    <tr key={variant._id} style={rowStyle} onClick={() => itemClick(variant._id)}>
                        <td>
                            <input class="edit_info" type="checkbox" style={{width:'15px'}}/>
                        </td>
                        <td>
                            {variant.color && (<span>{variant.color} </span>)}
                            {variant.size && (<span>{variant.size} </span>)}
                            {variant.weight && (<span>{variant.weight} </span>)}
                            {variant.bundle && (<span>{variant.bundle} </span>)}
                            {variant.type && (<span>{variant.type} </span>)}
                            {variant.scent && (<span>{variant.scent} </span>)}
                            {variant.fit && (<span>{variant.fit} </span>)}
                            {variant.flavor && (<span>{variant.flavor} </span>)}
                            {variant.material && (<span>{variant.material} </span>)}
                        </td>
                        <td><Link to={"/admin/variant/" + variant._id}>{variant.name}</Link></td>
                        <td>5 Stock / 2 Variants</td>
                    </tr>
                )

            });
        } else {
            varList = <h3>No Items</h3>
        }
    }

    return (
        <Fragment>
            <table className="table">
                <thead>
                    <tr>
                        <th>
                            <input type="checkbox" name="name1" />
                        </th>
                        <th>Img</th>
                        <th>Name</th>
                        <th>Stock</th>
                    </tr>
                </thead>
                <tbody>{varList}</tbody>
            </table>

            {/* <Modal open={modalShow} onClose={() => setModal(false)}>
                <ItemForm />
            </Modal> */}
        </Fragment>
    )
}

ShortVariant.propTypes = {
   
}

const mapStateToProps = state => ({
    profile: state.profile,
})

export default connect(mapStateToProps, null)(ShortVariant);
