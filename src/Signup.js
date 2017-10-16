import React, { Component } from 'react';
import logo from './logo.svg';


class Signup extends Component {
  constructor(props){
    super(props)
    this.state ={
      username: this.props.username
    }

    this.handleUsername = this.handleUsername.bind(this)
  }

  handleUsername(e) {
    e.preventDefault()

    console.log(this.props.username)
  }



  render() {
    console.log(this.props)
    return (
      <div className="Signup">
        <form>
          <input type="text" placeholder="Enter a username" onChange={ () =>  this.handleUsername }></input>
          <input type="text" placeholder="Enter your full name"></input>
          <input type="text" placeholder="Enter your email address"></input>
          <input type="text" placeholder="Enter a phone number"></input>
          <button type="submit"></button>
        </form>
      </div>
    );
  }
}

export default Signup;
