import React, { Component, PropTypes } from "react";
import { translate } from "react-i18next/lib";
import { Editor } from "draft-js";
import { StyleSheet } from "react-look";
import Card from "material-ui/lib/card/card";
import CardActions from "material-ui/lib/card/card-actions";
import FlatButton from "material-ui/lib/flat-button";
import CardHeader from "material-ui/lib/card/card-header";
import CardText from "material-ui/lib/card/card-text";
import TextField from "material-ui/lib/text-field";
import Checkbox from "material-ui/lib/checkbox";
import BlockStyleControls from  "./BlockStyleControls.jsx";
import InlineStyleControls from "./InlineStyleControls.jsx";

const styles = StyleSheet.create({
  blockquote: {
    borderLeft: "5px solid #eee",
    color: "#666",
    fontFamily: "'Hoefler Text', 'Georgia', serif",
    fontStyle: "italic",
    margin: "16px 0",
    padding: "10px 20px"
  }
});

const getBlockStyle = block => {
  switch (block.getType()) {
  case "blockquote":
    return styles.blockquote;
  default:
    return null;
  }
};

class CommentEditor extends Component {
  constructor(props) {
    super(props);
    this.focus = () => this.refs.editor.focus();
    this.handleKeyCommand = command => this._handleKeyCommand(command);
    this.toggleBlockType = type => this._toggleBlockType(type);
    this.toggleInlineStyle = style => this._toggleInlineStyle(style);
  }

  _handleKeyCommand(command) {
    this.props.commentsActions.handleKeyCommand(
      this.props.commentEditorState,
      command
    );
  }

  _toggleBlockType(blockType) {
    this.props.commentsActions.toggleBlockType(
      this.props.commentEditorState,
      blockType
    );
  }

  _toggleInlineStyle(inlineStyle) {
    this.props.commentsActions.toggleInlineStyle(
      this.props.commentEditorState,
      inlineStyle
    );
  }

  render() {
    const { commentsActions, commentEditorState, t } = this.props;
    return (
      <Card>
        <CardHeader
          title="Leave comment"
          // subtitle="Card subtitle"
          actAsExpander={true}
          showExpandableButton={true}
        />

        {/* Controls */}
        <CardActions expandable={true}>
          <BlockStyleControls
            editorState={commentEditorState}
            onClick={this.toggleBlockType}
          />
          <InlineStyleControls
            editorState={commentEditorState}
            onClick={this.toggleInlineStyle}
            commentsActions={commentsActions}
          />
        </CardActions>

        {/* Editor */}
        <CardText expandable={true}>
          <Editor
            blockStyleFn={getBlockStyle}
            editorState={commentEditorState}
            ref="editor"
            placeholder={t("comments.editor.placeholder")}
            spellCheck={true}
            handleKeyCommand={this.handleKeyCommand}
            onChange={editorState => commentsActions.updateComment(editorState)}
          />
        </CardText>

        {/* User Form */}
        <CardText expandable={true}>
          <TextField
            // defaultValue="Default Value"
            hintText="How others will refer to you?"
            floatingLabelText="Your name"
          />
          <TextField
            // id="text-field-default"
            // defaultValue="Default Value"
            hintText="Your Email"
            floatingLabelText="Email"
          />
          <Checkbox
            label="Notify on replies"
            // style={styles.checkbox}
          />
        </CardText>
        <CardActions expandable={true}>
          <FlatButton label="Post" primary={true} />
          <FlatButton label="Cancel" />
        </CardActions>
      </Card>
    );
  }
}

CommentEditor.propTypes = {
  commentsActions: PropTypes.shape({
    addComment: PropTypes.func,
    updateComment: PropTypes.func,
    toggleInlineStyle: PropTypes.func
  }).isRequired,
  commentEditorState: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired
};

export default translate("reaction-react")(CommentEditor);
