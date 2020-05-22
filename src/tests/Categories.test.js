import React from "react";
import {render, unmountComponentAtNode} from "react-dom";
import {act} from "react-dom/test-utils";
import Categories, {Category} from "../components/MainBarUtilities/Categories";

const $ = require('jquery');

let container = null;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

describe("Category tests", () => {
  const name = "animal"
  const activeCategory = "sport"
  it("name not equal activeCategory", () => {
    act(() => {
      render(<Category activeCategory={name}
                       name={name}/>, container);
    });
    expect(container.textContent).toBe("animal");
    expect(container.firstChild.classList.contains('joke-search__category--active')).toBe(true);
  });
  it("name equal activeCategory", () => {
    act(() => {
      render(<Category activeCategory={activeCategory}
                       name={name}/>, container);
    });
    expect(container.textContent).toBe("animal");
    expect(container.firstChild.classList.contains('joke-search__category--active')).toBe(false);
  });
})

describe("Categories tests", () => {
  const activeCategory = "animal"
  const fetchedCategories = ["animal", "career", "celebrity", "dev", "explicit", "fashion", "food", "history"]
  function mockFetch (){
    jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(fetchedCategories)
      })
    );
    fetchedCategories.map((category, i) => <Category key={i}
                                                     activeCategory={activeCategory}
                                                     name={category}/>)
  }
  it("Fetching api data mock up with active category", async () => {
    mockFetch()
    await act(async () => {
      render(<Categories activeCategory={activeCategory}/>, container);
    });
    expect($('.category').length).toBe(8);
    expect($('.joke-search__category--active').length).toBe(1);
    global.fetch.mockRestore();
  });
  it("Fetching api data mock up without active category", async () => {
    mockFetch()
    await act(async () => {
      render(<Categories/>, container);
    });
    expect($('.category').length).toBe(8);
    expect($('.joke-search__category--active').length).toBe(0);
    global.fetch.mockRestore();
  });
})