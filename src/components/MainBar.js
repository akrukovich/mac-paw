import React, {Component} from "react";
import '../styles/MianBar.scss'
import divWithClassName from "react-bootstrap/cjs/divWithClassName";


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
    const categories = this.state.categories.map(category => <Category name={category}/>)
    return (
      <div className="joke-search__categories">
        {categories}
      </div>
    )

  }
}

function Category({name}) {
  return <span className='joke-search__category'>{name}</span>
}

class Jokes extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const jokes = this.props.jokes;
    // console.log(typeof jokes.result)
    // const jokesItems = jokes.result.map((joke) =>
    //   <li>{joke.value}</li>
    // );
    return (
      <ul>jokesItems</ul>
    );


  }
}

export default class MainBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: "",
      category: "",
      jokes: null,
    }
    this.getJokes = this.getJokes.bind(this)
  }

  async fetchData(r) {
    return await fetch('https://api.chucknorris.io/jokes/random')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        return data
      })
  }

  getJokes() {
    if (this.state.selected === 'random') {
      this.fetchData('random').then(joke => {
        this.setState({jokes: joke}
        )
      })

    }
  }

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
          {this.state.selected === 'categories' ? <Categories/> : null}
          <label className="joke-search__label">
            <input className="joke-search__option" value="search"
                   checked={this.state.selected === 'search'}
                   onChange={this.toggleState} type="radio"/>
            Search
          </label><br/>
          {this.state.selected === 'search' ? <input type="text"/> : null}
          <button className="joke_search__button" onClick={this.getJokes}>Get a joke</button>
        </div>
        <section className="jokes-section">
          {this.state.jokes? <Jokes jokes={this.state.jokes}/> : null}
        </section>
      </main>
    );
  }

}