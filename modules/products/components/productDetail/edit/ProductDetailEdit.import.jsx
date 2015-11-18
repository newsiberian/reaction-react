/**
 * @classdesc ProductDetailEdit
 */
import i18n from '{universe:i18n}';
import Radium from '/myPackages/radium';
import shallowCompare from '/myPackages/react-addons-shallow-compare';
import ReactMarkdownMediumEditor from '{universe:react-markdown-wysiwyg}/ReactMarkdownMediumEditor';
import {
  //mediumHoverStyle, inputStyle
} from '../../../styles/productDetailEdit';

const { Component, PropTypes } = React;

@Radium
export default class ProductDetailEdit extends Component {
  shouldComponentUpdate(nextProps) {
    // todo разобраться с shallowCompare, возможно применить _.isEqual вместо него.
    return !shallowCompare(this, nextProps.selectedProduct.title);
    //return !_.isEqual(nextProps.media, this.props.selectedProduct);
  }
  render() {
    const { selectedProduct, onInputChange, onInputBlur, options } = this.props;
    const { value, field, type, styles, className } = options;
    // todo we can't use Radium on editor don't know why...
    if (type === 'textarea') {
      console.log('ProductDetailEdit: rendering...');
      // todo непонятно зачем в темплейте product-detail-message. я его пока не скопировал
      return(
        <ReactMarkdownMediumEditor
          className={ className && className }
          markdown={ selectedProduct[field] }
          onChange={ text => onInputChange(text, field) }
          onBlur={ event => onInputBlur(event, field) }
          options={{
            disableReturn: false,
            toolbar: true,
            placeholder: {
              text: i18n.__(`reaction.core.productDetailEdit.${field}`)
            }
          }}
          style={ styles ? styles : {} }
        />
      );
    }

    console.log('ProductDetailEdit: rendering...');
    return (
      <input
        type="text"
        className={ className && className }
        value={ selectedProduct[field] }
        onChange={ event => onInputChange(event, field) }
        onBlur={ event => onInputBlur(event, field) }
        placeholder={ i18n.__(`reaction.core.productDetailEdit.${field}`) }
        style={ styles }
      />
    );
  }
}

ProductDetailEdit.propTypes = {
  selectedProduct: PropTypes.object.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onInputBlur: PropTypes.func.isRequired,
  options: PropTypes.shape({
    field: PropTypes.string.isRequired,
    value: PropTypes.string, // this field is not Required because in case
    // of social messages we could not have them.
    type: PropTypes.string,
    styles: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.array
    ]),
    className: PropTypes.string
  }).isRequired
};
