import React, { Component, PropTypes } from "react";
import { Meteor } from "meteor/meteor";
import { ReactionCore } from "meteor/reactioncommerce:core";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { replace } from "react-router-redux";

const styles = {
  //display: "flex",
  flex: "1 1 auto",
  minHeight: "80vh"
};

// const Dashboard = props => (
//   <div style={styles}>
//     {props.children}
//   </div>
// );

class Dashboard extends Component {
  componentWillMount() {
    // Check that the user is logged in before the component mounts
    if (!ReactionCore.hasPermission("dashboard", Meteor.userId())) {
      this.props.replace({
        pathname: "/unauthorized",
        state: { prevPath: this.props.location.pathname }
      });
    }
  }

  componentDidUpdate(prevProps) {
    // Navigate to a sign in page if the user isn't authenticated when data changes
    if (!ReactionCore.hasPermission("dashboard", Meteor.userId())) {
      // this.props.push("/unauthorized");
      this.props.replace({
        pathname: "/unauthorized",
        state: { prevPath: prevProps.location.pathname }
      });
    }
  }

  render() {
    return (
      <div style={styles}>
        {this.props.children}
      </div>
    );
  }
}

Dashboard.propTypes = {
  children: PropTypes.node.isRequired,
  location: PropTypes.object.isRequired, // for permission check
  replace: PropTypes.func // for permission check
};

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    replace: bindActionCreators(replace, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
// export default Dashboard;
