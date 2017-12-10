import React from 'react';
import PT from 'prop-types';

function SideMenu({content, open, callback, width}){

    function showMenuButton() {
        return open ? {display: 'none'} : {display: ''};
    }

    function showContent() {
        return open ? {width: width + 'px'} : {width: '0'};
    }

    return(
        <div className="side-menu-container">
            <span className="btn-open-side-menu" style={showMenuButton()}>
                <a href="#" onClick={()=>callback(true)}>
                    <svg width="30" height="30">
                        <path d="M0,5 30,5" />
                        <path d="M0,15 30,15" />
                        <path d="M0,25 30,25" />
                    </svg>
                </a>
            </span>
            <div id="side-menu" className="side-menu" style={showContent()}>
                <a href="#" className="btn-close" onClick={()=>callback(false)}>&times;</a>
                <div className="content" style={{width: (width - 30) + 'px'}}>
                    {content}
                </div>
            </div>
        </div>
    );
}

SideMenu.propTypes = {
    content: PT.string.isRequired,
    open: PT.bool.isRequired,
    callback: PT.func.isRequired,
    width: PT.number
};

SideMenu.defaultProps = {
    width: '250',
}

export default SideMenu;