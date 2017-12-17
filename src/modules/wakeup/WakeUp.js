import React, { Component } from 'react';
import PT from 'prop-types';

class WakeUp extends Component {

    constructor(props){
        super(props);
        this.state = {
            lineNumber: 0,
            linePosition: 0,
            outPut: '',
            IBeamBlink: true
        };
    }
    
    componentDidMount(){
        const delay = this.props.textComponents[0].delay;
        setTimeout(() => this.updateText(), delay);
        setInterval(() => this.blinkIBeamHack(), 200);
    }
    
    updateText(){
        const lineNumber = this.state.lineNumber;
        const linePos = this.state.linePosition;
        const textComponents = this.props.textComponents;
        const currentComponent = textComponents[lineNumber];

        this.updateCurrentOutput(currentComponent, linePos);
        this.prepareForNextIteration(currentComponent);

        const endOfText = textComponents.length - 1 === lineNumber && this.isAtEndOfLine(currentComponent);
        if(endOfText) {
            this.props.callBack();
        } else {
            this.setTimeoutForNextIteration(textComponents, lineNumber, linePos);
        }
    }

    setTimeoutForNextIteration(textComponents, lineNumber, linePos) {
        const currentComponent = textComponents[lineNumber];
        let delay;
        if(this.isAtEndOfLine(currentComponent)){
            delay = this.delayBeforeNextLine(textComponents, lineNumber);
        } else {
            delay = this.delayBeforeNextLetter(currentComponent, linePos);
        }
        setTimeout(() => this.updateText(), delay);
    }

    delayBeforeNextLetter(currentComponent, linePos) {
        const randomIrregularity = (1.9 - 1.8 * Math.random());
        let delay = currentComponent.interval * randomIrregularity;
        const currentAndNextChar = currentComponent.text.slice(linePos, linePos + 2);
        if(currentAndNextChar === '. '){
            delay *= 10;
        }
        if(currentAndNextChar === '! '){
            delay *= 8;
        }
        if(currentAndNextChar === ', '){
            delay *= 2;
        }
        return delay;
    }

    delayBeforeNextLine(textComponents, lineNumber) {
        return textComponents[lineNumber + 1].delay;
    }

    prepareForNextIteration(currentComponent) {
        const goToNextLine = this.isAtEndOfLine(currentComponent);
        let linePosition, lineNumber;
        if (goToNextLine) {
            linePosition = 0;
            lineNumber = this.state.lineNumber + 1;
        } else {
            linePosition = this.state.linePosition + 1;
            lineNumber = this.state.lineNumber;
        }
        this.setState({
            linePosition: linePosition,
            lineNumber: lineNumber
        });
    }

    updateCurrentOutput(currentComponent, linePos) {
        let outPut;
        const isNewLine = this.state.linePosition === 0;
        const clearOutput = isNewLine && currentComponent.clear === true;
        if (clearOutput) {
            outPut = '';
        } else {
            outPut = this.state.outPut;
        }
        outPut += currentComponent.text.charAt(linePos);
        this.setState({
            outPut: outPut
        });
    }

    isAtEndOfLine(currentComponent) {
        return currentComponent.text.length === this.state.linePosition;
    }

    blinkIBeamHack() { //Hack to make the span work with newLines. For some reason the IBeamBlink will prevent text from rendering on the new line, but removing it shortly solves the problem.
        this.setState({
            IBeamBlink: !this.state.IBeamBlink,
        });
        this.setState({
            IBeamBlink: !this.state.IBeamBlink,
        });
    }

    blinker() {
        return <span className='vertical-bar'>{this.state.IBeamBlink ? '*' : ''}</span>; //Hack to make the span work with newLines. Content in the span needs to change to trigger correct rendering.
    }

    render(){
        return(
            <div className='wake-up-container'>
                <div className='backDrop' />
                <div className='wake-up-console'>
                    {this.state.outPut}
                    {this.blinker()}
                </div>
            </div>
        );
    }
}

WakeUp.propTypes = {
    textComponents: PT.arrayOf( PT.shape({
        delay: PT.number,
        clear: PT.bool,
        text: PT.string,
        interval: PT.number
    })).isRequired,
    callBack: PT.func
};

WakeUp.defaultProps = {
    callBack: () => {}
};


export default WakeUp;