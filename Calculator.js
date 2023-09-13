import React, { Component } from 'react';
import './Calculator.css'; // Import CSS

class Calculator extends Component {
  constructor() {
    super();
    this.state = {
      display: '0',
      currentInput: '',
      prevInput: '',
      operator: '',
      resultDisplayed: false,
    };
  }

  handleDigitClick = (digit) => {
    if (this.state.resultDisplayed) {
      this.setState({
        display: digit,
        currentInput: digit,
        operator: '',
        resultDisplayed: false,
      });
    } else {
      this.setState((prevState) => ({
        display: prevState.display === '0' ? digit : prevState.display + digit,
        currentInput: prevState.currentInput + digit,
      }));
    }
  };

  handleOperatorClick = (operator) => {
    if (this.state.operator === '') {
      this.setState((prevState) => ({
        prevInput: prevState.currentInput,
        display: `${prevState.currentInput} ${operator}`,
        currentInput: '',
        operator,
        resultDisplayed: false,
      }));
    } else {
      this.handleEqualsClick(); // Calculate previous operation before applying the new operator
      this.setState((prevState) => ({
        display: `${prevState.display} ${operator}`,
        currentInput: '',
        operator,
        resultDisplayed: false,
      }));
    }
  };

  handleEqualsClick = () => {
    if (this.state.prevInput && this.state.currentInput && this.state.operator) {
      const prev = parseFloat(this.state.prevInput);
      const current = parseFloat(this.state.currentInput);
      let result = 0;

      switch (this.state.operator) {
        case '+':
          result = prev + current;
          break;
        case '-':
          result = prev - current;
          break;
        case '*':
          result = prev * current;
          break;
        case '/':
          if (current !== 0) {
            result = prev / current;
          } else {
            result = 'Error';
          }
          break;
        default:
          break;
      }

      this.setState({
        display: result.toString(),
        prevInput: result.toString(),
        currentInput: '',
        operator: '=',
        resultDisplayed: true,
      });
    }
  };

  handleClearClick = () => {
    this.setState({
      display: '0',
      currentInput: '',
      prevInput: '',
      operator: '',
      resultDisplayed: false,
    });
  };

  render() {
    return (
        <div> 
        <h2 className='heading'>CALCULATOR</h2>
        <br></br>
        <br></br>
        <br></br>
      <div className="calculator">
        <div className="display">{this.state.display}</div>
        <div className="buttons">
          <div className="row">
            <button onClick={() => this.handleDigitClick('7')}>7</button>
            <button onClick={() => this.handleDigitClick('8')}>8</button>
            <button onClick={() => this.handleDigitClick('9')}>9</button>
            <button onClick={() => this.handleOperatorClick('+')}>+</button>
          </div>
          <div className="row">
            <button onClick={() => this.handleDigitClick('4')}>4</button>
            <button onClick={() => this.handleDigitClick('5')}>5</button>
            <button onClick={() => this.handleDigitClick('6')}>6</button>
            <button onClick={() => this.handleOperatorClick('-')}>-</button>
          </div>
          <div className="row">
            <button onClick={() => this.handleDigitClick('1')}>1</button>
            <button onClick={() => this.handleDigitClick('2')}>2</button>
            <button onClick={() => this.handleDigitClick('3')}>3</button>
            <button onClick={() => this.handleOperatorClick('*')}>*</button>
          </div>
          <div className="row">
            <button onClick={() => this.handleDigitClick('0')}>0</button>
            <button onClick={() => this.handleOperatorClick('/')}>/</button>
            <button onClick={() => this.handleEqualsClick()}>=</button>
            <button className="clear" onClick={() => this.handleClearClick()}>C</button>
          </div>
        </div>
      </div>
      </div>
    );
  }
}

export default Calculator;
