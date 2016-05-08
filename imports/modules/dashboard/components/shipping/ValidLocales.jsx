import React, { Component, PropTypes } from "react";
import { translate } from "react-i18next";
import TextField from "material-ui/TextField";
import IconButton from "material-ui/IconButton";
import Divider from "material-ui/Divider";
import ActionDelete from "material-ui/svg-icons/action/delete";

class ValidLocales extends Component {
  render() {
    const { origination, destination, deliveryBegin, deliveryEnd, index, t, validRanges } = this.props;
    return (
      <div style={{marginBottom: "1rem"}}>
        <TextField
          {...origination}
          floatingLabelText={t("shippingMethod.validLocales.origination")}
          // errorText={origination.touched && origination.error}
        />
        <TextField
          {...destination}
          floatingLabelText={t("shippingMethod.validLocales.destination")}
          // errorText={destination.touched && destination.error}
        />
        <TextField
          {...deliveryBegin}
          floatingLabelText={t("shippingMethod.validLocales.deliveryBegin")}
          type="number"
          // errorText={deliveryBegin.touched && deliveryBegin.error}
        />
        <TextField
          {...deliveryEnd}
          floatingLabelText={t("shippingMethod.validLocales.deliveryEnd")}
          type="number"
          // errorText={deliveryEnd.touched && deliveryEnd.error}
        />
        <div style={{margin: "1rem 1rem 4.1rem"}}>
          <IconButton
            tooltip={t("shipping.deleteCondition")}
            onTouchTap={() => validRanges.removeField(index)}
            style={{ float: "right"}}
          >
            <ActionDelete />
          </IconButton>
        </div>
        <Divider style={{marginLeft: -16}} />
      </div>
    );
  }
}

ValidLocales.propTypes = {
  origination: PropTypes.object,
  destination: PropTypes.object,
  deliveryBegin: PropTypes.object,
  deliveryEnd: PropTypes.object,
  index: PropTypes.number,
  t: PropTypes.func,
  validRanges: PropTypes.arrayOf(PropTypes.object)
};

export default translate("core")(ValidLocales);
