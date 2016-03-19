import React, { PropTypes } from "react";

const ProductMetaField = ({ metafields }) => (
  <table className="ui celled collapsing table">
    <tbody>
      {metafields.map((metafield, i) => (
        <tr key={i}>
          <td>{metafield.key}</td>
          <td>{metafield.value}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

ProductMetaField.propTypes = {
  metafields: PropTypes.arrayOf(PropTypes.object)
};

export default ProductMetaField;
