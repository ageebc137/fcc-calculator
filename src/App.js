import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      input: '',
      inputArr: [],
      inputNumber: '',
      output: 0,
      outputRequested: false
    }
    this.changeInputNumber = this.changeInputNumber.bind(this);
    this.clearNumbers = this.clearNumbers.bind(this);
    this.addNumbers = this.addNumbers.bind(this);
    this.equalsOutput = this.equalsOutput.bind(this);
    this.subtractNumbers = this.subtractNumbers.bind(this);
    this.multiplyNumbers = this.multiplyNumbers.bind(this);
    this.divideNumbers=this.divideNumbers.bind(this);
    this.addDecimal = this.addDecimal.bind(this);
  }
  
  changeInputNumber(event){
    if(event.target.id === "zero" && this.state.input.length < 1 ) {
       return;
    }else {
      let inputDigit = event.target.innerHTML;
      let lastValue = this.state.inputArr[this.state.inputArr.length - 1];
      if (lastValue === "+" || lastValue === "-" || lastValue === "x" || lastValue === "/"){
        this.setState({
          input: this.state.input + inputDigit,
          inputNumber: this.state.inputNumber + inputDigit,
          inputArr: this.state.inputArr.concat(inputDigit)
        }, function(){
          console.log("Change input number", this.state);
        });
      }else{

       if(this.state.inputArr.length === 0 || this.state.outputRequested) {
         lastValue = inputDigit;
         this.setState({
           outputRequested: false,
         }, function(){
           console.log("Change input number", this.state)
         })
       }else{
         
         lastValue=this.state.inputArr[this.state.inputArr.length -1] +inputDigit;
          if (lastValue.charAt(0) === "0") {
            lastValue = lastValue.substr(1);
         }
       }
       
       let newArray = this.state.inputArr.slice();
       if (newArray.length > 0 ) {
         newArray[newArray.length - 1] = lastValue;
       }else{
         newArray[0] = lastValue;
       }
       this.setState({
        input: newArray.join(""),
        inputNumber: lastValue,
        inputArr: newArray,
       }, function() {
         console.log("Change input number", this.state)
       });
      }
    
    }
      
  }

  
  
  addNumbers() {
    let number = "0";
    
    if (!Number(this.state.inputArr[this.state.inputArr.length - 1]) && this.state.inputArr[0] !== undefined) {
 
      
       return; 
   }
    
    if(this.state.inputArr.length === 1 && Number(this.state.inputArr[0])) {
      number = this.state.inputArr[0] + "+";
    }else {
      number = this.state.input + "+";
    }
    
      this.setState({
        inputArr: this.state.inputArr.concat("+"),
        input: number,
        inputNumber: '',
      });  
  }   
  
  
  subtractNumbers() {
    
    let number = "0";
    
    if (!Number(this.state.inputArr[this.state.inputArr.length - 1]) && this.state.inputArr[0] !== undefined) {
       return; 
   }
    
    if(this.state.inputArr.length === 1 && Number(this.state.inputArr[0])) {
      number = this.state.inputArr[0] + "-";
    }else{
      number = this.state.input + "-";
    }
    
      this.setState({
        inputArr: this.state.inputArr.concat("-"),
        input: number,
        inputNumber: '',
      });  
  }   
  
  multiplyNumbers() {
    
     let number = "0";
    
    if (!Number(this.state.inputArr[this.state.inputArr.length - 1]) && this.state.inputArr[0] !== undefined) {
       return; 
   }
    
    if(this.state.inputArr.length === 1 && Number(this.state.inputArr[0])) {
      number = this.state.inputArr[0] + "x";
    }else{
      number = this.state.input + "x";
    }
    
      this.setState({
        inputArr: this.state.inputArr.concat("x"),
        input: number,
        inputNumber: '',
      });  
  }
  
  divideNumbers() {
    
    let number = "0";
    
    if (!Number(this.state.inputArr[this.state.inputArr.length - 1]) && this.state.inputArr[0] !== undefined) {
       return; 
   }
    
    if(this.state.inputArr.length === 1 && Number(this.state.inputArr[0])) {
      number = this.state.inputArr[0] + "/";
    }else{
      number = this.state.input + "/";
    }
    
      this.setState({
        inputArr: this.state.inputArr.concat("/"),
        input: number,
        inputNumber: '',
      });  
  }
  
  equalsOutput() {
  
       let array = this.state.inputArr.slice();
       if (this.state.inputArr[0] ===  undefined) {
         return;
       }
      
      if (array[0] === "+" || array[0] === "/" || array[0] === "x") {
        array.shift();
      }else if(array[0] === "-" ) {
        array.shift();
        array[0] = "-" + array[0]
      }
      
      if (array[array.length-1] === "+" || array[array.length-1] === "-" || array[array.length-1] === "/" || array[array.length-1] === "x") {
        array.pop();
      }
      
      while( array.indexOf("x") > 0) {
        let i = array.indexOf("x");
        let firstNumber = array[i-1];
        let secondNumber = array[i+1];
        let product = firstNumber*secondNumber;
        array.splice(i-1, 3, product);
        
      }
       while( array.indexOf("/") > 0) {
        let i = array.indexOf("/");
        let firstNumber = array[i-1];
        let secondNumber = array[i+1];
        let dividend = firstNumber/secondNumber;
        array.splice(i-1, 3, dividend);
       
      }
       while( array.indexOf("-") > 0) {
        let i = array.indexOf("-");
        let firstNumber = Number(array[i-1]);
        let secondNumber = Number(array[i+1]);
        let difference = firstNumber-secondNumber;
        array.splice(i-1, 3, difference);
       
      }
       while( array.indexOf("+") > 0) {
        let i = array.indexOf("+");
        let firstNumber = Number(array[i-1]);
        let secondNumber = Number(array[i+1]);
        let sum = firstNumber+secondNumber;
        array.splice(i-1, 3, sum);
        
      }

      let calculatedOutput = array[0];
      if (Math.abs(calculatedOutput%1) === 0) {
        calculatedOutput = parseInt(calculatedOutput, 10);
      }
      let sign = "";
      if (this.state.input.charAt(this.state.input.length - 1) === "=") {
        return
      }
    this.setState({
      output: calculatedOutput,
      input: this.state.input + "=",
      inputArr: array,
      outputRequested: true
    }, function() {
        console.log(this.state)
    });
  }
 
  addDecimal() {

    let lastValue = this.state.inputArr[this.state.inputArr.length - 1];
    lastValue+="";

    if (lastValue === "undefined"){
        this.setState({
        inputArr: this.state.inputArr.concat("0."),
        input: "0."
      });

   }else if (lastValue === "+" || lastValue === "-" || lastValue === "/" || lastValue === "x") {
      let array = this.state.inputArr.slice();
      let newDigit = "0.";
      array.push(newDigit);
      
      this.setState({
        inputArr: array,
        input: this.state.input + "0."
      });
    }else if (lastValue.indexOf(".") === -1) {
      let array = this.state.inputArr.slice();
      lastValue+="."
      array[array.length - 1] = lastValue; 
      this.setState({
        inputArr: array,
        input: array.join(""),
        outputRequested: false
      });
    }
    
  }
  
  clearNumbers() {
    this.setState({
      input: '',
      inputArr: [],
      inputNumber: '',
      output: "0"
    });
  }
  
  render() {

    return(
        <div>
          <div id="display">
             <h3 id="input" value={this.state.input}>{this.state.input}</h3>
             <h2 id="output">{this.state.output}</h2>
            </div>
        <div id="button-keypad">
        <div id="first-row">
          <button onClick={this.clearNumbers} id="clear">AC</button>
          <button onClick={this.divideNumbers} className="sm-button operator" id="divide">/</button>
          <button onClick={this.multiplyNumbers} className="sm-button operator" id="multiply">x</button>
        </div>
        <div id="second-row">
          <button onClick={this.changeInputNumber}className="sm-button number" id="seven" >7</button>
          <button onClick={this.changeInputNumber}className="sm-button number" id="eight">8</button>
          <button onClick={this.changeInputNumber}className="sm-button number" id="nine">9</button>
          <button onClick={this.subtractNumbers} className="sm-button operator" id="subtract">-</button>
        </div>
        <div id="third-row">
          <button onClick={this.changeInputNumber} className="sm-button number" id="four">4</button>
          <button onClick={this.changeInputNumber} className="sm-button number" id="five">5</button>
          <button onClick={this.changeInputNumber} className="sm-button number" id="six">6</button>
          <button onClick={this.addNumbers} className="sm-button operator" id="add">+</button>
        </div>
        <div id="fourth-row">
          <div className="square" id="first-square">
          <button onClick={this.changeInputNumber} className="sm-button number" id="one">1</button>
          <button onClick={this.changeInputNumber} className="sm-button number" id="two">2</button>
          <button onClick={this.changeInputNumber} className="number" id="zero">0</button>
          </div>
          <div className="square" id="second-square">
            <div className="column" id="first-column">
            <button onClick={this.changeInputNumber} className="sm-button number" id="three">3</button>
            <button  onClick={this.addDecimal} className="sm-button number" id="decimal">.</button>
            </div>
          <div className="column" id="second-column">
          <button onClick={this.equalsOutput} className="button" id="equals">=</button>
              </div>
          </div>
          </div>
            </div>
        </div>
    );

  }
}

export default App;
