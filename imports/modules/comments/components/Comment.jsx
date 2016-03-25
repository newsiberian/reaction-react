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
      editable: false // admin or owner could edit comment
    };
  }

  handleEditClick() {
    this.state({ editable: true });
  }

  render() {
    const { editorState, editable } = this.state;
    // const contentState = editorState.getCurrentContent();
    const { comment, commentsActions, containerClassName, t } = this.props;

    // permissions
    const isAdmin = ReactionCore.hasPermission("manageComments");
    const isOwner = Meteor.userId() === comment.userId;
    return (
      <Card className={containerClassName}>
        <CardHeader
          title={comment.name || t("accountsUI.guest")}
          subtitle={moment(comment.createdAt).fromNow()}
          // avatar="http://lorempixel.com/100/100/nature/"
        />
        <CardText>
          <Editor
            blockStyleFn={getBlockStyle}
            editorState={editorState}
            readOnly={true}
          />
        </CardText>
        <CardActions>
          <FlatButton label={t("comments.ui.reply")} />
          {(isAdmin || isOwner) &&
            <FlatButton
              label={t("comments.ui.edit")}
              onTouchTap={() => handleEditClick()}
            />
          }
          {editable &&
            <FlatButton
              label={t("comments.ui.save")}
              onTouchTap={() => commentsActions.updateComment(comment._id)}
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
  t: PropTypes.func.isRequired
};

export default translate(["core", "reaction-react"])(Comment);
