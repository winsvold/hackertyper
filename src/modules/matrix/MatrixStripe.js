import React, { Component } from 'react';
import PT from 'prop-types';

class MatrixStripe extends Component {

    constructor(props){
        super(props);
        this.state = {
            on: false,
            currentPosition: 0,
            matrixCode: [{}],
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

    generateCode(){
        if(this.state.currentPosition > this.props.maxHeight){
            this.setState({
                currentPosition: 0
            })
        }
        const currentCode = Object (this.state.matrixCode);
        const newCode = currentCode;
        newCode[this.state.currentPosition] =
            {
                code: Math.random()>0.5? '0' : '1',
                opacity: 1,
            };
        newCode.forEach(code=>code.opacity = code.opacity < 0 ? 0 : code.opacity -0.04);
        this.setState({
            matrixCode: newCode,
            currentPosition: this.state.currentPosition + 1
        });
    }

    renderCodeSnippet(){
        const codeArray = this.state.matrixCode;
        if(codeArray.length > 2){
            return codeArray.map((code)=>
                <p style={{opacity:code.opacity}}>{code.code}</p>
            )
        }
        return "\u00a0";
    }

    timer(){
        setInterval(()=>this.generateCode(), 80 + parseInt(Math.random()*300));
    }

    render(){
        return(
        <div className="matrix-stripe">
            {this.renderCodeSnippet()}
        </div>
        );
    }

}

MatrixStripe.propTypes ={
    maxHeight: PT.number,
    id: PT.number,
    run: PT.bool
};

MatrixStripe.defaultProps = {
    maxHeight: 30,
    id: 0,
    run: true
};

export default MatrixStripe;