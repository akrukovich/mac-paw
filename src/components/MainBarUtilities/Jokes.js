import React, { Component } from "react";
import PropTypes from "prop-types";
import { FaExternalLinkAlt } from "react-icons/fa";
import { MdMessage } from "react-icons/md";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import "../../styles/Jokes.scss";

export class Joke extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favorite: false,
      jokeData: {
        value: "",
        url: "",
        id: "",
        updatedAt: "",
        category: "",
      },
    };
  }

  getFromStorage = () => JSON.parse(localStorage.getItem("favoriteJokes"));
  setStorage = (list) =>
    localStorage.setItem("favoriteJokes", JSON.stringify(list));

  saveJoke(jokeId) {
    const tmpJokes = this.getFromStorage();
    const isSaved = tmpJokes.filter((joke) => joke.id === jokeId).length;
    const { value, url, id, updatedAt, category } = this.state.jokeData;
    if (!isSaved) {
      tmpJokes.push({
        value: value,
        url: url,
        id: id,
        updatedAt: updatedAt,
        category: category,
        favorite: true,
      });
    }
    this.setStorage(tmpJokes);
  }

  deleteJoke(id) {
    const tmpJokes = this.getFromStorage();
    const newJokeList = tmpJokes.filter((joke) => joke.id !== id);
    this.setStorage(newJokeList);
  }

  heartToggle = () => {
    this.setState({ favorite: this.state.favorite });
    if (!this.state.favorite) {
      this.saveJoke(this.state.jokeData.id);
    } else {
      this.deleteJoke(this.state.jokeData.id);
    }
    this.props.reRenderHeartChange();
  };

  static getDerivedStateFromProps(props) {
    const { value, id, url, updated_at: updatedAtStr, categories } = props.joke;
    const category = categories[0];
    const updatedAt = new Date(updatedAtStr);
    const tmpJokes = JSON.parse(localStorage.getItem("favoriteJokes"));
    const isFavorite = tmpJokes.filter((joke) => joke.id === id).length;
    return {
      favorite: isFavorite,
      jokeData: {
        value: value,
        url: url,
        id: id,
        updatedAt: updatedAt,
        category: category,
      },
    };
  }

  render() {
    const { value, id, url, updatedAt, category } = this.state.jokeData;
    const now = new Date();
    const hoursAgo = Math.floor(
      Math.abs((now.getTime() - updatedAt.getTime()) / 3600000)
    );
    return (
      <li className="joke-section__item">
        <div className="joke-container container pt-5 pb-2 ml-0">
          <div className="joke-container__content row justify-content-md-between ml-5">
            <span className="joke-container__meta meta-data col-12 ">
              <span className="meta-data__text">ID:</span>
              <a href={url}>
                <span className="meta-data__id">{id}</span>
                <span className="meta-data__icon">
                  <FaExternalLinkAlt />
                </span>
              </a>
            </span>
            <p className="joke-container__joke col-12 ">{value}</p>
            <span className="joke-container__timestamp timestamp my-auto col-12 col-md-auto ">
              Last update: {hoursAgo} hours ago
            </span>
            <span
              className="joke-container__category category  col-auto ml-2 px-2 py-1 mt-2 ml-md-0 mr-md-3 "
              style={category ? { display: "block" } : { display: "none" }}
            >
              {category}
            </span>
          </div>
          <span className="joke-container__comment comment">
            <span>
              {" "}
              <MdMessage />
            </span>
          </span>
          <span className="joke-container__heart heart">
            <span onClick={this.heartToggle}>
              {this.state.favorite ? <BsHeartFill /> : <BsHeart />}
            </span>
          </span>
        </div>
      </li>
    );
  }
}

export default class Jokes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jokes: {},
      reRenderOnClick: "",
    };
  }

  static getDerivedStateFromProps({ heartClick, jokes }) {
    return {
      reRenderOnClick: heartClick,
      jokes: jokes,
    };
  }

  render() {
    const jokes = this.state.jokes;
    let jokesItems;
    if (jokes.result) {
      jokesItems = jokes.result.map((joke) => {
        return (
          <Joke
            key={joke.id}
            joke={joke}
            reRenderHeartChange={this.props.reRenderHeartChange}
          />
        );
      });
    } else {
      jokesItems = (
        <Joke
          key={jokes.id}
          joke={jokes}
          reRenderHeartChange={this.props.reRenderHeartChange}
        />
      );
    }
    return <ul className="joke-section__list">{jokesItems}</ul>;
  }
}

Joke.propTypes = {
  joke: PropTypes.shape({
    categories: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    updated_at: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  }),
  reRenderHeartChange: PropTypes.func,
};
Jokes.propTypes = {
  heartClick: PropTypes.string,
  reRenderHeartChange: PropTypes.func,
  jokes: PropTypes.object.isRequired,
};
