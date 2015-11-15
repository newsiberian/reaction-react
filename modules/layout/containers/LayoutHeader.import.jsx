//import { Component } from '{react}'
// import ReactMixin from 'react-mixin'
// import ReactMixin from '/myPackages/react-mixin'
//import ReactMeteorData from 'react-meteor-data'
// import { ReactMeteorData } from '{react-meteor-data}!exports'
import { AutorunMixin, SubscriptionMixin } from '{universe:utilities-react}'
// import Radium from 'radium';
import Radium from '/myPackages/radium'
import { styles } from './../styles/layoutHeader'
import HeaderBrand from './../components/header/HeaderBrand'
import UserMenu from './../components/header/UserMenu'

// @Radium
// @ReactMixin.decorate(ReactMeteorData)
// @ReactMixin.decorate(SubscriptionMixin)
// @ReactMixin.decorate(AutorunMixin)
// export default class LayoutHeader extends React.Component {
let LayoutHeader = React.createClass({
  displayName: 'LayoutHeader',
  mixins: [SubscriptionMixin, AutorunMixin],
  //constructor(props) {
  //  super(props);
  //  this.state = { languages: {} };
  //}
  getInitialState() {
    return {
      languages: []
    };
  },
	//getMeteorData() {
	//	return {}
	//}
  autorunLanguages() {
    let languages = [];
    // this.subscribe('Shops');
    // subscription to 'Shops' moved to ProductsMain container
    // todo Придумать что-нибудь по этому моменту. Подписываемся в другом
    // контроллере, тут нужно знать подписаны ли мы.
    if (this.subscriptionReady('Shops')) {
      let shop = ReactionCore.Collections.Shops.findOne();
      if (shop !== null ? shop.languages : void 0) {
        for (let language of shop.languages) {
          if (language.enabled === true) {
            language.translation = 'languages.' + language.label.toLowercase;
            languages.push(language);
          }
        }
        this.setState({ languages: languages });
        // return languages;
      }
    }
  },

	componentWillMount() {
		//require('./../../styles/header.import.css');
	},

	render() {
		/*<div className="four wide column">
		 <HeaderBrand />
		 </div>
		 <div className="eight wide column"></div>
		 <div className="four wide column">
		 <UserMenu />
		 </div>*/
		/*className="ui grid"*/
		return (
			<header className="ui text menu" style={ styles }>
				<HeaderBrand />
				<UserMenu languages={ this.state.languages } />
			</header>
		);
	}
});

// LayoutHeader = Radium(LayoutHeader);
export default Radium(LayoutHeader);
// export default LayoutHeader;

//LayoutHeader.propTypes = {
//  //children: PropTypes.string.isRequired
//};

// TODO второй вариант хедера -- через меню.

/*<div className="ui text menu">
 <div className="item">
 <HeaderBrand />
 </div>
 <div className="ui right menu">
 <div className="item">
 <UserMenu />
 </div>
 </div>
 </div>*/