import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getStoreVariants, deleteVariant } from '../../../actions/variantActions';
import Spinner from '../../common/Spinner';
import 'react-responsive-modal/styles.css';


const Inventory = ({ page, setModal, variant: {loading, sortedVariants}, deleteVariant }) => {
    // const [modalShow, setModal] = useState(false);
     
    // const openModal = () => {
    // setModal(true);
    // };

    // const closeModal = () => {
    // setModal(false);
    // };
     

    let variantList;
    if(sortedVariants === null || loading) {
        variantList = <Spinner />; 
    } else {
        if(sortedVariants.length > 0) {
            variantList = sortedVariants.map(variant => (
                <tr key={variant._id}>
                    <td>
                        <input type="checkbox" value=""/>
                    </td>
                    <td></td>
                    <td><Link to={"/admin/variant/" + variant._id}>{variant.name}</Link></td>
                    <td>5 Stock / 2 Variants</td>
                    <td>{variant.price}</td>
                    <td><i onClick={() => deleteVariant(variant._id)} className="fas fa-trash"></i></td>
                </tr>

            ));
        } else {
            variantList = <h3>No Items</h3>
        }
    }

    let count;
    if(sortedVariants !== null && !loading) {
        count = sortedVariants.length;
    }

    return (
        <Fragment>
            {/* {page === 'dashboard' ? (
                <section>
                    <p style={{alignSelf: 'flex-end'}}>{count} Variants</p>
                    <Link to="/admin/add-variant"><button type="button" style={{background: "#42b499", color:"#fff"}} className="btn">Add Variant</button></Link>
                </section>
            ) : null} */}
            {page === 'location' ? (
                <section>
                    <p style={{alignSelf: "flex-end"}}>{count} Varients</p>
                    <button onClick={setModal} type="button" style={{background: "#42b499", color:"#fff"}} className="btn">Add Manually</button>
                </section>
            ) : null}
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

Inventory.propTypes = {
    deleteVariant: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    profile: state.profile,
})

export default connect(mapStateToProps, { deleteVariant })(Inventory);
