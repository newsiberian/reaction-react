import React, { Component, PropTypes } from "react";
import { translate } from "react-i18next";
import TextField from "material-ui/TextField";
import IconButton from "material-ui/IconButton";
import Divider from "material-ui/Divider";
import ActionDelete from "material-ui/svg-icons/action/delete";

class ValidRanges extends Component {
  render() {
    const { begin, end, index, t, validRanges } = this.props;
    return (
      <div style={{marginBottom: "1rem"}}>
        <TextField
          {...begin}
          floatingLabelText={t("shippingMethod.validRanges.begin")}
          // errorText={begin.touched && begin.error}
        />
        <TextField
          {...end}
          floatingLabelText={t("shippingMethod.validRanges.end")}
          // errorText={end.touched && end.error}
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

ValidRanges.propTypes = {
  begin: PropTypes.object,
  end: PropTypes.object,
  index: PropTypes.number,
  t: PropTypes.func,
  validRanges: PropTypes.arrayOf(PropTypes.object)
};

export default translate("core")(ValidRanges);
