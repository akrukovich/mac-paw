import React, {Component} from 'react';
import '../styles/App.scss'
import MainBar from "./MainBar";
import Aside from "./Aside";
import {FaGripLines} from 'react-icons/fa'
import {IoMdCloseCircle} from 'react-icons/io'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAside: false,
      width: window.innerWidth,
      heartClick: ''
    }
  }

  toggleIcon = () => {
    this.setState({
      isAside: !this.state.isAside,
    })
    const aside = document.getElementsByClassName('aside-container ')[0]
    const overlay = document.getElementsByClassName('overlay')[0]

    setTimeout(() => {
      if (this.state.isAside) {
        aside.style.display = 'block'
        overlay.classList.add('overlay--active')
      } else {
        aside.style.display = 'none'
        overlay.classList.remove('overlay--active')
      }
    }, 500)
  }

  handleResize = () => {
    const windowSize = window.innerWidth;
    this.setState({width: windowSize})
    const aside = document.getElementsByClassName('aside-container ')[0]
    const overlay = document.getElementsByClassName('overlay')[0]

    if (this.state.width > 992) {
      overlay.classList.remove('overlay--active')
      aside.style.display = 'block'
    } else {
      this.state.isAside
        ? overlay.classList.add('overlay--active')
        : aside.style.display = 'none'
    }
  };

  reRenderHeartChange = (e) => {
    this.setState({
      heartClick: e.target
    })
  }

  componentDidMount() {
    window.addEventListener("resize", this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  render() {
    if (!JSON.parse(localStorage.getItem('favoriteJokes'))) {
      const favoriteJokes = [];
      localStorage.setItem('favoriteJokes', JSON.stringify(favoriteJokes))
    }
    const icon = 'toggle-container__icon'
    return (
      <div className="main-container container-fluid h-100">
        <div className="row  h-100">
          <MainBar reRenderHeartChange={this.reRenderHeartChange}/>
          <Aside heartClick={this.state.heartClick} windowSize={this.state.width}/>
        </div>
        <div className="overlay">
        </div>
        {this.state.width <= 992
          ? <div className="toggle-container">
            <span className="toggle-container__favorite float-right">Favorite</span>
            <span className={
              this.state.isAside
              ? icon + " toggle-container__icon--closed "
              : icon + " toggle-container__icon--opened"
            } onClick={this.toggleIcon}> {
              !this.state.isAside
                ? <FaGripLines/>
                : <IoMdCloseCircle/>
            }</span></div>
          : null}
      </div>
    )
  }
}

export default App;
