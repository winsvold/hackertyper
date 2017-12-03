import React, { Component } from 'react';
import PT from 'prop-types';
import MatrixStripe from "./MatrixStripe";

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
        return this.state.matrixStriper.map((stripe, index)=>(
            <MatrixStripe id={index} key={`matrix-stripe-${index}`} run={stripe} />
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
            <div className="matrix">
                {this.matrixStriper()}
            </div>
        );
    }
}

Matrix.propTypes = {
    antallStriper: PT.number,
};

Matrix.defaultProps = {
    antallStriper: 50,
};

export default Matrix;