import React, { useEffect, useState, Fragment } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { editStore, getCurrentStore } from '../../../actions/storeActions';

const initialState = {
    file: '',
    name: '', 
    description: '',
    tags: '',
    youtube: '',
    instagram: '',
    facebook: '',
    twitter: '',
    website: '',
    show_banner: true,
    privacy: true,
    passcode: '',
    taxes_in_prod: true,
    delivery_cost_customers: 0
};

const StoreSettings = ({ store: { store, loading }, editStore, getCurrentStore, setTable }) => {
    // Store Settings
    const [formData, setFormData] = useState(initialState);

    useEffect(() => {
        if (!store) getCurrentStore();
        if (!loading && store) {
        const storeData = { ...initialState };
        for (const key in store) {
            if (key in storeData) storeData[key] = store[key];
        }
        for (const key in store.social) {
            if (key in storeData) storeData[key] = store.social[key];
        }
        if (Array.isArray(storeData.skills))
            storeData.skills = storeData.skills.join(', ');
        setFormData(storeData);
        }
    }, [loading, store]);

    const {
        file,
        name, 
        description,
        tags,
        youtube,
        instagram,
        facebook,
        twitter,
        website,
        show_banner,
        privacy,
        passcode,
        taxes_in_prod,
        delivery_cost_customers
    } = formData;
    
    const fileChanged = e => {
        setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    }

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const switchChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.checked });
    }
    

    const onSubmit = (e) => {
        e.preventDefault();

        let data = new FormData();
        if(file !== '') data.append('file', file);
        data.append('name', name);
        data.append('description', description);
        data.append('tags', tags);
        data.append('website', website);
        data.append('twitter', twitter);
        data.append('facebook', facebook);
        data.append('youtube', youtube);
        data.append('instagram', instagram);
        data.append('show_banner', show_banner);
        data.append('privacy', privacy);
        data.append('passcode', passcode);
        data.append('taxes_in_prod', taxes_in_prod);
        data.append('delivery_cost_customers', delivery_cost_customers);

        editStore(data, store._id);

    };


    return (
        <Fragment>
            <i onClick={e => setTable('store')} class="fas fa-arrow-left backbutton"></i>
            <div className="store-settings-container">
                <div className="store-settings-box">
                    <h2>Store Settings</h2>
                    <p>Store logo</p>
                    <div className="store-settings-box-element">
                        <div style={{background:'#333', height:'50px', width:'50px', borderRadius:'50px'}}></div>
                        <p style={{color:'blue'}}>change</p>
                    </div>
                    <div className="store-settings-box-element">
                        <button>Customize Theme</button>
                    </div>
                    <div className="store-settings-box-element">
                        <p>Show Banner:</p>
                        <input 
                            class="toggle-button" 
                            type="checkbox" 
                            name="show_banner"
                            checked={show_banner}
                            onChange={switchChange}
                        />
                    </div>
                    <div className="store-settings-box-element">
                        <p>Make Store Public: </p>
                        <input 
                            class="toggle-button" 
                            type="checkbox" 
                            name="privacy"
                            checked={privacy}
                            onChange={switchChange}
                        />
                    </div>
                    <div className="store-settings-box-element">
                        <p>Store code:</p>
                        <input
                            type="text"
                            name="passcode"
                            value={passcode}
                            onChange={onChange}
                        />
                    </div>
                    <hr/>
                    {/* <h3 style={{color:'#333', fontWeight:'300'}}>Product Settings</h3>
                    <div className="store-settings-box-element">
                        <p>Comments on products:</p>
                        <input class="toggle-button" type="checkbox" />
                    </div>
                    <div className="store-settings-box-element">
                        <p>User photos on products:</p>
                        <input class="toggle-button" checked="true" type="checkbox" />
                    </div>
                    <div className="store-settings-box-element">
                        <p>Show product locations:</p>
                        <input class="toggle-button" type="checkbox" />
                    </div>
                    <hr/> */}
                    <h3 style={{color:'#333', fontWeight:'300'}}>Navigation Settings</h3>
                    <div className="store-settings-box-element">
                        <button>Edit Navigation</button>
                    </div>
                    <hr/>
                    <h3 style={{color:'#333', fontWeight:'300'}}>Checkout Settings</h3>
                    <div className="store-settings-box-element">
                        <p>Taxes included in product:</p>
                        <input 
                            class="toggle-button" 
                            type="checkbox" 
                            name="taxes_in_prod"
                            checked={taxes_in_prod}
                            onChange={switchChange}
                        />
                    </div>
                    <div className="store-settings-box-element">
                        <p>% of delivery cost charge to customers:</p>
                        <div style={{display:'flex', alignItems:'flex-end'}}>
                            <input
                                type="text"
                                name="delivery_cost_customers"
                                value={delivery_cost_customers}
                                onChange={onChange}
                                style={{width:'75px'}}
                            />
                            <p>%</p>
                        </div>
                    </div>
                    <button onClick={onSubmit} style={{background:'#808080', borderColor:'#808080'}}>Save Changes</button>
                </div>
            </div>
        </Fragment>
    )
}

StoreSettings.propTypes = {
    store: PropTypes.object.isRequired,
    getCurrentStore: PropTypes.func.isRequired,
    editStore: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    store: state.store
})

export default connect(mapStateToProps, { editStore, getCurrentStore })(StoreSettings);