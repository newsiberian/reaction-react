// import { Component } from '{react}';
// import ReactMixin from 'react-mixin';
// import ReactMeteorData from 'react-meteor-data';
// import Radium from 'radium';
import ReactMixin from '/myPackages/react-mixin'
import { ReactMeteorData } from '{react-meteor-data}!exports'
import Radium from '/myPackages/radium'
import { styles } from './../../styles/layoutFooter';

@Radium
@ReactMixin.decorate(ReactMeteorData)
export default class LayoutFooter extends React.Component {
	getMeteorData() {
		return {}
	}

	componentWillMount() {
		// require('./../../styles/footer.import.css');
	}

	render() {
		return (
			<footer style={ styles }>

			</footer>
		);
	}
}