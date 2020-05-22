import React from 'react';
import {render, unmountComponentAtNode} from 'react-dom';
import {act} from "react-dom/test-utils";
import FavoriteJokes, {FavoriteJoke} from "../components/AsideUtilities/FavoriteJokes";

const $ = require('jquery');
let container = null;

jest.useFakeTimers();

const randomJoke = require('./random.json')
let favoriteJoke1;
let favoriteJoke2;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
  if (!JSON.parse(localStorage.getItem('favoriteJokes'))) {
    const favoriteJokes = [];
    favoriteJoke1 = {
      favorite: true,
      hoursAgo: 3315,
      id: "y9m75TZRSrWIKRxOVFuPEg",
      url: "https://api.chucknorris.io/jokes/y9m75TZRSrWIKRxOVFuPEg",
      value: "Chuck Norris smelly breath is so strong that he can demolish a house just by breathing on it."
    }
    favoriteJoke2 = {
      category: "animal",
      favorite: true,
      hoursAgo: 3315,
      id: "zjuwql5ns-mklqumqezlhg",
      url: "https://api.chucknorris.io/jokes/zjuwql5ns-mklqumqezlhg",
      value: "Chuck Norris can skeletize a cow in two minutes."
    }
    favoriteJokes.push(favoriteJoke1)
    favoriteJokes.push(favoriteJoke2)
    localStorage.setItem('favoriteJokes', JSON.stringify(favoriteJokes))
  }
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});
describe("FavoriteJokes tests", () => {

  it("Favorite jokes test with 2 favorite jokes", () => {
    act(() => {
      render(<FavoriteJokes jokes={randomJoke}/>, container);
    });
    expect($('li').length).toBe(2);
    expect($('.category').text()).toBe('animal');
  })
})

describe("FavoriteJoke tests", () => {
  const jokesAmount = () => JSON.parse(localStorage.getItem('favoriteJokes')).length
  it("Random  Favorite jokes test", () => {
    act(() => {
      render(<FavoriteJoke key={1} joke={favoriteJoke1}/>, container);
    });
    expect($('p').text()).toBe(
      'Chuck Norris smelly breath is so strong that he can demolish a house just by breathing on it.'
    );
  })
  it("Category Favorite jokes test", () => {
    act(() => {
      render(<FavoriteJoke key={1} joke={favoriteJoke2}/>, container);
    });
    expect($('.category').text()).toBe(
      'animal'
    );
  })
  it("heartToggle Favorite test ", () => {
    const reRenderFavorHeartChange = jest.fn();
    act(() => {
      render(<FavoriteJoke reRenderFavorHeartChange={reRenderFavorHeartChange} joke={favoriteJoke1}/>, container);
    });

    const favoriteHeart = $('.heart').children()[0]
    expect(jokesAmount()).toBe(2);

    act(() => {
      favoriteHeart.dispatchEvent(new MouseEvent("click", {bubbles: true}));
    });
    act(() => {
      jest.advanceTimersByTime(1000);
    });
      expect(jokesAmount()).toBe(1);
  })
})