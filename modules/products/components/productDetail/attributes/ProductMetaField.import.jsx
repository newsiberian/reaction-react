/**
 * @function ProductMetaField
 * @description Stateless Functional Component which renders table with
 * metafields
 */
export default ({ metafields }) => (
  <table className="ui celled collapsing table">
    <tbody>
      { metafields.map((metafield, i) => {
        return(
        <tr key={ i }>
          <td>{ metafield.key }</td>
          <td>{ metafield.value }</td>
        </tr>
        );
      }) }
    </tbody>
  </table>
);
