import { Component, PropTypes } from "react";
import LeftNav from "material-ui/lib/left-nav";
import DashboardHeader from "../components/DashboardHeader.jsx";

/**
 * @class DashboardContainer
 * @classdesc
 */
export default class Dashboard extends Component {
  render() {
    console.log();
    console.log();
    const { children, location, main, actionBar } = this.props;
console.log();
    return (
      <div style={{ display: "inline-block" }}>
        <div>
          <DashboardHeader title={"Settings"} />
          <section>
            {children || main}
          </section>
        </div>
        {actionBar &&
          <LeftNav
            docked={true}
            width={300}
            open={true}
            //onRequestChange={open => this.setState({open})}
          >
            {actionBar}
          </LeftNav>
        }

      </div>
    );
  }
}

Dashboard.propTypes = {
  children: PropTypes.node,
  main: PropTypes.node,
  actionBar: PropTypes.node
};
