import React, { Component, PropTypes } from "react";
import { translate } from "react-i18next";
import { Editor, EditorState, RichUtils, convertFromRaw, convertToRaw } from "draft-js";
import { getBlockStyle } from "../../../../../client/helpers/comments";
import shallowCompare from "react-addons-shallow-compare";
import look, { StyleSheet } from "react-look";

// const c = StyleSheet.combineStyles;

const styles = StyleSheet.create({
  onChange: {
    backgroundColor: props => {
      if (props.descriptionState.isChanged) {
        // fires effect rollback
        setTimeout(() => {
          props.rollbackFieldState("description");
        }, 400);
        return "#e2f2e2";
      }
      return "#fff";
    }
  }
});

class Description extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createWithContent(
        convertFromRaw(props.description)
      )
    };
    this.onChange = editorState => this.setState({ editorState });
    this.focus = () => this.refs.editor.focus();
    this.handleKeyCommand = command => this._handleKeyCommand(command);
    this.handleBlur = () => this._handleBlur();
  }

  componentWillReceiveProps(nextProps) {
    // We use so complicated logic here because EditorState doesn"t applies new
    // state from nextProps automatically. We need to convert new `content`
    // manually on `content` update.
    if(shallowCompare(this, nextProps.description)) {
      this.setState({
        editorState: EditorState.createWithContent(
          convertFromRaw(nextProps.description)
        )
      });
    }
  }

  _handleKeyCommand(command) {
    const { editorState } = this.state;
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  }

  _handleBlur() {
    const {
      dispatch, productId, updateProductField, t
    } = this.props;
    const content = this.state.editorState.getCurrentContent();

    // content should not been empty
    if (!content.hasText()) {
      dispatch(displayAlert({ message: t("comments.commentShouldNotBeEmpty") }));
    } else {
      // Editor state clean after collapsing card component
      updateProductField(productId, "description", convertToRaw(content));
      // show animation on save
    }
  }

  render() {
    const { editorState } = this.state;
    const { t } = this.props;
    const isAdmin = ReactionCore.hasPermission("createProduct");
    return (
      <div className={styles.onChange}>
        <Editor
          blockStyleFn={getBlockStyle}
          editorState={editorState}
          ref="editor"
          readOnly={!isAdmin}
          placeholder={t("productDetailEdit.description")}
          spellCheck={true}
          handleKeyCommand={this.handleKeyCommand}
          onChange={this.onChange}
          onBlur={this.handleBlur}
        />
      </div>
    );
  }
}

Description.propTypes = {
  description: PropTypes.shape({
    entityMap: PropTypes.object,
    blocks: PropTypes.arrayOf(PropTypes.object)
  }).isRequired,
  dispatch: PropTypes.func,
  productId: PropTypes.string.isRequired,
  descriptionState: PropTypes.object.isRequired,
  rollbackFieldState: PropTypes.func,
  t: PropTypes.func,
  updateProductField: PropTypes.func
};

export default translate("core")(look(Description));
