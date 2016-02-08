// import { composeWithTracker } from "react-komposer";
import { Component, PropTypes } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
// import { ReactionCore } from "meteor/reactioncommerce:core";
import getMuiTheme from "material-ui/lib/styles/getMuiTheme";
import Snackbar from "material-ui/lib/snackbar";
// import ThemeManager from "material-ui/lib/styles/theme-manager";
// import { LightRawTheme } from "material-ui/src/styles";
import LayoutHeaderContainer from "./LayoutHeaderContainer.jsx";
import LayoutFooter from "../components/footer/LayoutFooter.jsx";
import { styles } from "../styles/coreLayout";
import * as alertActions from "../actions/alert";
// import "../styles/styles.css";

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
    const { alert, children, location } = this.props;
    console.log("CoreLayout rendering...");
    return (
			<div>
        {/*<LayoutHeaderContainer location={ location } />*/}
        <main role="main" style={styles}>
          {children}
        </main>
				<LayoutFooter />
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
};

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

//function composer(props, onData) {
//  const handle = Meteor.subscribe("shops");
//  if (handle.ready()) {
//    //const posts = Posts.find({}, {sort: {_id: 1}}).fetch();
//    onData(null, "asdad");
//  }
//}

//export default composeWithTracker(composer)(CoreLayout);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CoreLayout);
