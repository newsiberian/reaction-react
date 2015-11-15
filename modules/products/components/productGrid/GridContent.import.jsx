/**
 * @classdesc GridContent
 */

import { styles } from '../../styles/gridContent'

const { Component, PropTypes } = React;

export default class GridContent extends Component {
  render() {
    // todo добавить i18n для цены
    // todo добавить href
    // todo prevent to rerendering from GridControl changes?
    console.log('GridContent rendering...');
    return (
      <div className="center aligned content">
        <a href={ FlowRouter.path('product', { _id: this.props._id }) }>
          <div className="header">{ this.props.title }</div>
          <div className="header">{ this.props.displayPrice() }</div>
        </a>
      </div>
    );
  }
}

GridContent.propTypes = {
  _id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  displayPrice: PropTypes.func.isRequired
};
