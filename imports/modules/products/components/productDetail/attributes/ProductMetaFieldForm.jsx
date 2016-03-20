import React, { Component, PropTypes } from "react";
import { translate } from "react-i18next/lib";
import i18next from "i18next";
//import MetaComponent from "./MetaComponent";
import {reduxForm} from "redux-form";
import { StyleSheet } from "react-look";
import TextField from "material-ui/lib/text-field";
import FlatButton from "material-ui/lib/flat-button";
import ActionDone from "material-ui/lib/svg-icons/action/done";
import ContentClear from "material-ui/lib/svg-icons/content/clear";
import { blue500, grey400 } from "material-ui/lib/styles/colors";

export const fields = ["key", "value"];

const validate = values => {
  const errors = {};

  if (!values.key) {
    errors.key = i18next.t("error.isRequired", {
      field: i18next.t("productDetail.detailsName")
    });
  }
  if (!values.value) {
    errors.value = i18next.t("error.isRequired", {
      field: i18next.t("productDetail.detailsInfo")
    });
  }

  return errors;
};

const submitStyles = StyleSheet.create({

});

/**
 * @class ProductMetaFieldForm
 * @classdesc ProductMetaFieldForm
 */
export default class ProductMetaFieldForm extends Component {
  //// @see https://github.com/erikras/redux-form/issues/362#issuecomment-164013479
  //componentWillReceiveProps(nextProps) {
  //  if (nextProps.dirty && nextProps.valid) {
  //    let doubleDirty = false;
  //    Object.keys(nextProps.fields).forEach(key => {
  //      if (nextProps.fields[key].value !== this.props.fields[key].value) {
  //        doubleDirty = true;
  //      }
  //    });
  //    if (doubleDirty) {
  //      nextProps.handleSubmit();
  //    }
  //  }
  //}

  render() {
    const {
      fields: { key, value }, formKey, t, handleSubmit, pristine, submitting
    } = this.props;
    const styles = {
      form: {
        display: "inline-flex",
        flexFlow: "row nowrap",
        position: "relative"
      },
      field: {
        width: "auto",
        marginLeft: ".5rem",
        marginRight: ".5rem"
      },
      remove: {
        minWidth: 48
      },
      submit: {
        position: "absolute",
        right: "-3rem",
        minWidth: 48,
        display: pristine ? "none" : "inline-block"
      }
    };
    return (
      <form onSubmit={handleSubmit} style={styles.form}>
        <TextField
          {...key}
          //floatingLabelText={t("shop.name")}
          hintText={t("productDetail.detailsName")}
          errorText={key.touched && key.error}
          maxLength={20}
          style={styles.field}
        />
        <TextField
          {...value}
          //floatingLabelText={t("shop.email")}
          hintText={t("productDetail.detailsInfo")}
          errorText={value.touched && value.error}
          style={styles.field}
        />
        {formKey !== "new" && <FlatButton
          title={t("app.delete")}
          icon={<ContentClear color={grey400} />}
          //primary={true}
          style={styles.remove}
        />}
        <FlatButton
          title={t("app.saveChanges")}
          icon={<ActionDone color={blue500} />}
          primary={true}
          type="submit"
          disabled={pristine || submitting}
          style={styles.submit}
        />
      </form>
    );
  }
  //render() {
  //  const { product, metafieldActions, newMetafield } = this.props;
  //  console.log("ProductMetaFieldForm: rendering...");
  //  return (
  //    <div /*className="ui raised segments"*/>
  //      {product.metafields && product.metafields.map((metafield, index) => {
  //        return(
  //          <div key={index} /*className="ui segment"*/>
  //            <MetaComponent
  //              index={index}
  //              metafield={metafield}
  //              metafieldActions={metafieldActions}
  //              //onChange={onChange}
  //              //onBlur={onBlur}
  //              //onRemoveClick={onRemoveClick}
  //            />
  //          </div>
  //        );
  //      })}
  //      <div /*className="ui segment"*/>
  //        <MetaComponent
  //          index="new"
  //          metafield={newMetafield}
  //          metafieldActions={metafieldActions}
  //          //onChange={onChange}
  //          //onBlur={ onBlur}
  //        />
  //      </div>
  //    </div>
  //  );
  //}
}

ProductMetaFieldForm.propTypes = {
  metafieldActions: PropTypes.shape({
    changeMetafield: PropTypes.func,
    updateMetafield: PropTypes.func,
    removeMetafields: PropTypes.func
  }).isRequired,
  newMetafield: PropTypes.shape({
    key: PropTypes.string,
    value: PropTypes.string
  }),
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  t: PropTypes.func.isRequired
};

export default translate("core")(reduxForm({
  form: "productMetafieldForm",
  fields,
  validate
})(ProductMetaFieldForm));
