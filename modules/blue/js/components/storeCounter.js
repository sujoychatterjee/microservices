import React from 'react';
import { connect } from '../store/store';

class StoreCounterComponent extends React.Component {
    render() {
        return <>
        <div><h3>Store Count: {this.props.count}</h3> <button onClick={this.props.increment}>+</button> <button onClick={this.props.decrement}>-</button></div>
        <div><h3>Blue Internal Count: {this.props.blue.count}</h3>
            <button onClick={this.props.incrementOwn}>+</button> <button onClick={this.props.decrementOwn}>-</button>
            <button onClick={this.props.delayedIncrement}>Delayed +</button> <button onClick={this.props.delayedDecrement}>Delayed -</button>
        </div>
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
    incrementOwn: () => {
        return {
            type: 'increment_blue_count',
        };
    },
    decrementOwn: () => {
        return {
            type: 'decrement_blue_count',
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