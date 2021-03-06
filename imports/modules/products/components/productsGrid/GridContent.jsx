import React, { Component, PropTypes } from "react";
import { styles } from "../../styles/gridContent";
import { Link } from "react-router";

export default class GridContent extends Component {
  render() {
    const { handle, title, price } = this.props;
    // todo добавить i18n для цены
    // todo добавить href
    // todo prevent to rerendering from GridControl changes?
    console.log("GridContent rendering...");
    //<a href={ FlowRouter.path("product", { _id: this.props._id }) }>
    //  <div className="header">{ this.props.title }</div>
    //  <div className="header">{ this.props.displayPrice() }</div>
    //</a>
    return (
      <div/* className="center aligned content"*/>
        <Link to={`/shop/product/${handle}`}>
          <div>{title}</div>
          <div>{price}</div>
        </Link>
      </div>
    );
  }
}

GridContent.propTypes = {
  // todo add handle for lin
  handle: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};
