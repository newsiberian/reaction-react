import React, { Component, PropTypes } from "react";
import { translate } from "react-i18next/lib";
import Card from "material-ui/lib/card/card";
import CardActions from "material-ui/lib/card/card-actions";
import FlatButton from "material-ui/lib/flat-button";
import CardText from "material-ui/lib/card/card-text";

class NewComment extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { commentsActions, t } = this.props;
    return (
      <Card>
        <CardText>text here</CardText>
        <CardActions>
          <FlatButton label="Action1" />
          <FlatButton label="Action2" />
        </CardActions>
      </Card>
    );
  }
}

NewComment.propTypes = {
  commentsActions: PropTypes.shape({
    addComment: PropTypes.func,
    updateComment: PropTypes.func
  }),
  t: PropTypes.func.isRequired
};

export default translate("core")(NewComment);
