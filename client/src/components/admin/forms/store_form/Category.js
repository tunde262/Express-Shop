import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const Category = ({ slideform3, setSlideForm3, slideform4, setSlideForm4 }) => {
    return (
        <Fragment>
            <h3>Please state your category:</h3>
            <div style={{height:'230px', overflow:'scroll'}}>
                <div id="dropdown-el" style={{width:'100%', margin:'50px 0 20px 0'}} class="secondary-dropdown-el">
                    <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', width:'100%'}}>
                        <p>Choose a category</p>
                        <i class="fas fa-caret-down"></i>
                    </div>
                </div>
            </div>
            <button onClick={() => setSlideForm4(!slideform4)} style={{width:'100%', outline:'none', margin:'10px 0', fontSize:'13px', letterSpacing:'1px', display:'flex', alignItems:'center', justifyContent:'center'}}>
            Continue <i style={{margin:'0 10px', fontSize:'1rem'}} class="fas fa-arrow-right"></i>
            </button>
            <p onClick={() => setSlideForm3(!slideform3)} style={{margin:'0', color:'#808080'}}>Back</p>
        </Fragment>
    )
}

Category.propTypes = {

}

export default Category
