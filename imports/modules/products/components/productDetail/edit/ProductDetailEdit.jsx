import React, { Component, PropTypes } from "react";
import { translate } from "react-i18next/lib";
//import {Editor, EditorState} from 'draft-js';
import shallowCompare from "react-addons-shallow-compare";
import look, { StyleSheet } from "react-look";

const c = StyleSheet.combineStyles;

const styles = StyleSheet.create({
  onChange: {
    backgroundColor: props => {
      if (props.productState[props.options.field].isChanged) {
        // fires effect rollback
        setTimeout(() => {
          props.productActions.rollbackFieldState(props.options.field);
        }, 400);
        return "#e2f2e2";
      }
      return "#fff";
    }
  }
});

class ProductDetailEdit extends Component {
  //shouldComponentUpdate(nextProps) {
  //  // todo разобраться с shallowCompare, возможно применить _.isEqual вместо него.
  //  return !shallowCompare(this, nextProps.product.title);
  //  //return !_.isEqual(nextProps.media, this.props.product);
  //}

  handleChange(event, field) {
    const { product, productActions } = this.props;
    productActions.changeProductField(product._id, field, event.target.value);
  }

  handleBlur(event, field) {
    const { product, productActions } = this.props;
    // ignore fake interactions
    if (product[field] !== event.target.value) {
      productActions.updateProductField(product._id, field, event.target.value);
    }
  }

  render() {
    const { product, options, t } = this.props;
    const { field, type, className } = options;

    if (type === "textarea") {
      console.log("ProductDetailEdit: rendering...");
      // todo непонятно зачем в темплейте product-detail-message. я его пока не скопировал
      //return(
      //  <ReactMarkdownMediumEditor
      //    className={className && className}
      //    markdown={product[field]}
      //    onChange={text => onInputChange(text, field)}
      //    onBlur={event => onInputBlur(event, field)}
      //    options={{
      //      disableReturn: false,
      //      toolbar: true,
      //      placeholder: {text: t(`productDetailEdit.${field}`)}
      //    }}
      //    style={styles ? styles : {}}
      //  />
      //);
    }

    console.log("ProductDetailEdit: rendering...");
    //return (
    //  <Editor
    //    editorState={product[field]}
    //    onChange={event => this.handleChange(event, field)}
    //  />
    //);
    return (
      <input
        type="text"
        className={c(className, styles.onChange)}
        // value={product[field]}
        defaultValue={product[field]}
        onChange={event => this.handleChange(event, field)}
        onBlur={event => this.handleBlur(event, field)}
        placeholder={t(`productDetailEdit.${field}`)}
      />
    );
  }
}

ProductDetailEdit.propTypes = {
  options: PropTypes.shape({
    field: PropTypes.string.isRequired,
    value: PropTypes.string, // this field is not Required because in case
    // of social messages we could not have them.
    type: PropTypes.string,
    className: PropTypes.string
  }).isRequired,
  product: PropTypes.object.isRequired,
  productActions: PropTypes.shape({
    changeProductField: PropTypes.func,
    updateProductField: PropTypes.func,
    rollbackFieldState: PropTypes.func
  }).isRequired,
  productState: PropTypes.shape({ // product state from `store`
    title: PropTypes.object,
    pageTitle: PropTypes.object,
    vendor: PropTypes.object,
    description: PropTypes.object
  }),
  t: PropTypes.func.isRequired
};

export default translate("core")(look(ProductDetailEdit));
