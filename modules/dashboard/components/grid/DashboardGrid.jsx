import { Component, PropTypes } from "react";
import { ReactionCore } from "meteor/reactioncommerce:core";
// import { Grid, Row, Col } from "react-flexbox-grid";
import "../../styles/flexboxgrid.css";
import Package from "./Package.jsx";

const styles = {
  base: {
    paddingTop: "1rem",
    paddingBottom: "1rem"
  },
  cal: {
    paddingLeft: "0.4rem",
    paddingRight: "0.4rem"
  }
};

/**
 * @class Packages
 * @classdesc Dashboard packages
 */
export default class DashboardGrid extends Component {
  render() {
    console.log("DashboardGrid rendering...");
    return (
      <div className="container-fluid" style={styles.base}>
        <div className="row">
          {ReactionCore.Apps({ provides: "dashboard" }).map((pkg, index) => {
            return (
              <div
                className="col-xs-12 col-sm-6 col-md-4 col-lg-3"
                key={index}
                style={styles.cal}
              >
                <Package pkg={pkg} />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

DashboardGrid.propTypes = {};
