import React, { Component, PropTypes } from "react";
import { translate } from "react-i18next/lib";

export default class ProductNotFound extends Component {
  render() {
    // todo add styles here
    return (
      <div className="ui text container not-found">
        <h1 className="ui centered header">404</h1>
        <h2 className="ui centered header">
          <T>warning</T>
          &nbsp;
          <small><T>unauthorizedMessage</T></small>
        </h2>
      </div>
    );
  }
}
