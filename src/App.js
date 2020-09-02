import React from 'react';
import './app.less';
import { hackerCode } from './resources/codeSample';
import InitializeMatrix from './modules/matrix/autoScaleMatrix';
import {popUpStates} from './modules/popup/PopUp';
import PopUp from './modules/popup/PopUp';
import ProgressBar from './modules/progressBar/progressbar';
import SideMenu from './modules/sidemenu/SideMenu';
import {instructions} from './resources/instructions';
import SelfWritingConsole from './modules/selfWritingConsole/SelfWritingConsole';
import texts from './modules/selfWritingConsole/text';
import Console from './modules/console/console';
import { isMobile } from 'react-device-detect';
import ReactGA from 'react-ga';
import mobileWarningText from './resources/mobileWarningText';

class App extends React.Component {

    constructor(props){
        ReactGA.initialize('UA-111572952-1');
        if (isMobile) {
            ReactGA.pageview('Mobile Warning');
        } else {
            ReactGA.pageview('Page View');
        }
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
            ReactGA.event({
                category: 'Features',
                action: 'Toggled Matrix'
            });
            this.setState({
                matrix: !this.state.matrix
            });
        } else if (event.key === 'Enter'){
            ReactGA.event({
                category: 'Features',
                action: this.state.loadPopUp
            });
            this.setState({
                popUp: this.state.loadPopUp
            });
        } else if (event.key === 'Shift'){
            ReactGA.event({
                category: 'Features',
                action: 'Cleared Feature'
            });
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
            popup = <SelfWritingConsole textComponents={texts} />;
        }
        const matrix = this.state.matrix ? <InitializeMatrix /> : '';
        const sideMenu =
            <SideMenu content={instructions} open={this.state.instructionsOpen} callback={this.toggleSideMenu }/>;
        const mobileWarning = isMobile ?
            <SelfWritingConsole className="mobileWarning" textComponents={mobileWarningText} /> : '';
        return (
            <div className='App'>
                <Console text={hackerCode} numberOfLetters={this.state.sizeOfText} />
                {matrix}
                {popup}
                {sideMenu}
                {mobileWarning}
            </div>
        );
    }
}

export default App;
