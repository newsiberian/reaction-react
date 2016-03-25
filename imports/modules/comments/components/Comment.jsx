import { Meteor } from "meteor/meteor";
import React, { Component, PropTypes } from "react";
import { translate } from "react-i18next/lib";
import { ReactionCore } from "meteor/reactioncommerce:core";
import { Editor, EditorState, ContentState, RichUtils, convertFromRaw, convertToRaw } from "draft-js";
import { StyleSheet } from "react-look";
import { moment } from "meteor/momentjs:moment";
import Card from "material-ui/lib/card/card";
import CardActions from "material-ui/lib/card/card-actions";
import CardHeader from "material-ui/lib/card/card-header";
import FlatButton from "material-ui/lib/flat-button";
import CardText from "material-ui/lib/card/card-text";
import List from "material-ui/lib/lists/list";
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

class Comment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editorState: EditorState.createWithContent(
        ContentState.createFromBlockArray(convertFromRaw(props.comment.content))
      ),
      editable: false // Only admin could edit users comments
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
      this.setState({ editable: false });
    }
  }

  handleEditClick() {
    this.setState({ editable: true });
  }

  render() {
    const { editorState, editable } = this.state;
    const { comment, commentsActions, containerClassName, t } = this.props;

    // permissions
    const isAdmin = ReactionCore.hasPermission("manageComments");
    const isOwner = Meteor.userId() === comment.userId;
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
        <CardText>
          
        </CardText>
        <CardText>
          
        </CardText>

        {/* Actions */}
        <CardActions>
          <FlatButton label={t("comments.ui.reply")} />
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
