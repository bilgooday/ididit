import React, { Component } from 'react'
import axios from 'axios'
import './css/materialize.css'
import './App.css'
import logo from './smiley-phone.png'
import dude from './man.png'
import 'whatwg-fetch';

class Task extends Component{
  constructor(props){
    super(props)
    this.state={
      person: '',
      people: '',
      name: '',
      phone: '',
      email: this.props.match.params.name,
      newName: '',
      newPhone: '',
      tasks: [],
      newTask: '',
      duedate: ''
    }
    this.nameChange = this.nameChange.bind(this)
    this.phoneChange = this.phoneChange.bind(this)
    this.updatePerson = this.updatePerson.bind(this)
    this.deletePerson = this.deletePerson.bind(this)
    this.newTask = this.newTask.bind(this)
    this.newDate = this.newDate.bind(this)
    this.addTask = this.addTask.bind(this)
  }

  componentWillMount(){
    axios.get(`https://idid-it.herokuapp.com/${this.state.email}`).then(response => {
      this.setState({
        person: response.data,
        tasks: response.data.tasks,
        name: response.data.name,
        phone: response.data.phone
      })
    }).catch(err => {
    })
  }

 nameChange(e) {
    this.setState({
      newName: e.target.value
    })
  }

 phoneChange(e) {
    this.setState({
      newPhone: e.target.value
    })
  }

 updatePerson(){
    console.log(this.state.person.name)
    axios.post(`https://idid-it.herokuapp.com/${this.state.email}`,
    {name: this.state.newName, phone: this.state.newPhone})
    .then(response => {
      this.setState({
        person: response.data,
        tasks: response.data.tasks,
        name: response.data.name,
        phone: response.data.phone
      })
    }).catch(err => {
      console.log('error:', err)
    })
  }

 deletePerson(e){
    e.preventDefault()
    axios.post(`https://idid-it.herokuapp.com/${this.state.email}/delete`)
    //after clicking delete button, will take user back to homepage (or page where they came from before)
    this.props.history.goBack();
  }

//WHERE I"M ADDING A NEW TASK
   newTask(e){
     this.setState({
       newTask: e.target.value
     })
   }

  newDate(e){
     this.setState({
       duedate: e.target.value
     })
   }

  addTask(e){
     axios.post(`https://idid-it.herokuapp.com/${this.state.email}/addTask`,
       {tasks: { title: this.state.newTask, date: this.state.duedate }})
     .then(response => {
       this.setState({
         person: response.data
       })
     }).catch(err => console.log(err))
   }

   updateRender(){
     document.getElementById("update").style.visibility = "visible";
   }

   newTaskRender(){
     document.getElementById("newTask").style.visibility = "visible";
   }

   sendSms() {
   console.log(this.state.date)
   console.log(this.state.phone)
   axios.post('http://localhost:3001/sendsms',
   {"recipient": this.state.phone})
   .then((res, err) => {console.log(res, err)})
 }

 render(){
    let tasksRender = this.state.tasks.map((task) => {
      // PATHNAME HAS TO BE IN ALL LOWERCASE!!!!!!
     return (
       <div class="row">
      <div class="cards-pack">
        <div class="card">
          <div class="card-content white-text">
            <span class="card-title">Task Name: {task.title}</span>
            <p>Due Date: {task.date}</p>
          </div>
          <div class="card-action">
            <button onClick={(e) => axios.post(`https://idid-it.herokuapp.com/${this.state.email}/${task.title}/remove`).then(response => {
                   this.setState({
                     person: response.data
                   })
                 }).catch(err => console.error(err))} method='post'>Complete Task</button>
          </div>
        </div>
      </div>
    </div>
      )
    })

    return(
      <div id="profile-wrapper">
        <header>
        <div class="navbar-fixed">
          <nav>
        <div class="nav-wrapper">
          <a href="/" className="brand-logo">
          <div id="logo">
            <img src={logo} className="App-logo brand-logo" alt="logo" />
            <h1 className="Logo-text brand-logo">iDidit</h1>
          </div>
        </a>
          <a href="#" data-activates="mobile-demo" class="button-collapse"><i class="material-icons">menu</i></a>
          <ul class="right hide-on-med-and-down">
            <li><a href="sass.html">My Dashboard</a></li>
          </ul>
        </div>
      </nav>
    </div>
    </header>

      <img src={dude} id="dude"/>
      {/* <div id="user-card"> */}
        <h1 class="profile-text">{this.state.name}</h1>
        <h3 class="profile-text">{this.state.phone}</h3>
      {/* </div> */}
        <button onClick={this.updateRender}>Edit Profile</button>
        <button onClick={(e) => this.deletePerson(e)} method='post'>Delete Profile</button>
        <div id="update">
          <h5>Edit Profile</h5>
          <form class="edit-person" onSubmit={(e) => this.updatePerson(e)} method='put'>
            <div class="row">
              <div class="input-field col s6">
                <i class="material-icons prefix">account_circle</i>
                <input onChange={(e) => this.nameChange(e)} id="icon_prefix" type="text" class="validate" value={this.state.newName}/>
              </div>
              <div class="input-field col s6">
                <i class="material-icons prefix">phone</i>
                <input onChange={(e) => this.phoneChange(e)} id="icon_telephone" type="tel" class="validate" value={this.state.newPhone}/>
              </div>
              <button type='submit'>Update</button>
            </div>
          </form>
        </div>

        <div class="cards-pack">{tasksRender}</div>

        <button onClick={this.newTaskRender}>Create Task</button>

        <div id="newTask-wrapper">
            <div id="newTask">
            <form class="new-task" onSubmit={(e) => this.addTask(e)} method='put'>
              <input onChange={(e) => this.newTask(e)} type='text' placeholder="task name"/>
              <input onChange={(e) => this.newDate(e)} type='date' />
              <button onClick={this.sendSms.bind(this)} type='submit'>Save</button>
            </form>
          </div>
        </div>
        {/* <p>{this.tasksRender()}</p> */}
{/*FORM FOR ADDING A NEW TASK  */}
    </div>
    )
  }
}

export default Task
