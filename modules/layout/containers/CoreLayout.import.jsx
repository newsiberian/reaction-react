import LayoutHeaderContainer from './LayoutHeaderContainer';
import LayoutFooter from './../components/footer/LayoutFooter';
import { styles } from './../styles/coreLayout';

const { Component, PropTypes } = React;

/**
 *
 */
export default class CoreLayout extends Component {
  render() {
    const { children, location } = this.props;
    console.log('CoreLayout rendering...');
    return (
			<div>
				<LayoutHeaderContainer location={ location } />
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