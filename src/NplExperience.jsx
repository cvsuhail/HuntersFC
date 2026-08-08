'use client';
import {useEffect,useMemo,useState} from 'react';
import Link from 'next/link';
import {groupFixtures,groups,teams,teamLogos} from './data';
import {watchFixtureSchedule,watchLiveMatch,watchTeam,watchTeams} from './firebaseData';

const ids=['avengers-fc','atletico-fc','sporting-challengers','al-oyoun-fc','phoenix-united','sporting-legends','golden-falcon','black-wolves'];
const tabs=[['home','Home'],['fixtures','Fixtures'],['table','Table'],['teams','Teams'],['formation','Formation']];
const logoFor=name=>teamLogos[Math.max(0,teams.indexOf(name))];

function TabIcon({name}){const paths={home:<><path d="M3 10.5 12 3l9 7.5"/><path d="M5.5 9.5V21h13V9.5M9 21v-7h6v7"/></>,fixtures:<><rect x="4" y="3" width="16" height="18" rx="3"/><path d="M8 8h8M8 12h8M8 16h5"/></>,table:<><path d="M5 5h14M5 10h14M5 15h14M5 20h14"/><path d="M9 5v15M16 5v15"/></>,teams:<><circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2.5"/><path d="M3.5 20c.4-4 2.2-6 5.5-6s5.1 2 5.5 6M14 15c3.8-.7 6 1.1 6.5 4.5"/></>,formation:<><rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="12" cy="12" r="2.5"/><path d="M12 3v6.5M12 14.5V21M3 12h6.5M14.5 12H21"/></>};return <svg viewBox="0 0 24 24" aria-hidden="true">{paths[name]}</svg>}

function TeamLogo({name}){return <img className={`lc-team-logo${name==='Atletico FC'?' lc-team-logo-white':''}`} src={logoFor(name)} alt={`${name} crest`}/>}

function MatchCard({match,featured=false}){
  const displayDate=match.date?new Date(`${match.date}T00:00:00`).toLocaleDateString('en-IN',{day:'2-digit',month:'short',year:'numeric'}):'DATE TBD';
  return <article className={`lc-match-card ${featured?'featured':''}`}>
    <header><span>{match.id?`MATCH ${String(match.id).padStart(2,'0')}`:match.status||'UPCOMING'}</span><small>{match.round||'NPL SEASON 4'}</small></header>
    <div className="lc-versus">
      <div><TeamLogo name={match.homeTeam||match.home}/><b>{match.homeTeam||match.home}</b></div>
      <strong>{match.status==='LIVE'?<><i>LIVE</i>{match.homeScore??0}<em>:</em>{match.awayScore??0}</>:<><small>{displayDate}<br/>{match.time||'TIME TBD'}</small><em>VS</em></>}</strong>
      <div><TeamLogo name={match.awayTeam||match.away}/><b>{match.awayTeam||match.away}</b></div>
    </div>
  </article>
}

function HomeView({live,setTab,fixtures}){
  return <>
    <section className="lc-welcome">
      <div><small>HUNTERS FC PRESENTS</small><h1>LEAGUE<br/><em>CENTER.</em></h1></div>
      <img className="lc-hero-logo" src="/assets/npl/nplLogo.png" alt="NPL logo"/><img className="lc-hero-type" src="/assets/npl/nplTyphography.png" alt="NPL typography"/>
    </section>
    <div className="lc-stat-strip"><div><b>08</b><span>TEAMS</span></div><div><b>12</b><span>GROUP FIXTURES</span></div><div><b>02</b><span>GROUPS</span></div></div>
    <section className="lc-section"><div className="lc-heading"><div><small>MATCH CENTER</small><h2>{live?.status==='LIVE'?'Live now':'Featured match'}</h2></div><button onClick={()=>setTab('fixtures')}>All fixtures →</button></div><MatchCard featured match={live||{...fixtures[0],homeTeam:fixtures[0].home,awayTeam:fixtures[0].away,status:'UP NEXT'}}/></section>
    <section className="lc-section"><div className="lc-heading"><div><small>NEXT ON THE PITCH</small><h2>Upcoming</h2></div></div><div className="lc-mini-list">{fixtures.slice(1,4).map(match=><MatchCard key={match.id} match={match}/>)}</div></section>
  </>
}

function QualificationPath(){return <section className="lc-qualification"><div className="lc-heading"><div><small>TOURNAMENT GRAPH</small><h2>Road to the trophy</h2></div></div><div className="tournament-graph"><div className="graph-stage-label"><span>01</span><b>GROUP TABLE</b><small>TOP TWO ADVANCE</small></div><div className="graph-groups"><article><header>GROUP A</header><p><strong>A1</strong><span>1st place</span></p><p><strong>A2</strong><span>2nd place</span></p></article><article><header>GROUP B</header><p><strong>B1</strong><span>1st place</span></p><p><strong>B2</strong><span>2nd place</span></p></article></div><div className="graph-flow"><i/><span>POINTS DECIDE</span><i/></div><div className="graph-stage-label"><span>02</span><b>SEMI-FINALS</b><small>CROSS-GROUP DRAW</small></div><div className="graph-semis"><article><small>SEMI-FINAL 01</small><p><b>A1</b><span>Group A · 1st</span></p><em>VS</em><p><b>B2</b><span>Group B · 2nd</span></p></article><article><small>SEMI-FINAL 02</small><p><b>B1</b><span>Group B · 1st</span></p><em>VS</em><p><b>A2</b><span>Group A · 2nd</span></p></article></div><div className="graph-merge"><i/><span>WINNERS ADVANCE</span><i/></div><div className="graph-stage-label"><span>03</span><b>THE FINAL</b><small>ONE MATCH · TWO HONOURS</small></div><article className="graph-final"><div><small>WINNER SF 01</small><b>FINALIST 01</b></div><span>VS</span><div><small>WINNER SF 02</small><b>FINALIST 02</b></div></article><div className="graph-result-flow"><i/><span>FINAL RESULT</span><i/></div><div className="graph-outcomes"><article className="winner"><span>★</span><small>NPL SEASON 4</small><b>WINNER</b><em>Final winner</em></article><article className="runner"><span>◆</span><small>NPL SEASON 4</small><b>RUNNER-UP</b><em>Final runner-up</em></article></div></div><p>League points determine group position. If teams finish level on points, goal difference separates them.</p></section>}

function FixturesView({fixtures}){
  const [group,setGroup]=useState('ALL');
  const shown=group==='ALL'?fixtures:fixtures.filter(f=>f.round.startsWith(`Group ${group}`));
  return <section className="lc-view"><div className="lc-page-title"><small>OFFICIAL LEAGUE SCHEDULE</small><h1>Fixtures.</h1><p>Each team plays every team in its group once. The top two teams in each points table advance to the semi-finals.</p></div><div className="lc-fixture-key"><span><i/> GROUP MATCH</span><span>3 pts win · 1 pt draw · 0 pts loss</span></div><div className="lc-filters">{['ALL','A','B'].map(x=><button className={group===x?'active':''} onClick={()=>setGroup(x)} key={x}>{x==='ALL'?'All 12 matches':`Group ${x}`}</button>)}</div><div className="lc-fixture-list">{shown.map(match=><MatchCard key={match.id} match={match}/>)}</div><QualificationPath/></section>
}

function TableView(){return <section className="lc-view"><div className="lc-page-title"><small>LIVE LEAGUE POSITION</small><h1>Points.</h1><p>Win 3 · Draw 1 · Loss 0. The highlighted top two positions qualify for the semi-finals.</p></div><div className="lc-table-legend"><span>P Played</span><span>W Won</span><span>D Drawn</span><span>L Lost</span><span>GD Goal diff.</span></div>{Object.entries(groups).map(([group,names])=><article className="lc-table lc-points-table" key={group}><header><b>GROUP {group}</b><span>P&nbsp; W&nbsp; D&nbsp; L&nbsp; GD&nbsp; PTS</span></header>{names.map((name,index)=><div className={index<2?'qualifying':''} key={name}><span>{index+1}</span><TeamLogo name={name}/><b>{name}{index<2&&<em>QUALIFYING</em>}</b><small>0&nbsp; 0&nbsp; 0&nbsp; 0&nbsp;&nbsp; 0&nbsp;&nbsp; <strong>0</strong></small></div>)}</article>)}<QualificationPath/></section>}

function TeamsView({openFormation}){const [records,setRecords]=useState([]);useEffect(()=>watchTeams(setRecords,()=>{}),[]);return <section className="lc-view"><div className="lc-page-title"><small>EIGHT CRESTS · ONE TROPHY</small><h1>The teams.</h1><p>Every official NPL Season 4 side and its management staff.</p></div><div className="lc-team-grid">{teams.map((name,index)=>{const record=records.find(item=>item.id===ids[index]);const managers=Array.isArray(record?.managers)?record.managers:[];return <button onClick={()=>openFormation(index)} key={name}><span>0{index+1}</span><TeamLogo name={name}/><b>{name}</b>{managers.length>0&&<div className="lc-team-managers">{managers.slice(0,2).map(manager=><em key={manager.id}>{manager.role}<strong>{manager.name}</strong></em>)}</div>}<small>VIEW FORMATION →</small></button>})}</div></section>}

function rolePosition(role,index,total){
  const r=(role||'').toLowerCase();
  const lane=18+(index%4)*21;
  if(r.includes('goal')) return {left:'50%',top:'86%'};
  if(r.includes('sweeper')) return {left:'50%',top:'75%'};
  if(r.includes('wing back')) return {left:r.includes('left')?'13%':'87%',top:'57%'};
  if(r.includes('left back')) return {left:'20%',top:'67%'};
  if(r.includes('right back')) return {left:'80%',top:'67%'};
  if(r.includes('back')||r.includes('defend')) return {left:`${lane}%`,top:'65%'};
  if(r.includes('left midfielder')) return {left:'20%',top:'45%'};
  if(r.includes('right midfielder')) return {left:'80%',top:'45%'};
  if(r.includes('midfielder')) return {left:`${lane}%`,top:r.includes('attacking')?'34%':'45%'};
  if(r.includes('left winger')) return {left:'17%',top:'27%'};
  if(r.includes('right winger')) return {left:'83%',top:'27%'};
  if(r.includes('left')&&(r.includes('forward')||r.includes('wing'))) return {left:'22%',top:'22%'};
  if(r.includes('right')&&(r.includes('forward')||r.includes('wing'))) return {left:'78%',top:'22%'};
  if(r.includes('forward')||r.includes('striker')) return {left:'50%',top:'13%'};
  return {left:`${lane}%`,top:'44%'};
}

function FormationView({selected,setSelected}){
  const [team,setTeam]=useState(null);
  const [loading,setLoading]=useState(true);
  useEffect(()=>{setLoading(true);return watchTeam(ids[selected],data=>{setTeam(data);setLoading(false)},()=>setLoading(false))},[selected]);
  const formation=useMemo(()=>Array.isArray(team?.formation)?team.formation:[],[team]);
  const starters=formation.filter(p=>!String(p.role||p.position||'').toLowerCase().includes('sub')).slice(0,7);
  const subs=formation.filter(p=>String(p.role||p.position||'').toLowerCase().includes('sub'));
  return <section className="lc-view lc-formation-view"><div className="lc-page-title"><small>TEAM ADMIN PUBLISHED</small><h1>Formation.</h1><p>Select a team to see its current seven-a-side setup.</p></div><div className="lc-team-picker">{teams.map((name,index)=><button aria-label={name} className={selected===index?'active':''} onClick={()=>setSelected(index)} key={name}><TeamLogo name={name}/><span>{name}</span></button>)}</div><div className="lc-formation-head"><div><small>SELECTED TEAM</small><b>{teams[selected]}</b><em>{team?.formationSystem||'CUSTOM'} SYSTEM</em></div><TeamLogo name={teams[selected]}/></div>{Array.isArray(team?.managers)&&team.managers.length>0&&<div className="lc-formation-staff"><small>TEAM MANAGEMENT</small><div>{team.managers.map(manager=><article key={manager.id}><span>{manager.name.split(' ').map(word=>word[0]).join('').slice(0,2).toUpperCase()}</span><div><b>{manager.name}</b><em>{manager.role}</em></div></article>)}</div></div>}{loading?<div className="lc-empty">Loading formation…</div>:starters.length?<><div className="lc-pitch"><i className="halfway"/><i className="circle"/><i className="box"/><i className="goal"/>{starters.map((player,index)=><div className="lc-player" style={rolePosition(player.role||player.position,index,starters.length)} key={`${player.name}-${index}`}><span>{player.number||index+1}</span><b>{player.name}</b><small>{player.role||player.position}</small></div>)}</div>{subs.length>0&&<div className="lc-bench"><small>SUBSTITUTES</small>{subs.map(p=><span key={p.name}>{p.name}</span>)}</div>}</>:<div className="lc-empty"><TeamLogo name={teams[selected]}/><b>FORMATION NOT PUBLISHED YET</b><p>This screen will update automatically when the team admin publishes the squad.</p></div>}</section>
}

export default function NplExperience(){
  const [tab,setTab]=useState('home');const [live,setLive]=useState(null);const [selected,setSelected]=useState(0);const [fixtures,setFixtures]=useState(groupFixtures);
  useEffect(()=>watchLiveMatch(setLive,()=>{}),[]);
  useEffect(()=>watchFixtureSchedule(remote=>{if(remote.length)setFixtures(groupFixtures.map(base=>({...base,...remote.find(item=>item.id===base.id)}))) }),[]);
  const openFormation=index=>{setSelected(index);setTab('formation');window.scrollTo({top:0,behavior:'smooth'})};
  const changeTab=next=>{setTab(next);window.scrollTo({top:0,behavior:'smooth'})};
  return <main className="league-app"><header className="lc-topbar"><Link href="/" aria-label="Back to Hunters FC">←</Link><div><img src="/assets/npl/nplLogo.png" alt=""/><span><small>NIRANNAPARAMBU</small><b>NPL SEASON 4</b></span></div><i>04</i></header><div className="lc-content">{tab==='home'&&<HomeView live={live} setTab={changeTab} fixtures={fixtures}/>} {tab==='fixtures'&&<FixturesView fixtures={fixtures}/>} {tab==='table'&&<TableView/>}{tab==='teams'&&<TeamsView openFormation={openFormation}/>} {tab==='formation'&&<FormationView selected={selected} setSelected={setSelected}/>}</div><nav className="lc-tabbar" aria-label="NPL sections">{tabs.map(([id,label])=><button key={id} className={tab===id?'active':''} onClick={()=>changeTab(id)}><i><TabIcon name={id}/></i><span>{label}</span></button>)}</nav></main>
}
