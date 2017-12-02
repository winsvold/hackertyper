import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import {codeGetter} from "./code";
import Granted from "./Granted";
import Denied from "./Denied";

class App extends Component {

    handleKeyDown(event) {
        console.log(event);
        if (event.key === "Enter") {
            this.setState({
                popUp: "granted"
            })
        } else if (event.key === "Backspace"){
            this.setState({
                popUp: "denied"
            })
        } else if (event.key === "Shift"){
            this.setState({
                popUp: ""
            })
        } else {
            const newSizeOfText = parseInt(this.state.sizeOfText + Math.random() * 10);
            this.setState({
                sizeOfText: newSizeOfText
            })
        }
    };

    componentWillMount(){
        document.addEventListener("keydown", this.handleKeyDown.bind(this));
        this.setState({
            sizeOfText: 5
        })
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }

    scrollToBottom = () => {
        const node = ReactDOM.findDOMNode(this.messagesEnd);
        node.scrollIntoView({ behavior: "smooth" });
    };

    getText(){
        const text = codeGetter(this.state.sizeOfText).split(" ").join("\u00a0").split("\n").map((item, key) => {
            return <p key={key}><br />{item}</p>
        });
        return text;
    };

    render() {
        var popup = '';
        if(this.state.popUp === "granted"){
            popup = <Granted />
        } else if (this.state.popUp === "denied"){
            popup = <Denied />
        }
        return (
            <div className="App">
                <div className="console">
                    {this.getText()}
                    <span className="blink_me">|</span>
                </div>
                <div style={{ float:"left", clear: "both" }}
                     ref={(el) => { this.messagesEnd = el; }}></div>
                {popup}
            </div>
        );
    }
}

export default App;
