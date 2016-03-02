import { composeWithTracker } from "react-komposer";
import React, { Component, PropTypes } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import getMuiTheme from "material-ui/lib/styles/getMuiTheme";
import Snackbar from "material-ui/lib/snackbar";
import LinearProgress from "material-ui/lib/linear-progress";
import { ReactionCore } from "meteor/reactioncommerce:core";
// import ThemeManager from "material-ui/lib/styles/theme-manager";
// import { LightRawTheme } from "material-ui/src/styles";
import LayoutHeaderContainer from "./LayoutHeaderContainer.jsx";
import LayoutFooter from "../components/footer/LayoutFooter.jsx";
import AdminControlsBarContainer from "./AdminControlsBarContainer.jsx";
import { styles } from "../styles/coreLayout";
import * as alertActions from "../actions/alert";
import "../styles/styles.css";

/**
 *
 */
function modifyRawTheme(muiTheme, newFontFamily) {
  const {
    baseTheme,
    rawTheme,
    // add components you want recomputed here...
    ...other
    } = muiTheme;

  const newMuiTheme = getMuiTheme({
    ...baseTheme,
    fontFamily: newFontFamily
  });

  return {
    ...newMuiTheme,
    ...other
  };
}

class CoreLayout extends Component {
  constructor(props) {
    super(props);
    this.handleAlertClose = this.handleAlertClose.bind(this);
  }
  static get childContextTypes() {
    return {
      muiTheme: React.PropTypes.object
    };
  }

  getChildContext() {
    return {
      muiTheme: modifyRawTheme({}, "Open Sans")
    };
  }

  handleAlertClose() {
    this.props.alertActions.closeAlert();
  };

  render() {
    const { alert, cart, children } = this.props;
    return (
			<div style={styles.wrapper}>
        <div style={styles.container}>
          <LayoutHeaderContainer cart={cart} location={location} />
          <main role="main" style={styles.main}>
            {children}
          </main>
          <LayoutFooter />
        </div>
        {ReactionCore.hasDashboardAccess() && <AdminControlsBarContainer />}
        <Snackbar
          open={alert.open}
          message={alert.message}
          //action="undo"
          autoHideDuration={alert.autoHideDuration}
          //onActionTouchTap={this.handleActionTouchTap}
          onRequestClose={this.handleAlertClose}
        />
			</div>
		);
  }
}

//const CoreLayout = (props) => {
//  const { children, location } = props;
//  console.log("CoreLayout rendering...");
//  return (
//    <div>
//      {/*<LayoutHeaderContainer location={ location } />*/}
//      <main role="main" style={styles}>
//        {children}
//      </main>
//      <LayoutFooter />
//    </div>
//  );
//};

CoreLayout.propTypes = {
  alertActions: PropTypes.shape({
    displayAlert: PropTypes.func,
    closeAlert: PropTypes.func
  }).isRequired,
  alert: PropTypes.object,
  cart: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    items: PropTypes.array
  }),
  children: PropTypes.node,
  location: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    alert: state.layout.alert
  };
}

function mapDispatchToProps(dispatch) {
  return {
    alertActions: bindActionCreators(alertActions, dispatch)
  };
}

function composer(props, onData) {
  // fixme we already subscribe to cart within reaction-collections package
  //// @see http://guide.meteor.com/data-loading.html#changing-arguments
  //Tracker.autorun(() => {
  //  let sessionId;
  //  // we really don't need to track the sessionId here
  //  Tracker.nonreactive(() => {
  //    sessionId = Session.get("sessionId");
  //  });
  //  ReactionCore.Subscriptions.Cart = Meteor.subscribe("Cart",
  //    sessionId,
  //    Meteor.userId()
  //  );
  //});
  if (ReactionCore.Subscriptions.Cart.ready()) {
    // TODO maybe this is too much to transfer cart.items to cart conteiner from
    // here? maybe we need to run another composer from there?
    const cart = ReactionCore.Collections.Cart.findOne({},
      { fields: { items: 1 } });
    onData(null, { cart: cart });
  }
}

const loading = () => <LinearProgress mode="indeterminate" />;
const coreLayoutSubscribed = composeWithTracker(
  composer,
  loading
)(CoreLayout);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(coreLayoutSubscribed);
