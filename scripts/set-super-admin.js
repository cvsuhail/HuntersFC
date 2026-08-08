const {initializeApp,cert}=require('firebase-admin/app');
const {getAuth}=require('firebase-admin/auth');
const {getFirestore,FieldValue}=require('firebase-admin/firestore');
const path=require('path');

const email=process.argv[2];
const password=process.argv[3];
if(!email){console.error('Usage: npm run bootstrap -- admin@example.com "StrongPassword"');process.exit(1)}
const serviceAccount=require(path.resolve(__dirname,'../../service-account.json'));
initializeApp({credential:cert(serviceAccount),projectId:serviceAccount.project_id||'huntersfc'});

(async()=>{
  const auth=getAuth();
  let user;
  try{
    user=await auth.getUserByEmail(email);
  }catch(error){
    if(error.code!=='auth/user-not-found') throw error;
    if(!password){
      console.error(`No Firebase Authentication user exists for ${email}.\nRun again with a password to create it:\nnpm run bootstrap -- ${email} "StrongPassword"`);
      process.exit(1);
    }
    if(password.length<8) throw new Error('Password must contain at least 8 characters.');
    user=await auth.createUser({email,password,displayName:'Super Admin',emailVerified:false});
    console.log(`Created Firebase Authentication user ${email}.`);
  }
  await auth.setCustomUserClaims(user.uid,{role:'super_admin'});
  await getFirestore().doc(`users/${user.uid}`).set({email:user.email,displayName:user.displayName||'Super Admin',role:'super_admin',active:true,updatedAt:FieldValue.serverTimestamp()},{merge:true});
  console.log(`Super admin granted to ${email}. Sign out and back in to refresh claims.`);
})().catch(error=>{console.error(error.message||error);process.exit(1)});
