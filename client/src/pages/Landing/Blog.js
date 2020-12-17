import React, { useEffect, useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { setPage } from '../../actions/navActions';

import Footer from './Footer';

import post1 from '../../assets/Blog-post/post-1.jpg';
import post2 from '../../assets/Blog-post/post-2.jpg';
import post3 from '../../assets/Blog-post/post-3.jpg';
import post5 from '../../assets/Blog-post/post-5.png';

import blog1 from '../../assets/Blog-post/blog1.png';
import blog2 from '../../assets/Blog-post/blog2.png';
import blog3 from '../../assets/Blog-post/blog3.png';
import blog4 from '../../assets/Blog-post/blog4.png';

import popular1 from '../../assets/popular-post/m-blog-1.jpg';
import popular2 from '../../assets/popular-post/m-blog-2.jpg';
import popular3 from '../../assets/popular-post/m-blog-3.jpg';
import popular4 from '../../assets/popular-post/m-blog-4.jpg';

const Blog = ({ history, setPage, isAuthenticated }) => {

    useEffect(() => {
        setPage('business');
    }, []);

    return (
        <div className="explore-container landing">
            <header style={{height:'400px', padding:'150px'}} className="page-header">
                <div className="page-header-content">
                    <div className="content-heading">
                        <h1 style={{marginBottom:'25px'}} className="heading-text">
                        Cost Calculator
                        </h1>
                        <p className="heading-sub-text">
                        Find out exactly what you would pay for Fulfillment and Storage with Cardboard Express.
                        </p>
                        <p className="heading-sub-text">
                        Just input your Amazon product link, ASIN, or your product information
                        </p>

                        <a href="#" className="btn btn-apply anchors showIfLoggedOut">
                        Enter Your Products To See Costs
                        </a>
                    </div>
                </div>
            </header>
            <section>
                <div class="blog">
                    <div class="container">
                        <div class="owl-carousel owl-theme blog-post">
                            <div class="blog-content">
                                <img src={post1} alt="post-1" />
                                <div class="blog-title">
                                    <h3>London Fashion week's continued the evolution</h3>
                                    <button class="btn btn-blog">Fashion</button>
                                    <span>2 minutes</span>
                                </div>
                            </div>
                            <div class="blog-content hide-sm">
                                <img src={post3} alt="post-1" />
                                <div class="blog-title">
                                    <h3>London Fashion week's continued the evolution</h3>
                                    <button class="btn btn-blog">Fashion</button>
                                    <span>2 minutes</span>
                                </div>
                            </div>

                        </div>
                        <div class="owl-navigation">
                            <span class="owl-nav-prev"><i class="fas fa-long-arrow-alt-left"></i></span>
                            <span class="owl-nav-next"><i class="fas fa-long-arrow-alt-right"></i></span>
                        </div>
                    </div>
                </div>
            </section>

            <section class="container">
                <div class="site-content">
                    <div class="posts">
                        <div class="post-content">
                            <div class="post-image">
                                <div>
                                    <img class="img" src={blog1} alt="blog" />
                                </div>
                                <div class="post-info flex-row">
                                    <span><i class="fas fa-user text-gray"></i>&nbsp;&nbsp;Admin</span>
                                    <span><i class="fas fa-calendar-alt text-gray"></i>&nbsp;&nbsp;January 14, 2019</span>
                                    <span>0 Comments</span>
                                </div>
                            </div>
                            <div class="post-title">
                                <a href="#">
                                    Lorem. Dolorum praesentium voluptatem 
                                    facilis incidunt!</a>
                                <p>
                                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. 
                                    Praesentium illum blanditiis cum hic architecto vel aut placeat 
                                    pariatur! Minima at tenetur dolor veniam voluptas esse eius maxime 
                                    laborum laboriosam quo nostrum culpa aliquid iure harum fugit, sequi, 
                                    modi ea? Cumque?
                                </p>
                                <button class="btn post-btn">Read More&nbsp; <i class="fas fa-arrow-right"></i></button>
                            </div>
                        </div>
                        <hr />
                        <div class="post-content">
                            <div class="post-image">
                                <div>
                                    <img class="img" src={blog2} alt="blog" />
                                </div>
                                <div class="post-info flex-row">
                                    <span><i class="fas fa-user text-gray"></i>&nbsp;&nbsp;Admin</span>
                                    <span><i class="fas fa-calendar-alt text-gray"></i>&nbsp;&nbsp;January 14, 2019</span>
                                    <span>5 Comments</span>
                                </div>
                            </div>
                            <div class="post-title">
                                <a href="#">
                                    Lorem ipsum dolor sit amet consectetur 
                                    adipisicing elit. Dolorum praesentium voluptatem 
                                    facilis incidunt!</a>
                                <p>
                                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. 
                                    Praesentium illum blanditiis cum hic architecto vel aut placeat 
                                    pariatur! Minima at tenetur dolor veniam voluptas esse eius maxime 
                                    laborum laboriosam quo nostrum culpa aliquid iure harum fugit, sequi, 
                                    modi ea? Cumque?
                                </p>
                                <button class="btn post-btn">Read More&nbsp; <i class="fas fa-arrow-right"></i></button>
                            </div>
                        </div>
                        <hr />
                        <div class="post-content">
                            <div class="post-image">
                                <div>
                                    <img class="img" src={blog4} alt="blog" />
                                </div>
                                <div class="post-info flex-row">
                                    <span><i class="fas fa-user text-gray"></i>&nbsp;&nbsp;Admin</span>
                                    <span><i class="fas fa-calendar-alt text-gray"></i>&nbsp;&nbsp;January 21, 2019</span>
                                    <span>12 Comments</span>
                                </div>
                            </div>
                            <div class="post-title">
                                <a href="#">
                                    Lorem ipsum dolor. voluptatem 
                                    facilis incidunt!</a>
                                <p>
                                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. 
                                    Praesentium illum blanditiis cum hic architecto vel aut placeat 
                                    pariatur! Minima at tenetur dolor veniam voluptas esse eius maxime 
                                    laborum laboriosam quo nostrum culpa aliquid iure harum fugit, sequi, 
                                    modi ea? Cumque?
                                </p>
                                <button class="btn post-btn">Read More&nbsp; <i class="fas fa-arrow-right"></i></button>
                            </div>
                        </div>
                        <hr />
                        <div class="post-content">
                            <div class="post-image">
                                <div>
                                    <img class="img" src={blog3} alt="blog" />
                                </div>
                                <div class="post-info flex-row">
                                    <span><i class="fas fa-user text-gray"></i>&nbsp;&nbsp;Admin</span>
                                    <span><i class="fas fa-calendar-alt text-gray"></i>&nbsp;&nbsp;January 14, 2019</span>
                                    <span>2 Comments</span>
                                </div>
                            </div>
                            <div class="post-title">
                                <a href="#">
                                    Lorem ipsum dolor. Dolorum praesentium voluptatem 
                                    facilis incidunt!</a>
                                <p>
                                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. 
                                    Praesentium illum blanditiis cum hic architecto vel aut placeat 
                                    pariatur! Minima at tenetur dolor veniam voluptas esse eius maxime 
                                    laborum laboriosam quo nostrum culpa aliquid iure harum fugit, sequi, 
                                    modi ea? Cumque?
                                </p>
                                <button class="btn post-btn">Read More&nbsp; <i class="fas fa-arrow-right"></i></button>
                            </div>
                        </div>
                        <div class="pagination flex-row">
                            <a href="#"><i class="fas fa-chevron-left"></i></a>
                            <a href="#" class="pages">1</a>
                            <a href="#" class="pages">2</a>
                            <a href="#" class="pages">3</a>
                            <a href="#"><i class="fas fa-chevron-right"></i></a>
                        </div>
                    </div>
                    <aside class="sidebar">
                        <div class="category">
                            <h2>Category</h2>
                            <ul class="category-list">
                                <li class="list-items">
                                    <a href="#">Software</a>
                                    <span>(05)</span>
                                </li>
                                <li class="list-items">
                                    <a href="#">Technology</a>
                                    <span>(02)</span>
                                </li>
                                <li class="list-items">
                                    <a href="#">Lifestyle</a>
                                    <span>(07)</span>
                                </li>
                                <li class="list-items">
                                    <a href="#">Shopping</a>
                                    <span>(01)</span>
                                </li>
                                <li class="list-items">
                                    <a href="#">Food</a>
                                    <span>(08)</span>
                                </li>
                            </ul>
                        </div>
                        <div class="popular-post">
                            <h2>Popular Post</h2>
                            <div class="post-content">
                                <div class="post-image">
                                    <div>
                                        <img class="img" src={popular1} alt="blog" />
                                    </div>
                                    <div class="post-info flex-row">
                                        <span><i class="fas fa-user text-gray"></i>&nbsp;&nbsp;Admin</span>
                                        <span><i class="fas fa-calendar-alt text-gray"></i>&nbsp;&nbsp;January 14, 2019</span>
                                        <span>2 Comments</span>
                                    </div>
                                </div>
                                <div class="post-title">
                                    <a href="#">
                                        Lorem ipsum dolor. voluptatem 
                                        facilis incidunt!</a>
                                </div>
                            </div>
                            <div class="post-content">
                                <div class="post-image">
                                    <div>
                                        <img class="img" src={popular2} alt="blog" />
                                    </div>
                                    <div class="post-info flex-row">
                                        <span><i class="fas fa-user text-gray"></i>&nbsp;&nbsp;Admin</span>
                                        <span><i class="fas fa-calendar-alt text-gray"></i>&nbsp;&nbsp;January 14, 2019</span>
                                        <span>2 Comments</span>
                                    </div>
                                </div>
                                <div class="post-title">
                                    <a href="#">
                                        Lorem ipsum dolor. voluptatem 
                                        facilis incidunt!</a>
                                </div>
                            </div>
                            <div class="post-content">
                                <div class="post-image">
                                    <div>
                                        <img class="img" src={popular3} alt="blog" />
                                    </div>
                                    <div class="post-info flex-row">
                                        <span><i class="fas fa-user text-gray"></i>&nbsp;&nbsp;Admin</span>
                                        <span><i class="fas fa-calendar-alt text-gray"></i>&nbsp;&nbsp;January 14, 2019</span>
                                        <span>2 Comments</span>
                                    </div>
                                </div>
                                <div class="post-title">
                                    <a href="#">
                                        Lorem ipsum dolor. voluptatem 
                                        facilis incidunt!</a>
                                </div>
                            </div>
                            <div class="post-content">
                                <div class="post-image">
                                    <div>
                                        <img class="img" src={popular4} alt="blog" />
                                    </div>
                                    <div class="post-info flex-row">
                                        <span><i class="fas fa-user text-gray"></i>&nbsp;&nbsp;Admin</span>
                                        <span><i class="fas fa-calendar-alt text-gray"></i>&nbsp;&nbsp;January 14, 2019</span>
                                        <span>2 Comments</span>
                                    </div>
                                </div>
                                <div class="post-title">
                                    <a href="#">
                                        Lorem ipsum dolor. voluptatem 
                                        facilis incidunt!</a>
                                </div>
                            </div>
                        </div>
                        <div class="newsletter">
                            <h2>newsletter</h2>
                            <div class="form-element">
                                <input type="text" class="input-element" placeholder="Email" />
                                <button class="btn form-btn">Subscribe</button> 
                            </div>
                        </div>
                        <div class="popular-tags">
                            <h2>Popular Tags</h2>
                            <div class="tags flex-row">
                                <span class="tag">Software</span>
                                <span class="tag">Technology</span>
                                <span class="tag">Travel</span>
                                <span class="tag">Illustration</span>
                                <span class="tag">Design</span>
                                <span class="tag">Lifestyle</span>
                                <span class="tag">Project</span>
                            </div>
                        </div>
                    </aside>
                </div>
            </section>
            <Footer />
        </div>
    )
}

Blog.propTypes = {
    setPage: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});


export default connect(mapStateToProps, { setPage })(withRouter(Blog));
