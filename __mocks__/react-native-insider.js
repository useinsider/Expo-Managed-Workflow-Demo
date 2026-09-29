const { jest } = require('@jest/globals');

const calls = [];

function recorder(name, returnValue) {
  return jest.fn((...args) => {
    calls.push([name, ...args]);
    return typeof returnValue === 'function' ? returnValue(...args) : returnValue;
  });
}

function chainable(prefix, methods) {
  const builder = {};
  for (const method of methods) {
    builder[method] = recorder(`${prefix}.${method}`, () => builder);
  }
  return builder;
}

function createEvent() {
  return chainable('event', [
    'addParameterWithString',
    'addParameterWithInt',
    'addParameterWithDouble',
    'addParameterWithBoolean',
    'addParameterWithDate',
    'addParameterWithArray',
    'build',
  ]);
}

function createProduct() {
  return chainable('product', [
    'setColor',
    'setVoucherName',
    'setVoucherDiscount',
    'setPromotionName',
    'setPromotionDiscount',
    'setSize',
    'setSalePrice',
    'setShippingCost',
    'setQuantity',
    'setStock',
    'setCustomAttributeWithString',
    'setCustomAttributeWithInt',
    'setCustomAttributeWithDouble',
    'setCustomAttributeWithBoolean',
    'setCustomAttributeWithDate',
    'setCustomAttributeWithArray',
  ]);
}

const currentUser = chainable('user', [
  'setName',
  'setSurname',
  'setAge',
  'setGender',
  'setBirthday',
  'setEmailOptin',
  'setSMSOptin',
  'setPushOptin',
  'setLocationOptin',
  'setFacebookID',
  'setTwitterID',
  'setLanguage',
  'setLocale',
  'login',
  'logout',
  'logoutResettingInsiderID',
]);

const RNInsider = {
  init: recorder('init'),
  registerWithQuietPermission: recorder('registerWithQuietPermission'),
  setActiveForegroundPushView: recorder('setActiveForegroundPushView'),
  startTrackingGeofence: recorder('startTrackingGeofence'),
  enableIDFACollection: recorder('enableIDFACollection'),
  enableIpCollection: recorder('enableIpCollection'),
  enableLocationCollection: recorder('enableLocationCollection'),
  enableCarrierCollection: recorder('enableCarrierCollection'),
  handleURL: recorder('handleURL'),
  tagEvent: recorder('tagEvent', createEvent),
  createNewProduct: recorder('createNewProduct', createProduct),
  getCurrentUser: recorder('getCurrentUser', () => currentUser),
  setGDPRConsent: recorder('setGDPRConsent'),
  setMobileAppAccess: recorder('setMobileAppAccess'),
  enableInAppMessages: recorder('enableInAppMessages'),
  disableInAppMessages: recorder('disableInAppMessages'),
  getMessageCenterData: recorder('getMessageCenterData'),
  getContentStringWithName: recorder('getContentStringWithName'),
  getContentBoolWithName: recorder('getContentBoolWithName'),
  getContentIntWithName: recorder('getContentIntWithName'),
  getContentStringWithoutCache: recorder('getContentStringWithoutCache'),
  getContentBoolWithoutCache: recorder('getContentBoolWithoutCache'),
  getContentIntWithoutCache: recorder('getContentIntWithoutCache'),
  visitHomePage: recorder('visitHomePage'),
  visitListingPage: recorder('visitListingPage'),
  visitCartPage: recorder('visitCartPage'),
  visitProductDetailPage: recorder('visitProductDetailPage'),
  visitWishlistPage: recorder('visitWishlistPage'),
  itemPurchased: recorder('itemPurchased'),
  itemAddedToCart: recorder('itemAddedToCart'),
  itemRemovedFromCart: recorder('itemRemovedFromCart'),
  cartCleared: recorder('cartCleared'),
  itemAddedToWishlist: recorder('itemAddedToWishlist'),
  itemRemovedFromWishlist: recorder('itemRemovedFromWishlist'),
  wishlistCleared: recorder('wishlistCleared'),
  getSmartRecommendation: recorder('getSmartRecommendation'),
  getSmartRecommendationWithProduct: recorder('getSmartRecommendationWithProduct'),
  getSmartRecommendationWithProductIDs: recorder('getSmartRecommendationWithProductIDs'),
  clickSmartRecommendationProduct: recorder('clickSmartRecommendationProduct'),
};

RNInsider.__calls = calls;
RNInsider.__reset = () => {
  calls.length = 0;
};

module.exports = RNInsider;
