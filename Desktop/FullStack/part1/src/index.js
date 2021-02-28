import React,{ useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import reportWebVitals from './reportWebVitals'
import App from './Part2/Main/app'
//import App from "./Part2/PhoneBook/App"

import './index.css'
import axios from 'axios'

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );


// ========================================================== Old App  =================================================================================
// const Hello = ({name,age,time}) => {
//   const bornYear = () => new Date().getFullYear() - age
//   return (
//     <div>
//       <p> Hello {name} it is {time} </p>
//       <p> you are {age} and you were probably born in {bornYear()}</p>
//     </div>

//   )
// }


// const Course = (props) =>{
//   const items = props.contents.map((item) =>
//         <p>{item.part} {item.exercise}</p>
//     )
//   return (
//     <div>
//       <p>{props.course}</p>
//       {items}
//     </div>
//   )
// }

// const CourseTotal = (props) => {
//   let total = 0
//   let items = []
//   props.contents.forEach(item => {
//     items.push(<p>{item.part} {item.exercise}</p>)
//     total += item.exercise
//   });
//   return (
//     <div>
//       <p>{props.course}</p>
//       {items}
//       <p>Number of exercises {total} </p>
//     </div>
//   )
// }

// const App = () => {
//   console.log("Hello from component")
//   const now = new Date()
//   const courseName = 'Half Stack application development'
//   let pe = [
//     {part:'Fundamentals of React',exercise:10},
//     {part:'Using props to pass data',exercise:7},
//     {part:'State of a component',exercise:14},
//   ]

//   const a = 10
//   const b = 20
//   const age = 23
//   return (
//     <div>
//       <Hello name="George" age={age} time={now.toString()} />

//       <p>
//         {a} plus {b} is {a+b}
//       </p>
//       <p>Testing map(no total)</p>
//       <Course course = {courseName} contents = {pe}  />
//       <p>Testing foreach</p>
//       <CourseTotal course = {courseName} contents = {pe}/>

//     </div>
//   )
// }

// const Count = (props) => {
//   const {counts} = props
//   return (
//     <div>
//       <p> refreshed {counts} times</p>
//     </div>
//   )
// }


// let counter = 1

// const refresh = () => {
//   ReactDOM.render(
//     <div>
//       <App/>
//       <Count counts = {counter}/>
//     </div>,
//     document.getElementById('root')
//   )
// }





// refresh()
// counter+=1
// refresh()
// counter+=1
// refresh()

// setInterval(() =>{
//   refresh()
//   counter +=1
// },1000)
// ==========================================================                 ===============================================================
// const App = () =>{
//   const [counter, setCounter] = useState(0) // state or hook
//   // setTimeout(
//   //   () => setCounter(counter+1),
//   //   1000
//   // )
//   const handleClick = () =>{
//     console.log("clicked")
//     setCounter(counter+1)
//   }

//   console.log(counter)
//   return (
//     <div>
//       <p onMouseOver={handleClick}> {counter}</p>
//     </div>
//   )
// }






class App1 extends React.Component{
  constructor(){
    super()
    this.state = {
      count: 0,
      character: {}
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(){
    this.setState(prevState => {
      return {
        count : prevState.count + 1

      }
    })
  }



  componentDidMount(){
    //run once when component is shown up in the screen
    // rerender will not rerun this component
    //mostly used for api call
    //get the data i need to correctly display

    fetch('http:swapi.co//api/people/1')
      .then(response => response.json()).
      then(data => this.setState({
        character:data
      }))

  }

  UNSAFE_componentWillReceiveProps(nextProps){// this lifecycle method will be deprecated soon
    if (nextProps.data !== this.props.data){
      //do something important
    }
  }

  componentWillMount(){// will be deprecated

  }

  shouldComponentUpdate(nextProps, nextState){
    //return true if want to update
    //return false if do not want to udpate
  }

  componentWillUnmount(){
    //tear down , clear up code before your component disapear
    // (e.g remove envent listener)
  }
  //================new lifecycle method ====================
  static getDerivedStateFromProps(props, state){
    //return the new, updated state based upom the props
    // search google : you might not need derived state
  }

  getSnapshotBeforeUpdate(){
    // create backup(snapshot) of the current way thing are
    // not a commonly used lifecycle method
  }

  render(){
    return (
      <div>
        <h1 onMouseOver={this.handleClick}> the count is: {this.state.count} </h1>
        <p>{this.state.character}</p>
      </div>
    )
  }


}




const FormComponent =  (props) => {
  return (
    <div>

      <form onSubmit={this.handleSubmit}>
        <input
          type = "text"
          name = "firstName"
          placeholder="Firstname"
          onChange={props.handleChange}
          value={props.data.firstName}> </input>
        <br/>
        <input
          type = "text"
          name ="lastName"
          placeholder="Last Name"
          onChange={props.handleChange}
          value={props.data.lastName}>
        </input>
        <br/>
        <label>
          <input
            type="checkbox"
            name="isFriendly"
            checked={props.data.isFriendly}
            onChange={props.handleChange}
          ></input>
        </label>
        <br/>
        <label>
          <input
            type="radio"
            name="gender"
            value="female"
            checked={props.data.gender === 'female'}
            onChange={props.handleChange}
          ></input>
        </label>
        <br/>
        <label>
          <input
            type="radio"
            name="gender"
            value="male"
            checked={this.state.gender === 'male'}
            onChange={props.handleChange}
          ></input>
        </label>
        <label>Favorite Color:</label>
        <select
          value = {props.data.favColor}
          onChange={props.handleChange}
          name="favColor"
        >
          <option value="blue"></option>
          <option value="green"></option>
          <option value="orange"></option>
        </select>
        <h1>{props.data.firstName}</h1>
        <h2> you are a {props.data.gender}</h2>
        <h2> Your favorite color is {props.data.favColor}</h2>
        <button >submit</button>
      </form>

    </div>
  )
}

class AppForm extends React.Component{
  constructor(){
    super()
    this.state = {
    }
  }

}

class Form extends React.Component{
  constructor(){
    super()
    this.state = {
      firstName: '',
      lastName: '',
      isFriendly:false,
      gender: '',
      favColor:''
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event){
    const { name,value,type,checked } = event.target
    type === 'checkbox' ? this.setState({ [name]: checked }): this.setState({ [name]:value })
  }


  handleSubmit(){
    console.log('submit data')
  }
  render(){
    return (
      <FormComponent
        handleChange={this.handleChange}
        data = {this.state}
      />
    )
  }
}









const refresh = () => {
  ReactDOM.render(
    <div>
      <App />
    </div>,
    document.getElementById('root')
  )
}




refresh()
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()

// list of lifecycle method: