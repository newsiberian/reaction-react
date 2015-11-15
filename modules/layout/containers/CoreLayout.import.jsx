/**
 *
 */

// import { Component, PropTypes } from '{react}';
import LayoutHeader from './LayoutHeader'
import LayoutFooter from './../components/footer/LayoutFooter'
import { styles } from './../styles/coreLayout'

export default class CoreLayout extends React.Component {
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
  content: React.PropTypes.node
	// content2: React.PropTypes.node.isRequired
};