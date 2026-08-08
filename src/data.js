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

function rankedTeams(fixtures,names){const rows=Object.fromEntries(names.map(name=>[name,{name,pts:0,gf:0,ga:0,gd:0}]));fixtures.filter(match=>match.completed&&rows[match.home]&&rows[match.away]).forEach(match=>{const home=rows[match.home],away=rows[match.away],hs=Number(match.homeScore)||0,as=Number(match.awayScore)||0;home.gf+=hs;home.ga+=as;away.gf+=as;away.ga+=hs;if(hs>as)home.pts+=3;else if(as>hs)away.pts+=3;else{home.pts++;away.pts++}});return Object.values(rows).map(row=>({...row,gd:row.gf-row.ga})).sort((a,b)=>b.pts-a.pts||b.gd-a.gd||b.gf-a.gf||a.name.localeCompare(b.name))}

function knockoutWinner(match){if(!match?.completed)return null;const hs=Number(match.homeScore)||0,as=Number(match.awayScore)||0;if(hs>as)return match.home;if(as>hs)return match.away;if(match.homePenalties==null||match.awayPenalties==null)return null;const hp=Number(match.homePenalties),ap=Number(match.awayPenalties);if(Number.isFinite(hp)&&Number.isFinite(ap)&&hp!==ap)return hp>ap?match.home:match.away;return null}

export function buildTournamentSchedule(fixtures=[]){const schedule=fixtures.map(match=>({...match}));const groupGames=schedule.filter(match=>Number(match.id)<=12);if(groupGames.length===12&&groupGames.every(match=>match.completed)){const a=rankedTeams(groupGames,groups.A),b=rankedTeams(groupGames,groups.B);if(!schedule.some(match=>Number(match.id)===13))schedule.push({id:13,stage:'semi-final',round:'Semi-final 01 · A1 vs B2',home:a[0].name,away:b[1].name,time:'TBD',status:'UPCOMING',completed:false});if(!schedule.some(match=>Number(match.id)===14))schedule.push({id:14,stage:'semi-final',round:'Semi-final 02 · B1 vs A2',home:b[0].name,away:a[1].name,time:'TBD',status:'UPCOMING',completed:false})}const sf1=schedule.find(match=>Number(match.id)===13),sf2=schedule.find(match=>Number(match.id)===14),winner1=knockoutWinner(sf1),winner2=knockoutWinner(sf2);if(winner1&&winner2&&!schedule.some(match=>Number(match.id)===15))schedule.push({id:15,stage:'final',round:'NPL Season 4 · Final',home:winner1,away:winner2,time:'TBD',status:'UPCOMING',completed:false});return schedule.sort((a,b)=>Number(a.id)-Number(b.id))}

export function mergeTournamentSchedule(remote=[]){const group=groupFixtures.map(base=>({...base,...remote.find(item=>Number(item.id)===base.id)}));const knockout=remote.filter(item=>Number(item.id)>12);return buildTournamentSchedule([...group,...knockout])}
export const standings=[['Avengers FC',0,0],['Atletico FC',0,0],['Sporting Challengers',0,0],['Al Oyoun FC',0,0]];
export const members=[
 {initials:'AK',name:'Member name',role:'Club President'}, {initials:'MS',name:'Member name',role:'Club Secretary'},
 {initials:'FR',name:'Member name',role:'First Team Manager'}, {initials:'NA',name:'Member name',role:'Club Captain'}
];
