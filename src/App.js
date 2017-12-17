import React, { Component } from 'react';
import './css/App.css';
import { hackerCode } from './resources/codeSample';
import InitializeMatrix from './modules/matrix/autoScaleMatrix';
import {popUpStates} from './modules/popup/PopUp';
import PopUp from './modules/popup/PopUp';
import ProgressBar from './modules/progressBar/progressbar';
import SideMenu from './modules/sidemenu/SideMenu';
import {instructions} from "./resources/instructions";
import WakeUp from "./modules/wakeup/WakeUp";
import texts from './modules/wakeup/text';
import Console from "./modules/console/console";


class App extends Component {

    constructor(props){
        super(props);
        this.state ={
            sizeOfText: 0,
            popUp: '',
            loadPopUp: '',
            matrix: false,
            instructionsOpen: false
        };
        this.toggleSideMenu = this.toggleSideMenu.bind(this);
    }

    componentWillMount(){
        document.addEventListener('keydown', this.handleKeyDown.bind(this));
    }

    componentWillUnmount(){
        document.removeEventListener('keydown', this.handleKeyDown.bind(this));
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
                sizeOfText: newSizeOfText >= 0 ? newSizeOfText : 0
            });
        } else {
            const newSizeOfText = parseInt(this.state.sizeOfText + Math.random() * 8, 10);
            this.setState({
                sizeOfText: newSizeOfText
            });
        }
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
            popup = <WakeUp textComponents={texts} />;
        }
        const matrix = this.state.matrix ? <InitializeMatrix /> : '';
        const sideMenu =
            <SideMenu content={instructions} open={this.state.instructionsOpen} callback={this.toggleSideMenu }/>;
        return (
            <div className='App'>
                <Console text={hackerCode} numberOfLetters={this.state.sizeOfText} />
                {matrix}
                {popup}
                {sideMenu}
            </div>
        );
    }
}

export default App;
