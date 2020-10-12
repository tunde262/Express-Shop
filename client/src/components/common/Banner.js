import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { useMediaQuery } from 'react-responsive';
import Modal from 'react-responsive-modal';
import { addBannerImg } from '../../actions/storeActions';
import img1 from '../../utils/imgs/img_soccer.jpg';
import img2 from '../../utils/imgs/img_americanfootball.jpg';
import img3 from '../../utils/imgs/img_soccer.jpg';
import img4 from '../../utils/imgs/img_soccer.jpg';
import img5 from '../../utils/imgs/img_fencing.jpg';
import img6 from '../../utils/imgs/img_cyclingbmx.jpg';
import img7 from '../../utils/imgs/img_volleyball.jpg';

import mixpanel from 'mixpanel-browser';

import DragAndDrop from '../admin/forms/utils/DragAndDrop';

const Banner = ({imgLarge, imgSmall, admin, store, product, addBannerImg}) => {
    const [files, setFiles] = useState([]);

    const [tableShow1, setTableShow1] = useState('upload');

    // Toggle
    const [displayModal, toggleModal] = useState(false);

    // const isDesktopOrLaptop = useMediaQuery({
    //     query: '(min-device-width: 1224px)'
    // })
    // const isBigScreen = useMediaQuery({ query: '(min-device-width: 1824px)' })
    // const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
    const isTabletOrMobileDevice = useMediaQuery({
    query: '(max-width: 760px)'
    })
    // const isPortrait = useMediaQuery({ query: '(orientation: portrait)' })
    // const isRetina = useMediaQuery({ query: '(min-resolution: 2dppx)' })

    const fileChanged = e => {
        console.log(files)
        let fileList = [];
        files.map(file => fileList.push(file));
        for (var i = 0; i < e.target.files.length; i++) {
          if(!e.target.files[i]) return;
          fileList.push(e.target.files[i])
        }
        setFiles(fileList);
    }

    const handleDrop = newFiles => {
        console.log(files)
        let fileList = [];
        files.map(file => fileList.push(file));
        for (var i = 0; i < newFiles.length; i++) {
          if(!newFiles[i]) return;
          fileList.push(newFiles[i])
        }
        setFiles(fileList);
      }

    const setModal = () => {
        toggleModal(!displayModal);
    }

    const onSubmit = (e) => {
        e.preventDefault();

        // if(!detailProduct) {
        addBannerImg(files, store.store._id);
        // } else {
        //   editProduct(data, detailProduct._id, store.store._id, history);
        // }

        let banner_value = false;

        if (store.store.banner_imgs.length > 0) {
            banner_value = true;
        }
        
        mixpanel.track("Store Banner Update", {
            // "Entry Point": "Home Landing",
            "# of Public Store Items": product.products.length,
            // "# of People Part of Store": "Home Landing",
            "Store Name": store.store.name,
            // "Store Category": "Home Landing",
            // "Store ID": store._id,
            "Banner Value": banner_value,
        });
    
    };

    let tableContent;

    if(tableShow1 === 'upload') {
        tableContent = (
            <Fragment>
                <DragAndDrop handleDrop={handleDrop}>
                    <input
                        type="file"
                        name="file"
                        id="file"
                        multiple
                        className="form-control"
                        placeholder="Choose images or Drag/Drop"
                        onChange={fileChanged}
                    />
                    {files.length > 0 ? (
                        <div style={{minHeight: 300, width: 250}}>
                            {files.map((file, i) => (
                                <Fragment key={i}>
                                <div>{file.name}</div>
                                <br/>
                                </Fragment>
                            )
                            )}
                        </div>
                        ) : <h3><small>or</small> <br/>Drag / Drop</h3>
                    }
                </DragAndDrop>
            </Fragment>
        );
    } else if (tableShow1 === 'general') {
        tableContent = (
            <div className="wrapper">  
                <section style={{display: 'grid ', gridGap:'5px', gridTemplateColumns: 'repeat(3, 1fr)'}}>
                    <div style={{overflow:'hidden'}}>
                        <img style={{width:'100%'}} src={img2} alt="img" />
                    </div>
                    <div style={{overflow:'hidden'}}>
                        <img style={{width:'100%'}} src={img3} alt="img" />
                    </div>
                    <div style={{overflow:'hidden'}}>
                        <img style={{width:'100%'}} src={img4} alt="img" />
                    </div>
                    <div style={{overflow:'hidden'}}>
                        <img style={{width:'100%'}} src={img5} alt="img" />
                    </div>
                    <div style={{overflow:'hidden'}}>
                        <img style={{width:'100%'}} src={img6} alt="img" />
                    </div>
                    <div style={{overflow:'hidden'}}>
                        <img style={{width:'100%'}} src={img7} alt="img" />
                    </div>
                </section>
                <button>Upload</button>
            </div>
        );
    } else if(tableShow1 === 'clothing') {
        tableContent = <h1>clothing</h1>; 
    } else if(tableShow1 === 'pets') {
        tableContent = <h1>pets</h1>; 
    } else if(tableShow1 === 'kids') {
        tableContent = <h1>kids</h1>; 
    } else if(tableShow1 === 'sports') {
        tableContent = <h1>sports</h1>; 
    }

    let img;
    if(isTabletOrMobileDevice) {
        img = imgSmall;
    } else {
        img = imgLarge;
    }
    return (
        <Fragment>
            {admin === "true" && (
                <div style={{width:'80vw',height:0, display:'flex', justifyContent:'flex-end'}}>
                    <div 
                        onClick={setModal}
                        className="banner-icon-container"
                    >
                        <i className="fas fa-pencil-alt banner-icon"></i>
                    </div>
                </div>
            )}
            <div style={{display:'flex', justifyContent:'center'}}>
                <BannerContainer className="banner p-2"> 
                    {store.store && store.store.banner_imgs[0] ? <img src={`/api/stores/image/${store.store.banner_imgs[0].img_name}`} alt="banner img 1" /> : <img src={img} alt="img" />}
                </BannerContainer>
            </div>
            <Modal open={displayModal} onClose={setModal} center>
                <h1 style={{color:'#333', fontWeight:'300'}}>Gallery</h1>
                <ul class="modal-underline">
                    <li className={tableShow1 === "upload" && "active"} onClick={e => setTableShow1('upload')}><a>upload</a></li>
                    <li className={tableShow1 === "general" && "active"} onClick={e => setTableShow1('general')}><i class="fas fa-candy-cane"></i></li>
                    <li className={tableShow1 === "clothing" && "active"} onClick={e => setTableShow1('clothing')}><i class="fas fa-tshirt"></i></li>
                    <li className={tableShow1 === "pets" && "active"} onClick={e => setTableShow1('pets')}><i class="fas fa-paw"></i></li>
                    <li className={tableShow1 === "kids" && "active"} onClick={e => setTableShow1('kids')}><i class="fas fa-baby"></i></li>
                    <li className={tableShow1 === "sports" && "active"} onClick={e => setTableShow1('sports')}><i class="fas fa-basketball-ball"></i></li>
                </ul>
                {tableContent}
                <button onClick={onSubmit} class="btn btn-primary">Upload</button>
            </Modal>
        </Fragment>
    )
}

const BannerContainer = styled.div`
    width: 100%;
    height: 300px;
    overflow: hidden;
    display: flex;
    align-items: center; 
    
    img {
        width: 100%;
        height: 300px;
        border-radius: 1rem;
    }

    @media (max-width: 768px){
        width: 100%;
        height: 200px;

        img {
            height: 200px;
        }
    }
`;

Banner.propTypes = {
    addBannerImg: PropTypes.func.isRequired,
    store: PropTypes.object.isRequired,
    product: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    store: state.store,
    product: state.product
});

export default connect(mapStateToProps, { addBannerImg })(
    withRouter(Banner)
);
