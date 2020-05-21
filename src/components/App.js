import React, {Component} from 'react';
import '../styles/App.scss'
import MainBar from "./MainBar";
import Aside from "./Aside";
import {AiOutlinePause, AiFillCloseCircle} from 'react-icons/ai'
import {FaGripLines} from 'react-icons/fa'
import {IoMdCloseCircle} from 'react-icons/io'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAside: false,
    }
  }

  toggleIcon = (e) => {
    e.preventDefault()
    e.stopPropagation()
    this.setState({
      isAside: !this.state.isAside,
    })

    setTimeout(()=>{
      const aside = document.getElementsByClassName('aside-container ')[0]
      if (this.state.isAside){
        aside.style.display = "block"
        document.body.classList.add("overlay")
      } else {
        aside.style.display = "none"
        document.body.classList.remove("overlay")
      }
    },500)

  }

  render() {
    return (
      <div className="main-container container-fluid ">
        <div className="row">
          <MainBar/>
          <Aside/>
        </div>
        {window.innerWidth < 992
          ? <div className="toggle-container">
            <span className="toggle-container__favorite float-right">Favorite</span>
            <span className= {this.state.isAside ? "toggle-container__icon--close mr-5" :"toggle-container__icon--open mr-5"}
                  onClick={this.toggleIcon}> {!this.state.isAside ? <FaGripLines/> : <IoMdCloseCircle/>}</span>
          </div>
          : null}
      </div>
    )
  }
}

export default App;
