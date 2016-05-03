import { ValidatedMethod } from "meteor/mdg:validated-method";
import { SimpleSchema } from "meteor/aldeed:simple-schema";
import { ReactionCore } from "meteor/reactioncommerce:core";
// import { Meteor } from "meteor/meteor";
// import { _ } from "meteor/underscore";

export const submitPayment = new ValidatedMethod({
  name: "submitPayment",
  validate: new SimpleSchema({
    paymentMethod: { type: ReactionCore.Schemas.PaymentMethod }
  }).validator(),
  run({ paymentMethod }) {
    const cart = ReactionCore.Collections.Cart.findOne({
      userId: this.userId
    });
    const cartId = cart._id;
    const invoice = {
      shipping: cart.cartShipping(),
      subtotal: cart.cartSubTotal(),
      taxes: cart.cartTaxes(),
      discounts: cart.cartDiscounts(),
      total: cart.cartTotal()
    };

    // we won't actually close the order at this stage.
    // we'll just update the workflow and billing data where
    // method-hooks can process the workflow update.

    let selector;
    let update;

    // temp hack until we build out multiple billing handlers
    // if we have an existing item update it, otherwise add to set.
    if (cart.billing) {
      selector = {
        "_id": cartId,
        "billing._id": cart.billing[0]._id
      };
      update = {
        $set: {
          "billing.$.paymentMethod": paymentMethod,
          "billing.$.invoice": invoice
        }
      };
    } else {
      selector = {
        _id: cartId
      };
      update = {
        $addToSet: {
          "billing.paymentMethod": paymentMethod,
          "billing.invoice": invoice
        }
      };
    }

    return ReactionCore.Collections.Cart.update(selector, update);
  }
});

export const updateCartNotes = new ValidatedMethod({
  name: "updateCartNotes",
  validate: new SimpleSchema({
    content: { type: String }
  }).validator(),
  run({ content }) {
    const cart = ReactionCore.Collections.Cart.findOne({ userId: this.userId });
    let query;
    let selector;

    // if note already presents, we update it, otherwise add new
    if (cart.notes && cart.notes.length) {
      query = {
        "_id": cart._id,
        "notes._id": cart.notes[0]._id
      };
      selector = {
        $set: {
          "notes.$.content": content
        }
      };
    } else {
      query = { _id: cart._id };
      selector = {
        $addToSet: {
          notes: {
            _id: Random.id(),
            content,
            userId: this.userId,
            createdAt: new Date
          }
        }
      };
    }

    return ReactionCore.Collections.Cart.update(query, selector);
  }
});
