import React, {Component, PropTypes} from "react";
import {translate} from "react-i18next/lib";
import { ReactionCore } from "meteor/reactioncommerce:core";
import { Editor, EditorState, ContentState, RichUtils, convertFromRaw, convertToRaw } from "draft-js";
import { StyleSheet } from "react-look";
import { moment } from "meteor/momentjs:moment";
import { getBlockStyle } from "../../../client/helpers/comments";

class Reply extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editorState: EditorState.createWithContent(
        ContentState.createFromBlockArray(convertFromRaw(props.comment.content))
      ),
      editable: false, // Only admin could edit users comments
      showReplyForm: false
    };
    this.onChange = editorState => this.setState({ editorState });
    this.handleKeyCommand = command => this._handleKeyCommand(command);
    this.toggleBlockType = type => this._toggleBlockType(type);
    this.toggleInlineStyle = style => this._toggleInlineStyle(style);
    this.handleSave = () => this._handleSave();
  }

  componentWillReceiveProps(nextProps) {
    // We use so complicated logic here because EditorState doesn't applies new
    // state from nextProps automatically. We need to convert new `content`
    // manually on `content` update.
    let changed = false;
    if (typeof this.props.comment.updatedAt !== "undefined") {
      if (this.props.comment.updatedAt.getTime() !==
        nextProps.comment.updatedAt.getTime()) {
        changed = true;
      }
    } else if (typeof nextProps.comment.updatedAt !== "undefined") {
      // if `updatedAt` is not defined in previous state but defined in next,
      // this mean the EditorState changed
      changed = true;
    }
    if(changed) {
      this.setState({
        editorState: EditorState.createWithContent(
          ContentState.createFromBlockArray(convertFromRaw(nextProps.comment.content))
        )
      });
    }
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

  _handleSave() {
    const { comment, commentsActions, dispatch, t } = this.props;
    // this.state.editorState.push();
    const content = this.state.editorState.getCurrentContent();

    // content should not been empty
    if (!content.hasText()) {
      dispatch(displayAlert({ message: t("comments.commentShouldNotBeEmpty") }));
    } else {
      commentsActions.updateComment(comment._id, convertToRaw(content));
      // this.setState({ editable: false });
    }
  }

  handleEditClick() {
    this.setState({ editable: true });
  }

  render() {
    const { editorState, editable, showReplyForm } = this.state;
    const { comment, commentsActions, t } = this.props;
    const isAdmin = ReactionCore.hasPermission("manageComments");
    return (
      <div>
        <Editor
          blockStyleFn={getBlockStyle}
          editorState={editorState}
          readOnly={!editable}
          handleKeyCommand={this.handleKeyCommand}
          onChange={this.onChange}
        />
      </div>
    );
  }
}

Reply.propTypes = {
  comment: PropTypes.object,
  commentsActions: PropTypes.shape({
    approveComment: PropTypes.func,
    removeComment: PropTypes.func,
    toggleCommentWindow: PropTypes.func,
    updateComment: PropTypes.func
  }).isRequired,
  dispatch: PropTypes.func,
  t: PropTypes.func
};

export default translate(["core", "reaction-react"])(Reply);
