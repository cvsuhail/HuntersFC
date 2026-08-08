import {addDoc,collection,deleteDoc,doc,onSnapshot,orderBy,query,serverTimestamp,setDoc,updateDoc} from 'firebase/firestore';
import {httpsCallable} from 'firebase/functions';
import {db,functions} from './firebase';

export function watchLiveMatch(callback,onError){
  return onSnapshot(doc(db,'live','current'),snap=>callback(snap.exists()?{id:snap.id,...snap.data()}:null),onError);
}

export function watchFixtureSchedule(callback,onError){
  return onSnapshot(doc(db,'tournaments','npl-season-4'),snap=>callback(snap.exists()?snap.data().fixtures||[]:[]),onError);
}

export async function saveFixtureSchedule(fixtures){
  return setDoc(doc(db,'tournaments','npl-season-4'),{fixtures,updatedAt:serverTimestamp()},{merge:true});
}

export function watchHuntersSquad(callback,onError){
  return onSnapshot(doc(db,'club','hunters-squad'),snap=>callback(snap.exists()?snap.data():null),onError);
}

export function watchTeamMembers(teamId,callback,onError){
  const q=query(collection(db,'teams',teamId,'members'),orderBy('name'));
  return onSnapshot(q,snap=>callback(snap.docs.map(item=>({id:item.id,...item.data()}))),onError);
}

export function watchTeam(teamId,callback,onError){
  return onSnapshot(doc(db,'teams',teamId),snap=>callback(snap.exists()?{id:snap.id,...snap.data()}:null),onError);
}

export function watchTeams(callback,onError){
  return onSnapshot(collection(db,'teams'),snap=>callback(snap.docs.map(item=>({id:item.id,...item.data()}))),onError);
}

export async function saveTeamManagers(teamId,managers){
  return setDoc(doc(db,'teams',teamId),{managers,updatedAt:serverTimestamp()},{merge:true});
}

export async function saveTeamFormation(teamId,formation,formationSystem='Custom'){
  await setDoc(doc(db,'teams',teamId),{formation,formationSystem,updatedAt:serverTimestamp()},{merge:true});
  if(teamId==='hunters-fc') await setDoc(doc(db,'club','hunters-squad'),{players:formation,updatedAt:serverTimestamp()},{merge:true});
}

export async function addTeamMember(teamId,member){
  return addDoc(collection(db,'teams',teamId,'members'),{...member,createdAt:serverTimestamp(),updatedAt:serverTimestamp()});
}

export async function updateTeamMember(teamId,memberId,member){
  return updateDoc(doc(db,'teams',teamId,'members',memberId),{...member,updatedAt:serverTimestamp()});
}

export async function removeTeamMember(teamId,memberId){
  return deleteDoc(doc(db,'teams',teamId,'members',memberId));
}

export async function updateLiveMatch(data){
  return setDoc(doc(db,'live','current'),{...data,updatedAt:serverTimestamp()},{merge:true});
}

export async function createTeamAdmin(data){
  const callable=httpsCallable(functions,'createTeamAdmin');
  return callable(data);
}
