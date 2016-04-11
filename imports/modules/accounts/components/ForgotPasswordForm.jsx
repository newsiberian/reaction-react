import React, {Component, PropTypes} from "react";
import {translate} from "react-i18next/lib";

class ForgotPasswordForm extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { t } = this.props;
    return (
      <div></div>
    );
  }
}

ForgotPasswordForm.propTypes = {
  t: PropTypes.func
};

export default translate("core")(ForgotPasswordForm);
