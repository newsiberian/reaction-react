// import { Component } from '{react}'
import ReactMixin from '/myPackages/react-mixin'
import Radium from '/myPackages/radium'
import { styles } from '../../styles/productDetailSide'

const { Component, PropTypes } = React;

@Radium
export default class ProductDetailSide extends Component {
	render() {
    console.log('ProductDetailSide: rendering...');
		return (
			// class="container-main"
			<div></div>
		);
	}
}
