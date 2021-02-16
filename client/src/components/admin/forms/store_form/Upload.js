import React, {Fragment} from 'react'
import PropTypes from 'prop-types'

const Upload = ({ slideform4, setSlideForm4, slideform5, setSlideForm5, fileChanged, fileUploadButton, fileUploadState }) => {
    return (
        <Fragment>
            <h3>Upload Your Logo:</h3>
            <div style={{height:'265px', overflow:'scroll'}}>
                <input id="fileButton" name="file" onChange={fileChanged} type="file" hidden />
                <div onClick={fileUploadButton} style={{margin:'50px 0 20px 0', width:'100%'}} className="addImage">
                    {fileUploadState === '' ? <i className="fas fa-plus"></i> : fileUploadState}
                </div>
            </div>
            <button onClick={() => setSlideForm5(!slideform5)} style={{width:'100%', outline:'none', margin:'10px 0', fontSize:'13px', letterSpacing:'1px', display:'flex', alignItems:'center', justifyContent:'center'}}>
            Continue <i style={{margin:'0 10px', fontSize:'1rem'}} className="fas fa-arrow-right"></i>
            </button>
            <p onClick={() => setSlideForm4(!slideform4)} style={{margin:'0', color:'#808080'}}>Back</p>
        </Fragment>
    )
}

Upload.propTypes = {

}

export default Upload
