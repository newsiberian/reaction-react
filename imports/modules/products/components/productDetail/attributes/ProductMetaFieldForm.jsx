import React, { Component, PropTypes } from "react";
import MetaComponent from "./MetaComponent";


/**
 * @class ProductMetaFieldForm
 * @classdesc ProductMetaFieldForm
 */
export default class ProductMetaFieldForm extends Component {
  render() {
    const { product, metafieldActions, newMetafield } = this.props;
    console.log("ProductMetaFieldForm: rendering...");
    return (
      <div /*className="ui raised segments"*/>
        {product.metafields && product.metafields.map((metafield, index) => {
          return(
            <div key={index} /*className="ui segment"*/>
              <MetaComponent
                index={index}
                metafield={metafield}
                metafieldActions={metafieldActions}
                //onChange={onChange}
                //onBlur={onBlur}
                //onRemoveClick={onRemoveClick}
              />
            </div>
          );
        }) }
        <div /*className="ui segment"*/>
          <MetaComponent
            index="new"
            metafield={newMetafield}
            metafieldActions={metafieldActions}
            //onChange={onChange}
            //onBlur={ onBlur}
          />
        </div>
      </div>
    );
}
}

ProductMetaFieldForm.propTypes = {
  metafieldActions: PropTypes.shape({
    changeMetafield: PropTypes.func,
    updateMetafield: PropTypes.func,
    removeMetafields: PropTypes.func
  }).isRequired,
  newMetafield: PropTypes.shape({
    key: PropTypes.string,
    value: PropTypes.string
  }),
  //metaBundle: PropTypes.shape({
  //  metafields: PropTypes.array,
  //  newMetafield: PropTypes.object,
  //  onChange: PropTypes.func.isRequired,
  //  onBlur: PropTypes.func.isRequired,
  //  onRemoveClick: PropTypes.func.isRequired
  //})
};
