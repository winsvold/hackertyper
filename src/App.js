import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './css/App.css';
import {codeGetter} from "./resources/codeSample";
import Granted from "./modules/popup/Granted";
import Denied from "./modules/popup/Denied";
import InitializeMatrix from "./modules/matrix/autoScaleMatrix";
import Matrix from "./modules/matrix/Matrix";
import ProgressBar from "./modules/progressBar/progressbar";

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
        } else if (event.key === "3"){
            this.setState({
                loadPopUp: "progressBar"
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
        } else if (event.key === "Delete" || event.key === "Backspace"){
            const newSizeOfText = parseInt(this.state.sizeOfText - Math.random() * 8);
            this.setState({
                sizeOfText: newSizeOfText
            })
        } else {
            const newSizeOfText = parseInt(this.state.sizeOfText + Math.random() * 8);
            this.setState({
                sizeOfText: newSizeOfText
            })
        }
    };

    componentWillMount(){
        document.addEventListener("keydown", this.handleKeyDown.bind(this));
        this.setState({
            sizeOfText: 0
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
        const text = codeGetter(this.state.sizeOfText).split(" ").join("\u00a0").split("\t").join("\u00a0".repeat(4)).split("\n").map((item, key) => {
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
        } else if (this.state.popUp === "progressBar"){
            popup = <ProgressBar callBack={()=>this.setState({popUp: "granted"})} />
        }
        const matrix = this.state.matrix ? <InitializeMatrix /> : '';
        return (
            <div className="App">
                <div className="console">
                    {this.getText()}
                    <span className="blink_me">|</span>
                </div>
                {matrix}
                {popup}
                <div style={{ float:"left", clear: "both" }}
                     ref={(el) => { this.messagesEnd = el; }} />
            </div>
        );
    }
}

export default App;
