import React, { Fragment } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ReviewItem from './ReviewItem';
import Spinner from '../common/Spinner';

import { handleDetail, addReview, deleteReview } from '../../actions/productActions';

const Reviews = ({handleDetail, setModal, product: { detailProduct, loading }, addReview, deleteReview }) => {

    let reviewList;
    if (detailProduct.comments.length > 0) {
        reviewList = detailProduct.comments.map(comment => <ReviewItem comment={comment} />)
    } else {
        reviewList = (
            <Fragment>
                <p>Be the first to review this item!</p>
                <a onClick={setModal} style={{color: 'white'}} className="btn btn-primary my-1">
                    Write Review
                </a>
            </Fragment>
        )
    }

    return (
        <Fragment>
            {loading && detailProduct === null ? <Spinner /> : (
                <div>
                    {detailProduct.comments.length > 0 && (
                        <a onClick={setModal} style={{color: 'white', float:'right'}} className="btn btn-primary my-1">
                            Write Review
                        </a>
                    )}
                    {reviewList}
                </div>
            )}
        </Fragment>
    )
}

Reviews.propTypes = {
    product: PropTypes.object.isRequired,
    handleDetail: PropTypes.func.isRequired,
    addReview: PropTypes.func.isRequired,
    deleteReview: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    product: state.product
});

export default connect(mapStateToProps, { handleDetail, addReview, deleteReview })(Reviews);
