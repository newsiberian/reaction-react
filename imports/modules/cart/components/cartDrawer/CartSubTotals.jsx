import React, { PropTypes } from "react";
import { translate } from "react-i18next";
import { formatPrice } from "../../../../client/helpers/i18n";
import { tableStyles } from "../../styles/cartSubTotals";
import { cardStyles } from "../../styles/cartDrawer";
// import Table from "material-ui/lib/table/table";
// import TableHeaderColumn from "material-ui/lib/table/table-header-column";
// import TableRow from "material-ui/lib/table/table-row";
// import TableHeader from "material-ui/lib/table/table-header";
// import TableRowColumn from "material-ui/lib/table/table-row-column";
// import TableBody from "material-ui/lib/table/table-body";

// const styles = {
//   rowHeight: {
//     height: 35.5
//   }
// };

const CartSubTotals = ({ cart, locale, t }) => {
  console.log("CartSubTotals rendering...");
  // This table looks cool, but I suppose it will slow swiper a lot, because
  // of table complexity
  // return (
  //   <div className="slick-slide" style={cardStyles}>
  //     <Table
  //       displaySelectAll={false}
  //       adjustForCheckbox={false}
  //       height="225"
  //     >
  //       <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
  //         <TableRow style={styles.rowHeight}>
  //           <TableHeaderColumn colSpan="2" style={styles.rowHeight}>
  //             <b>{t("cartSubTotals.head")}</b>
  //           </TableHeaderColumn>
  //         </TableRow>
  //       </TableHeader>
  //
  //       <TableBody displayRowCheckbox={false}>
  //         <TableRow
  //           displayBorder={false}
  //           selectable={false}
  //           style={styles.rowHeight}
  //         >
  //           <TableRowColumn style={styles.rowHeight}>
  //             {t("cartSubTotals.items")}
  //           </TableRowColumn>
  //           <TableRowColumn style={styles.rowHeight}>
  //             {cart.cartCount()}
  //           </TableRowColumn>
  //         </TableRow>
  //         <TableRow
  //           displayBorder={false}
  //           selectable={false}
  //           style={styles.rowHeight}
  //         >
  //           <TableRowColumn style={styles.rowHeight}>
  //             {t("cartSubTotals.subtotal")}
  //           </TableRowColumn>
  //           <TableRowColumn style={styles.rowHeight}>
  //             {formatPrice(cart.cartSubTotal(), locale)}
  //           </TableRowColumn>
  //         </TableRow>
  //         <TableRow
  //           displayBorder={false}
  //           selectable={false}
  //           style={styles.rowHeight}
  //         >
  //           <TableRowColumn style={styles.rowHeight}>
  //             {t("cartSubTotals.shipping")}
  //           </TableRowColumn>
  //           <TableRowColumn style={styles.rowHeight}>
  //             {formatPrice(cart.cartShipping(), locale)}
  //           </TableRowColumn>
  //         </TableRow>
  //         <TableRow
  //           displayBorder={false}
  //           selectable={false}
  //           style={styles.rowHeight}
  //         >
  //           <TableRowColumn style={styles.rowHeight}>
  //             {t("cartSubTotals.tax")}
  //           </TableRowColumn>
  //           <TableRowColumn style={styles.rowHeight}>
  //             {formatPrice(cart.cartTaxes(), locale)}
  //           </TableRowColumn>
  //         </TableRow>
  //         <TableRow
  //           displayBorder={false}
  //           selectable={false}
  //           style={styles.rowHeight}
  //         >
  //           <TableRowColumn style={styles.rowHeight}>
  //             {t("cartSubTotals.total")}
  //           </TableRowColumn>
  //           <TableRowColumn style={styles.rowHeight}>
  //             {formatPrice(cart.cartTotal(), locale)}
  //           </TableRowColumn>
  //         </TableRow>
  //       </TableBody>
  //     </Table>
  //   </div>
  // );
  return (
    <div className="slick-slide" style={cardStyles}>
      <table
        // className="ui very basic very compact collapsing celled table"
        style={tableStyles}
      >
        <thead>
          <tr><th colSpan="2">{t("cartSubTotals.head")}</th></tr>
        </thead>
        <tbody>
          <tr><td>{t("cartSubTotals.items")}</td><td>{cart.cartCount()}</td></tr>
          <tr><td>{t("cartSubTotals.subtotal")}</td><td>{formatPrice(cart.cartSubTotal(), locale)}</td></tr>
          <tr><td>{t("cartSubTotals.shipping")}</td><td>{formatPrice(cart.cartShipping(), locale)}</td></tr>
          <tr><td>{t("cartSubTotals.tax")}</td><td>{formatPrice(cart.cartTaxes(), locale)}</td></tr>
          <tr><td>{t("cartSubTotals.total")}</td><td>{formatPrice(cart.cartTotal(), locale)}</td></tr>
        </tbody>
      </table>
    </div>
  );
};

CartSubTotals.propTypes = {
  cart: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    items: PropTypes.array,
    cartCount: PropTypes.func,
    cartSubTotal: PropTypes.func,
    cartShipping: PropTypes.func,
    cartTaxes: PropTypes.func,
    cartTotal: PropTypes.func
  }),
  locale: PropTypes.shape({
    currency: PropTypes.object,
    language: PropTypes.string,
    locale: PropTypes.object,
    shopCurrency: PropTypes.object
  }).isRequired,
  t: PropTypes.func
};

export default translate("core")(CartSubTotals);
