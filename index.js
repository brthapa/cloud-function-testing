const functions = require("firebase-functions");

const beforeCreate = functions.auth.user().beforeCreate(async (user) => {
  const uid = user.uid;
  console.log("uid--->", uid);
  return {
    uid: uid,
  };
});

module.exports = { beforeCreate };
