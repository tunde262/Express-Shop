import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getStoreCustomers, deleteCustomer } from '../../../actions/customerActions';
import Spinner from '../../common/Spinner';
import 'react-responsive-modal/styles.css';


const Customer = ({ customer: {loading, customers}, getStoreCustomers, deleteCustomer }) => {
    useEffect(() => {
        getStoreCustomers();
      }, [getStoreCustomers])

    const [modalShow, setModal] = useState(false);
     
      const openModal = () => {
        setModal(true);
      };

      const closeModal = () => {
        setModal(false);
      };
     

    let customerList;
    if(customers === null || loading) {
        customerList = <Spinner />; 
    } else {
        if(customers.length > 0) {
            customerList = customers.map(customer => (
                <tr key={customer._id}>
                    <td>
                        <input type="checkbox" value=""/>
                    </td>
                    <td><Link to={"/admin/customer/" + customer._id}>{customer.name}</Link></td>
                    <td>{customer.qty}</td>
                    <td>
                        {customer.tags.map( (tag, index) => (  
                            <p key={index}>{tag}{' '}</p>
                            )
                        )}
                    </td>
                    <td><a class="btn btn-default" href="edit.html">Edit</a> <a class="btn btn-danger" href="#">Delete</a></td>
                </tr>

            ));
        } else {
            customerList = <h3>No Customers</h3>
        }
    }

    return (
        <Fragment>
            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th>
                            <input type="checkbox" value=""/>
                        </th>
                        <th>Name</th>
                        <th>Qty</th>
                        <th>Tag(s)</th>
                        <th />
                    </tr>
                </thead>
                <tbody>{customerList}</tbody>
            </table>

            {/* <Modal open={modalShow} onClose={() => setModal(false)}>
                <CustomerForm />
            </Modal> */}
        </Fragment>
    )
}

Customer.propTypes = {
    customer: PropTypes.object.isRequired,
    deleteCustomer: PropTypes.func.isRequired,
    getStoreCustomers: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    profile: state.profile,
    customer: state.customer
})

export default connect(mapStateToProps, { getStoreCustomers, deleteCustomer })(Customer);
