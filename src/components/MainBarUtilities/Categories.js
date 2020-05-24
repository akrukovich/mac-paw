import React, { Component } from "react";
import PropTypes from "prop-types";

export default class Categories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
    };
  }

  componentDidMount() {
    fetch("https://api.chucknorris.io/jokes/categories")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ categories: data });
      });
  }

  render() {
    const categories = this.state.categories.map((category, i) => (
      <Category
        key={i}
        activeCategory={this.props.activeCategory}
        setCategory={this.props.setCategory}
        name={category}
      />
    ));
    return <div className="joke-search__categories">{categories}</div>;
  }
}

export function Category({ name, setCategory, activeCategory }) {
  const categoryClassPart = "joke-search__category category";
  const categoryClassName =
    name === activeCategory
      ? categoryClassPart + " joke-search__category--active"
      : categoryClassPart;

  return (
    <span onClick={setCategory} className={categoryClassName}>
      {name}
    </span>
  );
}

Category.propTypes = {
  name: PropTypes.string.isRequired,
  activeCategory: PropTypes.string,
  setCategory: PropTypes.func.isRequired,
};
Categories.propTypes = {
  activeCategory: PropTypes.string,
  setCategory: PropTypes.func.isRequired,
};
