/**
 *  currentProduct
 *  @summary Reactive current product dependency, ensuring reactive products, without session
 *  @todo rename as this can easily be confused with ReactionCore.setCurrentProduct
 *  @todo this is a messy class implementation, normalize it.
 *  @description
 *  products:
 *  set usage: currentProduct.set "productId",string
 *  get usage: currentProduct.get "productId"
 *  variants:
 *  set usage: currentProduct.set "variantId",string
 *  get usage: currentProduct.get "variantId"
 */
const currentProduct = {
  keys: {},
  deps: {},
  equals: function (key) {
    return this.keys[key];
  },
  get: function (key) {
    this.ensureDeps(key);
    this.deps[key].depend();
    return this.keys[key];
  },
  set: function (key, value) {
    this.ensureDeps(key);
    this.keys[key] = value;
    return this.deps[key].changed();
  },
  changed: function (key) {
    this.ensureDeps(key);
    return this.deps[key].changed();
  },
  ensureDeps: function (key) {
    if (!this.deps[key]) {
      this.deps[key] = new Tracker.Dependency();
      return this.deps[key];
    }
  }
};

/**
 * setCurrentVariant
 * @param {String} variantId - set current variantId
 * @return {undefined}
 */
export function setCurrentVariant(variantId) {
  let currentId;
  if (variantId === null) {
    currentProduct.set("variantId", null);
    currentProduct.set("variantId", selectedVariantId());
  }
  if (!variantId) {
    return;
  }
  currentId = selectedVariantId();
  if (currentId === variantId) {
    return;
  }
  currentProduct.set("variantId", variantId);
}

/**
 * setCurrentProduct
 * @param {String} productId - set current productId
 * @return {undefined}
 */
export function setCurrentProduct(productId) {
  let currentId;
  if (productId === null) {
    currentProduct.set("productId", null);
  }
  if (!productId) {
    return;
  }
  currentId = selectedProductId();
  if (currentId === productId) {
    return;
  }
  currentProduct.set("productId", productId);
  currentProduct.set("variantId", null);
}

/**
 * selectedVariant
 * @summary get the currently active/requested variant object
 * @return {Object} currently selected variant object
 */
export function selectedVariant() {
  let id;
  let product;
  let variant;
  id = selectedVariantId();
  if (!id) {
    return {};
  }
  product = selectedProduct();
  if (!product) {
    return {};
  }
  variant = _.findWhere(product.variants, {
    _id: id
  });
  return variant;
}

/**
 * selectedProduct
 * @summary get the currently active/requested product object
 * @return {Object} currently selected product cursor
 */
export function selectedProduct() {
  let id;
  id = selectedProductId();
  return Products.findOne(id);
}

/**
 * selectedProductId
 * @summary get the currently active/requested product
 * @return {String} currently selected product id
 */
export function selectedProductId() {
  return currentProduct.get("productId");
}

/**
 * selectedVariantId
 * @summary get the currently active/requested variant
 * @return {String} currently selected variant id
 */
export function selectedVariantId() {
  let id = currentProduct.get("variantId");
  if (id !== null) {
    return id;
  }

  let product = selectedProduct();
  if (!product) {
    return [];
  }

  let variants = (function () {
    let results = [];
    for (let variant of product.variants) {
      if (!variant.parentId) {
        results.push(variant);
      }
    }
    return results;
  })();

  if (!(variants.length > 0)) {
    return [];
  }

  id = variants[0]._id;
  currentProduct.set("variantId", id);
  return id;
}

/**
 * checkChildVariants
 * @summary return number of child variants for a parent
 * @param {String} parentVariantId - parentVariantId
 * @return {Number} count of childVariants for this parentVariantId
 */
export function checkChildVariants(parentVariantId) {
  let product = selectedProduct();
  if (!product) {
    return 0;
  }

  let childVariants = (function () {
    let results = [];
    for (variant of product.variants) {
      if ((variant !== null ? variant.parentId : void 0) ===
        parentVariantId && (variant !== null ? variant.type : void 0) !==
        "inventory") {
        results.push(variant);
      }
    }
    return results;
  })();
  return childVariants.length;
}

/**
 * checkInventoryVariants
 * @summary return number of inventory variants for a parent
 * @param {String} parentVariantId - parentVariantId
 * @return {Number} count of inventory variants for this parentVariantId
 */
export function checkInventoryVariants(parentVariantId) {
  let product = selectedProduct();
  if (!product) {
    return 0;
  }

  let inventoryVariants = (function () {
    let results = [];
    for (variant of product.variants) {
      if ((variant !== null ? variant.parentId : void 0) ===
        parentVariantId && (variant !== null ? variant.type : void 0) ===
        "inventory") {
        results.push(variant);
      }
    }
    return results;
  })();
  return inventoryVariants.length;
}

