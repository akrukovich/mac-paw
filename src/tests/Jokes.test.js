import React from 'react';
import {render, unmountComponentAtNode} from 'react-dom';
import {act} from "react-dom/test-utils";
import Jokes, {Joke} from "../components/MainBarUtilities/Jokes";


const $ = require('jquery');
let container = null;


const randomJoke = require('./random.json')
const updatedAt = new Date(randomJoke.updated_at)
const now = new Date()
const hoursAgo = Math.floor(Math.abs((now.getTime() - updatedAt.getTime()) / 3600000))

const devCategoryJoke = require('./category.json')

const queriedJokes = require('./query.json')


beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
  if (!JSON.parse(localStorage.getItem('favoriteJokes'))) {
    const favoriteJokes = [];
    localStorage.setItem('favoriteJokes', JSON.stringify(favoriteJokes))
  }
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});
describe("Jokes tests", () => {

  it("Random jokes test", () => {
    act(() => {
      render(<Jokes jokes={randomJoke}/>, container);
    });
    expect($('li').length).toBe(1);
    expect($('.joke-section__list').length).toBe(1);
  })
  it("Category jokes test", () => {
    act(() => {
      render(<Jokes jokes={devCategoryJoke}/>, container);
    });
    expect($('li').length).toBe(1);
    expect($('.joke-section__list').length).toBe(1);
    expect($('.category').text()).toBe('dev');
  })
  it("queried jokes test", () => {
    act(() => {
      render(<Jokes jokes={queriedJokes}/>, container);
    });
    expect($('li').length).toBe(queriedJokes.result.length);
    expect($('.joke-section__list').length).toBe(1);
  })
})

describe("Joke tests", () => {
  const jokesAmount = () => JSON.parse(localStorage.getItem('favoriteJokes')).length
  it("Random jokes test", () => {
    act(() => {
      render(<Joke joke={randomJoke}/>, container);
    });
    expect($('p').text()).toBe(randomJoke.value);
    expect($('.meta-data__id').text()).toBe(randomJoke.id);
    expect($('.timestamp').text()).toStrictEqual(expect.stringContaining(hoursAgo.toString()));
  })
  it("queried joke test", () => {
    act(() => {
      render(<Joke joke={queriedJokes.result[0]}/>, container);
    });
    expect($('p').text()).toStrictEqual(expect.stringContaining('Cena'));
  })
  it("heartToggle test ", () => {
    const reRenderHeartChange = jest.fn();
    act(() => {
      render(<Joke reRenderHeartChange={reRenderHeartChange} joke={randomJoke}/>, container);
    });

    const heart = $('.heart').children()[0]
    expect(jokesAmount()).toBe(0);

    act(() => {
      heart.dispatchEvent(new MouseEvent("click", {bubbles: true}));
    });
    expect(jokesAmount()).toBe(1);

    act(() => {
      heart.dispatchEvent(new MouseEvent("click", {bubbles: true}));
    });
    expect(jokesAmount()).toBe(0);
  })
})