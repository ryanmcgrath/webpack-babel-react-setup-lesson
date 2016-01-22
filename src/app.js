import React from 'react';
import {render} from 'react-dom';

class Counter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {count: 0};
        this.increment = this.increment.bind(this);
    }

    increment() {
        this.setState({
            count: this.state.count + 1
        });
    }

    render() {
        return <div>
            {this.state.count} <button onClick={this.increment}>Increment Me</button>
        </div>;
    }
};

render(<Counter />, document.getElementById('app'));
