import React, { Component, PropTypes } from "react";
import { translate } from "react-i18next/lib";
import FlatButton from "material-ui/lib/flat-button";
import FontIcon from "material-ui/lib/font-icon";

const styles = {
  buttonGroup: {
    display: "flex",
    position: "absolute",
    // 15 is correct number of px's to put buttons in corner
    right: 15,
    top: 15,
    width: "6rem" // don"t know why, but this seems to be work. And it"s better
    // then "40%"
  },
  button: {
    minWidth: "3rem",
    borderRadius: 0
  },
  icon: {
    fontSize: 18
  }
};

class GridControls extends Component {
  // todo do we really need this check here?
  //shouldComponentUpdate(nextProps) {
  //  return this.props.isVisible !== nextProps.isVisible;
  //}

  handleSettingsClick() {
    // we need to call two actionCreators here
    this.props.layoutSettingsActions.openSettings({
      name: "ProductsSettingsContainer"
    });
    this.props.selectProduct(this.props.product._id);
  }

  render() {
    const { product, publishProduct, t } = this.props;
    const className = product.isVisible ? "fa fa-eye" : "fa fa-eye-slash";

    console.log("GridControls: rendering...");
    // todo добавить недостающие свойства кнопкам
    return (
      <div style={styles.buttonGroup}>
        <FlatButton
          backgroundColor="#cacbcd"
          icon={<FontIcon className={className} style={styles.icon} />}
          style={styles.button}
          onClick={() =>
           publishProduct([{
             _id: product._id,
             doVisible: !product.isVisible,
             title: product.title // we need it to display messages
           }])}
          title={t("productDetailEdit.publish")}
        />
        <FlatButton
          backgroundColor="#cacbcd"
          icon={<FontIcon className="fa fa-gear" style={styles.icon} />}
          style={styles.button}
          onClick={() => this.handleSettingsClick()}
          title={t("productDetailEdit.moreOptions")}
        />
      </div>
    );
  }
}

GridControls.propTypes = {
  layoutSettingsActions: PropTypes.shape({
    openSettings: PropTypes.func,
    closeSettings: PropTypes.func
  }).isRequired,
  product: PropTypes.object.isRequired,
  publishProduct: PropTypes.func.isRequired,
  selectProduct: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired
};

export default translate("core")(GridControls);
