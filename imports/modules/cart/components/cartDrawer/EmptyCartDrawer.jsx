import React, { PropTypes } from "react";
import { translate } from "react-i18next/lib";
import FlatButton from "material-ui/FlatButton";
import { cartButton, styles } from "../../styles/cartDrawer";

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
       style={cartButton}
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
