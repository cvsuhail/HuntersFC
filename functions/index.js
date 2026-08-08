const {onCall,HttpsError}=require('firebase-functions/v2/https');
const {initializeApp}=require('firebase-admin/app');
const {getAuth}=require('firebase-admin/auth');
const {getFirestore,FieldValue}=require('firebase-admin/firestore');

initializeApp();

exports.createTeamAdmin=onCall({region:'asia-south1'},async request=>{
  if(!request.auth || request.auth.token.role!=='super_admin') throw new HttpsError('permission-denied','Only a super admin can create team-admin accounts.');
  const {email,password,displayName,teamId}=request.data||{};
  if(!email||!password||!displayName||!teamId) throw new HttpsError('invalid-argument','Email, password, name, and team are required.');
  if(password.length<8) throw new HttpsError('invalid-argument','The temporary password must contain at least 8 characters.');
  const user=await getAuth().createUser({email,password,displayName,emailVerified:false,disabled:false});
  await getAuth().setCustomUserClaims(user.uid,{role:'team_admin',teamId});
  const db=getFirestore();
  await db.doc(`users/${user.uid}`).set({email,displayName,role:'team_admin',teamId,active:true,createdAt:FieldValue.serverTimestamp(),createdBy:request.auth.uid});
  await db.collection('auditLogs').add({action:'TEAM_ADMIN_CREATED',targetUid:user.uid,teamId,actorUid:request.auth.uid,createdAt:FieldValue.serverTimestamp()});
  return {uid:user.uid,email,teamId};
});

exports.createMatchController=onCall({region:'asia-south1'},async request=>{
  if(!request.auth || request.auth.token.role!=='super_admin') throw new HttpsError('permission-denied','Only a super admin can create match-controller accounts.');
  const {email,password,displayName}=request.data||{};
  if(!email||!password||!displayName) throw new HttpsError('invalid-argument','Email, password, and name are required.');
  if(password.length<8) throw new HttpsError('invalid-argument','The temporary password must contain at least 8 characters.');
  const user=await getAuth().createUser({email,password,displayName,emailVerified:false,disabled:false});
  await getAuth().setCustomUserClaims(user.uid,{role:'match_controller'});
  const db=getFirestore();
  await db.doc(`users/${user.uid}`).set({email,displayName,role:'match_controller',active:true,createdAt:FieldValue.serverTimestamp(),createdBy:request.auth.uid});
  await db.collection('auditLogs').add({action:'MATCH_CONTROLLER_CREATED',targetUid:user.uid,actorUid:request.auth.uid,createdAt:FieldValue.serverTimestamp()});
  return {uid:user.uid,email,role:'match_controller'};
});
