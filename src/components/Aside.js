import React, {Component} from "react";
import '../styles/Aside.scss'
import {FaExternalLinkAlt} from "react-icons/fa";
import {MdMessage} from "react-icons/md";
import {BsHeartFill} from "react-icons/bs";
import {AiFillCloseCircle, AiOutlinePause} from "react-icons/ai";

class FavoriteJoke extends Component {
  constructor(props) {
    super(props);
    const {value, id, url, hoursAgo, category} = this.props.joke
    this.state = {
      favorite: true,
      jokeData: {
        value: value,
        url: url,
        id: id,
        hoursAgo: hoursAgo,
        category: category
      }
    }
  }

  deleteJoke=(id)=> {
    const tmpJokes = JSON.parse(localStorage.getItem('favoriteJokes'));
    const newJokeList = tmpJokes.filter(joke => joke.id !== id)
    localStorage.setItem('favoriteJokes', JSON.stringify(newJokeList))
  }

  heartToggle = () => {
    this.setState({favorite:!this.state.favorite})
    this.deleteJoke(this.state.jokeData.id)
    this.setState({favorite:!this.state.favorite})
  }

  render() {
    const {value, id, url, hoursAgo, category} = this.state.jokeData

    return (
      <li className="favoriteJoke-section__item" style={!this.state.favorite ?{display:"none"}:{display:"block"}}>
        <div className="favoriteJoke-container container pt-5 pb-2">
          <div className="favoriteJoke-container__content row justify-content-md-between ml-5">
            <span className="favoriteJoke-container__meta meta-data col-12 "><span
              className="meta-data__text">ID:</span><a
              href={url}><span
              className="meta-data__id">{id}</span><span className="meta-data__icon">
              <FaExternalLinkAlt/></span></a></span>
            <p className="favoriteJoke-container__joke col-12 ">
              {value}
            </p>
            <span className="favoriteJoke-container__timestamp my-auto col-12 col-md-auto ">
              Last update: {hoursAgo} hours ago
            </span>
            <span className="category col-auto ml-2 px-2 py-1 my-auto ml-md-0 mr-md-3 "
                  style={category ? {display: "block"} : {display: "none"}}>
              {category}
            </span>
          </div>
          <span className="joke-container__comment">
            <span> <MdMessage/></span>
          </span>
          <span className="joke-container__heart">
            <span onClick={()=>{
              this.heartToggle();
            }}> <BsHeartFill/>  </span>
          </span>
        </div>
      </li>
    )
  }
}

class FavoriteJokes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jokes: JSON.parse(localStorage.getItem('favoriteJokes'))
    }
  }
  handleResize = e => {
    const windowSize = window.innerWidth;
    this.setState({width:windowSize})
  };
  componentDidMount() {
    this.setState({
      jokes:JSON.parse(localStorage.getItem('favoriteJokes'))
    })
    window.addEventListener("resize", this.handleResize);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  render() {
    const jokesItems = this.state.jokes.map(joke => {
      return <FavoriteJoke joke={joke}/>
    })
    return (
      <ul className="favoriteJoke-section__list list-unstyled pt-4">{jokesItems}</ul>
    );
  }
}

export default class Aside extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width:window.innerWidth,
    }
  }


  render() {
    return (
      <aside className="aside-container col-lg-4  col-md-7 ml-auto pt-5">
        <div className="favorite-container container">
          <div className="row">
            <div className="favorite-container__list col-12 ">
              {this.state.width > 1023 ?  <div className="favorite-container__name mt-lg-4">Favourite</div> : null}
              <FavoriteJokes/>
            </div>
          </div>
        </div>
      </aside>
    )
  }
}