import React, { Component } from 'react';
import logo from './logo.png';
import './App.css';
import DefaultList from './List';

// Properties
function Greetings(props) {
  return <h2>Hello {props.name}, Nice to meet you</h2>
}

// Component Button
class ToggleButton extends Component {
  constructor(props) {
    super(props)
    this.state = {
      toogleStatus: true
    }

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(state => ({
      toogleStatus: !state.toogleStatus
    }))
  }

  render() {
    return (
      <button onClick = {this.handleClick}>
        {this.state.toogleStatus ? "ADA AKHLAK" : "GAADA AKHLAK"}
      </button>
    )
  }
}

// Component EditText
class InputName extends Component {
  constructor(props) {
    super(props)
    this.state = {
      todoItem: "",
      items: []
    }
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.setState({
      items: [...this.state.items, this.state.todoItem],
      todoItem: ""
    })
  }

  handleChange = (event) => {
    this.setState({
      todoItem: event.target.value
    })
  }

  render() {
    return (
      <div>
        <form onSubmit = {this.handleSubmit}>
          <input value = {this.state.todoItem} onChange = {this.handleChange}/>
          <button>Search</button>
        </form>

        <DefaultList items = {this.state.items} />
      </div>
    )
  }
}

// Component Fetch API
class FetchAPI extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      isLoading: true
    }
  }

  componentDidMount() {
    fetch("https://randomuser.me/api/?results=10")
    .then(response => response.json())
    .then(parseJSON => parseJSON.results.map(getJSON => (
      {
        titleName: `${getJSON.name.title}`,
        firstName: `${getJSON.name.first}`,
        lastName: `${getJSON.name.last}`,
        genderUser: `${getJSON.gender}`
      }
      )))
    .then(data => this.setState({data, isLoading: false}))
    .catch(error => console.log("Parsing Failed", error));
  }

  render() {
    const {data, isLoading} = this.state;
    if(isLoading) {
      return <p>Loading....</p>
    }

    return (
      data.length > 0 ? data.map(dataJSON => {
        const {titleName, firstName, lastName, genderUser} = dataJSON;
        if (genderUser == "male") {
          return (
            <li> {titleName}. {firstName} {lastName} ({genderUser})</li>
          ) 
        }
      }) : null
    )
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src = {logo}/>
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <FetchAPI/>
        </header>
      </div>
    );
  }
}

export default App;
