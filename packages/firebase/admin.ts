import admin from "firebase-admin"

const raw = process.env.FIREBASE_ADMIN

if (raw) {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(JSON.parse(raw)),
    })
  }
} else {
  console.warn("[firebase-admin] FIREBASE_ADMIN env is missing; admin SDK not initialized.")
}

export const adminAuth = admin.apps.length ? admin.auth() : null
export const adminDb = admin.apps.length ? admin.firestore() : null
