import React, { Component, PropTypes } from "react";
import Divider from "material-ui/lib/divider";
import Toggle from "material-ui/lib/toggle";
import { translate } from "react-i18next/lib";

const styles = {
  block: {
    maxWidth: 250,
  },
  toggle: {
    marginBottom: 16,
  },
  long: {
    wordBreak: "keep-all",
    wordWrap: "break-word",
    hyphens: "auto"
  }
};

/**
 * @class GuestCheckoutForm
 * @classdesc
 */
class GuestCheckoutForm extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { t } = this.props;
    return (
      <div>
        <Toggle
          label={t("shopEditForm.allowGuestCheckout")}
          style={styles.toggle}
        />
        <Divider />
      </div>
    );
  }
}

GuestCheckoutForm.propTypes = {};

export default translate("core")(GuestCheckoutForm);
