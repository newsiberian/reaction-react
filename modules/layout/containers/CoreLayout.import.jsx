import LayoutHeader from './LayoutHeaderContainer';
import LayoutFooter from './../components/footer/LayoutFooter';
import { styles } from './../styles/coreLayout';

const { Component, PropTypes } = React;

/**
 *
 */
export default class CoreLayout extends Component {
  render() {
    console.log('CoreLayout rendering...');
    return (
			<div>
				<LayoutHeader />
        <main role="main" style={ styles }>
          { this.props.children }
        </main>
				<LayoutFooter />
			</div>
		);
  }
}

CoreLayout.propTypes = {
  children: PropTypes.node
};