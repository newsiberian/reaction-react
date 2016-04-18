import React, { Component, PropTypes } from "react";
import { translate } from "react-i18next/lib";
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from "material-ui/Table";
import DashboardHeader from "../DashboardHeader.jsx";
import { layoutStyles } from "../../../layout/styles/layout";

const styles = {
  base: {
    paddingTop: "1rem",
    paddingBottom: "1rem"
  }
};

class Management extends Component {
  render() {
    const { shipping, t } = this.props;
    return (
      <div style={layoutStyles.parent}>
        <section style={layoutStyles.section}>
          { /* header section */ }
          <DashboardHeader label={t("admin.dashboard.commentsLabel")} />

          { /* main section */ }
          <div className="container-fluid" style={styles.base}>
            <div className="row">
              <div className="col-xs">
                {11111111111111111111}
              </div>
              <div className="col-xs">
                {22222222222222222222}
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

Management.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.object),
  commentsActions: PropTypes.shape({
    approveComment: PropTypes.func,
    removeComment: PropTypes.func,
    toggleCommentWindow: PropTypes.func,
    updateComment: PropTypes.func
  }).isRequired,
  t: PropTypes.func
};

export default translate(["core", "reaction-react"])(Management);
