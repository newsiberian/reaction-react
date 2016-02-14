import { Component, PropTypes } from "react";
import Divider from 'material-ui/lib/divider';
import Toggle from "material-ui/lib/toggle";
import { _i18n } from "meteor/universe:i18n";

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
export default class GuestCheckoutForm extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Toggle
          label={_i18n.__("reaction.core.shopEditForm.allowGuestCheckout")}
          style={styles.toggle}
        />
        <Divider />
      </div>
    );
  }
}

GuestCheckoutForm.propTypes = {};
