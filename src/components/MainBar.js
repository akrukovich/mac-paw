import React, {Component} from "react";
import '../styles/MianBar.scss'
import Categories from "./MainBarUtilities/Categories";
import Jokes from "./MainBarUtilities/Jokes";

export default class MainBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: window.innerWidth,
      selected: "random",
      category: "",
      jokes: null,
      textInput: ''
    }
    this.getJokes = this.getJokes.bind(this)
  }

  async fetchData(queryString) {
    return await fetch('https://api.chucknorris.io/jokes/' + queryString)
      .then((response) => response.json())
      .then((data) => data)
  }

  parseCategoryOption = () => {
    if (!this.state.category) {
      alert('Please, set a category !')
      return null
    }
    this.fetchData(`random?category=${this.state.category}`)
      .then(joke => this.setState({jokes: joke})).catch((e) => alert(e))
  }
  parseSearchOption = () => {
    if (this.state.textInput.length < 3) {
      alert('Please,Enter at least 3 characters !')
      return null
    }
    this.fetchData(`search?query=${this.state.textInput}`)
      .then(jokes => {
        this.setState({jokes: jokes})
        if (!jokes.total) {
          alert(`Found ${jokes.total} jokes !`)
        }
      })
  }

  getJokes() {
    if (this.state.selected === 'random') {
      this.fetchData('random').then(joke => this.setState({jokes: joke}))
    } else if (this.state.selected === 'categories') {
      this.parseCategoryOption()
    } else {
      this.parseSearchOption()
    }
  }

  setCategory = e => {
    this.setState({category: e.target.innerText.trim().toLowerCase()})
  };

  toggleState = e => {
    this.setState({selected: e.target.value})
  }

  componentDidMount() {
    if (!JSON.parse(localStorage.getItem('favoriteJokes'))) {
      const favoriteJokes = [];
      localStorage.setItem('favoriteJokes', JSON.stringify(favoriteJokes))
    }
  }

  render() {
    return (
      <main className="main-bar col-12 col-lg-8 p-3 h-100">
        <div className="intro col-12">
          <h3 className="intro__label">MSI 2020</h3>
        </div>
        <div className="promo col-12">
          <h3 className="promo__heading">Hey!</h3>
          <p className="promo__content">Let’s try to find a joke for you:</p>
        </div>
        <div className="joke-search col-12">
          <label className="joke-search__label">
            <input className="joke-search__option mr-2" value="random"
                   checked={this.state.selected === 'random'}
                   onChange={this.toggleState} type="radio"/>
            Random
          </label><br/>
          <label className="joke-search__label">
            <input className="joke-search__option mr-2" value="categories"
                   checked={this.state.selected === 'categories'}
                   onChange={this.toggleState} type="radio"/>
            From Categories
          </label><br/>
          {this.state.selected === 'categories'
            ? <Categories activeCategory={this.state.category} setCategory={this.setCategory}/>
            : null
          }
          <label className="joke-search__label">
            <input className="joke-search__option mr-2" value="search"
                   checked={this.state.selected === 'search'}
                   onChange={this.toggleState} type="radio"/>
            Search
          </label><br/>
          {this.state.selected === 'search' ?
            <input className="joke-search__input w-100 p-1 mb-1" onChange={
              (event => this.setState({
                textInput: event.target.value.trim()
              }))
            } placeholder="Free text search"/> : null}
          <button className="joke-search__button" onClick={this.getJokes}>Get a joke</button>
        </div>
        <section className="jokes-section col-12">
          {this.state.jokes
            ? <Jokes reRenderHeartChange={this.props.reRenderHeartChange} jokes={this.state.jokes}/>
            : null
          }
        </section>
      </main>
    );
  }
}