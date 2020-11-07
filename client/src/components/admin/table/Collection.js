import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getStoreCollections, deleteCollection } from '../../../actions/collectionActions';
import Spinner from '../../common/Spinner';
import 'react-responsive-modal/styles.css';


const Collection = ({ collection: {loading, collections}, store, getStoreCollections, deleteCollection }) => {

    const [collectionList, setCollectionList] = useState([]);
    const [gotCollections, setGotCollections] = useState(false);

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        window.addEventListener('resize', () => handleWindowSizeChange());

        return () => window.removeEventListener('resize', () => handleWindowSizeChange());
    }, []);

    const [modalShow, setModal] = useState(false);
     
      const openModal = () => {
        setModal(true);
      };

      const closeModal = () => {
        setModal(false);
      };


    const handleWindowSizeChange = () => {
        setWindowWidth(window.innerWidth);
    };

    const isMobile = windowWidth <= 769;
    const isTablet = windowWidth <= 1000;

    const renderCollectionList = async () => {
        try {
            if(collections.length > 0) {
                collections.map(async collection => {
                    setCollectionList(collectionList => [...collectionList, (
                        <div className={isTablet ? "secondary-table-row-mobile" : "secondary-table-row"} key={collection._id}>
                            {isTablet ? (
                                <Fragment>
                                    <Link to={"/admin/collection/" + store.store._id + "/" + collection._id}>
                                        <div className="line-clamp-1" style={{maxHeight:'40px', overflow:'hidden', color:'#0098d3'}}>{collection.name}</div>
                                    </Link>
                                    <Link to={"/admin/collection/" + store.store._id + "/" + collection._id}>
                                        <div><p style={{margin:'0'}}>5</p></div>
                                    </Link>
                                    <Link to={"/admin/collection/" + store.store._id + "/" + collection._id}>
                                        <div><p style={{margin:'0'}}>5</p></div>
                                    </Link>
                                </Fragment>
                            ) : (
                                <Fragment>
                                    <div>
                                        <input type="checkbox" value=""/>
                                    </div>
                                    <Link to={"/admin/collection/" + store.store._id + "/" + collection._id}>
                                        <div className="line-clamp-1" style={{maxHeight:'40px', overflow:'hidden', color:'#0098d3'}}>{collection.name}</div>
                                    </Link>
                                    <Link to={"/admin/collection/" + store.store._id + "/" + collection._id}><div className="line-clamp" style={{maxHeight:'40px', overflow:'hidden'}}>5</div></Link>
                                    <Link to={"/admin/collection/" + store.store._id + "/" + collection._id}><div className="line-clamp" style={{maxHeight:'40px', overflow:'hidden'}}>5</div></Link>
                                    <Link to={"/admin/collection/" + store.store._id + "/" + collection._id}>
                                        <div style={{display:'flex', flexWrap:'wrap', width:'100%'}}>
                                            {collection.tags.map( (tag, index) => (  
                                                <div key={index} style={{background:'#66ff66', display:'flex', justifyContent:'center', alignItems:'center', margin:'5px 5px 5px 0', justifyContent:'center', alignItems:'center', height:'30px', width:'fit-content',  borderRadius:'30px', padding:'1px 1rem 0 1rem'}}>
                                                    <p style={{margin:'auto', color:'green'}}>{tag}</p>
                                                    <i style={{color:'green', marginLeft:'10px',fontSize:'12px'}} class="fas fa-times"></i>
                                                </div>
                                            ))}
                                        </div>
                                    </Link>
                                    <Link to={"/admin/collection/" + store.store._id + "/" + collection._id}><div style={{width:'50px'}}><i className="fas fa-trash"></i></div></Link>
                                </Fragment>
                            )}
                        </div>

                    )])          
                });
            } else {
                setCollectionList(collectionList => [...collectionList, (
                    <button>Add Item</button>
                )])
            }
        } catch (err) {
            console.log(err);
        }
    }

    if(!gotCollections && !loading && collections.length > 0) {
        renderCollectionList();
        setGotCollections(true);
    }
     

    // let collectionList;
    // if(collections === null || loading) {
    //     collectionList = <Spinner />; 
    // } else {
    //     if(collections.length > 0) {
    //         collectionList = collections.map(collection => (
    //             <tr key={collection._id}>
    //                 <td>
    //                     <input type="checkbox" value=""/>
    //                 </td>
    //                 <td><Link to={"/admin/collection/" + store.store._id + "/" + collection._id}>{collection.name}</Link></td>
    //                 <td>{collection.qty}</td>
    //                 <td>
    //                     {collection.tags.map( (tag, index) => (  
    //                         <p key={index}>{tag}{' '}</p>
    //                         )
    //                     )}
    //                 </td>
    //                 <td><a class="btn btn-default" href="edit.html">Edit</a> <a class="btn btn-danger" href="#">Delete</a></td>
    //             </tr>

    //         ));
    //     } else {
    //         collectionList = <h3>No Collections</h3>
    //     }
    // }

    let count;
    if(collections !== null && !loading) {
        count = collections.length;
    }

    return (
        <Fragment>
            {/* <section>
                <p style={{alignSelf: 'flex-end'}}>{count} Collections</p>
                <Link to="/admin/add-collection" style={{background: '#42b499', color:'#fff'}} className="btn">Add Collection</Link>
            </section> */}
            <table className="table">
                <div className={!isTablet ? "secondary-thead" : "secondary-thead-mobile"}>
                    {!isTablet ? (
                        <Fragment>
                            <div>
                                <input type="checkbox" value=""/>
                            </div>
                            <div><p>Name</p></div>
                            <div><p>Qty</p></div>
                            <div><p>Sold</p></div>
                            <div><p>Tag(s)</p></div>
                            <div></div>
                        </Fragment>
                    ) : (
                        <Fragment>
                            <div><p>Name</p></div>
                            <div><p>Qty</p></div>
                            <div><p>Sold</p></div>
                        </Fragment>
                    )}
                </div>
                <div className="tbody">{!collectionList.length > 0 ? <Spinner /> : collectionList}</div>
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
    store: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    profile: state.profile,
    collection: state.collection,
    store: state.store
})

export default connect(mapStateToProps, { getStoreCollections, deleteCollection })(Collection);
