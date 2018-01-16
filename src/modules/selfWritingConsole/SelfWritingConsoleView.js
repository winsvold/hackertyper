import React, { Component } from 'react';
import PT from 'prop-types';
import ScrollTo from "../scrollTo/ScrollTo";

class SelfWritingConsoleView extends Component {

    constructor(props){
        super(props);
        this.state = {
            IBeamBlink: true
        };
    }

    componentDidMount(){
        setInterval(()=>this.blinkIBeamHack(),200);
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
        return <span className='vertical-bar'>{this.state.IBeamBlink ? '.' : ''}</span>; //Hack to make the span work with newLines. Content in the span needs to change to trigger correct rendering.
    }

    scrollToThis() {
        return this.state.IBeamBlink ? <ScrollTo /> : '';
    }

    render(){
        return(
            <div className='wake-up-container'>
                <div className='backDrop' />
                <div className='wake-up-console'>
                    {this.props.text}
                    {this.blinker()}
                    {this.scrollToThis()}
                </div>
            </div>
        );
    }
}

SelfWritingConsoleView.propTypes = {
    text: PT.string.isRequired
};


export default SelfWritingConsoleView;