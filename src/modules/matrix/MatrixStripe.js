import React, { Component } from 'react';
import PT from 'prop-types';

class MatrixStripe extends Component {

    constructor(props){
        super(props);
        this.state = {
            on: false,
            currentPosition: 0,
            matrixCode: [{
                value: '\u00a0', //Space
                opacity: 0
            }],
            run: false
        };
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.run === true && this.state.run === false){
            this.timer()
        }
        this.setState({
            run: nextProps.run
        });
    }

    timer(){
        const FRAME_RATE_MIN_TIME = 80;
        const FRAME_RATE_DELTA_TIME = 300;
        const DELAY = FRAME_RATE_MIN_TIME + parseInt(Math.random() * FRAME_RATE_DELTA_TIME);
        setInterval(() => this.generateCode(), DELAY);
    }

    generateCode(){
        if(this.state.currentPosition > this.props.antallBits){
            this.setState({
                currentPosition: 0
            })
        }
        const currentCode = Object (this.state.matrixCode);
        const newCode = currentCode;
        newCode[this.state.currentPosition] =
            {
                value: this.props.valueGenerator(),
                opacity: 1,
            };
        const OPACITY_DECAY = 0.04;
        newCode.forEach(bit=>bit.opacity = bit.opacity <= 0 ? 0 : bit.opacity - OPACITY_DECAY);
        this.setState({
            matrixCode: newCode,
            currentPosition: this.state.currentPosition + 1
        });
    }

    getCodeSnippet(){
        const codeArray = this.state.matrixCode;
        const HEIGHT_PERCENTAGE = this.props.bitHeightPX + 'px';
        const FONT_SIZE = this.props.bitHeightPX + 'px';
        return codeArray.map((bit)=>
                <p style={
                    {
                        opacity: bit.opacity,
                        fontSize: FONT_SIZE,
                        lineHeight: HEIGHT_PERCENTAGE
                    }
                }>{bit.value}</p>
        )
    }

    render(){
        return(
        <div className="matrix-stripe" style={{width: this.props.bitWidthPercentage + '%'}}>
            {this.getCodeSnippet()}
        </div>
        );
    }
}

MatrixStripe.propTypes ={
    antallBits: PT.number,
    run: PT.bool,
    bitWidthPercentage: PT.number,
    bitHeightPX: PT.number,
    valueGenerator: PT.func
};

MatrixStripe.defaultProps = {
    antallBits: 30,
    run: true,
    bitWidthPercentage: 2,
    bitHeightPX: 36,
    valueGenerator: () => Math.random() > 0.5 ? '0' : '1'
};

export default MatrixStripe;