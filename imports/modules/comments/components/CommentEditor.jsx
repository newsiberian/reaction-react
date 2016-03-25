import React, { Component, PropTypes } from "react";
import { translate } from "react-i18next/lib";
import { Editor, EditorState, RichUtils, convertToRaw } from "draft-js";
import { reduxForm } from "redux-form";
import { StyleSheet } from "react-look";
import { displayAlert } from "../../layout/actions/alert";
import { isAnonymous } from "../../../client/helpers/permissions";
import i18next from "i18next";
import CardActions from "material-ui/lib/card/card-actions";
import FlatButton from "material-ui/lib/flat-button";
import CardText from "material-ui/lib/card/card-text";
import TextField from "material-ui/lib/text-field";
import CheckboxWrapper from "../../layout/components/CheckboxWrapper.jsx";
import BlockStyleControls from  "./BlockStyleControls.jsx";
import InlineStyleControls from "./InlineStyleControls.jsx";
// export { styles } from "../styles/commonStyles";

const styles = StyleSheet.create({
  blockquote: {
    borderLeft: "5px solid #eee",
    color: "#666",
    fontFamily: "'Hoefler Text', 'Georgia', serif",
    fontStyle: "italic",
    margin: "16px 0",
    padding: "10px 20px"
  },
  alignLeft: {
    textAlign: "left"
  },
  alignCenter: {
    textAlign: "center"
  },
  alignRight: {
    textAlign: "right"
  },
  alignJustify: {
    textAlign: "justify"
  }
});

const validate = values => {
  const errors = {};
  if (isAnonymous()) {
    if (! values.name) {
      errors.name = i18next.t("error.isRequired", {
        field: i18next.t("accountsUI.name")
      });
    }
    if (! values.email) {
      errors.email = i18next.t("error.isRequired", {
        field: i18next.t("accountsUI.email")
      });
    } else if (! /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = i18next.t("accountsUI.error.emailDoesntMatchTheCriteria");
    }
  }

  return errors;
};

const getBlockStyle = block => {
  switch (block.getType()) {
  case "blockquote":
    return styles.blockquote;
  case "alignleft":
    return styles.alignLeft;
  case "aligncenter":
    return styles.alignCenter;
  case "alignright":
    return styles.alignRight;
  case "alignjustify":
    return styles.alignJustify;
  default:
    return null;
  }
};

class CommentEditor extends Component {
  constructor(props) {
    super(props);
    this.state = { editorState: EditorState.createEmpty() };

    this.onChange = editorState => this.setState({ editorState });
    this.focus = () => this.refs.editor.focus();
    this.handleKeyCommand = command => this._handleKeyCommand(command);
    this.toggleBlockType = type => this._toggleBlockType(type);
    this.toggleInlineStyle = style => this._toggleInlineStyle(style);
    this.handleSubmit = values => this._handleSubmit(values);
  }

  _handleKeyCommand(command) {
    const {editorState} = this.state;
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  }

  _toggleBlockType(blockType) {
    this.onChange(
      RichUtils.toggleBlockType(
        this.state.editorState,
        blockType
      )
    );
  }

  _toggleInlineStyle(inlineStyle) {
    this.onChange(
      RichUtils.toggleInlineStyle(
        this.state.editorState,
        inlineStyle
      )
    );
  }

  _handleSubmit(values) {
    const { dispatch, commentsActions, sourceId, t } = this.props;
    const content = this.state.editorState.getCurrentContent();

    // content should not been empty
    if (!content.hasText()) {
      dispatch(displayAlert({ message: t("comments.commentShouldNotBeEmpty") }));
    } else {
      // Editor state clean after collapsing card component
      commentsActions.addComment(convertToRaw(content), values, sourceId);
    }
  }

  render() {
    const { editorState } = this.state;
    const {
      fields, handleSubmit, t, pristine, resetForm, submitting
    } = this.props;
    const isAnon = isAnonymous();
    return (
      <form onSubmit={handleSubmit(this.handleSubmit)}>
        {/* Controls */}
        <CardActions>
          <BlockStyleControls
            editorState={editorState}
            onClick={this.toggleBlockType}
          />
          <InlineStyleControls
            editorState={editorState}
            onClick={this.toggleInlineStyle}
          />
        </CardActions>

        {/* Editor */}
        <CardText onClick={this.focus}>
          <Editor
            blockStyleFn={getBlockStyle}
            editorState={editorState}
            ref="editor"
            placeholder={t("comments.editor.placeholder")}
            spellCheck={true}
            handleKeyCommand={this.handleKeyCommand}
            onChange={this.onChange}
          />
        </CardText>

        {/* User Form */}
        <CardText>
          {isAnon &&
            <TextField
              {...fields.name}
              hintText={t("comments.ui.yourNamePlaceholder")}
              floatingLabelText={t("comments.ui.yourName")}
              errorText={fields.name.touched && fields.name.error}
              maxLength={35}
            />
          }
          {isAnon &&
            < TextField
              {...fields.email}
              hintText={t("comments.ui.emailPlaceholder")}
              floatingLabelText={t("comments.ui.email")}
              errorText={fields.email.touched && fields.email.error}
              type="email"
            />
          }
          <CheckboxWrapper
            {...fields.notify}
            label={t("comments.ui.notifyOnReplies")}
            // style={styles.checkbox}
          />
        </CardText>
        <CardActions>
          <FlatButton
            label={t("comments.ui.post")}
            primary={true}
            type="submit"
            disabled={isAnon && (pristine || submitting)}
          />
          <FlatButton
            label={t("comments.ui.cancel")}
            disabled={isAnon && (pristine || submitting)}
            onTouchTap={resetForm}
          />
        </CardActions>
      </form>
    );
  }
}

CommentEditor.propTypes = {
  commentsActions: PropTypes.shape({
    addComment: PropTypes.func
  }).isRequired,
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  resetForm: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  sourceId: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired
};

export default translate(["core", "reaction-react"])(reduxForm({
  form: "newCommentForm",
  validate
})(CommentEditor));
