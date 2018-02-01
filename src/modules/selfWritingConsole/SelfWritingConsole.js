import React, { Component } from 'react';
import PT from 'prop-types';
import SelfWritingConsoleView from "./SelfWritingConsoleView";

class SelfWritingConsole extends Component {

    constructor(props){
        super(props);
        this.state = {
            lineNumber: 0,
            linePosition: 0,
            outPut: ''
        };
    }

    componentDidMount(){
        const delay = this.props.textComponents[0].delay;
        setTimeout(() => this.updateText(), delay);
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

    render(){
        return <SelfWritingConsoleView className={this.props.className} text={this.state.outPut} />;
    }
}

SelfWritingConsole.propTypes = {
    textComponents: PT.arrayOf( PT.shape({
        delay: PT.number,
        clear: PT.bool,
        text: PT.string,
        interval: PT.number
    })).isRequired,
    callBack: PT.func,
    className: PT.string
};

SelfWritingConsole.defaultProps = {
    callBack: () => {},
    className: ''
};


export default SelfWritingConsole;