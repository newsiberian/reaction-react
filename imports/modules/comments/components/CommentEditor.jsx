import React, { Component, PropTypes } from "react";
import { translate } from "react-i18next/lib";
import { Editor } from "draft-js";
import Card from "material-ui/lib/card/card";
import CardActions from "material-ui/lib/card/card-actions";
import FlatButton from "material-ui/lib/flat-button";
import CardText from "material-ui/lib/card/card-text";
import BlockStyleControls from  "./BlockStyleControls.jsx";
import InlineStyleControls from "./InlineStyleControls.jsx";

const styles = {};

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
        <CardText>
          <BlockStyleControls
            editorState={commentEditorState}
            onClick={this.toggleBlockType}
          />
          <InlineStyleControls
            editorState={commentEditorState}
            onClick={this.toggleInlineStyle}
            commentsActions={commentsActions}
          />
          <Editor
            editorState={commentEditorState}
            ref="editor"
            handleKeyCommand={this.handleKeyCommand}
            onChange={editorState => commentsActions.updateComment(editorState)}
          />
        </CardText>
        <CardActions>
          <FlatButton label="Action1" />
          <FlatButton label="Action2" />
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

export default translate("core")(CommentEditor);
