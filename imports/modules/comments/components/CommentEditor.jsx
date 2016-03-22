import React, { Component, PropTypes } from "react";
import { translate } from "react-i18next/lib";
import { Editor } from "draft-js";
import Card from "material-ui/lib/card/card";
import CardActions from "material-ui/lib/card/card-actions";
import FlatButton from "material-ui/lib/flat-button";
import CardText from "material-ui/lib/card/card-text";

class CommentEditor extends Component {
  render() {
    const { commentsActions, commentEditorState, t } = this.props;
    return (
      <Card>
        <CardText>
          <FlatButton
            label="Bold"
            onClick={editorState => commentsActions.toggleBold(editorState)}
          />
          <Editor
            editorState={commentEditorState}
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
    toggleBold: PropTypes.func
  }).isRequired,
  commentEditorState: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired
};

export default translate("core")(CommentEditor);
