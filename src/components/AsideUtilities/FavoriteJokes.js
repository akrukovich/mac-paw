import React, {Component} from "react";
import {FaExternalLinkAlt} from "react-icons/fa";
import {MdMessage} from "react-icons/md";
import {BsHeartFill} from "react-icons/bs";
import '../../styles/FavoriteJokes.scss'

class FavoriteJoke extends Component {
  constructor(props) {
    super(props);
    const {value, id, url, hoursAgo, category} = this.props.joke
    this.state = {
      opacity:1,
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

  deleteJoke = (id) => {
    const tmpJokes = JSON.parse(localStorage.getItem('favoriteJokes'));
    const newJokeList = tmpJokes.filter(joke => joke.id !== id)
    localStorage.setItem('favoriteJokes', JSON.stringify(newJokeList))
  }

  heartToggle = () => {
    setInterval(()=>{
      this.setState({
        opacity:this.state.opacity - 0.1
      })
    },100)
    setTimeout(()=>{
      this.setState({favorite: !this.state.favorite})
      this.deleteJoke(this.state.jokeData.id)
      this.props.reRenderFavorHeartChange()
    },1000)
  }

  render() {
    const {value, id, url, hoursAgo, category} = this.state.jokeData

    return (
      <li className="favoriteJoke-section__item" style={!this.state.favorite ? {display: "none"} : {display: "block"}}>
        <div style={{opacity:this.state.opacity}} className="favoriteJoke-container container pt-5 pb-2">
          <div className="favoriteJoke-container__content row justify-content-md-between ml-5">
            <span className="favoriteJoke-container__meta meta-data col-12 "><span
              className="meta-data__text">ID:</span>
              <a href={url}>
                <span className="meta-data__id">{id}</span>
                <span className="meta-data__icon"><FaExternalLinkAlt/></span>
              </a>
            </span>
            <p className="favoriteJoke-container__joke col-12 ">
              {value}
            </p>
            <span className="favoriteJoke-container__timestamp timestamp my-auto col-12 col-md-auto ">
              Last update: {hoursAgo} hours ago
            </span>
            <span
              className="favoriteJoke-container__category category col-auto ml-2 px-2 py-1 my-auto ml-md-0 mr-md-3 ml-lg-2 "
              style={category ? {display: "block"} : {display: "none"}}>
              {category}
            </span>
          </div>
          <span className="favoriteJoke-container__comment comment">
            <span> <MdMessage/></span>
          </span>
          <span className="favoriteJoke-container__heart heart">
            <span onClick={(e) => {this.heartToggle(e);}}>
              <BsHeartFill/>
            </span>
          </span>
        </div>
      </li>
    )
  }
}

export default class FavoriteJokes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jokes: JSON.parse(localStorage.getItem('favoriteJokes')),
      reRenderOnClick: ''
    }
  }

  static getDerivedStateFromProps(props, state) {
    return {
      jokes: JSON.parse(localStorage.getItem('favoriteJokes')),
      reRenderOnClick: props.heartClick
    }
  }

  render() {
    const jokesItems = this.state.jokes.map(joke => {
      return <FavoriteJoke reRenderFavorHeartChange={this.props.reRenderFavorHeartChange} key={joke.id} joke={joke}/>
    })

    return (
      <ul className="favoriteJoke-section__list list-unstyled pt-4">{jokesItems}</ul>
    );
  }
}
