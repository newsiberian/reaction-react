import React, { PropTypes } from "react";

const styles = {
  container: {
    marginBottom: "1rem",
    paddingLeft: 0
  },
  list: {
    border: "1px solid #dddddd",
    position: "relative",
    display: "block",
    padding: "5px 3px 5px",
    marginLeft: ".5rem",
    marginRight: ".5rem"
  }
};

const ProductMetaField = ({ metafields }) => (
  <ul style={styles.container}>
  {metafields.map((metafield, i) => {
    let borderStyle = {};
    if (!i) {
      borderStyle = {
        borderTopRightRadius: 4,
        borderTopLeftRadius: 4
      };
    } else if (i === metafields.length - 1) {
      borderStyle = {
        borderBottomRightRadius: 4,
        borderBottomLeftRadius: 4
      };
    }
    return (
      <li key={i} style={Object.assign({}, styles.list, borderStyle)}>
        <div className="row">
          <div className="col-sm-4">{metafield.key}</div>
          <div className="col-sm-8">{metafield.value}</div>
        </div>
      </li>
    );
  })}
  </ul>
);

//const ProductMetaField = ({ metafields }) => (
//  <table>
//    <tbody>
//      {metafields.map((metafield, i) => (
//        <tr key={i}>
//          <td>{metafield.key}</td>
//          <td>{metafield.value}</td>
//        </tr>
//      ))}
//    </tbody>
//  </table>
//);

ProductMetaField.propTypes = {
  metafields: PropTypes.arrayOf(PropTypes.object)
};

export default ProductMetaField;
