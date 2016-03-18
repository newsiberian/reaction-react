import React, { Component, PropTypes } from "react";
import { translate } from "react-i18next/lib";
import { StyleSheet } from "react-look";
import { getSlug } from "../../../../../client/helpers/products";
// this moved upper
// import { DragDropContext } from "react-dnd";
// import HTML5Backend from "react-dnd-html5-backend";
import Autosuggest from "react-autosuggest";
import Tag from "./Tag.jsx";

const styles = StyleSheet.create({
  //chip: {
  //  borderRadius: 16,
  //  boxSizing: "border-box",
  //  cursor: "default",
  //  display: "block",
  //  float: "left",
  //  height: 32,
  //  lineHeight: "32px",
  //  margin: "8px 8px 0 0",
  //  maxWidth: "100%",
  //  padding: "0 12px",
  //  position: "relative"
  //},
  list: {
    listStyleType: "none"
  }
});

const theme = {
  container: "react-autosuggest__container",
  containerOpen: "react-autosuggest__container--open",
  input: "react-autosuggest__input",
  suggestionsContainer: "react-autosuggest__suggestions-container",
  suggestion: "react-autosuggest__suggestion",
  suggestionFocused: "react-autosuggest__suggestion--focused",
  sectionContainer: "react-autosuggest__section-container",
  sectionTitle: "react-autosuggest__section-title",
  sectionSuggestionsContainer: "react-autosuggest__section-suggestions-container"
};

//@DragDropContext(HTML5Backend)
class ProductTagInputForm extends Component {
  render() {
    const {
      productId, tags, tagActions, newTag, /*getTagSuggestions, moveTag, hashtagMark, onHashtagClick, tagValue,
      onTagGroupRemove, onTagBlurred, onTagChange, onNewTagChange, tagsArray,*/ t
    } = this.props;
    console.log("ProductTagInputForm: rendering...");
    const inputAttributes = {
      id: "tags-submit-new",
      type: "search",
      value: newTag.tagName,
      placeholder: t("productDetail.tagsAdd"),
      onChange: event => tagActions.changeNewTag(productId, event.target.value),
      onBlur: event => {
        tagActions.updateTag(productId, event.target.value);
        tagActions.clearNewTagName();
      }
    };

    return(
      <div className={styles.list}>
        {tags.map((tag, i) => (
          <Tag
            key={tag._id}
            index={i}
            productId={productId}
            tag={tag}
            tagActions={tagActions}
            id={tag._id}
            name={tag.name}
          />
        ))}
        <div>
          <Autosuggest
            suggestions={newTag.suggestions}
            onSuggestionsUpdateRequested={({ value }) => tagActions.updateSuggestions(value)}
            getSuggestionValue={suggestion => suggestion}
            inputProps={inputAttributes}
            shouldRenderSuggestions={value => value.trim().length >= 2}
            renderSuggestion={suggestion => <span>{suggestion}</span>}
            theme={theme}
          />
        </div>
      </div>
    );

    // todo add react-motion here on autocomplete
    //return(
    //  <div className="ui list">
    //    { tagsArray.map((tag, i) => {
    //      return (
    //        <Tag
    //          key={tag._id}
    //          index={i}
    //          tag={tag}
    //          id={tag._id}
    //          name={tags[tag._id].name}
    //          moveTag={moveTag}
    //          hashtagMark={hashtagMark}
    //          onHashtagClick={onHashtagClick}
    //          onTagGroupRemove={onTagGroupRemove}
    //          onTagBlurred={onTagBlurred}
    //          onTagChange={onTagChange}
    //        />
    //      );
    //    }) }
    //    { /* todo add here _id & name of single tag */ }
    //    <div className="item">
    //      {/*<div className="ui input">*/}
    //        <Autosuggest
    //          ref="autosuggest"
    //          suggestions={getTagSuggestions}
    //          inputAttributes={inputAttributes}
    //          showWhen={input => input.trim().length >= 2}
    //          theme={theme}
    //          value={tagValue}
    //        />
    //      {/*</div>*/}
    //    </div>
    //  </div>
    //);
  }
}

ProductTagInputForm.propTypes = {
  productId: PropTypes.string.isRequired,
  //tags: PropTypes.object,
  tags: PropTypes.arrayOf(PropTypes.object),
  tagActions: PropTypes.shape({
    changeTag: PropTypes.func,
    changeNewTag: PropTypes.func,
    clearNewTagName: PropTypes.func,
    updateTag: PropTypes.func,
    clearSuggestions: PropTypes.func,
    updateSuggestions: PropTypes.func
  }),
  newTag: PropTypes.object,
  //tagValue: PropTypes.string,
  //tagsArray: PropTypes.array,
  //getTagSuggestions: PropTypes.func.isRequired,
  //onTagBlurred: PropTypes.func.isRequired,
  //onTagChange: PropTypes.func.isRequired,
  //onNewTagChange: PropTypes.func.isRequired,
  //onHashtagClick: PropTypes.func.isRequired,
  //onTagGroupRemove: PropTypes.func.isRequired,
  //moveTag: PropTypes.func.isRequired,
  //hashtagMark: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired
};

export default translate("core")(ProductTagInputForm);
