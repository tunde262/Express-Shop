import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getStoreCollections, deleteCollection } from '../../../actions/collectionActions';
import Spinner from '../../common/Spinner';
import 'react-responsive-modal/styles.css';


const Collection = ({ collection: {loading, collections}, getStoreCollections, deleteCollection }) => {
    useEffect(() => {
        getStoreCollections();
      }, [getStoreCollections])

    const [modalShow, setModal] = useState(false);
     
      const openModal = () => {
        setModal(true);
      };

      const closeModal = () => {
        setModal(false);
      };
     

    let collectionList;
    if(collections === null || loading) {
        collectionList = <Spinner />; 
    } else {
        if(collections.length > 0) {
            collectionList = collections.map(collection => (
                <tr key={collection._id}>
                    <td>
                        <input type="checkbox" value=""/>
                    </td>
                    <td><Link to={"/admin/collection/" + collection._id}>{collection.name}</Link></td>
                    <td>{collection.qty}</td>
                    <td>
                        {collection.tags.map( (tag, index) => (  
                            <p key={index}>{tag}{' '}</p>
                            )
                        )}
                    </td>
                    <td><a class="btn btn-default" href="edit.html">Edit</a> <a class="btn btn-danger" href="#">Delete</a></td>
                </tr>

            ));
        } else {
            collectionList = <h3>No Collections</h3>
        }
    }

    let count;
    if(collections !== null && !loading) {
        count = collections.length;
    }

    return (
        <Fragment>
            <section>
                <p style={{alignSelf: 'flex-end'}}>{count} Collections</p>
                <Link to="/admin/add-collection" style={{background: '#42b499', color:'#fff'}} className="btn">Add Collection</Link>
            </section>
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
                <tbody>{collectionList}</tbody>
            </table>

            {/* <Modal open={modalShow} onClose={() => setModal(false)}>
                <CollectionForm />
            </Modal> */}
        </Fragment>
    )
}

Collection.propTypes = {
    collection: PropTypes.object.isRequired,
    deleteCollection: PropTypes.func.isRequired,
    getStoreCollections: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    profile: state.profile,
    collection: state.collection
})

export default connect(mapStateToProps, { getStoreCollections, deleteCollection })(Collection);
