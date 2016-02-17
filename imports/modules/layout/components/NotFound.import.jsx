// import { _i18n } from "meteor/universe:i18n";

// const T = _i18n.createComponent();

export default class NotFound extends React.Component {
	render() {
    // todo i18n needed
    // <h1>Oops!<small> Page not found.</small></h1>
		return (
			<div className="ui text container not-found">
				<h1 className="ui centered header">404</h1>
				<h2 className="ui centered header">{/*<T>common.pageNotFound</T>*/}</h2>
			</div>
		);
	}
}