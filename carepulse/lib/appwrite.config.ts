import * as sdk from "node-appwrite"

export const {
    PROJECT_ID, API_KEY, DATABASE_ID, PATIENTS_COLLECTION_ID,
    DOCTOR_COLLECTION_ID, APPOINTMENT_COLLECTION_ID,
    NEXT_PUBLIC_BUCKET_ID: BUCKET_ID,
    NEXT_PUBLIC_ENDPOINT: ENDPOINT
} = process.env

const client = new sdk.Client()
.setEndpoint('https://cloud.appwrite.io/v1')
.setProject('671e7757000bb2d0ecc1')
.setKey(API_KEY!);

export const databases = new sdk.Databases(client);
export const users = new sdk.Users(client);
export const messaging = new sdk.Messaging(client);
export const storage = new sdk.Storage(client);
 export const account = new sdk.Account(client);
