import React from 'react';
import PT from 'prop-types';
import ScrollTo from "../scrollTo/ScrollTo";

function Console({text, numberOfLetters}) {

    function codeGetter() {
        return text.slice(0,numberOfLetters);
    }

    function getText(){
        return codeGetter().split(' ')
            .join('\u00a0')
            .split('\t')
            .join('\u00a0'.repeat(4))
            .split('\n')
            .map((item, key) => {
                return <p key={key}><br/>{item}</p>
            });
    }

    return (
        <div>
            <div className='console'>
                {getText()}
                <span className='blink_me'>|</span>
            </div>
            <ScrollTo />
        </div>);
}

Console.propTypes=({
    text: PT.string.isRequired,
    numberOfLetters: PT.number.isRequired
});

export default Console;