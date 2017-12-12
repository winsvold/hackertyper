import React, { Component } from 'react';
import PT from 'prop-types';
import texts from './text';

class WakeUp extends Component {

    constructor(props){
        super(props);
        this.state = {
            lineNumber: 0,
            linePosition: 0,
            outPut: ''
        };
        this.updateText();
    }
    
    componentDidMount(){
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
            const timeOut = newLine ? lines[lineNumber].delay : line.interval;
            setTimeout(()=>this.updateText(), timeOut);
        }
        this.setState({
            outPut: outPut,
            linePosition: linePosition,
            lineNumber: lineNumber
        });
    }
    
    render(){
        console.log('Component rendered');
        return(
            <div className='wake-up-container'>
                {this.state.outPut}
            </div>
        );
    }
}

export default WakeUp;