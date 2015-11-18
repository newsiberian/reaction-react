import LayoutHeader from './LayoutHeaderContainer';
import LayoutFooter from './../components/footer/LayoutFooter';
import { styles } from './../styles/coreLayout';

const { Component, PropTypes } = React;

/**
 *
 */
export default class CoreLayout extends Component {
  render() {
    return (
			<div>
				<LayoutHeader />
        <main role="main" style={ styles }>
          { this.props.content }
        </main>
				<LayoutFooter />
			</div>
		);
  }
}

CoreLayout.propTypes = {
  content: PropTypes.node
	// content2: PropTypes.node.isRequired
};