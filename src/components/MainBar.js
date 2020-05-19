import React, {Component} from "react";
import '../styles/MianBar.scss'
import {FaExternalLinkAlt} from 'react-icons/fa'
import {MdMessage} from 'react-icons/md'
import {BsHeart} from 'react-icons/bs'


class CheckBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: false
    }
    this.toggleState = this.toggleState.bind(this);

  }

  toggleState() {
    this.setState({
      toggle: !this.state.toggle
    });
  }


  render() {
    return (
      <label className="joke_search__label">
        <input className="joke_search__option" value={this.props.value}
               onChange={this.toggleState}
               checked={this.state.toggle} type="radio"/>
        {this.props.option}
      </label>
    );
  }
}

class Categories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: []
    }
  }

  componentDidMount() {
    fetch('https://api.chucknorris.io/jokes/categories')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({categories: data})
      });
  }

  render() {
    const categories = this.state.categories.map(category => <Category activeCategory={this.props.activeCategory}
                                                                       setCategory={this.props.setCategory}
                                                                       name={category}/>)
    return (
      <div className="joke-search__categories">
        {categories}
      </div>
    )

  }
}

function Category({name, setCategory, activeCategory}) {
  const categoryClassName = name === activeCategory
    ? "joke-search__category joke-search__category--active"
    : "joke-search__category"
  return <span onClick={setCategory} className={categoryClassName}>{name}</span>
}

class Joke extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {value, id, url, updated_at, categories} = this.props.joke

    const updatedAt = new Date(updated_at)
    const now = new Date()
    const hoursAgo = Math.floor(Math.abs((now.getTime() - updatedAt.getTime()) / 3600000))

    return (
      <li className="joke-section__item">
        <div className="joke-container container pt-5 pb-5">
          <div className="joke-container__content row ml-5">
            <span className="joke-container__meta meta-data col-12 "><span className="meta-data__text">ID:</span><a
              href={url}><span
              className="meta-data__id">{id}</span><span className="meta-data__icon">
              <FaExternalLinkAlt/></span></a></span>
            <p className="joke-container__joke col-12 ">
              {value}
            </p>
            <span className="joke--container__timestamp col-12">
              Last update: {hoursAgo} hours ago
            </span>
            <span className="category col-3 text-center " style={categories[0] ? {display: "block"} : {display: "none"}}>
              {categories[0]}
            </span>
          </div>
          <span className="joke-container__comment">
            <span> <MdMessage/></span>
          </span>
          <span className="joke-container__heart">
            <span> <BsHeart/></span>
          </span>
        </div>
      </li>
    )
  }
}

class Jokes extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const jokes = this.props.jokes;
    let jokesItems;
    if (jokes.result) {
      jokesItems = jokes.result.map(joke => {
        return <Joke joke={joke}/>
      })
    } else {
      jokesItems = <Joke joke={jokes}/>
    }
    return (
      <ul className="joke-section__list">{jokesItems}</ul>
    );


  }
}

export default class MainBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: "random",
      category: "",
      jokes: null,
      textInput: ''
    }
    this.getJokes = this.getJokes.bind(this)
  }

  async fetchData(queryString) {
    return await fetch('https://api.chucknorris.io/jokes/' + queryString)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        return data
      })
  }

  getJokes() {
    if (this.state.selected === 'random') {
      this.fetchData('random').then(joke => this.setState({jokes: joke}))
    } else if (this.state.selected === 'categories') {
      this.fetchData(`random?category=${this.state.category}`)
        .then(joke => this.setState({jokes: joke}))
    } else {
      this.fetchData(`search?query=${this.state.textInput}`)
        .then(joke => this.setState({jokes: joke}))
    }
  }

  setCategory = e => {
    this.setState({category: e.target.innerText.trim().toLowerCase()})
  };

  toggleState = (e) => {
    this.setState({selected: e.target.value})
  }


  render() {
    return (
      <main>
        <div className="intro">
          <h3 className="intro__label">MSI 2020</h3>
          <div className="intro__burger">burger</div>
        </div>
        <div className="promo">
          <h3 className="promo__heading">Hey!</h3>
          <p className="promo__content">Let’s try to find a joke for you:</p>
        </div>
        <div className="joke-search">
          <label className="joke-search__label">
            <input className="joke-search__option" value="random"
                   checked={this.state.selected === 'random'}
                   onChange={this.toggleState} type="radio"/>
            Random
          </label><br/>
          <label className="joke-search__label">
            <input className="joke-search__option" value="categories"
                   checked={this.state.selected === 'categories'}
                   onChange={this.toggleState} type="radio"/>
            From Categories
          </label><br/>
          {this.state.selected === 'categories' ?
            <Categories activeCategory={this.state.category} setCategory={this.setCategory}/> : null}
          <label className="joke-search__label">
            <input className="joke-search__option" value="search"
                   checked={this.state.selected === 'search'}
                   onChange={this.toggleState} type="radio"/>
            Search
          </label><br/>
          {this.state.selected === 'search' ?
            <input className="joke-search__input" onChange={(event => this.setState({
              textInput: event.target.value.trim()
            }))} placeholder="Free text search"/> : null}
          <button className="joke-search__button" onClick={this.getJokes}>Get a joke</button>
        </div>
        <section className="jokes-section">
          {this.state.jokes ? <Jokes jokes={this.state.jokes}/> : null}
        </section>
      </main>
    );
  }

}