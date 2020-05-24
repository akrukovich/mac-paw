import React, { Component, Suspense, Fragment } from "react";
import "../styles/MainBar.scss";
import Categories from "./MainBarUtilities/Categories";
import PropTypes from "prop-types";
const Jokes = React.lazy(() => import("./MainBarUtilities/Jokes"));

const StaticHeadPart = () => {
  return (
    <Fragment>
      <div className="intro col-12">
        <h3 className="intro__label">MSI 2020</h3>
      </div>
      <div className="promo col-12">
        <h3 className="promo__heading">Hey!</h3>
        <p className="promo__content">Let’s try to find a joke for you:</p>
      </div>
    </Fragment>
  );
};

const Loader = () => (
  <div className="col-3 col-lg-1 mx-auto ">
    <div className="lds-heart">
      <div />
    </div>
  </div>
);

const SelectOption = ({
  value,
  current,
  currentCategory,
  label,
  clickOnOption,
  setCategory,
}) => (
  <Fragment>
    <label className="joke-search__label">
      <input
        className="joke-search__option mr-2"
        value={value}
        checked={current === value}
        onChange={(e) => clickOnOption(e)}
        type="radio"
      />
      {label}
    </label>
    <br />
    {current === "categories" && value === "categories" && (
      <Categories activeCategory={currentCategory} setCategory={setCategory} />
    )}
  </Fragment>
);

const SearchInput = ({ inputChange }) => (
  <input
    className="joke-search__input w-100 p-1 mb-1"
    onChange={(e) => inputChange(e.target.value.trim())}
    placeholder="Free text search"
  />
);

const Button = ({ buttonText, clickHandler }) => (
  <button className="joke-search__button" onClick={() => clickHandler()}>
    {buttonText}
  </button>
);

export default class MainBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: "random",
      category: "",
      jokes: null,
      textInput: "",
    };
    this.getJokes = this.getJokes.bind(this);
  }

  async fetchData(queryString) {
    const host = "https://api.chucknorris.io/jokes/";
    return await fetch(host + queryString)
      .then((response) => response.json())
      .then((data) => data);
  }

  parseCategoryOption = () => {
    if (!this.state.category) {
      alert("Please, set a category !");
      return;
    }
    this.fetchData(`random?category=${this.state.category}`)
      .then((joke) => this.setState({ jokes: joke }))
      .catch((e) => alert(e));
  };
  parseSearchOption = () => {
    if (this.state.textInput.length < 3) {
      alert("Please,Enter at least 3 characters !");
      return;
    }
    this.fetchData(`search?query=${this.state.textInput}`)
      .then((jokes) => {
        this.setState({ jokes: jokes });
        if (!jokes.total) {
          alert(`Found ${jokes.total} jokes !`);
        }
      })
      .catch((e) => alert(e));
  };

  inputChange = (value) => {
    this.setState({
      textInput: value,
    });
  };

  getJokes() {
    const selection = this.state.selected;
    selection === "random" &&
      this.fetchData(this.state.selected).then((joke) =>
        this.setState({ jokes: joke })
      );
    selection === "categories" && this.parseCategoryOption();
    selection === "search" && this.parseSearchOption();
  }

  setCategory = (e) => {
    this.setState({ category: e.target.innerText.trim().toLowerCase() });
  };

  toggleRadioButton = (e) => {
    this.setState({ selected: e.target.value });
  };

  render() {
    const radioButtonsProperties = [
      {
        value: "random",
        label: "Random",
      },
      {
        value: "categories",
        label: "From Categories",
      },
      {
        value: "search",
        label: "Search",
      },
    ];

    const RadioButtons = radioButtonsProperties.map((btnPropProperties, i) => {
      return (
        <SelectOption
          key={i}
          value={btnPropProperties.value}
          label={btnPropProperties.label}
          current={this.state.selected}
          clickOnOption={this.toggleRadioButton}
          setCategory={this.setCategory}
          currentCategory={this.state.category}
        />
      );
    });

    return (
      <main className="main-bar col-12 col-lg-8 p-3 h-100">
        <StaticHeadPart />
        <div className="joke-search col-12">
          {RadioButtons}
          {this.state.selected === "search" && (
            <SearchInput inputChange={this.inputChange} />
          )}
          <Button buttonText="Get a joke" clickHandler={this.getJokes} />
        </div>
        {this.state.jokes && (
          <Suspense fallback={<Loader />}>
            <section className="jokes-section col-12">
              <Jokes
                heartClick={this.props.heartClick}
                reRenderHeartChange={this.props.reRenderHeartChange}
                jokes={this.state.jokes}
              />
            </section>
          </Suspense>
        )}
      </main>
    );
  }
}
MainBar.propTypes = {
  heartClick: PropTypes.string,
  reRenderHeartChange: PropTypes.func,
};
Button.propTypes = {
  buttonText: PropTypes.string.isRequired,
  clickHandler: PropTypes.func.isRequired,
};
SearchInput.propTypes = {
  inputChange: PropTypes.func.isRequired,
};

SelectOption.propTypes = {
  value: PropTypes.string.isRequired,
  current: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  clickOnOption: PropTypes.func.isRequired,
  currentCategory: PropTypes.string,
  setCategory: PropTypes.func,
};
