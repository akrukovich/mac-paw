import React, { Component } from "react";
import "../styles/Aside.scss";
import FavoriteJokes from "./AsideUtilities/FavoriteJokes";
import PropTypes from "prop-types";

export default class Aside extends Component {
  render() {
    return (
      <aside className="aside-container col-lg-4  col-md-7 ml-auto pt-5 pt-lg-2 min-vh-100">
        <div className="favorite-container container">
          <div className="row">
            <div className="favorite-container__list col-12 ">
              {this.props.windowSize > 992 && (
                <div className="favorite-container__name">Favourite</div>
              )}
              <FavoriteJokes
                reRenderFavorHeartChange={this.props.reRenderFavorHeartChange}
                heartClick={this.props.heartClick}
              />
            </div>
          </div>
        </div>
      </aside>
    );
  }
}
Aside.propTypes = {
  heartClick: PropTypes.string,
  reRenderFavorHeartChange: PropTypes.func,
  windowSize: PropTypes.number.isRequired,
};
