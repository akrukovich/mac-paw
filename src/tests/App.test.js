import React from 'react';
import {render, unmountComponentAtNode} from 'react-dom';
import {act} from "react-dom/test-utils";
import App from "../components/App";

const $ = require('jquery');

let container = null;
jest.useFakeTimers();


beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});
describe("App.js tests", () => {

  it("components existence", () => {
    act(() => {
      render(<App/>, container);
    });
    expect($('main').length).toBe(1);
    expect($('aside').length).toBe(1);
  })

  it("resize view tests", () => {
    const mobileWidth = 480
    const tabletWidth = 768
    const desktopWidth = 1920
    act(() => {
      render(<App/>, container);
    })
    global.innerWidth = mobileWidth;
    global.dispatchEvent(new Event('resize'));
    expect($('aside').css('display')).toBe('none');

    global.innerWidth = tabletWidth;
    global.dispatchEvent(new Event('resize'));
    expect($('aside').css('display')).toBe('none');

    global.innerWidth = desktopWidth;
    global.dispatchEvent(new Event('resize'));
    expect($('aside').css('display')).toBe('block');
  })

  it("toggle icon", () => {
    act(() => {
      render(<App/>, container);
    })
    const tableWidth = 768
    const desktopWidth = 1920

    global.innerWidth = tableWidth;
    global.dispatchEvent(new Event('resize'));
    act(() => {
      jest.advanceTimersByTime(1000);
    });

    const icon = $('.toggle-container__icon')[0]
    expect($('.overlay')[0].classList.contains('overlay--active')).toBe(false);

    act(() => {
      icon.dispatchEvent(new MouseEvent("click", {bubbles: true}));
    });
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect($('.overlay')[0].classList.contains('overlay--active')).toBe(true);

    act(() => {
      icon.dispatchEvent(new MouseEvent("click", {bubbles: true}));
    });
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect($('.overlay')[0].classList.contains('overlay--active')).toBe(false);

    global.innerWidth = desktopWidth;
    global.dispatchEvent(new Event('resize'));
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect($('.toggle-container__icon')[0]).toBe(undefined);

  })

})