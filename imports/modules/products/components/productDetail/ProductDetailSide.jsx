// import { Component } from '{react}'
import ReactMixin from '/myPackages/react-mixin'
import Radium from '/myPackages/radium'
import { styles } from '../../styles/productDetailSide'

import React, { Component, PropTypes } from "react";

// TODO babel @deco not supported in 1.3
// @Radium
export default class ProductDetailSide extends Component {
	render() {
    console.log('ProductDetailSide: rendering...');
		return (
			// class="container-main"
			<div></div>
		);
	}
}
