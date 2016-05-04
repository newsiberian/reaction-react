import { ValidatedMethod } from "meteor/mdg:validated-method";
import { SimpleSchema } from "meteor/aldeed:simple-schema";
import { ReactionCore } from "meteor/reactioncommerce:core";

/**
 * updateOrderNotes
 * @summary this is the copy of `updateCartNotes` method
 */
export const updateOrderNotes = new ValidatedMethod({
  name: "updateOrderNotes",
  validate: new SimpleSchema({
    orderId: { type: String },
    content: { type: String }
  }).validator(),
  run({ orderId, content }) {
    if (!ReactionCore.hasPermission("orders")) {
      throw new Meteor.Error(403, "Access Denied");
    }

    const order = ReactionCore.Collections.Orders.findOne({ _id: orderId });
    let query = { _id: order._id };
    let selector = {
      $addToSet: {
        notes: {
          _id: Random.id(),
          content,
          userId: this.userId,
          createdAt: new Date
        }
      }
    };

    // if note already presents, we update it, otherwise add new
    if (order.notes && order.notes.length) {
      // we are looking for note which is belong to admin
      const index = order.notes.findIndex(note => note.userId !== order.userId);

      // if we find an admin note, we update it
      if (index !== -1)  {
        query = {
          "_id": order._id,
          "notes._id": order.notes[index]._id
        };
        selector = {
          $set: {
            "notes.$.content": content
          }
        };
      }
    }

    return ReactionCore.Collections.Orders.update(query, selector);
  }
});
