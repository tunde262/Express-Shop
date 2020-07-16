import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getProductVariants, deleteVariant } from '../../../actions/variantActions';
import Spinner from '../../common/Spinner';
import 'react-responsive-modal/styles.css';


const Variant = ({ setModal, page, varId, variant: {loading, variants}, getProductVariants, deleteVariant }) => {
    useEffect(() => {
        getProductVariants(varId);
      }, [getProductVariants])

    const [modalShow, handleModal] = useState(false);
     
      const openModal = () => {
        handleModal(true);
      };

      const closeModal = () => {
        handleModal(false);
      };
     

    let variantList;
    if(variants === null || loading) {
        variantList = <Spinner />; 
    } else {
        if(variants.length > 0) {
            variantList = variants.map(variant => {
                // let variantList;
                // if(variant.color) variantList = `${variant.color}`;
                // if(variant.size) variantList = `${variant.color} / ${variant.size}`;
                // if(variant.weight) variantList = `${variant.color} / ${variant.size} / ${variant.weight}`;
                // if(variant.type) variantList = `${variant.color} / ${variant.size} / ${variant.weight} / ${variant.type}`;
                // if(variant.bundle) variantList = `${variant.color} / ${variant.size} / ${variant.weight} / ${variant.type} / ${variant.bundle}`;
                // if(variant.scent) variantList = `${variant.color} / ${variant.size} / ${variant.weight} / ${variant.type} / ${variant.bundle} / ${variant.scent}`;
                // if(variant.fit) variantList = `${variant.color} / ${variant.size} / ${variant.weight} / ${variant.type} / ${variant.bundle} / ${variant.scent} / ${variant.fit}`;
                // if(variant.flavor) variantList = `${variant.color} / ${variant.size} / ${variant.weight} / ${variant.type} / ${variant.bundle} / ${variant.scent} / ${variant.fit} / ${variant.flavor}`;
                // if(variant.material) variantList = `${variant.color} / ${variant.size} / ${variant.weight} / ${variant.type} / ${variant.bundle} / ${variant.scent} / ${variant.fit} / ${variant.flavor} / ${variant.material}`;

                return (
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
                            {variant.type && (<span>{variant.type} </span>)}
                            {variant.scent && (<span>{variant.scent} </span>)}
                            {variant.fit && (<span>{variant.fit} </span>)}
                            {variant.flavor && (<span>{variant.flavor} </span>)}
                            {variant.material && (<span>{variant.material} </span>)}
                        </td>
                        <td>{variant.inventory_qty}</td>
                        <td>{variant.price}</td>
                        <td><i onClick={() => deleteVariant(variant._id)} className="fas fa-trash"></i></td>
                    </tr>
                )
            });
        } else {
            variantList = <h3>No Items</h3>
        }
    }

    let count;
    if(variants !== null && !loading) {
        count = variants.length;
    }

    return (
        <Fragment>
            {page === 'product' ? (
                <section>
                    <p style={{alignSelf: "flex-end"}}>{count} Varients</p>
                    <button onClick={setModal} type="button" style={{background: "#42b499", color:"#fff"}} className="btn">Add Variant</button>
                </section>
            ) : null}
            <table className="table">
                <thead>
                    <tr>
                        <th>
                            <input type="checkbox" value=""/>
                        </th>
                        <th>Img</th>
                        <th>Options</th>
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
