import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import MainBar from "../components/MainBar";

const $ = require("jquery");

jest.useFakeTimers();

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

describe("MainBar tests", () => {
  it("static components test", () => {
    act(() => {
      render(<MainBar />, container);
    });
    expect($("input").length).toBe(3);
    expect($("button").length).toBe(1);
    expect($(".main-bar").length).toBe(1);
  });
  it("click on radio buttons", () => {
    const windowOpenSpy = jest.spyOn(window, "alert");
    act(() => {
      render(<MainBar />, container);
    });
    expect($("input").attr("checked")).toBe("checked");

    const search = document.getElementsByTagName("input")[2];
    const button = document.getElementsByTagName("button")[0];
    act(() => {
      search.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect($(".joke-search__input").length).toBe(1);
    act(() => {
      button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(windowOpenSpy).toHaveBeenCalledTimes(1);
  });
  it("click on get Joke button", () => {
    const windowOpenSpy = jest.spyOn(window, "alert");
    act(() => {
      render(<MainBar />, container);
    });
    const random = document.getElementsByTagName("input")[0];
    const category = document.getElementsByTagName("input")[1];
    const search = document.getElementsByTagName("input")[2];
    const button = document.getElementsByTagName("button")[0];

    act(() => {
      random.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    act(() => {
      button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(windowOpenSpy).toHaveBeenCalledTimes(1);

    act(() => {
      category.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    act(() => {
      button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(windowOpenSpy).toHaveBeenCalledTimes(2);

    act(() => {
      search.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    act(() => {
      button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(windowOpenSpy).toHaveBeenCalledTimes(3);

    const textInput = document.getElementsByTagName("input")[3];
    textInput.value = "John Cena";
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    act(() => {
      button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(windowOpenSpy).toHaveBeenCalledTimes(4);
  });
});
