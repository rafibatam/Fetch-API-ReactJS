import React, {Component} from 'react';

function List(props) {
    return (
        <ul>
            {
                props.items.map((item, index) => <li key = {index}> {item}</li>)
            }
        </ul>
    )
}

class DefaultList extends Component {
    render() {
        return (
            <List items = {this.props.items} />
        )
    }
}

export default DefaultList;