import React, {Component} from "react";
import PropTypes from 'prop-types'
import {FaExternalLinkAlt} from "react-icons/fa";
import {MdMessage} from "react-icons/md";
import {BsHeart, BsHeartFill} from "react-icons/bs";
import '../../styles/Jokes.scss'

export class Joke extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favorite: false,
      jokeData: {
        value: '',
        url: '',
        id: '',
        hoursAgo: '',
        category: ''
      }
    }
  }

  saveJoke(id) {
    const tmpJokes = JSON.parse(localStorage.getItem('favoriteJokes'));
    const isSaved = tmpJokes.filter(joke => joke.id === id).length
    if (!isSaved) {
      tmpJokes.push({
        value: this.state.jokeData.value,
        url: this.state.jokeData.url,
        id: this.state.jokeData.id,
        hoursAgo: this.state.jokeData.hoursAgo,
        category: this.state.jokeData.category,
        favorite: true
      })
    }
    localStorage.setItem('favoriteJokes', JSON.stringify(tmpJokes))
  }

  deleteJoke(id) {
    const tmpJokes = JSON.parse(localStorage.getItem('favoriteJokes'));
    const newJokeList = tmpJokes.filter(joke => joke.id !== id)
    localStorage.setItem('favoriteJokes', JSON.stringify(newJokeList))
  }

  heartToggle = () => {
    this.setState({favorite: !this.state.favorite})
    if (!this.state.favorite) {
      this.saveJoke(this.state.jokeData.id)
    } else {
      this.deleteJoke(this.state.jokeData.id)
    }
    this.props.reRenderHeartChange()
  }

  static getDerivedStateFromProps(props, state) {
    const {value, id, url, updated_at, categories} = props.joke
    const category = categories[0]
    const updatedAt = new Date(updated_at)
    const now = new Date()
    const hoursAgo = Math.floor(Math.abs((now.getTime() - updatedAt.getTime()) / 3600000))
    const tmpJokes = JSON.parse(localStorage.getItem('favoriteJokes'));
    const isFavorite = tmpJokes.filter(joke => joke.id === id).length
    return {
      favorite: isFavorite,
      jokeData: {
        value: value,
        url: url,
        id: id,
        hoursAgo: hoursAgo,
        category: category
      }
    };
  }

  render() {
    const {value, id, url, hoursAgo, category} = this.state.jokeData
    return (
      <li className="joke-section__item">
        <div className="joke-container container pt-5 pb-2 ml-0">
          <div className="joke-container__content row justify-content-md-between ml-5">
            <span className="joke-container__meta meta-data col-12 ">
              <span className="meta-data__text">ID:</span>
              <a href={url}><span className="meta-data__id">{id}</span>
                <span className="meta-data__icon"><FaExternalLinkAlt/></span>
              </a>
            </span>
            <p className="joke-container__joke col-12 ">
              {value}
            </p>
            <span className="joke-container__timestamp timestamp my-auto col-12 col-md-auto ">
              Last update: {hoursAgo} hours ago
            </span>
            <span className="joke-container__category category  col-auto ml-2 px-2 py-1 mt-2 ml-md-0 mr-md-3 "
                  style={category
                      ? {display: "block"}
                      : {display: "none"}}>
              {category}
            </span>
          </div>
          <span className="joke-container__comment comment">
            <span> <MdMessage/></span>
          </span>
          <span className="joke-container__heart heart">
            <span
              onClick={this.heartToggle}>
              {this.state.favorite ? <BsHeartFill/> : <BsHeart/>}
            </span>
          </span>
        </div>
      </li>
    )
  }
}

export default class Jokes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jokes: '',
      reRenderOnClick:''
    }
  }
  componentDidMount() {
    this.setState({
      reRenderOnClick: this.props.heartClick
    })
  }

  static getDerivedStateFromProps(props, state) {
    return {
      reRenderOnClick: props.heartClick
    }
  }

  render() {
    const jokes = this.props.jokes;
    let jokesItems;
    if (jokes.result) {
      jokesItems = jokes.result.map(joke => {
        return <Joke key={joke.id} joke={joke} reRenderHeartChange={this.props.reRenderHeartChange}/>
      })
    } else {
      jokesItems = <Joke key={jokes.id} joke={jokes} reRenderHeartChange={this.props.reRenderHeartChange}/>
    }
    return (
      <ul className="joke-section__list">{jokesItems}</ul>
    );
  }
}

Joke.propTypes = {
  joke:PropTypes.shape({
    categories: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    updated_at: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired
  }),
  reRenderHeartChange:PropTypes.func,
}
Jokes.propTypes = {
  heartClick:PropTypes.string,
  reRenderHeartChange:PropTypes.func,
  jokes:PropTypes.object.isRequired,
}