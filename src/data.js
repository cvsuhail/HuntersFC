export const teams=['Avengers FC','Atletico FC','Sporting Challengers','Al Oyoun FC','Phoenix United','Sporting Legends','Golden Falcon','Black Wolves'];
export const teamLogos=['/assets/npl/team/AvengersFC.png','/assets/npl/team/AtleticoFC.png','/assets/npl/team/sportingChallengersFC.png','/assets/npl/team/AlOyounFC.png','/assets/npl/team/phoenixUnitedFC.png','/assets/npl/team/sportingLegendsFC.png','/assets/npl/team/goldenFalconFC.png','/assets/npl/team/blackWolvesFC.png'];
export const mainSponsors=[
 {title:'Winners Trophy Sponsor',image:'/assets/npl/main sponsers/Winners Trophy Sponser.png'},
 {title:'Runners Trophy Sponsor',image:'/assets/npl/main sponsers/Runners Trophy Sponser.png'}
];
export const awardSponsors=[
 {title:'Best Player Sponsor',image:'/assets/npl/sub sponsers/Best Player Sponser.png'},
 {title:'Top Scorer Sponsor',image:'/assets/npl/sub sponsers/Top Scorer Sponser.png'},
 {title:'Best Goalkeeper Sponsor',image:'/assets/npl/sub sponsers/Best GoalKeeper Sponser.png'},
 {title:'Best Defender Sponsor',image:'/assets/npl/sub sponsers/Best Defender Sponser.png'}
];
export const fixtures=[
  {time:'7:00 PM',round:'Group A · Match 01',home:'Avengers FC',away:'Atletico FC',hs:'–',as:'–',status:'UP NEXT'},
  {time:'7:25 PM',round:'Group B · Match 02',home:'Phoenix United',away:'Black Wolves',hs:'–',as:'–',status:'UPCOMING'},
  {time:'7:50 PM',round:'Group A · Match 03',home:'Sporting Challengers',away:'Al Oyoun FC',hs:'–',as:'–',status:'UPCOMING'}
];
export const groups={
  A:['Avengers FC','Black Wolves','Sporting Legends','Al Oyoun FC'],
  B:['Atletico FC','Phoenix United','Sporting Challengers','Golden Falcon']
};
export const groupFixtures=[
  {round:'Group A · Round 1',home:'Avengers FC',away:'Black Wolves'},
  {round:'Group B · Round 1',home:'Atletico FC',away:'Phoenix United'},
  {round:'Group A · Round 1',home:'Sporting Legends',away:'Al Oyoun FC'},
  {round:'Group B · Round 1',home:'Sporting Challengers',away:'Golden Falcon'},
  {round:'Group A · Round 2',home:'Avengers FC',away:'Sporting Legends'},
  {round:'Group B · Round 2',home:'Atletico FC',away:'Sporting Challengers'},
  {round:'Group A · Round 2',home:'Black Wolves',away:'Al Oyoun FC'},
  {round:'Group B · Round 2',home:'Phoenix United',away:'Golden Falcon'},
  {round:'Group A · Round 3',home:'Avengers FC',away:'Al Oyoun FC'},
  {round:'Group B · Round 3',home:'Atletico FC',away:'Golden Falcon'},
  {round:'Group A · Round 3',home:'Black Wolves',away:'Sporting Legends'},
  {round:'Group B · Round 3',home:'Phoenix United',away:'Sporting Challengers'}
].map((match,index)=>({...match,id:index+1,time:'TBD',status:'UPCOMING'}));
export const standings=[['Avengers FC',0,0],['Atletico FC',0,0],['Sporting Challengers',0,0],['Al Oyoun FC',0,0]];
export const members=[
 {initials:'AK',name:'Member name',role:'Club President'}, {initials:'MS',name:'Member name',role:'Club Secretary'},
 {initials:'FR',name:'Member name',role:'First Team Manager'}, {initials:'NA',name:'Member name',role:'Club Captain'}
];
