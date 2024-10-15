## Project: Firebase Cloud Function - User Creation with API Gateway Integration

This project defines a Firebase Cloud Function that triggers before a new user is created in Firebase Authentication. The function interacts with an external API via API Gateway to store user information and set custom claims in Firebase Authentication.

### Features:

- Automatically invoked when a new user is created via Firebase Authentication.
- Fetches an identity token from Google Cloud to authenticate API requests.
- Sends user data to an external API hosted on API Gateway.
- Sets custom user claims in Firebase Authentication with the response from the external API.

---

### Firebase Environment Variables

You'll need the following environment variables:

- `FIREBASE_API_KEY`: Your Firebase API key.
- `FIREBASE_AUTH_DOMAIN`: Your Firebase authentication domain.

### Files Overview

- **`index.js`**: Contains the logic for Firebase function.
- **`package.json`**: Includes the required dependencies such as `google-auth-library`, `firebase-admin`, and `axios`.

### Deployment

#### Step 1: Install Dependencies

Install necessary packages for your project:

```bash
npm install google-auth-library axios firebase-admin
```

#### Step 2: Deploy the Firebase Cloud Function

Use the following command to deploy your Firebase Cloud Function to Google Cloud. The function will be triggered before a new user is created in Firebase Authentication. The command also passes environment variables for `FIREBASE_API_KEY` and `FIREBASE_AUTH_DOMAIN`.

```bash
gcloud functions deploy function-3 \
  --entry-point beforeCreate \
  --runtime nodejs18 \
  --trigger-event providers/firebase.auth/eventTypes/user.beforeCreate \
  --trigger-resource "projects/YOUR_PROJECT_ID" \
  --set-env-vars FIREBASE_API_KEY="your-firebase-api-key",FIREBASE_AUTH_DOMAIN="your-firebase-auth-domain"
```

Replace `your-firebase-api-key` and `your-firebase-auth-domain` with your actual Firebase API key and auth domain.

#### Step 3: Check Logs

After deployment, you can monitor the logs for your function using the following command:

```bash
gcloud functions logs read function-3
```

### Additional CLI Commands

#### Test Locally (Optional)

You can test the Firebase function locally using the Firebase Emulator. First, install the Firebase tools globally if you haven't already:

```bash
npm install -g firebase-tools
```

Then start the Firebase Emulator:

```bash
firebase emulators:start
```

#### Delete the Cloud Function

If you need to remove the function, you can delete it with:

```bash
gcloud functions delete function-3
```
