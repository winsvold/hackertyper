import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './css/App.css';
import {codeGetter} from "./resources/code";
import Granted from "./modules/Granted";
import Denied from "./modules/Denied";
import Matrix from "./modules/Matrix";

class App extends Component {

    constructor(props){
        super(props);
        this.state ={
            popUp: "",
            loadPopUp: "",
            matrix: false
        };
    }

    handleKeyDown(event) {
        console.log(event);
        if (event.key === "1") {
            this.setState({
                loadPopUp: "granted"
            })
        } else if (event.key === "2"){
            this.setState({
                loadPopUp: "denied"
            })
        } else if (event.key === "Control"){
            this.setState({
                matrix: !this.state.matrix
            })
        } else if (event.key === "Enter"){
            this.setState({
                popUp: this.state.loadPopUp
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
        const matrix = this.state.matrix ? <Matrix /> : '';
        return (
            <div className="App">
                <div className="console">
                    {this.getText()}
                    <span className="blink_me">|</span>
                </div>
                {matrix}
                <div style={{ float:"left", clear: "both" }}
                     ref={(el) => { this.messagesEnd = el; }}></div>
                {popup}
            </div>
        );
    }
}

export default App;
