const { GoogleAuth } = require("google-auth-library");
const functions = require("firebase-functions/v1");
const axios = require("axios");

const auth = new GoogleAuth({
  scopes: "https://www.googleapis.com/auth/cloud-platform",
});

exports.beforeCreate = functions.auth.user().beforeCreate(async (event) => {
  try {
    // Obtain a client and fetch the identity token
    const client = await auth.getIdTokenClient("before-user-create-function");
    const idToken = await client.getRequestHeaders();

    let data = JSON.stringify({
      name: event.displayName,
      idp_uid: event.uid,
      email: event.email,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://lolo-backend-bvwvl0c6.uc.gateway.dev/api/v1/users",
      headers: {
        "Content-Type": "application/json",
        Authorization: idToken["Authorization"],
      },
      data: data,
    };

    // Make the request using axios
    const response = await axios.request(config);
    console.log(response);
    if (response.data.success == false) {
      console.log(
        "Error creating token or making request:",
        response.data.errors
      );
      throw new functions.https.HttpsError(
        "permission-denied",
        "User Registraion Failed"
      );
    }
    return {
      success: true,
    };
  } catch (error) {
    console.log("Error creating token or making request:", error);
    throw new functions.https.HttpsError(
      "permission-denied",
      "User Registraion Failed"
    );
  }
});
