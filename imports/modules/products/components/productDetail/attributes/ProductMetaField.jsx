import React, { PropTypes } from "react";
import Paper from "material-ui/lib/paper";
import Divider from "material-ui/lib/divider";

const styles = {
  container: {
    marginBottom: "1rem",
    paddingLeft: 0
  },
  list: {
    position: "relative",
    display: "block"
  },
  row: {
    padding: "5px 3px 5px",
    marginLeft: ".5rem",
    marginRight: ".5rem"
  }
};

const ProductMetaField = ({ metafields }) => (
  <Paper style={styles.container} zDepth={1}>
    {metafields.map((metafield, i) => (
      <li key={i} style={styles.list}>
        <div className="row" style={styles.row}>
          <div className="col-sm-4">{metafield.key}</div>
          <div className="col-sm-8">{metafield.value}</div>
        </div>
        <Divider />
      </li>
    ))}
  </Paper>
);

ProductMetaField.propTypes = {
  metafields: PropTypes.arrayOf(PropTypes.object)
};

export default ProductMetaField;
