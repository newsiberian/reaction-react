/**
 * @classdesc ProductDetailEdit
 */
import i18n from '{universe:i18n}';
import Radium from '/myPackages/radium';
import ReactMarkdownMediumEditor from '{universe:react-markdown-wysiwyg}/ReactMarkdownMediumEditor';
//import { mediumHoverStyle } from '../../../styles/productDetailEdit';

const { Component, PropTypes } = React;

@Radium
export default class ProductDetailEdit extends Component {
  render() {
    const { value, field, type, styles, className } = this.props.options;
    //const ReactMarkdownMediumEditor = Radium(ReactMarkdownMediumEditor);
    // todo we can't use Radium on editor don't know why...
    if (type === 'textarea') {
      // placeholderText={ i18n.__(`reaction.core.productDetailEdit.${field}`) }
      console.log('ProductDetailEdit: rendering...');
      // todo непонятно зачем в темплейте product-detail-message. я его пока не скопировал
      // style={ styles ? Radium.merge(styles, mediumHoverStyle) : mediumHoverStyle }
      return(
        <ReactMarkdownMediumEditor
          className={ className && className }
          markdown={ value }
          onChange={ console.log.bind(console) }
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
    return(
      <ReactMarkdownMediumEditor
        className={ className && className }
        markdown={ value }
        onChange={ console.log.bind(console) }
        options={{
          disableReturn: true,
          toolbar: false,
          placeholder: {
            text: i18n.__(`reaction.core.productDetailEdit.${field}`)
          }
        }}
        style={ styles ? styles : {} }
      />
    );
    /*return (
      <div className="ui fluid input">
        <input
          type="text"
          value={ value }
          placeholder={ i18n.__(`reaction.core.productDetailEdit.${field}`) }
          onChange={ console.log.bind(console) }
          style={ styles }
        />
      </div>
    );*/
  }
}

ProductDetailEdit.propTypes = {
  options: PropTypes.shape({
    field: PropTypes.string.isRequired,
    value: PropTypes.string, // this field is not Required because in case
    // of social messages we could not have them.
    type: PropTypes.string,
    styles: PropTypes.object,
    className: PropTypes.string
  }).isRequired
};
