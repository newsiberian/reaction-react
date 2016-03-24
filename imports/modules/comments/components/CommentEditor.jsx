import React, { Component, PropTypes } from "react";
import { translate } from "react-i18next/lib";
import { Editor, EditorState, /*ContentState,*/ RichUtils, convertToRaw } from "draft-js";
import { reduxForm } from "redux-form";
import { StyleSheet } from "react-look";
import { displayAlert } from "../../layout/actions/alert";
import { Roles } from "meteor/alanning:roles";
import i18next from "i18next";
import Card from "material-ui/lib/card/card";
import CardActions from "material-ui/lib/card/card-actions";
import FlatButton from "material-ui/lib/flat-button";
import CardHeader from "material-ui/lib/card/card-header";
import CardText from "material-ui/lib/card/card-text";
import TextField from "material-ui/lib/text-field";
import CheckboxWrapper from "../../layout/components/CheckboxWrapper.jsx";
import BlockStyleControls from  "./BlockStyleControls.jsx";
import InlineStyleControls from "./InlineStyleControls.jsx";
export const fields = [
  "name",
  "email",
  "notify"
];

const isAnonimous = () => {
  const shopId = ReactionCore.getShopId();
  const user = Accounts.findOne({
    userId: Meteor.userId()
  });
  if(Roles.userIsInRole(user, "anonymous", shopId) && !this.value) {
    return "required"; // todo i18n?
  }
};

const validate = values => {
  const errors = {};

  if (!values.name) {
    errors.name = i18next.t("error.isRequired", {
      field: i18next.t("accountsUI.name")
    });
  }
  if (!values.email) {
    errors.email = i18next.t("error.isRequired", {
      field: i18next.t("accountsUI.email")
    });
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = i18next.t("accountsUI.error.emailDoesntMatchTheCriteria");
  }

  return errors;
};

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
      commentsActions.addComment(convertToRaw(content), values, sourceId);
    }
  }

  render() {
    const { editorState } = this.state;
    const {
      fields: { name, email, notify }, handleSubmit, t, pristine, resetForm, submitting
    } = this.props;
    return (
      <form onSubmit={handleSubmit(this.handleSubmit)}>
        <Card>
          <CardHeader
            title={t("comments.ui.leaveComment")}
            // subtitle="Card subtitle"
            actAsExpander={true}
            showExpandableButton={true}
          />

          {/* Controls */}
          <CardActions expandable={true}/* onClick={this.focus}*/>
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
          <CardText expandable={true} onClick={this.focus}>
            <Editor
              blockStyleFn={getBlockStyle}
              editorState={editorState}
              ref="editor"
              placeholder={t("comments.editor.placeholder")}
              spellCheck={true}
              handleKeyCommand={this.handleKeyCommand}
              // onChange={editorState => commentsActions.updateComment(editorState)}
              onChange={this.onChange}
            />
          </CardText>

          {/* User Form */}
            <CardText expandable={true}>
              <TextField
                {...name}
                hintText={t("comments.ui.yourNamePlaceholder")}
                floatingLabelText={t("comments.ui.yourName")}
                errorText={name.touched && name.error}
                maxLength={35}
              />
              <TextField
                {...email}
                hintText={t("comments.ui.emailPlaceholder")}
                floatingLabelText={t("comments.ui.email")}
                errorText={email.touched && email.error}
                type="email"
              />
              <CheckboxWrapper
                {...notify}
                label={t("comments.ui.notifyOnReplies")}
                // style={styles.checkbox}
              />
            </CardText>
            <CardActions expandable={true}>
              <FlatButton
                label={t("comments.ui.post")}
                primary={true}
                type="submit"
                disabled={pristine || submitting}
              />
              <FlatButton
                label={t("comments.ui.cancel")}
                disabled={pristine || submitting}
                onClick={resetForm}
              />
            </CardActions>
        </Card>
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
  fields,
  validate
})(CommentEditor));
