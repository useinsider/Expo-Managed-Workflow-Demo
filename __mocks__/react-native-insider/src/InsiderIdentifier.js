// The real class drops every identifier while the native module is absent, so tests would see an empty map.
class RNInsiderIdentifier {
  identifiers = {};

  addEmail(email) {
    this.identifiers.addEmail = email;
    return this;
  }

  addPhoneNumber(phoneNumber) {
    this.identifiers.addPhoneNumber = phoneNumber;
    return this;
  }

  addUserID(userID) {
    this.identifiers.addUserID = userID;
    return this;
  }

  addCustomIdentifier(key, value) {
    this.identifiers[key] = value;
    return this;
  }
}

module.exports = RNInsiderIdentifier;
