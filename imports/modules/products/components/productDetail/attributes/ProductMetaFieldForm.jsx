import React, { Component, PropTypes } from "react";
import MetaComponent from "./MetaComponent";


/**
 * @class ProductMetaFieldForm
 * @classdesc ProductMetaFieldForm
 */
export default class ProductMetaFieldForm extends Component {
  render() {
    const {
      metafields, onChange, onBlur, onRemoveClick, newMetafield
    } = this.props.metaBundle;
    console.log("ProductMetaFieldForm: rendering...");
    return (
      <div className="ui raised segments">
        { metafields.map((metafield, i) => {
          return(
            <div key={ i } className="ui segment">
              <MetaComponent
                id={ i }
                metafield={ metafield }
                onChange={ onChange }
                onBlur={ onBlur }
                onRemoveClick={ onRemoveClick }
              />
            </div>
          );
        }) }
        <div className="ui segment">
          <MetaComponent
            id="new"
            metafield={ newMetafield }
            onChange={ onChange }
            onBlur={ onBlur }
          />
        </div>
      </div>
    );
  }
}

ProductMetaFieldForm.propTypes = {
  metaBundle: PropTypes.shape({
    metafields: PropTypes.array,
    newMetafield: PropTypes.object,
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired,
    onRemoveClick: PropTypes.func.isRequired
  })
};
