import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class ScrollTo extends Component {
    componentDidUpdate(){
        setInterval(this.scrollToDiv(), 200);
    }

    scrollToDiv () {
        const node = ReactDOM.findDOMNode(this.messagesEnd);
        node.scrollIntoView({ behavior: 'smooth' });
    }

    render(){
        return <div className="scroll-to" style={{float: 'left', clear: 'both'}} ref={(ref) => {this.messagesEnd = ref;}}/>;
    }
}

export default ScrollTo;