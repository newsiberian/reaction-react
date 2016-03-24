import React, { Component, PropTypes } from "react";
import { translate } from "react-i18next/lib";
import { EditorState, /*ContentState,*/ RichUtils, convertToRaw } from "draft-js";
import Card from "material-ui/lib/card/card";
import CardActions from "material-ui/lib/card/card-actions";
import CardHeader from "material-ui/lib/card/card-header";
import CardMedia from "material-ui/lib/card/card-media";
import CardTitle from "material-ui/lib/card/card-title";
import FlatButton from "material-ui/lib/flat-button";
import CardText from "material-ui/lib/card/card-text";
import { StyleSheet } from "react-look";
import CommentEditor from "./CommentEditor.jsx";

const styles = StyleSheet.create({
  container: {
    marginTop: "3rem",
    marginBottom: "3rem"
  }
});

class Comments extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { commentsActions, commentEditor, sourceId, t } = this.props;
    return (
      <div className={styles.container}>

        {/* Add comment section */}
        <h3>{t("comments.ui.comments")}</h3>
        <Card expanded={commentEditor.expanded}>
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
          initialValues={{
            name: "",
            mail: "",
            notify: true
          }}
          sourceId={sourceId}
        />
          </CardText>
        </Card>

        {/* Comments list */}
      </div>
    );
  }
}

Comments.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.object),
  commentsActions: PropTypes.shape({
    addComment: PropTypes.func,
    updateComment: PropTypes.func,
    toggleCommentWindow: PropTypes.func
  }).isRequired,
  commentEditor: PropTypes.shape({
    expanded: PropTypes.bool
  }).isRequired,
  sourceId: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired
};

export default translate("reaction-react")(Comments);
