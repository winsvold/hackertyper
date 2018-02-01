import React from 'react';
import PT from 'prop-types';

function SideMenu({content, open, callback, width}){

    function showMenuButton() {
        return open ? {opacity: 0} : {};
    }

    function showContent() {
        return open ? {width: width + 'px'} : {width: '0'};
    }

    return(
        <div className="side-menu-container">
            <span className="btn-open-side-menu" style={showMenuButton()}>
                <button onClick={()=>callback(true)}>
                    <svg viewBox={'0 0 30 30'}>
                        <path d="M0,5 30,5" />
                        <path d="M0,15 30,15" />
                        <path d="M0,25 30,25" />
                    </svg>
                </button>
            </span>
            <div id="side-menu" className="side-menu" style={showContent()}>
                <button className="btn-close" onClick={()=>callback(false)}>&times;</button>
                <div className="content" style={{width: (width - 30) + 'px'}}>
                    {content}
                </div>
            </div>
        </div>
    );
}

SideMenu.propTypes = {
    content: PT.oneOfType([PT.string,PT.object]).isRequired,
    open: PT.bool.isRequired,
    callback: PT.func.isRequired,
    width: PT.number
};

SideMenu.defaultProps = {
    width: 250,
};

export default SideMenu;