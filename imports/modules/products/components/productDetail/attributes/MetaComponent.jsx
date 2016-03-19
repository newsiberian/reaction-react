import React, { Component, PropTypes } from "react";
import { translate } from "react-i18next/lib";

/**
 * @class MetaComponent
 * @classdesc MetaComponent
 */
class MetaComponent extends Component {
  render() {
    const { index, metafield, metafieldActions, t } = this.props;
    const className = (index !== "new") ? "ui action input field" : "field";
    return (
      <div className="two fields">
        <div className="field">
          <input
            type="text"
            placeholder={t("productDetail.detailsName")}
            //value={metafield.key}
            defaultValue={metafield.key}
            //onChange={(event) => onChange(event, id, "key")}
            onChange={event => metafieldActions.changeMetafield(index, "key", event.target.value)}
            onBlur={event => metafieldActions.updateMetafield(index, "key", event.target.value)}
          />
        </div>
        <div className={className}>
          <input
            type="text"
            placeholder={t("productDetail.detailsInfo")}
            value={metafield.value}
            onChange={event => metafieldActions.changeMetafield(index, "value", event.target.value)}
            onBlur={event => metafieldActions.updateMetafield(index, "value", event.target.value)}
            //onChange={event => onChange(event, index, "value")}
            //onBlur={() => onBlur(index)}
          />
          {index !== "new" &&
            <button
              className="ui icon basic button"
              onClick={() => metafieldActions.removeMetafields(index)}
            >
              <i className="fa fa-times" />
            </button>
          }
        </div>
      </div>
    );
  }
}

MetaComponent.propTypes = {
  index: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]).isRequired,
  metafield: PropTypes.shape({
    key: PropTypes.string,
    value: PropTypes.string
  }),
  metafieldActions: PropTypes.shape({
    changeMetafield: PropTypes.func,
    updateMetafield: PropTypes.func,
    removeMetafields: PropTypes.func
  }).isRequired,
  t: PropTypes.func.isRequired
};

export default translate("core")(MetaComponent);
