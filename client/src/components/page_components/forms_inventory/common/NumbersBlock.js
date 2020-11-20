import React from 'react'
import PropTypes from 'prop-types'

const NumbersBlock = ({
    onChange,
    formData
}) => {

    const {
        price,
        sale_price,
        sku,
        inventory_qty
    } = formData;
    
    return (
        <div className="content-box" style={{padding:'10px'}}>
            <div style={{width:'100%', margin:'10px 0', display:'grid', gridTemplateColumns:'1fr 1fr', gridGap:'1rem'}}>
                <div style={{width:'100%', display:'flex', flexDirection:'column', alignItems:'flex-start'}}>
                    <p style={{color:'#808080', margin:'0 0 5px 5px'}}>Price:</p>
                    <input
                        type="number"
                        min="0" 
                        step=".01"
                        name="price"
                        className="input_line"
                        placeholder="$ 0"
                        value={price}
                        onChange={e => onChange(e)}
                        style={{margin:'0', width:'100%', outline:'none', padding:'0 10px', height:'50px', background:'#fff', fontSize:'14px', border:'2px dashed #cecece', borderRadius:'5px'}}
                    />
                </div>
                <div style={{width:'100%', display:'flex', flexDirection:'column', alignItems:'flex-start'}}>
                    <p style={{color:'#808080', margin:'0 0 5px 5px'}}>Compare at price:</p>
                    <input
                        type="number"
                        min="0" 
                        step=".01"
                        name="sale_price"
                        className="input_line"
                        placeholder="$ 0"
                        value={sale_price}
                        onChange={e => onChange(e)}
                        style={{margin:'0', width:'100%', outline:'none', padding:'0 10px', height:'50px', background:'#fff', fontSize:'14px', border:'2px dashed #cecece', borderRadius:'5px'}}
                    />
                </div>
            </div>
            <div style={{width:'100%', margin:'10px 0', display:'grid', gridTemplateColumns:'2fr 1fr', gridGap:'1rem'}}>
                <div style={{width:'100%', display:'flex', flexDirection:'column', alignItems:'flex-start'}}>
                    <p style={{color:'#808080', margin:'0 0 5px 5px'}}>Sku (unique id):</p>
                    <input
                        type="text"
                        name="sku"
                        className="input_line"
                        placeholder="(Recommended)"
                        value={sku}
                        onChange={e => onChange(e)}
                        style={{margin:'0', width:'100%', outline:'none', padding:'0 10px', height:'50px', background:'#fff', fontSize:'14px', border:'2px dashed #cecece', borderRadius:'5px'}}
                    />
                </div>
                <div style={{width:'100%', display:'flex', flexDirection:'column', alignItems:'flex-start'}}>
                    <p style={{color:'#808080', margin:'0 0 5px 5px'}}>Qty:</p>
                    <input
                        type="number"
                        min="0" 
                        step="1"
                        name="inventory_qty"
                        className="input_line"
                        placeholder="$ 0"
                        value={inventory_qty}
                        onChange={e => onChange(e)}
                        style={{margin:'0', width:'100%', outline:'none', padding:'0 10px', height:'50px', background:'#fff', fontSize:'14px', border:'2px dashed #cecece', borderRadius:'5px'}}
                    />
                </div>
            </div>
        </div>
    )
}

NumbersBlock.propTypes = {

}

export default NumbersBlock
