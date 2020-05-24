import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import Aside from "../components/Aside";

const $ = require("jquery");

let container = null;
beforeEach(() => {
  if (!JSON.parse(localStorage.getItem("favoriteJokes"))) {
    const favoriteJokes = [];
    localStorage.setItem("favoriteJokes", JSON.stringify(favoriteJokes));
  }
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

describe("Aside tests", () => {
  const mobileSize = 480;
  const tabletSize = 768;
  const desktopSize = 1024;
  it("Test mobile size", () => {
    act(() => {
      render(<Aside windowSize={mobileSize} />, container);
    });
    expect($(".favorite-container__name").text()).toBe("");
  });
  it("Test table size", () => {
    act(() => {
      render(<Aside windowSize={tabletSize} />, container);
    });
    expect($(".favorite-container__name").text()).toBe("");
  });
  it("Test desktop size", () => {
    act(() => {
      render(<Aside windowSize={desktopSize} />, container);
    });
    expect($(".favorite-container__name").text()).toBe("Favourite");
  });
});
