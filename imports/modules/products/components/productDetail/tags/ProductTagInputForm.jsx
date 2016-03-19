import React, { Component, PropTypes } from "react";
import { translate } from "react-i18next/lib";
import { StyleSheet } from "react-look";
import { getSlug } from "../../../../../client/helpers/products";
import Autosuggest from "react-autosuggest";
import Tag from "./Tag.jsx";

const styles = StyleSheet.create({
  list: {
    listStyleType: "none"
  },
  input: {
    borderRightColor: "transparent",
    paddingTop: "0.678614em",
    paddingBottom: "0.678614em",
    paddingLeft: "2.67142857em",
    paddingRight: "2.67142857em",
    margin: 0,
    maxWidth: "100%",
    flex: "1 0 auto",
    outline: 0,
    textAlign: "left",
    lineHeight: "1.2142em",
    background: "#fff",
    border: "1px solid rgba(34,36,38,.15)",
    color: "rgba(0,0,0,.87)",
    borderRadius: ".28571429rem",
    transform: "box-shadow .1s ease,border-color .1s ease",
    boxShadow: "none"
  },
  container: {
    margin: 4,
    position: "relative"
  },
  suggestionsContainer: {
    borderColor: "#96c8da",
    borderRadius: "0 0 0.285714rem 0.285714rem",
    borderTopWidth: 0,
    boxShadow: "0 2px 3px 0 rgba(34, 36, 38, 0.15)",
    maxHeight: "20.2286rem",
    minWidth: "calc(100% + 2px)",
    outline: "0 none",
    overflowX: "hidden",
    overflowY: "auto",
    transition: "opacity 0.1s ease 0s",
    width: "calc(100% + 2px)",
    left: 0,
    background: "#fff none repeat scroll 0 0",
    position: "absolute",
    textAlign: "left"
  },
  suggestion: {
    boxShadow: "none",
    color: "rgba(0, 0, 0, 0.87)",
    cursor: "pointer",
    display: "block",
    height: "auto",
    lineHeight: "1em",
    padding: "0.714286rem 1.14286rem",
    position: "relative",
    borderTop: "1px solid #fafafa",
    ":hover": {
      background: "rgba(0, 0, 0, 0.05) none repeat scroll 0 0",
      color: "rgba(0, 0, 0, 0.95)"
    }
  }
});

const theme = {
  container: styles.container, // "react-autosuggest__container",
  containerOpen: "react-autosuggest__container--open",
  input: styles.input, // "react-autosuggest__input",
  suggestionsContainer: styles.suggestionsContainer, // "react-autosuggest__suggestions-container",
  suggestion: styles.suggestion, // "react-autosuggest__suggestion",
  suggestionFocused: "react-autosuggest__suggestion--focused",
  sectionContainer: "react-autosuggest__section-container",
  sectionTitle: "react-autosuggest__section-title",
  sectionSuggestionsContainer: "react-autosuggest__section-suggestions-container"
};

//@DragDropContext(HTML5Backend)
class ProductTagInputForm extends Component {
  render() {
    const {
      productId, tags, tagActions, tagsIdsArray, newTag, t
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
        {tagsIdsArray && tagsIdsArray.map((tagId, i) => {
          const currentTag = tags.filter(tag => tag._id === tagId);
          if (currentTag.length) {
            return (
              <Tag
                key={tagId}
                id={tagId}
                index={i}
                name={currentTag[0].name}
                productId={productId}
                tag={currentTag[0]}
                tagActions={tagActions}
                tagsIdsArray={tagsIdsArray}
              />
            );
          }
        })}
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
  }
}

ProductTagInputForm.propTypes = {
  productId: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.object),
  tagActions: PropTypes.shape({
    changeTag: PropTypes.func,
    changeNewTag: PropTypes.func,
    clearNewTagName: PropTypes.func,
    removeTag: PropTypes.func,
    updateTag: PropTypes.func,
    syncTags: PropTypes.func,
    moveTag: PropTypes.func,
    dropTag: PropTypes.func,
    clearSuggestions: PropTypes.func,
    updateSuggestions: PropTypes.func
  }),
  tagsIdsArray: PropTypes.arrayOf(PropTypes.string),
  newTag: PropTypes.object,
  t: PropTypes.func.isRequired
};

export default translate("core")(ProductTagInputForm);
