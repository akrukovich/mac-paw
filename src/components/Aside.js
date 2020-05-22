import React, {Component} from "react";
import '../styles/Aside.scss'
import FavoriteJokes from "./AsideUtilities/FavoriteJokes";

export default class Aside extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width:window.innerWidth,
    }
  }

  render() {
    return (
      <aside className="aside-container col-lg-4  col-md-7 ml-auto pt-5 pt-lg-2 min-vh-100">
        <div className="favorite-container container">
          <div className="row">
            <div className="favorite-container__list col-12 ">
              {this.props.windowSize > 992?  <div className="favorite-container__name">Favourite</div> : null}
              <FavoriteJokes reRenderFavorHeartChange={this.props.reRenderFavorHeartChange} heartClick={this.props.heartClick}/>
            </div>
          </div>
        </div>
      </aside>
    )
  }
}