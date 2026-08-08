# Hunters FC Firebase setup

## Console setup

1. In Firebase Authentication, enable **Email/Password**.
2. Create the first super-admin user in Authentication.
3. Create the Firestore database and Storage bucket.
4. Install the Firebase CLI and sign in: `npm install -g firebase-tools && firebase login`.
5. Deploy rules and the account-creation function: `firebase deploy --only firestore:rules,storage,functions`.

## Grant the first super-admin claim

Custom claims must be assigned by trusted Admin SDK code. In an environment with Application Default Credentials (Google Cloud Shell is suitable):

```bash
cd functions
npm install
npm run bootstrap -- superadmin@example.com
```

Sign out and back in after granting the claim. The super admin can then create team-admin accounts from `/admin`.

## Firestore shape

- `users/{uid}` — account profile and assigned team
- `teams/{teamId}` — formation metadata
- `teams/{teamId}/members/{memberId}` — team-admin managed players
- `club/hunters-squad` — public Hunters FC formation
- `live/current` — public realtime match state
- `auditLogs/{id}` — privileged-operation history

The public site falls back to bundled demo data when Firestore is empty or unavailable.
