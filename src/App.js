import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './css/App.css';
import {codeGetter} from './resources/codeSample';
import InitializeMatrix from './modules/matrix/autoScaleMatrix';
import {popUpStates} from './modules/popup/PopUp';
import PopUp from './modules/popup/PopUp';
import ProgressBar from './modules/progressBar/progressbar';
import SideMenu from './modules/sidemenu/SideMenu';
import {instructions} from "./resources/instructions";
import WakeUp from "./modules/wakeup/WakeUp";


class App extends Component {

    constructor(props){
        super(props);
        this.state ={
            popUp: '',
            loadPopUp: '',
            matrix: false,
            instructionsOpen: false
        };
        this.toggleSideMenu = this.toggleSideMenu.bind(this);
    }

    handleKeyDown(event) {
        if (event.key === '1') {
            this.setState({
                loadPopUp: 'granted'
            });
        } else if (event.key === '2'){
            this.setState({
                loadPopUp: 'denied'
            });
        }else if (event.key === '3'){
            this.setState({
                loadPopUp: 'progressBar'
            });
        }else if (event.key === '4'){
            this.setState({
                loadPopUp: 'wakeUp'
            });
        } else if (event.key === 'Control'){
            this.setState({
                matrix: !this.state.matrix
            });
        } else if (event.key === 'Enter'){
            this.setState({
                popUp: this.state.loadPopUp
            });
        } else if (event.key === 'Shift'){
            this.setState({
                popUp: ''
            });
        } else if (event.key === 'Delete' || event.key === 'Backspace'){
            const newSizeOfText = parseInt(this.state.sizeOfText - Math.random() * 8, 10);
            this.setState({
                sizeOfText: newSizeOfText
            });
        } else {
            const newSizeOfText = parseInt(this.state.sizeOfText + Math.random() * 8, 10);
            this.setState({
                sizeOfText: newSizeOfText
            });
        }
    }

    componentWillMount(){
        document.addEventListener('keydown', this.handleKeyDown.bind(this));
        this.setState({
            sizeOfText: 0
        });
    }

    componentWillUnmount(){
        document.removeEventListener('keydown', this.handleKeyDown.bind(this));
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }

    scrollToBottom () {
        const node = ReactDOM.findDOMNode(this.messagesEnd);
        node.scrollIntoView({ behavior: 'smooth' });
    }

    createScrollToBottomDiv() {
        return <div style={{float: 'left', clear: 'both'}}
            ref={(el) => {
                this.messagesEnd = el;
            }}/>;
    }

    getText(){
        return codeGetter(this.state.sizeOfText).split(' ')
            .join('\u00a0')
            .split('\t')
            .join('\u00a0'.repeat(4))
            .split('\n')
            .map((item, key) => {
                return <p key={key}><br />{item}</p>
            });
    }

    createConsole() {
        return <div className='console'>
            {this.getText()}
            <span className='blink_me'>|</span>
        </div>;
    }

    toggleSideMenu(open) {
        this.setState({
            instructionsOpen: open
        });
    }

    render() {
        let popup = '';
        if(this.state.popUp === 'granted'){
            popup = <PopUp popUpState={popUpStates.GRANTED} />;
        } else if (this.state.popUp === 'denied'){
            popup = <PopUp popUpState={popUpStates.DENIED} />;
        } else if (this.state.popUp === 'progressBar'){
            popup = <ProgressBar callBack={()=>this.setState({popUp: Math.random() < 0.5 ? 'granted' : 'denied'})} />;
        }else if (this.state.popUp === 'wakeUp'){
            popup = <WakeUp />;
        }
        const matrix = this.state.matrix ? <InitializeMatrix /> : '';
        const sideMenu =
            <SideMenu content={instructions} open={this.state.instructionsOpen} callback={this.toggleSideMenu }/>;
        return (
            <div className='App'>
                {this.createConsole()}
                {matrix}
                {popup}
                {this.createScrollToBottomDiv()}
                {sideMenu}
            </div>
        );
    }
}

export default App;
