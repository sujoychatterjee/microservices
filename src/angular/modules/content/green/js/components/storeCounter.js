import React from 'react';
import { connect } from '../utils/connectWrapper';

class StoreCounterComponent extends React.Component {
    render() {
        return <>
        <h3>Store Count: {this.props.count}</h3> <button onClick={this.props.increment}>+</button> <button onClick={this.props.decrement}>-</button>
        <h3>Green Internal Count: {this.props.green.count}</h3>  <button onClick={this.props.delayedIncrement}>Delayed +</button> <button onClick={this.props.delayedDecrement}>Delayed -</button>
        </>;
    }

    increment() {
        console.log('increment');
    }

    decrement() {
        console.log('decrement');
    }
}

const mapStateToProps = (state, props) => {
    const {count, green} = state;
    return { count, green };
};

const mapDispatchToProps = {
    increment: () => {
        return {
            type: 'increment_count',
        };
    },
    decrement: () => {
        return {
            type: 'decrement_count',
        };
    },
    delayedIncrement: () => {
        return {
            type: 'delayed_increment_green_count',
        };
    },
    delayedDecrement: () => {
        return {
            type: 'delayed_decrement_green_count',
        };
    }
}

export const StoreCounter = connect(mapStateToProps, mapDispatchToProps)(StoreCounterComponent);