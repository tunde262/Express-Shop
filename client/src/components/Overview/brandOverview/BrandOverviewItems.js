import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { HorizontalNav } from '../../common/HorizontalNav';

class BrandOverviewItems extends Component {
    render() {
        return (
            <HorizontalNav background="white">
                <Link to="/brand">
                    <BrandOverviewItem>
                        <div class="card__container">
                            <div class="card__image">
                                <img src="https://bvd.se/wp-content/uploads/2012/06/bvd_hm_1-438x287.jpg" alt="" />
                            </div>
                            
                            <div class="card__body">
                                <h3 class="card__body__heading">H&M</h3>
                            </div>
                        </div>
                    </BrandOverviewItem>
                </Link>
                <Link to="/brand">
                    <BrandOverviewItem>
                        <div class="card__container">
                            <div class="card__image">
                                <img src="https://logosmarken.com/wp-content/uploads/2018/03/Nike-Logo.jpg" alt="" />
                            </div>
                            
                            <div class="card__body">
                                <h3 class="card__body__heading">Nike</h3>
                            </div>
                        </div>
                    </BrandOverviewItem>
                </Link>
                <Link to="/brand">
                    <BrandOverviewItem>
                        <div class="card__container">
                            <div class="card__image">
                                <img src="https://wallpapercave.com/wp/wp2299390.jpg" alt="" />
                            </div>
                            
                            <div class="card__body">
                                <h3 class="card__body__heading">Forever 21</h3>
                            </div>
                        </div>
                    </BrandOverviewItem>
                </Link>
                <Link to="/brand">
                    <BrandOverviewItem>
                        <div class="card__container">
                            <div class="card__image">
                                <img src="https://1000logos.net/wp-content/uploads/2016/10/Adidas-Logo-old.jpg" alt="" />
                            </div>
                            
                            <div class="card__body">
                                <h3 class="card__body__heading">Adidas</h3>
                            </div>
                        </div>
                    </BrandOverviewItem>
                </Link>
                <Link to="/brand">
                    <BrandOverviewItem>
                        <div class="card__container">
                            <div class="card__image">
                                <img src="https://bvd.se/wp-content/uploads/2012/06/bvd_hm_1-438x287.jpg" alt="" />
                            </div>
                            
                            <div class="card__body">
                                <h3 class="card__body__heading">H&M</h3>
                            </div>
                        </div>
                    </BrandOverviewItem>
                </Link>
                <Link to="/brand">
                    <BrandOverviewItem>
                        <div class="card__container">
                            <div class="card__image">
                                <img src="https://logosmarken.com/wp-content/uploads/2018/03/Nike-Logo.jpg" alt="" />
                            </div>
                            
                            <div class="card__body">
                                <h3 class="card__body__heading">Nike</h3>
                            </div>
                        </div>
                    </BrandOverviewItem>
                </Link>
                <Link to="/brand">
                    <BrandOverviewItem>
                        <div class="card__container">
                            <div class="card__image">
                                <img src="https://wallpapercave.com/wp/wp2299390.jpg" alt="" />
                            </div>
                            
                            <div class="card__body">
                                <h3 class="card__body__heading">Forever 21</h3>
                            </div>
                        </div>
                    </BrandOverviewItem>
                </Link>
                <Link to="/brand">
                    <BrandOverviewItem>
                        <div class="card__container">
                            <div class="card__image">
                                <img src="https://1000logos.net/wp-content/uploads/2016/10/Adidas-Logo-old.jpg" alt="" />
                            </div>
                            
                            <div class="card__body">
                                <h3 class="card__body__heading">Adidas</h3>
                            </div>
                        </div>
                    </BrandOverviewItem>
                </Link>
                <Link to="/brand">
                    <BrandOverviewItem>
                        <div class="card__container">
                            <div class="card__image">
                                <img src="https://bvd.se/wp-content/uploads/2012/06/bvd_hm_1-438x287.jpg" alt="" />
                            </div>
                            
                            <div class="card__body">
                                <h3 class="card__body__heading">H&M</h3>
                            </div>
                        </div>
                    </BrandOverviewItem>
                </Link>
            </HorizontalNav>
        )
    }
}

const BrandOverviewItem = styled.div`
    display: inline-box;
    margin: 0 15px;
  
    .card__container {
        width: 150px;
        max-height: 150px;
        background: #fff;
        box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
        -moz-box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
	    -webkit-box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
        border-bottom: 1px solid rgb(224,224,224);
        border-radius: 3px;
        transition: all .2s;
    }

    .card__container:hover {
        transform: scale(1.1);
        box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
        -moz-box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
	    -webkit-box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    }
    .card__image {
        height: 100px;
        overflow: hidden;
    }

    .card__image img {
        width: 100%;
    }

    .card__body {
        max-height: 50px;
        position: relative;
        padding: 10px 35px;
        text-align: center;
    }

    .card__body__heading {
        font-weight: 400;
        color: #5f6368;
        font-size: .95rem;
    }
`;

export default BrandOverviewItems;
