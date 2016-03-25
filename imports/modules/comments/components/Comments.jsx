import React, { Component, PropTypes } from "react";
import { translate } from "react-i18next/lib";
import { isAnonymous } from "../../../client/helpers/permissions";
import Card from "material-ui/lib/card/card";
import CardActions from "material-ui/lib/card/card-actions";
import CardHeader from "material-ui/lib/card/card-header";
import FlatButton from "material-ui/lib/flat-button";
import CardText from "material-ui/lib/card/card-text";
import { StyleSheet } from "react-look";
import CommentEditor from "./CommentEditor.jsx";
import Comment from "./Comment.jsx";

const styles = StyleSheet.create({
  container: {
    marginTop: "3rem",
    marginBottom: "3rem"
  },
  commentContainer: {
    marginTop: "1rem",
    marginBottom: "1rem"
  }
});

const initialValues = () => {
  if (isAnonymous()) {
    return {
      name: "",
      email: "",
      notify: true
    };
  }
  return {
    notify: true
  };
};

const fields = () => {
  if (isAnonymous()) {
    return [
      "name",
      "email",
      "notify"
    ];
  }
  return [
    "notify"
  ];
};

class Comments extends Component {
  constructor(props) {
    super(props);
  }
  // FIXME when user adds new comment, sorting works incorrect for admin
  render() {
    const { comments, commentsActions, commentEditor, sourceId, t } = this.props;
    return (
      <div className={styles.container}>

        {/* Add comment section */}
        <h3>{t("comments.ui.comments")}</h3>
        <Card expanded={commentEditor.expanded} className={styles.commentContainer}>
          <CardHeader
            title={t("comments.ui.leaveComment")}
            // subtitle="Card subtitle"
            actAsExpander={true}
            showExpandableButton={true}
            onClick={() => commentsActions.toggleCommentWindow()}
          />
          <CardText expandable={true}>
            <CommentEditor
              commentsActions={commentsActions}
              initialValues={initialValues()}
              fields={fields()}
              sourceId={sourceId}
            />
          </CardText>
        </Card>

        {/* Comments list */}
        {comments && comments.map(comment =>
          <Comment
            key={comment._id}
            containerClassName={styles.commentContainer}
            comment={comment}
            commentsActions={commentsActions}
          />
        )}
      </div>
    );
  }
}

Comments.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.object),
  commentsActions: PropTypes.shape({
    addComment: PropTypes.func,
    approveComment: PropTypes.func,
    removeComment: PropTypes.func,
    toggleCommentWindow: PropTypes.func,
    updateComment: PropTypes.func
  }).isRequired,
  commentEditor: PropTypes.shape({
    expanded: PropTypes.bool
  }).isRequired,
  sourceId: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired
};

export default translate("reaction-react")(Comments);
