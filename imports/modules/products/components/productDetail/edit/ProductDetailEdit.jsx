import React, { Component, PropTypes } from "react";
import { translate } from "react-i18next/lib";
//import {Editor, EditorState} from 'draft-js';
import shallowCompare from "react-addons-shallow-compare";
import look, { StyleSheet } from "react-look";
import {
  //mediumHoverStyle, inputStyle
} from "../../../styles/productDetailEdit";

const c = StyleSheet.combineStyles;

const getOptions = field => {
  switch(field) {
  case "title":
    return {
      type: "input",
      //className: titleStyle, inputHoverStyle, inputStyle
      className: c(styles.input, styles.title, styles.hover)
    };
  case "pageTitle":
    return {
      type: "input",
      className: c(styles.pageTitle, styles.input, styles.hover)
    };
  case "vendor":
    return {
      type: "input",
      className: c(styles.vendor, styles.hover)
    };
  //case "description":
  //  return {
  //    type: "textarea",
  //    className: c(descriptionStyle, inputHoverStyle)
  //  };
  default:
    return {}; // should not fires
  }
};

class ProductDetailEdit extends Component {
  shouldComponentUpdate(nextProps) {
    // todo разобраться с shallowCompare, возможно применить _.isEqual вместо него.
    return !shallowCompare(this, nextProps.product.title);
    //return !_.isEqual(nextProps.media, this.props.product);
  }

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
    const { field, type, styles, className } = options;

    // todo we can"t use Radium on editor don"t know why...
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
        className={className}
        //value={product[field]}
        defaultValue={product[field]}
        onChange={event => this.handleChange(event, field)}
        onBlur={event => this.handleBlur(event, field)}
        placeholder={t(`productDetailEdit.${field}`)}
        //style={styles}
      />
    );
  }
}

ProductDetailEdit.propTypes = {
  options: PropTypes.shape({
    field: PropTypes.string.isRequired,
    //value: PropTypes.string, // this field is not Required because in case
    // of social messages we could not have them.
    type: PropTypes.string,
    //styles: PropTypes.object,
    className: PropTypes.string
  }).isRequired,
  //field: PropTypes.string.isRequired,
  product: PropTypes.object.isRequired,
  productActions: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired
};

//const styles = StyleSheet.create({
//  input: {
//    textAlign: "center",
//    width: "100%",
//    borderColor: "#fafafa",
//    borderWidth: 1,
//    borderStyle: "solid"
//  },
//  title: {
//    //fontSize: "3.5rem"
//    fontSize: "5vmin"
//  },
//  pageTitle: {
//    //fontSize: "2rem"
//    fontSize: "4vmin"
//  },
//  vendor: {
//    borderColor: "#fafafa",
//    borderWidth: 1,
//    borderStyle: "solid",
//    maxWidth: "30%",
//    marginTop: "1rem",
//    marginBottom: "1rem"
//  },
//  hover: {
//    ":hover": {
//      borderColor: "#cccccc",
//      borderWidth: 1,
//      borderStyle: "dotted"
//    }
//  }
//});

export default translate("core")(look(ProductDetailEdit));
