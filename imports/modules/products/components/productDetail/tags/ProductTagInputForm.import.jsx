/**
 * @classdesc ProductTagInputForm
 */

import { _i18n } from "meteor/universe:i18n";
//import { DragDropContext } from '/myPackages/react-dnd';
//import HTML5Backend from '/myPackages/react-dnd-html5-backend';
import Autosuggest from '/myPackages/react-autosuggest';
import Tag from './Tag';

import React, { Component, PropTypes } from "react";
const theme = {
  root: 'ui search input',
  suggestions: 'results transition visible',
  suggestion: 'result',
  suggestionIsFocused: 'react-autosuggest__suggestion--focused',
  section: 'react-autosuggest__suggestions-section',
  sectionName: 'react-autosuggest__suggestions-section-name',
  sectionSuggestions: 'react-autosuggest__suggestions-section-suggestions'
};

//@DragDropContext(HTML5Backend)
export default class ProductTagInputForm extends Component {
  render() {
    const {
      tags, getTagSuggestions, moveTag, hashtagMark, onHashtagClick, tagValue,
      onTagGroupRemove, onTagBlurred, onTagChange, onNewTagChange, tagsArray
    } = this.props;
    console.log('ProductTagInputForm: rendering...');
    const inputAttributes = {
      id: 'tags-submit-new',
      type: 'search',
      placeholder: i18n.__('reaction.core.productDetail.tagsAdd'),
      onChange: value => onNewTagChange(value),
      onBlur: (event) => {
        onTagBlurred(event);
        ReactDOM.findDOMNode(this.refs.autosuggest.refs.input).value = '';
        this.setState({ value: '' });
      }
    };

    // todo add react-motion here on autocomplete
    return(
      <div className="ui list">
        { tagsArray.map((tag, i) => {
          return (
            <Tag
              key={ tag._id }
              index={ i }
              tag={ tag }
              id={ tag._id }
              name={ tags[tag._id].name }
              moveTag={ moveTag }
              hashtagMark={ hashtagMark }
              onHashtagClick={ onHashtagClick }
              onTagGroupRemove={ onTagGroupRemove }
              onTagBlurred={ onTagBlurred }
              onTagChange={ onTagChange }
            />
          );
        }) }
        { /* todo add here _id & name of single tag */ }
        <div className="item">
          {/*<div className="ui input">*/}
            <Autosuggest
              ref="autosuggest"
              suggestions={ getTagSuggestions }
              inputAttributes={ inputAttributes }
              showWhen={ input => input.trim().length >= 2 }
              theme={ theme }
              value={ tagValue }
            />
          {/*</div>*/}
        </div>
      </div>
    );
  }
}

ProductTagInputForm.propTypes = {
  tags: PropTypes.object,
  tagValue: PropTypes.string,
  tagsArray: PropTypes.array,
  getTagSuggestions: PropTypes.func.isRequired,
  onTagBlurred: PropTypes.func.isRequired,
  onTagChange: PropTypes.func.isRequired,
  onNewTagChange: PropTypes.func.isRequired,
  onHashtagClick: PropTypes.func.isRequired,
  onTagGroupRemove: PropTypes.func.isRequired,
  moveTag: PropTypes.func.isRequired,
  hashtagMark: PropTypes.func.isRequired
};


