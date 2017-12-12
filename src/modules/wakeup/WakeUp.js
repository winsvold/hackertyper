import React, { Component } from 'react';
import PT from 'prop-types';
import texts from './text';

class WakeUp extends Component {

    constructor(props){
        super(props);
        this.state = {
            lineNumber: 0,
            linePosition: 0,
            outPut: '',
            blinker: true
        };
    }
    
    componentDidMount(){
        this.updateText();
        setInterval(()=>this.blink(),200);
    }
    
    updateText(){
        const lines = texts;
        const line = lines[this.state.lineNumber];

        let outPut;
        if(this.state.linePosition === 0 && line.clear === true){
            outPut = '';
        } else {
            outPut = this.state.outPut;
        }

        outPut += line.text.charAt(this.state.linePosition);

        const newLine = line.text.length === this.state.linePosition;
        let linePosition, lineNumber;
        if(newLine){
            linePosition = 0;
            lineNumber = this.state.lineNumber + 1;
        } else {
            linePosition = this.state.linePosition + 1;
            lineNumber = this.state.lineNumber;
        }

        const endOfText = lines.length === lineNumber;
        if(!endOfText){
            const timeOut = newLine ? lines[lineNumber].delay : line.interval * (1.8 - 1.6*Math.random());
            setTimeout(()=>this.updateText(), timeOut);
        }
        this.setState({
            outPut: outPut,
            linePosition: linePosition,
            lineNumber: lineNumber
        });
    }

    blink() { //Hack to make the span work with newLines. For some reason the blinker will prevent text from rendering on the new line, but removing it shortly solves the problem.
        this.setState({
            blinker: !this.state.blinker,
        });
        this.setState({
            blinker: !this.state.blinker,
        });
    }

    blinker() {
        return <span className='blink_me'>{this.state.blinker ? '\u25AE' : ''}</span>;
    }

    render(){
        return(
            <div className='wake-up-container'>
                <div className='backDrop'></div>
                <div className='wake-up-console'>
                    {this.state.outPut}
                    {this.blinker()}
                </div>
            </div>
        );
    }
}

export default WakeUp;