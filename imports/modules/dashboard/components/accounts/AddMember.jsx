import React, { Component, PropTypes } from "react";
import { translate } from "react-i18next";
import { ActionBarWrapper } from
  "../../../layout/components/ActionBarWrapper.jsx";
import AddMemberForm from "./AddMemberForm.jsx";

const AddMember = props => (
  <AddMemberForm
    onSubmit={values => props.submitAddMemberForm(values)}
  />
);

AddMember.propTypes = {
  submitAddMemberForm: PropTypes.func.isRequired // actionCreator
};

const options = {
  title: "admin.settings.addShopMemberLabel"
};

// translate needed to pass `t` to `ActionBarWrapper`
export default translate("core")(ActionBarWrapper(AddMember, options));
