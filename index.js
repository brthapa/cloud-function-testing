const functions = require('firebase-functions/v1');

exports.beforeCreate = functions.auth.user().beforeCreate((event) => {
  const uid = event.data.uid;  // Access the user data from the event object
  console.log("uid--->", uid);
  return {
    uid: uid,
  };
});

module.exports = { beforeCreate };
