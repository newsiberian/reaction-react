import i18n from '{universe:i18n}';

const { Component, PropTypes } = React;

/**
 * @class MetaComponent
 * @classdesc MetaComponent
 */
export default class MetaComponent extends Component {
  render() {
    const { id, metafield, onChange, onBlur, onRemoveClick } = this.props;
    const className = (id !== 'new') ? 'ui action input field' : 'field';
    return (
      <form role="form" className="ui form">
        <div className="two fields">
          <div className="field">
            <input
              type="text"
              placeholder={ i18n.__('reaction.core.productDetail.detailsName') }
              value={ metafield.key }
              onChange={ (event) => onChange(event, id, 'key') }
              onBlur={ () => onBlur(id) }
            />
          </div>
          <div className={ className }>
            <input
              type="text"
              placeholder={ i18n.__('reaction.core.productDetail.detailsInfo') }
              value={ metafield.value }
              onChange={ event => onChange(event, id, 'value') }
              onBlur={ () => onBlur(id) }
            />
            { id !== 'new' &&
              <button
                className="ui icon basic button"
                onClick={ event => onRemoveClick(event, id) }
              >
                <i className="remove icon"></i>
              </button>
            }
          </div>
        </div>
      </form>
    );
  }
}

MetaComponent.propTypes = {
  id: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),
  metafield: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  onRemoveClick: PropTypes.func
};
