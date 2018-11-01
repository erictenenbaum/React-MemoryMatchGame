import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Square from "./components/Sqaure";
import { Col, Row, Container } from "./components/Grid";
import Jumbotron from "./components/Jumbotron";
import data from "./data.json";


class App extends Component {


  constructor(props){
    super(props);

    this.state = {
      data: [],
      active: [],
      revealed: [],
      timer: 0,
      fastTime: 0,
      fastMessage: ""     
    }   
  }

  timeVar;

  handleClick = (id, number) => {   
    let clickObj = {id, number};
    let tempActiveArr = this.copy(this.state.active);

    if(tempActiveArr.length < 3){
      tempActiveArr.push(clickObj);

      if(tempActiveArr.length == 2){
        if(tempActiveArr[0].number == tempActiveArr[1].number){
          console.log("match");
          return this.match(id);
        }else {
          console.log("different");         
          setTimeout(() => {
            return this.noMatch();
          }, 500)
          
        }
      } 

      return this.activate(id);  
    }      
  }

  noMatch(){
    let tempArray = this.copy(this.state.data);  
    for(let i = 0; i < tempArray.length; i++){
      for(let j = 0; j < tempArray[i].length; j++){
        if(tempArray[i][j].id == this.state.active[0].id || tempArray[i][j].id == this.state.active[1].id){
          tempArray[i][j].active = false;
        }
      }
    }

    this.setState({
      active: [],
      data: tempArray
    })
  }

  match(id){
    this.activate(id);
    let tempRevealed = this.state.revealed.slice();

    tempRevealed.push(this.state.active[0].id);
    tempRevealed.push(this.state.active[1].id);

    

    if(tempRevealed.length == data.length - 1){
      return this.youWin();
    }
    


    this.setState({
      active: [],
      revealed: tempRevealed
    })

    

  }



  youWin(){
    alert("you win! it took you " + this.state.timer + " seconds");
    let currentTime = this.state.timer;
    let currentFastest = this.state.fastTime;
    let fastTime;
    clearTimeout(this.timeVar);
    let fastMessage = "Time to beat: "

    if(this.state.fastTime != 0){
      if(currentTime < this.state.fastTime){
        fastTime = currentTime;
      }else {
        fastTime = currentFastest;
      }
    }else {
      fastTime = currentTime;
    }

    fastMessage += fastTime;

    this.setState({
      timer: 0,
      fastMessage: fastMessage,
      fastTime: fastTime
    })

    return this.startGame();
  }

  timer(time){
   this.timeVar = setTimeout(()=>{
      time++;
      this.setState({
        timer: time
      })

      return this.timer(time);
    }, 1000);
  }

  activate(id){
    let tempArray = this.copy(this.state.data);
    for(let i = 0; i < tempArray.length; i++){
      for(let j = 0; j < tempArray[i].length; j++){
        if(tempArray[i][j].id == id){
          tempArray[i][j].active = true;         
          break;
        }
      }
    }

    this.setState({
      data: tempArray     
    })
  }

  isInt(n) {
    return n % 1 === 0;
  }

  formatData(array) {
    let tempArray = this.copy(array);
    tempArray = this.shuffle(tempArray);

    let formattedArray = [];
    let tempMiniArray = [];

    tempArray.forEach(item => {
      tempMiniArray.push(item);
      if (tempMiniArray.length == 3) {
        formattedArray.push(tempMiniArray);
        tempMiniArray = [];
      }
    });
    
    return formattedArray;
  }


  shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = a[i];
      a[i] = a[j];
      a[j] = x;
    }
    return a;
  }

  copy(o) {
    let output, v, key;
    output = Object.prototype.toString.call(o) !== '[object Object]' ? o : {}
    for (key in o) {
      v = o[key];
      output[key] = (typeof v === "object") ? this.copy(v) : v;
    }
    return output;
  }

  startGame(){
    let formated = this.formatData(data);
    this.setState({
      data: formated,
      revealed: [],
      active: []
    })

    this.timer(1);
  }

  componentWillMount() {
    this.startGame();
  } 



  render() {
    if(this.state.data.length < 1){
      return (
        <div className="App">
          waiting
        </div>
      );
    }else {
      return (    
        <div className="App container">
        <Jumbotron timer={this.state.timer} fastMessage={this.state.fastMessage} />
            {this.state.data.map(arr =>{          
              return (
                <div className="row">
                <div className="col-xs-4 nopadding">
                  <Square data={this.state.data} handleClick={this.handleClick} number={arr[0].number} key={arr[0].id} id={arr[0].id} active={arr[0].active} />
                </div>
                <div className="col-xs-4 nopadding">
                  <Square data={this.state.data} handleClick={this.handleClick} number={arr[1].number} key={arr[1].id} id={arr[1].id} active={arr[1].active} />
                </div>
                <div className="col-xs-4 nopadding">
                  <Square data={this.state.data} handleClick={this.handleClick} number={arr[2].number} key={arr[2].id} id={arr[2].id} active={arr[2].active} />
                </div>
              </div>
              );
          
            })}
        </div>
      );
    }
   
  }
}

export default App;


