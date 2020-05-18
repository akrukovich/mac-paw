import React, {Component} from "react";
import '../styles/MianBar.scss'
import divWithClassName from "react-bootstrap/cjs/divWithClassName";


class CheckBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked:false
    }
  }

  render() {
    return (
      <label className="joke_search__label">
        <input className="joke_search__option" type="radio" checked={this.state.checked}  />
        {this.props.option}
      </label>
    );
  }
}

class Categories extends Component{
  constructor(props) {
    super(props);
    this.state = {
      categories : []
    }
  }
  componentDidMount() {
    fetch('https://api.chucknorris.io/jokes/categories')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({categories:data})
      });
  }

  render() {
    const categories = this.state.categories
    return (
      categories.map(category=> <Category name={category}/>)
    )

  }
}
function Category({name}) {
  return <div>{name}</div>
}

export default class MainBar extends Component {

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
        <CheckBox option="Random"/><br/>
        <CheckBox option="From categories"/><br/>
        <CheckBox option="Search"/>
        {/*<Categories/>*/}
        <button className="joke_search__button">Get a joke</button>
        </div>
      </main>
    );
  }

}