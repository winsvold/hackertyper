import React, { Component } from 'react';
import PT from 'prop-types';
import MatrixStripe from "./MatrixStripe";
import './matrix.less';

function erIkkeInitialisert(entry) {
    return entry === false;
}

class Matrix extends Component {

    constructor(props){
        super(props);
        this.state = {
            matrixStriper: new Array(this.props.antallStriper).fill(false),
        };
        this.initializeStripes();
    }

    matrixStriper(){
        return this.state.matrixStriper.map((stripe, index) => (
            <MatrixStripe
                antallBits={this.props.antallBits}
                bitHeightPX={this.props.bitHeightPX}
                bitWidthPercentage={this.props.bitWidthPercentage}
                run={stripe}
                key={`matrix-stripe-${index}`}
                valueGenerator={this.props.valueGenerator}
            />
        ));
    }

    initializeStripes() {
        const initsialserStriper = this.state.matrixStriper.map((stripe)=> stripe || Math.random() < 0.08);
        this.setState({
            matrixStriper: initsialserStriper,
        });
        if(this.state.matrixStriper.some(erIkkeInitialisert)){
            setTimeout(()=>this.initializeStripes(),200);
        }
    }

    render(){
        return(
            <div className="matrix" id="matrix">
                {this.matrixStriper()}
            </div>
        );
    }
}

Matrix.propTypes = {
    antallStriper: PT.number,
    antallBits: PT.number,
    bitHeightPX: PT.number,
    bitWidthPercentage: PT.number,
    valueGenerator: PT.func
};

Matrix.defaultProps = {
    antallStriper: 50,
    antallBits: 35,
    bitHeightPX: 36,
    bitWidthPercentage: 2,
    valueGenerator: () => Math.random() > 0.5 ? '0' : '1'
};

export default Matrix;
