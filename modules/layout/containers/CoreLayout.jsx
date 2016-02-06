// import { composeWithTracker } from "react-komposer";
import { Component, PropTypes } from "react";
import { ReactionCore } from "meteor/reactioncommerce:core";
import ThemeManager from "material-ui/lib/styles/theme-manager";
import LayoutHeaderContainer from "./LayoutHeaderContainer.jsx";
import LayoutFooter from "../components/footer/LayoutFooter.jsx";
import { styles } from "../styles/coreLayout";
// import "../styles/styles.css";

/**
 *
 */

//export default class CoreLayout extends Component {
//  render() {
//    const { children, location } = this.props;
//    console.log("CoreLayout rendering...");
//    return (
//			<div>
//        {/*<LayoutHeaderContainer location={ location } />*/}
//        <main role="main" style={styles}>
//          {children}
//        </main>
//				<LayoutFooter />
//			</div>
//		);
//  }
//}

const CoreLayout = (props) => {
  const { children, location } = props;
  console.log("CoreLayout rendering...");
  return (
    <div>
      {/*<LayoutHeaderContainer location={ location } />*/}
      <main role="main" style={styles}>
        {children}
      </main>
      <LayoutFooter />
    </div>
  );
};

CoreLayout.propTypes = {
  children: PropTypes.node,
  location: PropTypes.object.isRequired
};

//function composer(props, onData) {
//  const handle = Meteor.subscribe("shops");
//  if (handle.ready()) {
//    //const posts = Posts.find({}, {sort: {_id: 1}}).fetch();
//    onData(null, "asdad");
//  }
//}

//export default composeWithTracker(composer)(CoreLayout);
export default CoreLayout;
