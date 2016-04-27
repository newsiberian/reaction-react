import React, { Component, PropTypes } from "react";
import { translate } from "react-i18next";
import { layoutStyles } from "../../../layout/styles/layout";
// import ReactDataGrid from "react-data-grid/addons";
import Griddle from "griddle-react";
import DashboardHeader from "../DashboardHeader.jsx";

const styles = {
  base: {
    paddingTop: "1rem",
    paddingBottom: "1rem"
  }
};

//A rowGetter function is required by the grid to retrieve a row for a given index
// const rowGetter = i => comments[i];

const columns = [
  {
    key: "avatar",
    name: "Avatar"
  }, {
    key: "name",
    name: "Name"
  }, {
    key: "email",
    name: "Email"
  }, /*{
    key: "createdAt",
    name: "Created At"
  },*/ {
    key: "workflow.status",
    name: "Status"
  }
];

class Management extends Component {
  render() {
    const { comments, commentsActions, t } = this.props;
    return (
      <div style={layoutStyles.parent}>
        <section style={layoutStyles.section}>
          { /* header section */ }
          <DashboardHeader label={t("admin.dashboard.commentsLabel")} />

          { /* main section */ }
          <div className="container-fluid" style={styles.base}>
            <div className="row">
              <div className="col-xs">
                <Griddle results={comments} />
                {/*<ReactDataGrid
                  rowKey="_id"
                  columns={columns}
                  rowGetter={i => comments[i]}
                  rowsCount={comments.length}
                  enableRowSelect="multi"
                  minHeight={500}
                  // onRowSelect={this.onRowSelect}
                />*/}
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
