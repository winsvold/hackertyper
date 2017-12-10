import React, { Component } from 'react';
import PT from 'prop-types';

class ProgressBar extends Component{
    constructor(props){
        super(props);
        this.state = {
            progress: 0,
            done: false
        };
        this.fillProgressBar();
    }

    fillProgressBar(){
        const newProgress = this.state.progress + 1;
        if (newProgress < 100) {
            setTimeout(()=>this.fillProgressBar(),this.props.speed);
        }
        this.setState({
            progress: newProgress,
        });
        if (newProgress === 100 && this.state.done === false){
            setTimeout(()=>this.timerDone(),this.props.speed);
        }
    }

    timerDone(){
        this.setState({
            done: true,
        });
        setTimeout(()=>this.props.callBack(),this.props.speed*30);
    }

    render(){
        return(
            <div>
                <div className="darkBackDrop" />
                <div className="progressBarContainer">
                    <h2 className="loading">
                        {"Uploading"}
                    </h2>
                    <div className="progressBar">
                        <div className="progressBarFill" style={{width:this.state.progress + '%'}} />
                    </div>
                    <h2>
                        {this.state.progress}%
                    </h2>
                </div>
            </div>
        );
    };
}

ProgressBar.propTypes = {
    speed: PT.number,
    callBack: PT.func,
};

ProgressBar.defaultProps = {
    speed: 50,
    callBack: ()=>{},
};

export default ProgressBar;