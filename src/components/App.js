import React, { Component } from "react";
import "../styles/App.scss";
import MainBar from "./MainBar";
import Aside from "./Aside";
import { FaGripLines } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";

const Overlay = () => <div className="overlay" />;

const TogglingIcon = ({ isClosed, toggleIcon }) => {
  const icon = "toggle-container__icon";
  return (
    <span
      onClick={(event) => toggleIcon()}
      className={
        isClosed
          ? icon + " toggle-container__icon--closed "
          : icon + " toggle-container__icon--opened"
      }
    >
      {isClosed ? <IoMdCloseCircle /> : <FaGripLines />}
    </span>
  );
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAside: false,
      width: window.innerWidth,
      heartClick: "",
      favorClick: "",
    };
  }

  toggleIcon = () => {
    this.setState({
      isAside: !this.state.isAside,
    });
    const aside = document.getElementsByClassName("aside-container ")[0];
    const overlay = document.getElementsByClassName("overlay")[0];

    setTimeout(() => {
      if (this.state.isAside) {
        aside.style.display = "block";
        overlay.classList.add("overlay--active");
      } else {
        aside.style.display = "none";
        overlay.classList.remove("overlay--active");
      }
    }, 500);
  };

  handleResize = () => {
    const windowSize = window.innerWidth;
    this.setState({ width: windowSize });
    const aside = document.getElementsByClassName("aside-container ")[0];
    const overlay = document.getElementsByClassName("overlay")[0];

    if (this.state.width > 992) {
      overlay.classList.remove("overlay--active");
      aside.style.display = "block";
    } else {
      this.state.isAside
        ? overlay.classList.add("overlay--active")
        : (aside.style.display = "none");
    }
  };

  reRenderHeartChange = () => {
    this.setState({
      heartClick: null,
    });
  };
  reRenderFavorHeartChange = () => {
    this.setState({
      heartClick: null,
    });
  };

  componentDidMount() {
    window.addEventListener("resize", this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  render() {
    if (!JSON.parse(localStorage.getItem("favoriteJokes"))) {
      const favoriteJokes = [];
      localStorage.setItem("favoriteJokes", JSON.stringify(favoriteJokes));
    }
    return (
      <div className="main-container container-fluid">
        <div className="row ">
          <MainBar
            heartClick={this.state.favorClick}
            reRenderHeartChange={this.reRenderHeartChange}
          />
          <Aside
            heartClick={this.state.heartClick}
            reRenderFavorHeartChange={this.reRenderFavorHeartChange}
            windowSize={this.state.width}
          />
        </div>
        <Overlay />
        {this.state.width <= 992 && (
          <div className="toggle-container">
            <span className="toggle-container__favorite float-right">
              Favorite
            </span>
            <TogglingIcon
              isClosed={this.state.isAside}
              toggleIcon={this.toggleIcon}
            />
          </div>
        )}
      </div>
    );
  }
}

export default App;
