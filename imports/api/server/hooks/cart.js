import { Meteor } from "meteor/meteor";
import { ReactionCore } from "meteor/reactioncommerce:core";

ReactionCore.MethodHooks.after("submitPayment", function (options) {
  if (options.error) {
    ReactionCore.Log.warn(options.error);
    throw new Meteor.Error("An error occurred saving the order", options.error);
  } else {
    const cart = ReactionCore.Collections.Cart.findOne({
      userId: Meteor.userId()
    });
    // update workflow
    Meteor.call("workflow/pushCartWorkflow", "coreCartWorkflow", "paymentSubmitted");

    if (cart) {
      if (cart.items && cart.billing[0].paymentMethod) {
        // Return orderId as result from this after hook call.
        // This is done by extending the existing result.
        return Meteor.call("cart/copyCartToOrder", cart._id);
      }
    }
    // this part should never be accomplished
    throw new Meteor.Error(
      "An error occurred verifying payment method. Failed to save order."
    );
  }
});
