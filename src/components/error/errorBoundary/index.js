import React, { Component } from 'react';

export default class index extends Component {

    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    state = { hasError: false };

    static getDerivedStateFromError(error) {
        console.log('Error', error)
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.log('Details', errorInfo);
    }

    render() {
        const { hasError } = this.state;
        return hasError ? <div> Error Here </div>: this.props.children;
    }
}