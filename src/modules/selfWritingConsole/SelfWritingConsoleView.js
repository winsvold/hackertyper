import React, { Component } from 'react';
import PT from 'prop-types';
import ScrollTo from "../scrollTo/ScrollTo";
import BackgroundImage from '../../img/snow.svg';

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
        const cls=`self-writing-console-container ${this.props.className}`;
        return(
            <div className={cls}>
                <div className='backDrop' /*style={{backgroundImage: `url(${BackgroundImage})`}}*/ />
                <div className='self-writing-console'>
                    {this.props.text}
                    {this.blinker()}
                    {this.scrollToThis()}
                </div>
            </div>
        );
    }
}

SelfWritingConsoleView.propTypes = {
    text: PT.string.isRequired,
    className: PT.string
};

SelfWritingConsoleView.defaultProps = {
    className: ''
};


export default SelfWritingConsoleView;