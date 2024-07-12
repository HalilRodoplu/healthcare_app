import * as sdk from 'node-appwrite';


//TODO when i define keys and call as like that it's working on server side but,
// it's not reachable client side it's returning undefined.

// const {
//     NEXT_PUBLIC_ENDPOINT: ENDPOINT,
//     NEXT_PUBLIC_PROJECT_ID: PROJECT_ID,
//     NEXT_PUBLIC_API_KEY: API_KEY,
//     NEXT_PUBLIC_DATABASE_ID: DATABASE_ID,
//     NEXT_PUBLIC_PATIENT_COLLECTION_ID: PATIENT_COLLECTION_ID,
//     NEXT_PUBLIC_DOCTOR_COLLECTION_ID: DOCTOR_COLLECTION_ID,
//     NEXT_PUBLIC_APPOINTMENT_COLLECTION_ID: APPOINTMENT_COLLECTION_ID,
//     NEXT_PUBLIC_BUCKET_ID: BUCKET_ID,
// } = process.env;

const client = new sdk.Client();


//TODO because of this i just call keys as like that
client.setEndpoint(process.env.NEXT_PUBLIC_ENDPOINT!).setProject(process.env.NEXT_PUBLIC_PROJECT_ID!).setKey(process.env.NEXT_PUBLIC_API_KEY!);

export const databases = new sdk.Databases(client);
export const users = new sdk.Users(client);
export const messaging = new sdk.Messaging(client);
export const storage = new sdk.Storage(client);
