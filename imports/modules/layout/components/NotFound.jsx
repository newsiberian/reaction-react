import React, { PropTypes } from "react";
import { translate } from "react-i18next/lib";
import FontIcon from "material-ui/FontIcon";

const styles = {
  container: {
    minHeight: "80vh"
  },
  header: {
    fontSize: "2rem",
    marginTop: "2rem"
  },
  icon: {
    fontSize: "4rem"
  }
};

const NotFound = props => {
  const { t } = props;
  return (
    <section className="row center-xs" style={styles.container}>
      <h1 className="col-xs-10" style={styles.header}>
        <FontIcon
          className="fa fa-exclamation-triangle"
          style={styles.icon}
        />
        <br />
        {t("app.warning")}
        {" "}
        {t("app.pageNotFound")}
      </h1>
    </section>
  );
};

NotFound.propTypes = {
  t: PropTypes.func.isRequired
};

export default translate("core")(NotFound);
