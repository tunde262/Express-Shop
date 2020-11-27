import React from 'react';
import PropTypes from 'prop-types';

import { HorizontalNav } from '../../common/HorizontalNav';

import YoutubeBlock from '../../common/YoutubeBlock';

const Featured_Videos = props => {
    return (
        <div style={{background:'#fff', margin:'10px', border:'1px solid rgb(214, 214, 214)'}}>
            <HorizontalNav>
                <div style={{height:'100%', width:'389px', margin:'1rem', display:'flex',justifyContent:'center', flexDirection:'column', marginBottom:'1rem'}}>
                    <div style={{display:'flex', justifyContent:'center'}}>
                        <YoutubeBlock videoId='_nBlN9yp9R8' />
                    </div>
                    <div>
                        <h2 style={{fontSize:'12.5px', color:'#808080'}}>Featured Collection</h2>
                        <h2 style={{fontSize:'20px', margin:'5px 0 10px 0'}}>#WritingGoals</h2>
                        <p style={{fontWeight:'600',fontSize:'12px', color:'#808080'}}>Ulysses productivty tools keep wordsmith on track.</p>
                    </div>
                </div>
                <div style={{height:'100%', width:'389px', margin:'1rem', display:'flex',justifyContent:'center', flexDirection:'column', marginBottom:'1rem'}}>
                    <div style={{display:'flex', justifyContent:'center'}}>
                        <YoutubeBlock videoId='_nBlN9yp9R8' />
                    </div>
                    <div>
                        <h2 style={{fontSize:'12.5px', color:'#808080'}}>Featured Collection</h2>
                        <h2 style={{fontSize:'20px', margin:'5px 0 10px 0'}}>#WritingGoals</h2>
                        <p style={{fontWeight:'600',fontSize:'12px', color:'#808080'}}>Ulysses productivty tools keep wordsmith on track.</p>
                    </div>
                </div>
                <div style={{height:'100%', width:'389px', margin:'1rem', display:'flex',justifyContent:'center', flexDirection:'column'}}>
                    <div style={{display:'flex', justifyContent:'center'}}>
                        <YoutubeBlock videoId='_nBlN9yp9R8' />
                    </div>
                    <div>
                        <h2 style={{fontSize:'12.5px', color:'#808080'}}>Featured Collection</h2>
                        <h2 style={{fontSize:'20px', margin:'5px 0 10px 0'}}>#WritingGoals</h2>
                        <p style={{fontWeight:'600',fontSize:'12px', color:'#808080'}}>Ulysses productivty tools keep wordsmith on track.</p>
                    </div>
                </div>
                <div style={{height:'100%', width:'389px', margin:'1rem', display:'flex',justifyContent:'center', flexDirection:'column'}}>
                    <div style={{display:'flex', justifyContent:'center'}}>
                        <YoutubeBlock videoId='_nBlN9yp9R8' />
                    </div>
                    <div>
                        <h2 style={{fontSize:'12.5px', color:'#808080'}}>Featured Collection</h2>
                        <h2 style={{fontSize:'20px', margin:'5px 0 10px 0'}}>#WritingGoals</h2>
                        <p style={{fontWeight:'600',fontSize:'12px', color:'#808080'}}>Ulysses productivty tools keep wordsmith on track.</p>
                    </div>
                </div>
            </HorizontalNav>
        </div>
    )
}

Featured_Videos.propTypes = {

}

export default Featured_Videos
