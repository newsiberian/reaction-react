/**
 * @classdesc GridContent
 */

import { styles } from '../../styles/gridContent';

const { Component, PropTypes } = React;
const { Link } = ReactRouter;

export default class GridContent extends Component {
  render() {
    const { handle, title, displayPrice } = this.props;
    // todo добавить i18n для цены
    // todo добавить href
    // todo prevent to rerendering from GridControl changes?
    console.log('GridContent rendering...');
    //<a href={ FlowRouter.path('product', { _id: this.props._id }) }>
    //  <div className="header">{ this.props.title }</div>
    //  <div className="header">{ this.props.displayPrice() }</div>
    //</a>
    return (
      <div className="center aligned content">
        <Link to={ `/shop/product/${ handle }` }>
          <div className="header">{ title }</div>
          <div className="header">{ displayPrice() }</div>
        </Link>
      </div>
    );
  }
}

GridContent.propTypes = {
  // todo add handle for lin
  handle: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  displayPrice: PropTypes.func.isRequired
};
