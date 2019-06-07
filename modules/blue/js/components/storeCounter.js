import React from 'react';
import { connect } from '../store/store';

class StoreCounterComponent extends React.Component {
    render() {
        return <>
        <h3>Store Count: {this.props.count}</h3> <button onClick={this.props.increment}>+</button> <button onClick={this.props.decrement}>-</button>
        <h3>Blue Internal Count: {this.props.blue.count}</h3>  <button onClick={this.props.delayedIncrement}>Delayed +</button> <button onClick={this.props.delayedDecrement}>Delayed -</button>
        </>;
    }
}

const mapStateToProps = (state, props) => {
    const {count, blue} = state;
    return { count, blue };
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
            type: 'delayed_increment_blue_count',
        };
    },
    delayedDecrement: () => {
        return {
            type: 'delayed_decrement_blue_count',
        };
    }
}

export const StoreCounter = connect(mapStateToProps, mapDispatchToProps)(StoreCounterComponent);