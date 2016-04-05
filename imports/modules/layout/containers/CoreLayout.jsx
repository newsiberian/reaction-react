import { composeWithTracker } from "react-komposer";
import React, { Component, PropTypes } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import getMuiTheme from "material-ui/lib/styles/getMuiTheme";
import LeftNav from "material-ui/lib/left-nav";
import Snackbar from "material-ui/lib/snackbar";
import { Meteor } from "meteor/meteor";
import { ReactionCore } from "meteor/reactioncommerce:core";
// import ThemeManager from "material-ui/lib/styles/theme-manager";
// import { LightRawTheme } from "material-ui/src/styles";
import Loading from "../components/Loading.jsx";
import LayoutHeaderContainer from "./LayoutHeaderContainer.jsx";
import LayoutFooter from "../components/footer/LayoutFooter.jsx";
import AdminControlsBarContainer from "./AdminControlsBarContainer.jsx";
import * as alertActions from "../actions/alert";
import * as settingsActions from "../actions/settings";
import * as localeActions from "../actions/locale";
import { styles } from "../styles/coreLayout";
import { layoutStyles } from "../styles/layout";
import "../styles/styles.css";
import "../styles/flexboxgrid.css";

// thanks to: https://gist.github.com/SachaG/8684ab46c5ea3dbe860e
const components = {};
components.registerComponent = (name, component) => (components[name] = component);
components.getComponent = (name) =>  components[name];

// there is a bug with it. I'm using receipt from here:
// https://github.com/tajo/react-portal/issues/24
components.registerComponent(
  "AccountsAddMemberContainer",
  require("../../dashboard/containers/AccountsAddMemberContainer.js").default
);
components.registerComponent(
  "AccountsPermissionsContainer",
  require("../../dashboard/containers/AccountsPermissionsContainer.js").default
);
components.registerComponent(
  "AccountsSettingsContainer",
  require("../../dashboard/containers/AccountsSettingsContainer.jsx").default
);
components.registerComponent(
  "ShopSettingsContainer",
  require("../../dashboard/containers/ShopSettingsContainer.js").default
);
components.registerComponent(
  "I18nSettingsContainer",
  require("../../dashboard/containers/I18nSettingsContainer.js").default
);
components.registerComponent(
  "ProductsSettingsContainer",
  require("../../products/containers/ProductsSettingsContainer.js").default
);
components.registerComponent(
  "CommentsSettingsContainer",
  require("../../dashboard/containers/CommentsSettingsContainer.jsx").default
);

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

  componentWillMount() {
    // initial load locale. This is the same as ReactionCore.Locale
    this.props.localeActions.loadLocale();
  }

  getChildContext() {
    return {
      muiTheme: modifyRawTheme({}, "Open Sans")
    };
  }

  handleAlertClose() {
    this.props.alertActions.closeAlert();
  }

  render() {
    const { alert, children, location, params, settings } = this.props;
    const SettingsComponent = components.getComponent(settings.name);
    return (
			<div style={styles.wrapper}>
        <div style={styles.container}>
          <LayoutHeaderContainer location={location} />
          <main role="main" style={styles.main}>
            {children}
            <LayoutFooter />
          </main>
        </div>

        { /* action bar section */ }
        {settings.open &&
          <LeftNav
            disableSwipeToOpen={true}
            docked={true}
            width={300}
            open={true}
            openRight={true}
            //overlayStyle={{height: "100%"}}
            containerStyle={layoutStyles.actionBar}
            style={layoutStyles.actionBarWrapper}
          >
            <SettingsComponent
              location={location}
              payload={settings.payload} // todo add description to this
              params={params}
            />
          </LeftNav>
        }

        {/* Admin Controls Bar */}
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

CoreLayout.propTypes = {
  alertActions: PropTypes.shape({
    displayAlert: PropTypes.func,
    closeAlert: PropTypes.func
  }).isRequired,
  alert: PropTypes.object,
  children: PropTypes.node,
  localeActions: PropTypes.shape({
    changeLocale: PropTypes.func,
    loadLocale: PropTypes.func
  }).isRequired,
  location: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
  settings: PropTypes.shape({
    name: PropTypes.string,
    open: PropTypes.bool,
    payload: PropTypes.object
  })
};

function mapStateToProps(state) {
  return {
    alert: state.layout.alert,
    settings: state.layout.settings
  };
}

function mapDispatchToProps(dispatch) {
  return {
    alertActions: bindActionCreators(alertActions, dispatch),
    localeActions: bindActionCreators(localeActions, dispatch),
    settingsActions: bindActionCreators(settingsActions, dispatch)
  };
}

function composer(props, onData) {
  // we don't need to use this directly here, so we don't check this `ready`.
  // We need this sometimes to get ReactionCore.Collections.Accounts info
  Meteor.subscribe("Accounts", Meteor.userId());
  onData(null, {});
}

const coreLayoutSubscribed = composeWithTracker(
  composer,
  Loading
)(CoreLayout);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(coreLayoutSubscribed);
