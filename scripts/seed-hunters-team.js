const {initializeApp,cert}=require('firebase-admin/app');
const {getFirestore,FieldValue}=require('firebase-admin/firestore');
const path=require('path');

const serviceAccount=require(path.resolve(__dirname,'../../service-account.json'));
initializeApp({credential:cert(serviceAccount),projectId:serviceAccount.project_id||'huntersfc'});

const players=[
  {id:'shamveel',name:'Shamveel',number:1,position:'Goal Keeper',role:'Goal Keeper',status:'active'},
  {id:'salman',name:'Salman',number:2,position:'Center Back',role:'Center Back',status:'active'},
  {id:'anas',name:'Anas',number:3,position:'Right Back',role:'Right Back',status:'active'},
  {id:'fasil',name:'Fasil',number:4,position:'Left Back',role:'Left Back',status:'active'},
  {id:'sreekuttan',name:'Sreekuttan',number:5,position:'Center Forward',role:'Center Forward',status:'active'},
  {id:'dilshad',name:'Dilshad',number:6,position:'Left Forward',role:'Left Forward',status:'active'},
  {id:'ajmal',name:'Ajmal',number:7,position:'Right Forward',role:'Right Forward',status:'active'},
  {id:'sabith',name:'Sabith',number:8,position:'Substitute',role:'Substitute',status:'substitute'},
  {id:'shamil',name:'Shamil',number:9,position:'Substitute',role:'Substitute',status:'substitute'},
  {id:'monas',name:'Monas',number:10,position:'Substitute',role:'Substitute',status:'substitute'}
];

(async()=>{
  const db=getFirestore();
  const batch=db.batch();
  const formation=players.map(({id,name,number,position,role,status})=>({id,name,number,position,role,status}));
  batch.set(db.doc('teams/hunters-fc'),{name:'Hunters FC',formationSystem:'3:3:1',formation,updatedAt:FieldValue.serverTimestamp()},{merge:true});
  batch.set(db.doc('club/hunters-squad'),{players:formation,updatedAt:FieldValue.serverTimestamp()},{merge:true});
  for(const player of players){
    batch.set(db.doc(`teams/hunters-fc/members/${player.id}`),{name:player.name,number:player.number,position:player.position,status:player.status,updatedAt:FieldValue.serverTimestamp()},{merge:true});
  }
  await batch.commit();
  console.log(`Hunters FC seeded with ${players.length} squad members and a published 3:3:1 formation.`);
})().catch(error=>{console.error(error.message||error);process.exit(1)});
