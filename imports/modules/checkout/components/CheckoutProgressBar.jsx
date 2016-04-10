import React, { Component, PropTypes } from "react";
import Stepper from "material-ui/lib/Stepper/Stepper";
import Step from "material-ui/lib/Stepper/HorizontalStep";
import FontIcon from "material-ui/lib/font-icon";
import RaisedButton from "material-ui/lib/raised-button";
import FlatButton from "material-ui/lib/flat-button";
import { reactionTemplate } from "../../../client/helpers/layout";

// const T = _i18n.createComponent("reaction.core.checkoutProgressBar");

class CheckoutProgressBar extends Component {
  render() {
    const { cartId, shopId, progressbarStatus, setStepIcon } = this.props;
    const options = {
      hash: {
        id: cartId,
        shopId: shopId,
        workflow: "coreCartWorkflow"
      }
    };
    const coreCartWorkflow = reactionTemplate(options);

    console.log("CheckoutProgressBar rendering...");
    return (
      <Stepper
        horizontal={true}
        // activeStep={this.state.activeStep}
        // onStepHeaderTouch={this.selectStep}
        // updateCompletedStatus={this.updateCompletedSteps}
        // createIcon={this.createIcon}
      >
        <Step
          orderStepLabel="1"
          stepLabel="User account"
          actions={[
              <RaisedButton
                key={0}
                label="Continue"
                primary={true}
                onClick={this.continue}
              />,
              <FlatButton key={1} label="Cancel" />
            ]}
        >
          <div style={{padding: 20}}>
            Please create an account, or login with your account details.
          </div>
        </Step>
      </Stepper>
    );
    // return (
    //   <div className="ui tablet stackable small steps">
    //     { coreCartWorkflow.map(workflow => {
    //       const label = workflow.label.toCamelCase();
    //       const statusClass = progressbarStatus(workflow.template);
    //       const icon = setStepIcon(label);
    //       // { /* <div className="description">Choose your shipping options</div> */ }
    //       return (
    //         <div className={ statusClass } key={ workflow.position }>
    //           <i className={ icon }></i>
    //           <div className="content">
    //             <div className="title"><T>{ label }</T></div>
    //           </div>
    //         </div>
    //       );
    //     }) }
    //   </div>
    // );
  }
}

CheckoutProgressBar.propTypes = {
  cartId: PropTypes.string.isRequired,
  shopId: PropTypes.string.isRequired,
  progressbarStatus: PropTypes.func.isRequired,
  setStepIcon: PropTypes.func.isRequired
};

export default CheckoutProgressBar;
