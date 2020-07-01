import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getProductVariants, deleteVariant } from '../../../actions/variantActions';
import Spinner from '../../common/Spinner';
import 'react-responsive-modal/styles.css';


const Variant = ({ varId, variant: {loading, variants}, getProductVariants, deleteVariant }) => {
    useEffect(() => {
        getProductVariants(varId);
      }, [getProductVariants])

    const [modalShow, setModal] = useState(false);
     
      const openModal = () => {
        setModal(true);
      };

      const closeModal = () => {
        setModal(false);
      };
     

    let variantList;
    if(variants === null || loading) {
        variantList = <Spinner />; 
    } else {
        if(variants.length > 0) {
            variantList = variants.map(variant => (
                <tr key={variant._id}>
                    <td>
                        <input type="checkbox" value=""/>
                    </td>
                    <td><img style={{width: '50px'}} src={`/api/variants/image/${variant.img_name}`} alt="img" /></td>
                    <td>
                        {variant.color && (<span>{variant.color} </span>)}
                        {variant.size && (<span>{variant.size} </span>)}
                        {variant.weight && (<span>{variant.weight} </span>)}
                        {variant.bundle && (<span>{variant.bundle} </span>)}
                        {variant.scent && (<span>{variant.scent} </span>)}
                        {variant.fit && (<span>{variant.fit} </span>)}
                        {variant.flavor && (<span>{variant.flavor} </span>)}
                        {variant.material && (<span>{variant.material} </span>)}
                    </td>
                    <td>{variant.inventory_qty}</td>
                    <td>{variant.price}</td>
                    <td><i onClick={() => deleteVariant(variant._id)} className="fas fa-trash"></i></td>
                </tr>
            ));
        } else {
            variantList = <h3>No Items</h3>
        }
    }

    return (
        <Fragment>
            <table className="table">
                <thead>
                    <tr>
                        <th>
                            <input type="checkbox" value=""/>
                        </th>
                        <th>Img</th>
                        <th>Name</th>
                        <th>Stock</th>
                        <th>Price</th>
                        <th />
                    </tr>
                </thead>
                <tbody>{variantList}</tbody>
            </table>

            {/* <Modal open={modalShow} onClose={() => setModal(false)}>
                <ItemForm />
            </Modal> */}
        </Fragment>
    )
}

Variant.propTypes = {
    variant: PropTypes.object.isRequired,
    deleteVariant: PropTypes.func.isRequired,
    getProductVariants: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    profile: state.profile,
    variant: state.variant
});

export default connect(mapStateToProps, { getProductVariants, deleteVariant })(Variant);