/**
 * getVariantPriceRange
 * @summary get price range of a variant if it has child options.
 * if no child options, return main price value
 * @todo remove string return and replace with object
 * @param {String} currentVariantId - currentVariantId
 * @param {String} currentProductId - currentProductId
 * @return {String} formatted price or price range
 */
export function getVariantPriceRange(currentVariantId, currentProductId) {
  let productId = currentProductId || selectedProductId();
  let variantId = currentVariantId || selectedVariant()._id;

  let product = Products.findOne(productId);
  if (!(variantId && productId && product)) {
    return undefined;
  }

  let variant = _.findWhere(product.variants, {
    _id: variantId
  });

  let children = (function () {
    let results = [];
    for (let thisVariant of product.variants) {
      if (thisVariant.parentId === variantId) {
        results.push(thisVariant);
      }
    }
    return results;
  })();

  if (children.length === 0) {
    if (variant !== null ? variant.price : void 0) {
      return variant.price;
    }
    return undefined;
  }

  if (children.length === 1) {
    return children[0].price;
  }

  let priceMin = Number.POSITIVE_INFINITY;
  let priceMax = Number.NEGATIVE_INFINITY;

  for (let child of children) {
    if (child.price < priceMin) {
      priceMin = child.price;
    }
    if (child.price > priceMax) {
      priceMax = child.price;
    }
  }
  if (priceMin === priceMax) {
    return priceMin;
  }
  return `${priceMin} - ${priceMax}`;
}

/**
 * getProductPriceRange
 * @summary get price range of a product
 * if no only one price available, return it
 * otherwise return a string range
 * @todo remove string return and replace with object
 * @param {String} currentProductId - currentProductId
 * @return {String} formatted price or price range
 */
export function getProductPriceRange(currentProductId) {
  let productId = currentProductId || selectedProductId();
  let product = Products.findOne(productId);

  if (!product) {
    return undefined;
  } else if (!product._id) {
    return undefined;
  }

  let variants = (function () {
    let results = [];
    for (let variant of product.variants) {
      if (!variant.parentId) {
        results.push(variant);
      }
    }
    return results;
  })();

  if (variants.length > 0) {
    let variantPrices = [];
    for (let variant of variants) {
      let range = getVariantPriceRange(variant._id, productId);
      if (Match.test(range, String)) {
        let firstPrice = parseFloat(range.substr(0, range.indexOf(" ")));
        let lastPrice = parseFloat(range.substr(range.lastIndexOf(" ") + 1));
        variantPrices.push(firstPrice, lastPrice);
      } else {
        variantPrices.push(range);
      }
    }
    let priceMin = _.min(variantPrices);
    let priceMax = _.max(variantPrices);
    if (priceMin === priceMax) {
      return priceMin;
    }
    return `${priceMin} - ${priceMax}`;
  }
}

/**
 * getCardTypes
 * @summary determine the card type and return label
 * @todo needs i18n conversion?
 * @param {String} cardNumber - a credit card number
 * @return {String} card label, ie: visa
 */
export function getCardType(cardNumber) {
  let re = new RegExp("^4");
  if (cardNumber.match(re) !== null) {
    return "visa";
  }
  re = new RegExp("^(34|37)");
  if (cardNumber.match(re) !== null) {
    return "amex";
  }
  re = new RegExp("^5[1-5]");
  if (cardNumber.match(re) !== null) {
    return "mastercard";
  }
  re = new RegExp("^6011");
  if (cardNumber.match(re) !== null) {
    return "discover";
  }
  return "";
}

/**
 * getGuestLoginState
 * @summary determines if a guest checkout is enabled and the login state for users
 * @return {Boolean} true if authenticated user
 */
export function getGuestLoginState() {
  if (Meteor.user() && ReactionCore.getShopId() && ReactionCore.allowGuestCheckout()) {
    let isGuestFlow = Session.equals("guestCheckoutFlow", true);
    let isGuest = Roles.userIsInRole(Meteor.user(), "guest", ReactionCore.getShopId());
    let isAnonymous = Roles.userIsInRole(Meteor.user(), "anonymous", ReactionCore
      .getShopId());
    if (!isGuestFlow && !isGuest && isAnonymous) {
      return false;
    } else if (!isGuestFlow && isGuest && !isAnonymous) {
      return true;
    }
  } else if (Session.equals("guestCheckoutFlow", true) && _.pluck(Meteor.user()
      .emails, "address")) {
    return true;
  }
  return false;
}
