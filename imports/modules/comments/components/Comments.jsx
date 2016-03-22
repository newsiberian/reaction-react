import React, { Component, PropTypes } from "react";
import { translate } from "react-i18next/lib";
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
    const { commentsActions, commentEditorState, t } = this.props;
    return (
      <div className={styles.container}>
        {/* Add comment section */}
        <h3>Comments</h3>
        <CommentEditor
          commentsActions={commentsActions}
          commentEditorState={commentEditorState}
        />

        {/* Comments list */}
      </div>
    );
  }
}

Comments.propTypes = {
  commentsActions: PropTypes.shape({
    addComment: PropTypes.func,
    updateComment: PropTypes.func,
    toggleBold: PropTypes.func
  }).isRequired,
  commentEditorState: PropTypes.object,
  t: PropTypes.func.isRequired
};

export default translate("core")(Comments);
