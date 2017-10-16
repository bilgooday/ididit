import React, { Component } from 'react';
import {
  Link
} from "react-router-dom"
import logo from './smiley-phone.png'

import axios from 'axios'
import './css/materialize.css'
class Person extends Component{
  constructor(props){
    super(props)
    this.state = {
      name: '',
      phone: '',
      people: []
    }
    this.getPeople = this.getPeople.bind(this)
    this.getName = this.getName.bind(this)
    this.getPhone = this.getPhone.bind(this)
    this.newPerson = this.newPerson.bind(this)
  }

 componentDidMount(){
    this.getPeople()
  }

  getPeople(){
    axios.get("https://idid-it.herokuapp.com/home").then((response) => {
      console.log(response)
      this.setState({
        people: response.data
      })
    })
  }

 getName(e) {
    this.setState({
      name: e.target.value
    })
    console.log( this.state.name )
  }
  getPhone(e) {
    this.setState({
      phone: e.target.value
    })
    console.log( this.state.phone )
  }

 newPerson(e){
    e.preventDefault()
    axios.post('https://idid-it.herokuapp.com/home',
    {name: this.state.name, phone: this.state.phone})
    .then( response => console.log(response))
    .then( err => console.error(err))
    .then(() => this.getPeople())
  }

 render() {
    let peopleRender = this.state.people.map((person) => {
      // PATHNAME HAS TO BE IN ALL LOWERCASE!!!!!!
      let pathname = `/${person.name}`
     return (
        <p key={person._id}>
          <Link to ={{pathname, state: {selectedPerson: person}}}>{person.name}</Link>
        </p>
      )
    })
    return (
      <div>
      <header>
      <div class="navbar-fixed">
        <nav>
      <div class="nav-wrapper">
        <div id="logo">
          <img src={logo} href="/" className="App-logo brand-logo" alt="logo" />
          <h1 className="Logo-text brand-logo">iDidit</h1>
        </div>
        <a href="#" data-activates="mobile-demo" class="button-collapse"><i class="material-icons">menu</i></a>
        <ul class="right hide-on-med-and-down">
          <li><a href="sass.html">My Dashboard</a></li>
          <li><a href="/sign-in">Login</a></li>
          <li><a href="collapsible.html">Logout</a></li>
          <li><a href="mobile.html">Mobile</a></li>
        </ul>
        <ul class="side-nav" id="mobile-demo">
          <li><a href="sass.html">Dashboard</a></li>
          <li><a href="badges.html">Login</a></li>
          <li><a href="collapsible.html">Logout</a></li>
          <li><a href="mobile.html">Mobile</a></li>
        </ul>
      </div>
    </nav>
    </div>
    </header>
      <div class="row">
        <h2>Let's Get Started!</h2>
          <form class="col s12">
            <div class="row">
              <div class="input-field col s6">
                <i class="material-icons prefix">account_circle</i>
                <input onChange={ (e) => this.getName(e) } id="icon_prefix" type="text" class="validate" placeholder="First Name"/>
              </div>
              <div class="input-field col s6">
                <i class="material-icons prefix">phone</i>
                <input onChange={(e) => this.getPhone(e)} id="icon_telephone" type="tel" class="validate" placeholder="Mobile Number"/>
              </div>
            </div>
            <button id="save-button" onClick={(e) => this.newPerson(e)} method='post' class="waves-effect waves-light btn-large">Save</button>
          </form>
          {peopleRender}
        </div>
      </div>
    )
  }

}

export default Person
