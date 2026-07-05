// NOTE: This is reference only for Firebase Console Rules

/*
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    match /products/{id} {
      allow read: if true;
      allow write: if request.auth != null;
    }

    match /orders/{id} {
      allow read, write: if request.auth != null;
    }
  }
}
*/
