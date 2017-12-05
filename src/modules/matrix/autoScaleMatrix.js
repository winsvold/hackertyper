import React, { Component } from 'react';
import Matrix from "./Matrix";

class InitializeMatrix extends Component {

    constructor(props) {
        super(props);
        this.state = { width: 1000, height: 1000 };
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    componentDidMount() {
        setTimeout(()=>this.updateWindowDimensions(),100); //Hack. Could send this as a callback to <Matrix>
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
        console.log("Width: ",this.state.width," Height: ",this.state.height);
    }

    render() {
        const numberOfStripes = 50;
        const numberOfBits = 30;
        const bitWidthPercentage = 100 / numberOfStripes;
        const bitHeightPX = this.state.height / numberOfBits;
        return (
            <Matrix
                antallStriper={numberOfStripes}
                antallBits={numberOfBits}
                bitWidthPercentage={bitWidthPercentage}
                bitHeightPX={bitHeightPX}
            />)
    };
}

export default InitializeMatrix;