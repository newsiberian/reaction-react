import { Meteor } from "meteor/meteor";
import React, { Component, PropTypes } from "react";
import { translate } from "react-i18next/lib";
import { ReactionCore } from "meteor/reactioncommerce:core";
import { Editor, EditorState, ContentState, RichUtils, convertFromRaw, convertToRaw } from "draft-js";
import CommentEditor from "./CommentEditor.jsx";
import { moment } from "meteor/momentjs:moment";
import { isAnonymous } from "../../../client/helpers/permissions";
import { getChildComments, getBlockStyle } from "../../../client/helpers/comments";
import Card from "material-ui/lib/card/card";
import CardActions from "material-ui/lib/card/card-actions";
import CardHeader from "material-ui/lib/card/card-header";
import FlatButton from "material-ui/lib/flat-button";
import CardText from "material-ui/lib/card/card-text";
import Subheader from "material-ui/lib/Subheader";
import Reply from "./Reply.jsx";
import BlockStyleControls from  "./BlockStyleControls.jsx";
import InlineStyleControls from "./InlineStyleControls.jsx";

const initialValues = () => {
  if (isAnonymous()) {
    return {
      name: "",
      email: "",
      notify: true
    };
  }
  return {};
};

const fields = () => {
  if (isAnonymous()) {
    return [
      "name",
      "email"
    ];
  }
  return [];
};

class Comment extends Component {
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
    this.handleCloseReplyForm = this._handleCloseReplyForm.bind(this);
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
      this.setState({ editable: false });
    }
  }

  handleEditClick() {
    this.setState({ editable: true });
  }

  handleReplyClick() {
    this.setState({ showReplyForm: true });
  }

  _handleCloseReplyForm() {
    this.setState({ showReplyForm: false });
  }

  render() {
    const { editorState, editable, showReplyForm } = this.state;
    const { comment, commentsActions, containerClassName, t } = this.props;
    const replies = getChildComments(comment._id);
    // permissions
    const isAdmin = ReactionCore.hasPermission("manageComments");
    const isOwner = Meteor.userId() === comment.userId;
    // TODO add number of replies which should looks beautiful
    return (
      <Card className={containerClassName}>
        <CardHeader
          title={comment.name || t("accountsUI.guest")}
          // we prefer `updatedAt`
          subtitle={moment(comment.updatedAt || comment.createdAt).fromNow()}
          // avatar="http://lorempixel.com/100/100/nature/"
        />
        {/* Controls */}
        {((isAdmin || isOwner) && editable) &&
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
        }

        {/* Editor */}
        <CardText>
          <Editor
            blockStyleFn={getBlockStyle}
            editorState={editorState}
            readOnly={!editable}
            handleKeyCommand={this.handleKeyCommand}
            onChange={this.onChange}
          />
        </CardText>

        {/* Replies */}
        {replies.length &&
          <CardText style={{ backgroundColor: "#F8F8F8" }}>
            <Subheader>{t("comments.ui.replies")}</Subheader>
            {replies.map(reply =>
              <Reply
                key={reply._id}
                comment={reply}
                commentsActions={commentsActions}
              />
            )}
          </CardText>
        }
        <CardText>
          {showReplyForm && <CommentEditor
            commentsActions={commentsActions}
            initialValues={initialValues()}
            isReply={true}
            fields={fields()}
            parentId={comment._id}
            sourceId={comment.sourceId}
            onCloseReplyForm={this.handleCloseReplyForm}
          />}
        </CardText>

        {/* Actions */}
        <CardActions>
          {! showReplyForm &&
            <FlatButton
              label={t("comments.ui.reply")}
              onTouchTap={() => this.handleReplyClick()}
            />
          }
          {(isAdmin && !editable) &&
            <FlatButton
              label={t("comments.ui.edit")}
              onTouchTap={() => this.handleEditClick()}
            />
          }
          {(isAdmin && editable) &&
            <FlatButton
              label={t("comments.ui.save")}
              onTouchTap={() => this.handleSave()}
            />
          }
          {(isAdmin && comment.workflow.status === "new") &&
            <FlatButton
              label={t("comments.ui.approve")}
              onTouchTap={() => commentsActions.approveComment(comment._id)}
            />
          }
          {isAdmin &&
            <FlatButton
              label={t("comments.ui.remove")}
              onTouchTap={() => commentsActions.removeComment(comment._id)}
            />
          }
        </CardActions>
      </Card>
    );
  }
}

Comment.propTypes = {
  comment: PropTypes.object,
  commentsActions: PropTypes.shape({
    approveComment: PropTypes.func,
    removeComment: PropTypes.func,
    toggleCommentWindow: PropTypes.func,
    updateComment: PropTypes.func
  }).isRequired,
  containerClassName: PropTypes.string,
  dispatch: PropTypes.func,
  t: PropTypes.func
};

export default translate(["core", "reaction-react"])(Comment);
