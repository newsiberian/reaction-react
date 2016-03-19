import React, { Component, PropTypes } from "react";
import { translate } from "react-i18next/lib";
import { StyleSheet } from "react-look";
import { getSlug } from "../../../../../client/helpers/products";
import Autosuggest from "react-autosuggest";
import Tag from "./Tag.jsx";

const styles = StyleSheet.create({
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
