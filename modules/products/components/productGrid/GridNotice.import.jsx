// import { Component } from '{react}'
import ReactMixin from '/myPackages/react-mixin'
import Radium from '/myPackages/radium'
import { styles } from '../../styles/gridNotice'

const { Component, PropTypes } = React;

// todo do we need Radium here?
// todo prevent to rerendering from GridControl changes?
@Radium
export default class GridNotice extends Component {
  render() {
    const { isSoldOut, isBackorder, isLowQuantity } = this.props;

    // todo add styles
    if (isSoldOut()) {
      if (isBackorder()) {
        console.log('GridNotice rendering...');
        return <span style={ styles }>Backorder</span>
      }
      console.log('GridNotice rendering...');
      return <span style={ styles }>Sold Out!</span>
    } else {
      if (isLowQuantity()) {
        console.log('GridNotice rendering...');
        return <span style={ styles }>Limited Supply</span>
      }
    }
    console.log('GridNotice rendering...');
    return false
  }
}

GridNotice.propTypes = {
  isSoldOut: PropTypes.func.isRequired,
  isBackorder: PropTypes.func.isRequired,
  isLowQuantity: PropTypes.func.isRequired
};
