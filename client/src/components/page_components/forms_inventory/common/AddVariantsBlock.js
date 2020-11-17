import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import InputTag from '../../../common/InputTag/InputTag';

const AddVariantsBlock = ({
    handleToggleOption,
    displayOption1,
    displayOption2,
    displayOption3, 
    displayOption4,
    optionToggle,
    setOptionToggle,
    optionToggle2,
    setOptionToggle2,
    optionToggle3,
    setOptionToggle3,
    optionToggle4,
    setOptionToggle4,
    varName,
    handleVarNameChange,
    onAddTag,
    onDeleteTag,
    varTags,
    onAddTag2,
    onDeleteTag2,
    varTags2,
    onAddTag3,
    onDeleteTag3,
    varTags3,
    onAddTag4,
    onDeleteTag4,
    varTags4,
    removeDisplayOption1,
    removeDisplayOption2,
    removeDisplayOption3,
    removeDisplayOption4,
    updateList,
    varInfo,
    display
}) => {
    return (
        <div class="content-box" style={{padding:'10px'}}>
            <div style={{display:'flex', width:'100%', justifyContent:'space-between'}}>
                <div>
                    <p style={{color:'#808080', margin:'0 0 5px 5px'}}>Variants</p>
                    <p style={{color:'#808080', margin:'0 0 5px 5px'}}>
                        Add options to create variants
                    </p>
                </div>
                
                <button style={{background:'#e7e7e7', borderColor:'#e7e7e7', letterSpacing:'1px', color:'#808080'}} onClick={handleToggleOption}><i class="fas fa-plus"></i> Option</button>
            </div>
            
            <div>
                <table class="table table-head">
                    <div style={{display:'grid', gridTemplateColumns:'1fr 3fr'}}>
                        <div><p>Option</p></div>
                        <div><p>Values</p></div>
                    </div>
                    {displayOption1 ? (
                        <div style={displayOption2 || displayOption3 || displayOption4 ? {display:'grid', gridTemplateColumns:'1fr 3fr auto'} : {display:'grid', gridTemplateColumns:'1fr 3fr'}}>
                            <div>
                                <div style={{display:'flex', alignItems:'center', justifyContent:'flex-start'}}>
                                    <div class={optionToggle ? "secondary-dropdown-el expanded" : "secondary-dropdown-el"}>
                                        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', width:'100%'}} onClick={() => setOptionToggle(!optionToggle)}>
                                            {varName.var1 === '' ? (
                                                <p>Pick an option</p>
                                            ) : (
                                                <p>{varName.var1}</p>
                                            )}
                                            <i class="fas fa-caret-down"></i>
                                        </div>
                                        {optionToggle ? (
                                            <Fragment>
                                                <div onClick={() => handleVarNameChange("var1", 'color')}><p>Color</p></div>
                                                <div onClick={() => handleVarNameChange("var1", 'size')}><p>Size</p></div>
                                                <div onClick={() => handleVarNameChange("var1", 'weight')}><p>Weight</p></div>
                                                <div onClick={() => handleVarNameChange("var1", 'type')}><p>Type</p></div>
                                                <div onClick={() => handleVarNameChange("var1", 'bundle')}><p>Bundle</p></div>
                                                <div onClick={() => handleVarNameChange("var1", 'scent')}><p>Scent</p></div>
                                                <div onClick={() => handleVarNameChange("var1", 'fit')}><p>Fit</p></div>
                                                <div onClick={() => handleVarNameChange("var1", 'flavor')}><p>Flavor</p></div>
                                                <div onClick={() => handleVarNameChange("var1", 'material')}><p>Material</p></div>
                                            </Fragment>
                                        ) : null}
                                    </div>
                                </div>
                            </div>
                            <div>
                                <Fragment>
                                    <InputTag  
                                        onAddTag ={onAddTag}
                                        onDeleteTag = {onDeleteTag}
                                        defaultTags={varTags}
                                        placeholder="enter tags separated by comma"
                                    />
                                </Fragment>
                            </div>
                            {displayOption2 || displayOption3 || displayOption4 ? (
                                <div style={{minWidth:'30px', display:'flex', justifyContent:'center', alignItems:'flex-start'}}>
                                    <i 
                                        onClick={removeDisplayOption1} 
                                        style={{color:'#ff4b2b', marginTop:'1rem'}} 
                                        class="fas fa-minus"
                                    ></i>
                                </div>
                            ) : null}
                        </div>
                    ): null}
                    {displayOption2 ? (
                        <Fragment>
                            <hr style={{background:'rgb(214,214,214)', margin:'10px 0 1rem 0', height:'1px'}} />
                            <div style={displayOption1 || displayOption3 || displayOption4 ? {display:'grid', gridTemplateColumns:'1fr 3fr auto'} : {display:'grid', gridTemplateColumns:'1fr 3fr'}}>
                                <div style={{paddingTop:'10px'}}>
                                    <div style={{display:'flex', alignItems:'center', justifyContent:'flex-start'}}>
                                        <div class={optionToggle2 ? "secondary-dropdown-el expanded" : "secondary-dropdown-el"}>
                                            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', width:'100%'}} onClick={() => setOptionToggle2(!optionToggle2)}>
                                                {varName.var2 === '' ? (
                                                    <p>Pick an option</p>
                                                ) : (
                                                    <p>{varName.var2}</p>
                                                )}
                                                <i class="fas fa-caret-down"></i>
                                            </div>
                                            {optionToggle2 ? (
                                                <Fragment>
                                                    <div onClick={() => handleVarNameChange("var2", 'color')}><p>Color</p></div>
                                                    <div onClick={() => handleVarNameChange("var2", 'size')}><p>Size</p></div>
                                                    <div onClick={() => handleVarNameChange("var2", 'weight')}><p>Weight</p></div>
                                                    <div onClick={() => handleVarNameChange("var2", 'type')}><p>Type</p></div>
                                                    <div onClick={() => handleVarNameChange("var2", 'bundle')}><p>Bundle</p></div>
                                                    <div onClick={() => handleVarNameChange("var2", 'scent')}><p>Scent</p></div>
                                                    <div onClick={() => handleVarNameChange("var2", 'fit')}><p>Fit</p></div>
                                                    <div onClick={() => handleVarNameChange("var2", 'flavor')}><p>Flavor</p></div>
                                                    <div onClick={() => handleVarNameChange("var2", 'material')}><p>Material</p></div>
                                                </Fragment>
                                        ) : null}
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <Fragment>
                                        <InputTag  
                                            onAddTag ={onAddTag2}
                                            onDeleteTag = {onDeleteTag2}
                                            defaultTags={varTags2}
                                            placeholder="enter tags separated by comma"
                                        />
                                    </Fragment>
                                </div>
                                {displayOption1 || displayOption3 || displayOption4 ? (
                                    <div style={{minWidth:'30px', display:'flex', justifyContent:'center', alignItems:'flex-start'}}>
                                        <i 
                                            onClick={removeDisplayOption2} 
                                            style={{color:'#ff4b2b', marginTop:'1rem'}} 
                                            class="fas fa-minus"
                                        ></i>
                                    </div>
                                ) : null}
                            </div>
                        </Fragment>
                    ): null}
                    {displayOption3 ? (
                        <Fragment>
                            <hr style={{background:'rgb(214,214,214)', margin:'10px 0 1rem 0', height:'1px'}} />
                            <div style={displayOption1 || displayOption2 || displayOption4 ? {display:'grid', gridTemplateColumns:'1fr 3fr auto'} : {display:'grid', gridTemplateColumns:'1fr 3fr'}}>
                                <div style={{paddingTop:'10px'}}>
                                    <div style={{display:'flex', alignItems:'center', justifyContent:'flex-start'}}>
                                        <div class={optionToggle3 ? "secondary-dropdown-el expanded" : "secondary-dropdown-el"}>
                                            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', width:'100%'}} onClick={() => setOptionToggle3(!optionToggle3)}>
                                                {varName.var3 === '' ? (
                                                    <p>Pick an option</p>
                                                ) : (
                                                    <p>{varName.var3}</p>
                                                )}
                                                <i class="fas fa-caret-down"></i>
                                            </div>
                                            {optionToggle3 ? (
                                                <Fragment>
                                                    <div onClick={() => handleVarNameChange("var3", 'color')}><p>Color</p></div>
                                                    <div onClick={() => handleVarNameChange("var3", 'size')}><p>Size</p></div>
                                                    <div onClick={() => handleVarNameChange("var3", 'weight')}><p>Weight</p></div>
                                                    <div onClick={() => handleVarNameChange("var3", 'type')}><p>Type</p></div>
                                                    <div onClick={() => handleVarNameChange("var3", 'bundle')}><p>Bundle</p></div>
                                                    <div onClick={() => handleVarNameChange("var3", 'scent')}><p>Scent</p></div>
                                                    <div onClick={() => handleVarNameChange("var3", 'fit')}><p>Fit</p></div>
                                                    <div onClick={() => handleVarNameChange("var3", 'flavor')}><p>Flavor</p></div>
                                                    <div onClick={() => handleVarNameChange("var3", 'material')}><p>Material</p></div>
                                                </Fragment>
                                            ) : null}
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <Fragment>
                                        <InputTag  
                                            onAddTag ={onAddTag3}
                                            onDeleteTag = {onDeleteTag3}
                                            defaultTags={varTags3}
                                            placeholder="enter tags separated by comma"
                                        />
                                    </Fragment>
                                </div>
                                {displayOption1 || displayOption2 || displayOption4 ? (
                                    <div style={{minWidth:'30px', display:'flex', justifyContent:'center', alignItems:'flex-start'}}>
                                        <i 
                                            onClick={removeDisplayOption3} 
                                            style={{color:'#ff4b2b', marginTop:'1rem'}} 
                                            class="fas fa-minus"
                                        ></i>
                                    </div>
                                ) : null}
                            </div>
                        </Fragment>
                    ) : null}
                    {displayOption4 ? (
                        <Fragment>
                            <hr style={{background:'rgb(214,214,214)', margin:'10px 0 1rem 0', height:'1px'}} />
                            <div style={displayOption1 || displayOption2 || displayOption3 ? {display:'grid', gridTemplateColumns:'1fr 3fr auto'} : {display:'grid', gridTemplateColumns:'1fr 3fr'}}>
                                <div style={{paddingTop:'10px'}}>
                                    <div style={{display:'flex', alignItems:'center', justifyContent:'flex-start'}}>
                                        <div class={optionToggle4 ? "secondary-dropdown-el expanded" : "secondary-dropdown-el"}>
                                            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', width:'100%'}} onClick={() => setOptionToggle4(!optionToggle4)}>
                                                {varName.var4 === '' ? (
                                                    <p>Pick an option</p>
                                                ) : (
                                                    <p>{varName.var4}</p>
                                                )}
                                                <i class="fas fa-caret-down"></i>
                                            </div>
                                            {optionToggle4 ? (
                                                <Fragment>
                                                    <div onClick={() => handleVarNameChange("var4", 'color')}><p>Color</p></div>
                                                    <div onClick={() => handleVarNameChange("var4", 'size')}><p>Size</p></div>
                                                    <div onClick={() => handleVarNameChange("var4", 'weight')}><p>Weight</p></div>
                                                    <div onClick={() => handleVarNameChange("var4", 'type')}><p>Type</p></div>
                                                    <div onClick={() => handleVarNameChange("var4", 'bundle')}><p>Bundle</p></div>
                                                    <div onClick={() => handleVarNameChange("var4", 'scent')}><p>Scent</p></div>
                                                    <div onClick={() => handleVarNameChange("var4", 'fit')}><p>Fit</p></div>
                                                    <div onClick={() => handleVarNameChange("var4", 'flavor')}><p>Flavor</p></div>
                                                    <div onClick={() => handleVarNameChange("var4", 'material')}><p>Material</p></div>
                                                </Fragment>
                                            ) : null}
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <Fragment>
                                        <InputTag  
                                            onAddTag ={onAddTag4}
                                            onDeleteTag = {onDeleteTag4}
                                            defaultTags={varTags4}
                                            placeholder="enter tags separated by comma"
                                        />
                                    </Fragment>
                                </div>
                                {displayOption1 || displayOption2 || displayOption3 ? (
                                    <div style={{minWidth:'30px', display:'flex', justifyContent:'center', alignItems:'flex-start'}}>
                                        <i 
                                            onClick={removeDisplayOption4} 
                                            style={{color:'#ff4b2b', marginTop:'1rem'}} 
                                            class="fas fa-minus"
                                        ></i>
                                    </div>
                                ) : null}
                            </div>
                        </Fragment>
                    ) : null}
                </table>

                
                <div onClick={updateList} style={{width:'100%', background:'#0098d3'}} class="btn btn-primary my-3">Add Variants</div>

                {varInfo.length > 0 && (
                    <div class="table-responsive table-filter">
                        <table className="table">
                            <div className="variant-thead">
                                    <div></div>
                                    <div>Price</div>
                                    <div>Sale Price</div>
                                    <div>Qty</div>
                                    <div>Sku</div>
                                    <div></div>
                            </div>
                            <div className="tbody">
                                {display}
                            </div>
                        </table>
                    </div>
                )}
            </div>
        </div>
    )
}

AddVariantsBlock.propTypes = {

}

export default AddVariantsBlock
