import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

const InventoryActivityBlock = ({
    isMobile
}) => {

    useEffect(() => {
        var list = document.getElementById('progress'),
            next = document.getElementById('next'),
            clear = document.getElementById('clear'),
            children = list.children,
            completed = 1;
        // simulate activating a node
        next.addEventListener('click', function() {
            
            // count the number of completed nodes.
            completed = (completed === 0) ? 1 : completed + 2;
            if (completed > children.length) return;
            
            // for each node that is completed, reflect the status
            // and show a green color!
            for (var i = 0; i < completed; i++) {
                children[i].children[0].classList.remove('grey');
                children[i].children[0].classList.add('green');
                
                // if this child is a node and not divider, 
                // make it shine a little more
                if (i % 2 === 0) {
                    children[i].children[0].classList.add('activated', );            
                }
            }
            
        }, false);

        // clear the activated state of the markers
        clear.addEventListener('click', function() {
            for (var i = 0; i < children.length; i++) {
                children[i].children[0].classList.remove('green');
                children[i].children[0].classList.remove('activated');
                children[i].children[0].classList.add('grey');
            }
            completed = 0;
        }, false);

        return () => {
            next.removeEventListener('click', function() {
            
                // count the number of completed nodes.
                completed = (completed === 0) ? 1 : completed + 2;
                if (completed > children.length) return;
                
                // for each node that is completed, reflect the status
                // and show a green color!
                for (var i = 0; i < completed; i++) {
                    children[i].children[0].classList.remove('grey');
                    children[i].children[0].classList.add('green');
                    
                    // if this child is a node and not divider, 
                    // make it shine a little more
                    if (i % 2 === 0) {
                        children[i].children[0].classList.add('activated', );            
                    }
                }
                
            });
            clear.removeEventListener('click', function() {
                for (var i = 0; i < children.length; i++) {
                    children[i].children[0].classList.remove('green');
                    children[i].children[0].classList.remove('activated');
                    children[i].children[0].classList.add('grey');
                }
                completed = 0;
            });
        }

    }, []);

    return (
        <div className="inventory-activity-box" style={isMobile ? {margin:'10px 0'}: {background:'#fff'}}>
            <div className="vertical-step-bar">
                <ul id="progress">
                    <li>
                        <div class="node green"></div>
                        <p>
                            Order Placed<br/>
                            <small style={{marginTop:'20px', color:'#808080'}}>05/10/2001 5:35pm</small>
                        </p>
                    </li>
                    <li>
                        <div class="divider grey"></div>
                    </li>
                    <li>
                        <div class="node grey"></div>
                        <p>
                            Collecting Items<br/>
                            <small style={{marginTop:'20px', color:'#808080'}}>05/10/2001 5:35pm</small>
                        </p>
                    </li>
                    <li>
                        <div class="divider grey"></div></li>
                    <li>
                        <div class="node grey"></div>
                        <p>
                            Awaiting Delivery<br/>
                            <small style={{marginTop:'20px', color:'#808080'}}>05/10/2001 5:35pm</small>
                        </p>
                    </li>
                    <li>
                        <div class="divider grey"></div>
                    </li>
                    <li>
                        <div class="node grey"></div>
                        <p>
                            En Route Started<br/>
                            <small style={{marginTop:'20px', color:'#808080'}}>05/10/2001 5:35pm</small>
                        </p>
                    </li>
                    <li>
                        <div class="divider grey"></div>
                    </li>
                    <li>
                        <div class="node grey"></div>
                        <p>
                            Left At Door<br/>
                            <small style={{marginTop:'20px', color:'#808080'}}>05/10/2001 5:35pm</small>
                        </p>
                    </li>
                </ul>
            </div>

            <div style={{margin:'1rem 0 10px'}}>
                <input type="button" value="Next" id="next"/>
                <input type="button" value="Clear" id="clear"/>
            </div>
        </div>
    )
}

InventoryActivityBlock.propTypes = {

}

export default InventoryActivityBlock
