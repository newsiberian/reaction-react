import React, { Component, PropTypes } from "react";
import { translate } from "react-i18next/lib";
import { ReactionCore } from "meteor/reactioncommerce:core";
import { Accounts } from "meteor/accounts-base";
import { Roles } from "meteor/alanning:roles";
import Paper from 'material-ui/lib/paper';
import Stepper from "material-ui/lib/Stepper/Stepper";
import Step from "material-ui/lib/Stepper/HorizontalStep";
import FontIcon from "material-ui/lib/font-icon";
import RaisedButton from "material-ui/lib/raised-button";
import FlatButton from "material-ui/lib/flat-button";
import { reactionTemplate } from "../../../client/helpers/layout";
// import CheckoutProgressBar from "./CheckoutProgressBar";
import CheckoutStep from "./CheckoutStep";
import EmptyCheckoutCart from "./EmptyCheckoutCart";

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    // maxWidth: "100vw",
    minHeight: "80vh",
    maxWidth: 1200
  }
};

/**
 * @method checkoutLoginCompleted
 * @description check whether the user is logged in
 * @param {Object} workflowStep - summary about current step
 * @param {Object} cart - `props.cart` is a user cart
 * @returns {boolean} true if we"ve already past this stage,
 * or if the user is a guest but not anonymous
 */
const checkoutLoginCompleted = (workflowStep, cart) => {
  if (cart.workflow) {
    const currentStatus = cart.workflow.status;
    const guestUser = ReactionCore.hasPermission("guest", Accounts.user());
    const anonUser = Roles.userIsInRole("anonymous", Accounts.user(),
      ReactionCore.getShopId());

    return currentStatus !== workflowStep.template && guestUser && !anonUser;
  }
  return false;
};

// const getActiveStep = () => {};

class Checkout extends Component {
  createIcon(step) {
    if (step.props.isCompleted) {
      return (
        <FontIcon className="material-icons" style={{fontSize: 14}}>
          done
        </FontIcon>
      );
    }

    return <span>{step.props.orderStepLabel}</span>;
  }

  updateCompletedSteps(currentStep) {
    return currentStep < this.props.activeStep;
  }

  render() {
    // const {
    //   cart, checkoutLoginCompleted, checkoutStepBadgeClass, progressbarStatus,
    //   setStepIcon, onClickContinueGuest
    // } = this.props;
    const { activeStep, cart, checkoutActions, t } = this.props;

    if (typeof cart.items !== "object" ||
      (typeof cart.items === "object" && !cart.items.length)) {
      return <EmptyCheckoutCart />;
    }
    const options = {
      hash: {
        id: cart._id,
        shopId: cart.shopId,
        workflow: "coreCartWorkflow"
      }
    };
    const coreCartWorkflow = reactionTemplate(options);
    const checkoutStepsCompleted = {
      checkoutLogin: workflowStep => checkoutLoginCompleted(workflowStep, cart)
      // checkoutAddressBook: checkoutAddressBookCompleted
    };

    console.log("Checkout rendering...");
    return (
      <div className="container-fluid" style={styles.container}>
        <section>
          {/*<Stepper
            horizontal={true}
            activeStep={activeStep}
            // onStepHeaderTouch={this.selectStep}
            updateCompletedStatus={step => this.updateCompletedSteps(step)}
            createIcon={this.createIcon}
          >
            {coreCartWorkflow.map(checkoutStep => {
              return (
                <Step
                  key={checkoutStep.position}
                  orderStepLabel={checkoutStep.position}
                  stepLabel={t(`checkoutProgressBar.${checkoutStep.label.toCamelCase()}`)}
                  // actions={[
                  //   <RaisedButton
                  //     key={0}
                  //     label="Continue"
                  //     primary={true}
                  //     onClick={this.continue}
                  //   />,
                  //   <FlatButton key={1} label="Cancel" />
                  // ]}
                >
                  <CheckoutStep
                    checkoutStep={checkoutStep}
                    checkoutStepCompleted={checkoutStepsCompleted[checkoutStep.template]}
                    // checkoutStepBadgeClass={checkoutStepBadgeClass}
                    // setStepIcon={setStepIcon}
                    // onClickContinueGuest={onClickContinueGuest}
                  />
                </Step>
              );
            })}
          </Stepper>*/}
          {coreCartWorkflow.map(checkoutStep => {
            return (
              <Paper key={checkoutStep.position}>
              <CheckoutStep
                checkoutStep={checkoutStep}
                checkoutStepCompleted={checkoutStepsCompleted[checkoutStep.template]}
                // checkoutStepBadgeClass={checkoutStepBadgeClass}
                // setStepIcon={setStepIcon}
                // onClickContinueGuest={onClickContinueGuest}
              />
              </Paper>
            );
          })}
        </section>
      </div>
    );

    // todo refactor
    // fixme: `onClickContinueGuest` this will be sent in every components instead of first
    // return (
    //   <div className="ui container">
    //     <div className="ui basic segment">
    //
    //       <CheckoutProgressBar
    //         cartId={cart._id}
    //         shopId={cart.shopId}
    //         progressbarStatus={progressbarStatus}
    //         setStepIcon={setStepIcon}
    //       />
    //     </div>
    //
    //     <div className="two column stackable ui grid">
    //       <div className="ten wide column">
    //         { coreCartWorkflow.map(checkoutStep => {
    //           return (checkoutStep.container === "checkout-steps-main" &&
    //             <CheckoutStep
    //               key={ checkoutStep.position }
    //               checkoutStep={ checkoutStep }
    //               checkoutStepCompleted={ checkoutStepsCompleted[checkoutStep.template] }
    //               checkoutStepBadgeClass={ checkoutStepBadgeClass }
    //               setStepIcon={ setStepIcon }
    //               onClickContinueGuest={ onClickContinueGuest }
    //             />
    //           );
    //         }) }
    //       </div>
    //       <div className="six wide column">
    //         { coreCartWorkflow.map(checkoutStep => {
    //           return (checkoutStep.container === "checkout-steps-side" &&
    //             <CheckoutStep
    //               key={ checkoutStep.position }
    //               checkoutStep={ checkoutStep }
    //               checkoutStepCompleted={ checkoutStepsCompleted[checkoutStep.template] }
    //               checkoutStepBadgeClass={ checkoutStepBadgeClass }
    //               setStepIcon={ setStepIcon }
    //               onClickContinueGuest={ onClickContinueGuest }
    //             />
    //           );
    //         }) }
    //       </div>
    //     </div>
    //   </div>
    // );
  }
}

Checkout.propTypes = {
  activeStep: PropTypes.number.isRequired,
  cart: PropTypes.object.isRequired,
  checkoutActions: PropTypes.shape({
    changeCartWorkflow: PropTypes.func
  }).isRequired,
  t: PropTypes.func
  // checkoutLoginCompleted: PropTypes.func.isRequired,
  // checkoutStepBadgeClass: PropTypes.func,
  // progressbarStatus: PropTypes.func,
  // setStepIcon: PropTypes.func,
  // onClickContinueGuest: PropTypes.func
};

export default translate("core")(Checkout);
