Meteor.methods({
  /**
   * products/updateProductGridPosition
   * @summary update product grid positions
   * @param {String} productId - productId
   * @param {Object} positionData -  an object with tag,position,dimensions
   * @return {String} returns
   */
  "products/updateProductGridPosition": function (productId, positionData) {
    check(productId, String);
    check(positionData, Object);

    if (!ReactionCore.hasPermission("createProduct")) {
      throw new Meteor.Error(403, "Access Denied");
    }

    this.unblock();

    let updateResult;
    let product = ReactionCore.Collections.Products.findOne({
      "_id": productId,
      "positions.tag": positionData.tag
    });

    function addPosition() {
      updateResult = ReactionCore.Collections.Products.update({
        _id: productId
      }, {
        $addToSet: {
          positions: positionData
        },
        $set: {
          updatedAt: new Date()
        }
      }, function (error) {
        if (error) {
          ReactionCore.Log.warn(error);
          throw new Meteor.Error(403, error);
        }
      });
    }

    function updatePosition() {
      updateResult = ReactionCore.Collections.Products.update({
        "_id": productId,
        "positions.tag": positionData.tag
      }, {
        $set: {
          "positions.$.position": positionData.position,
          "positions.$.pinned": positionData.pinned,
          "positions.$.weight": positionData.weight,
          "positions.$.updatedAt": new Date()
        }
      }, function (error) {
        if (error) {
          ReactionCore.Log.warn(error);
          throw new Meteor.Error(403, error);
        }
      });
    }

    if (!product) {
      addPosition();
    } else {
      if (product.positions) {
        updatePosition();
      } else {
        addPosition();
      }
    }

    return updateResult;
  }
});