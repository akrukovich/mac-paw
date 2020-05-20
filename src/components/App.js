import React, {Component} from 'react';
import '../styles/App.scss'
import MainBar from "./MainBar";

class App extends Component {
  render() {
    return (
      <div className="container-fluid">
      <dv className="row">
        <MainBar/>
        <aside>
          Aside
        </aside>
      </dv>
      </div>
    )
  }
}

export default App;
