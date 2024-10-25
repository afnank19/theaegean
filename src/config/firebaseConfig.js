import admin from "firebase-admin";

// Configuring firebase and firestore
const {
  FIREBASE_PROJECT_ID,
  FIREBASE_AUTH_PROVIDER_CERT_URL,
  FIREBASE_AUTH_URI,
  FIREBASE_CLIENT_CERT_URL,
  FIREBASE_CLIENT_EMAIL,
  FIREBASE_CLIENT_ID,
  FIREBASE_PRIVATE_KEY,
  FIREBASE_PRIVATE_KEY_ID,
  FIREBASE_TOKEN_URI,
} = process.env;

const serviceAccount = {
  type: "service_account",
  project_id: FIREBASE_PROJECT_ID,
  private_key_id: FIREBASE_PRIVATE_KEY_ID,
  private_key: FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
  client_email: FIREBASE_CLIENT_EMAIL,
  client_id: FIREBASE_CLIENT_ID,
  auth_uri: FIREBASE_AUTH_URI,
  token_uri: FIREBASE_TOKEN_URI,
  auth_provider_x509_cert_url: FIREBASE_AUTH_PROVIDER_CERT_URL,
  client_x509_cert_url: FIREBASE_CLIENT_CERT_URL,
  universe_domain: "googleapis.com",
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export const db = admin.firestore();
export const adm = admin;
