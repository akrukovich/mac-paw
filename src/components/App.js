import React, {Component} from 'react';
import '../styles/App.scss'
import MainBar from "./MainBar";

class App extends Component {
  render() {
    return (
      <div className="container">
      <MainBar/>
      <div className="sidebar"></div>
      </div>
    )
  }
}

export default App;
