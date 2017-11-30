import React, { Component } from 'react';
import './App.css';
import {codeGetter} from "./code";

class App extends Component {

    handleKeyDown(event){
        const newSizeOfText = parseInt(this.state.sizeOfText + Math.random()*10);
        this.setState({
            sizeOfText: newSizeOfText
        })
    };

    componentWillMount(){
        document.addEventListener("keydown", this.handleKeyDown.bind(this));
        this.setState({
            sizeOfText: 5
        })
    }

    getText(){
        const text = codeGetter(this.state.sizeOfText).split(" ").join("\u00a0").split("\n").map((item, key) => {
            return <p key={key}>{item}<br/></p>
        });
        return text;
    };

    render() {
        return (
            <div className="App">
                {this.getText()}
            </div>
        );
    }
}

export default App;
