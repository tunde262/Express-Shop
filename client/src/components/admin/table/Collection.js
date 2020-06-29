import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCollections, deleteCollection } from '../../../actions/collectionActions';
import Spinner from '../../common/Spinner';
import 'react-responsive-modal/styles.css';


const Collection = ({ collection: {loading, collections}, getCollections, deleteCollection }) => {
    useEffect(() => {
        getCollections();
      }, [getCollections])

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
                    <td>{collection.name}</td>
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

    return (
        <Fragment>
            <section>
                <p style={{alignSelf: 'flex-end'}}>40 Collections</p>
                <Link to="/admin/collection/add" style={{background: '#42b499', color:'#fff'}} className="btn">Add Collection</Link>
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
    getCollections: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    profile: state.profile,
    collection: state.collection
})

export default connect(mapStateToProps, { getCollections, deleteCollection })(Collection);
