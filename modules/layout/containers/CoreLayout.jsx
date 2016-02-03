import LayoutHeaderContainer from "./LayoutHeaderContainer.jsx";
import LayoutFooter from "../components/footer/LayoutFooter.jsx";
import { styles } from "../styles/coreLayout";
import React, { Component, PropTypes } from "react";

/**
 *
 */
export default class CoreLayout extends Component {
  render() {
    const { children, location } = this.props;
    console.log("CoreLayout rendering...");
    return (
			<div>
        {/*<LayoutHeaderContainer location={ location } />*/}
        <main role="main" style={ styles }>
          { children }
        </main>
				<LayoutFooter />
			</div>
		);
  }
}

CoreLayout.propTypes = {
  children: PropTypes.node,
  location: PropTypes.object.isRequired
};