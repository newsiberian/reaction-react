import React, { PropTypes } from "react";
import { translate } from "react-i18next/lib";
import FlatButton from "material-ui/lib/flat-button";
import { styles } from "../../styles/cartDrawer";

// we use styles because not to use `!important`
const emptyCartButton = {
  width: "100%",
  margin: "0 1rem 2rem 0",
  fontSize: 17,
  lineHeight: "40px"
};

const EmptyCartDrawer = props => {
  const { cartActions, t } = props;
  console.log("EmptyCartDrawer rendering...");
  return (
   <div>
     <div className={styles.container}>
       <h1 className={styles.emptyCartHeader}>
         <i className="fa fa-frown-o" style={{ fontSize: "1.5em" }} />
         {t("cartDrawer.empty")}
       </h1>
     </div>
     <FlatButton
       backgroundColor="#f0ad4e"
       hoverColor="#DEA048"
       label={t("cartDrawer.keepShopping")}
       onTouchTap={cartActions.toggleCart}
       style={emptyCartButton}
       labelStyle={{ color: "#fff" }}
     />
   </div>
  );
};

EmptyCartDrawer.propTypes = {
  cartActions: PropTypes.shape({
    toggleCart: PropTypes.func
  }).isRequired,
  t: PropTypes.func
};

export default translate("core")(EmptyCartDrawer);
