//import { Component, PropTypes } from '{react}'
import { siteName } from '/common/helpers/utilities'

export default class HeaderBrand extends React.Component {
  /*static propTypes = {
    siteName: PropTypes.string.isRequired
  };*/

	/*getMeteorData() {

	}*/

	componentWillMount() {
		// require('./../styles/header.import.css');
	}

	render() {
    // todo заменить a на Link
		console.log('HeaderBrand rendering');
		return (
			<div className="header item">
				<a href="#"><span>{ siteName() }</span></a>
			</div>
		);
	}
}

HeaderBrand.propTypes = {
  //siteName: PropTypes.string.isRequired
};