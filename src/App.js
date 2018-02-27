import React, { Component } from 'react';
import Grid from './components/grid';
import ColourSelectors from './components/colourSelectors';
import { Graph } from './graph';
import './style/index.css';

const SIZE = 12;
const COLORS = ['amethyst', 'blue', 'turquoise', 'orange', 'red'];

class App extends Component {
  constructor(props) {
    super(props);
    this.incrementCount = this.incrementCount.bind(this);
    this.sliderInput = this.sliderInput.bind(this);
    this.restart = this.restart.bind(this);
    this.colorFill = this.colorFill.bind(this);
    this.state = {
      size: SIZE,
      graph: new Graph(SIZE),
      colors: COLORS,
      count: 0
    }
  }

incrementCount() {
  this.setState({
    count: this.state.count + 1
  });
}

restart ()
 {
   this.setState({
     graph: new Graph(this.state.size),
     count: 0
   });
 }

 sliderInput(value) {
   this.setState({
     graph: this.newGrid(value, this.state.colors),
     count: 0
   });
 }

 colorFill(color) {
    this.state.graph.colorFill(color);
  }

  render() {
    return (
      <div className="content container-fluid">
        <div className="header">
          <h1>Welcome to Flood! </h1>
          <div className="col-sm-3">
            <div className="newGame btn btn-primary" onClick={(e) => this.restart()}>New Game</div>
            <div className="score lead">Moves: <span>{this.state.count}</span></div>
          </div>
        </div>
        <div>
          <ColourSelectors colors={this.state.colors} clickHandler={this.colorFill} incrementCount={this.incrementCount} />
        </div>
        <div className="border border-dark">
          <Grid grid={this.state.graph} colors={this.state.colors} size={this.state.size} />
        </div>
      </div>
    );
  }
}

export default App;
