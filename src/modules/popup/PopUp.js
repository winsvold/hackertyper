import React from 'react';
import PT from 'prop-types';

export const popUpStates = {
    GRANTED: {
        className: 'granted',
        text: 'Access Granted'
    },
    DENIED: {
        className: 'denied',
        text: 'Access Denied'
    },
};

export const PopUp = ({popUpState}) => {
    return (
        <div className={popUpState.className}>
            <h2>{popUpState.text}</h2>
        </div>
    );
};

PopUp.propTypes = {
    popUpState: PT.object.isRequired
};

export default PopUp;
