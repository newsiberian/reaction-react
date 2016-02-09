import { Component, PropTypes } from "react";
import LeftNav from "material-ui/lib/left-nav";

/**
 * @class ActionBar
 * @classdesc
 */
export default class ActionBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { children } = this.props;
    console.log("ActionsSidebar rendering...");
    return (
      <LeftNav
        docked={false}
        width={300}
        open={this.state.open}
        onRequestChange={open => this.setState({open})}
      >
        {children}
      </LeftNav>
    );
  }
}

ActionBar.propTypes = {
  children: PropTypes.node
};
