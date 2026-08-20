"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { fixtures, teams, teamLogos, standings, mainSponsors, awardSponsors, COMMITTEE_REVEAL_DATE, committee2026 } from './data';
import { watchHuntersSquad, watchLiveMatch } from './firebaseData';

const Arrow = () => <span className="arrow" aria-hidden="true">↗</span>;
const Btn = ({ href, children, ghost = false }) => <Link className={`btn ${ghost ? 'btn-ghost' : ''}`} href={href}>{children}<Arrow /></Link>;
function Mark({ small = false }) { return <div className={`mark ${small ? 'mark-small' : ''}`}><img src="/assets/huntersFc/huntersFcLogo.png" alt="Hunters FC crest" /></div> }
function Header() {
    const [open, setOpen] = useState(false); return <>
        <header className="header"><Link className="brand" href="/"><Mark small /><span>HUNTERS FC<small>NIRANNAPARAMBU</small></span></Link><div className="header-actions"><nav className="header-links" aria-label="Primary navigation"><Link href="/npl">NPL</Link><Link href="/#team">Squad</Link><Link href="/#location">Map</Link></nav><button className={`menu-btn ${open ? 'open' : ''}`} onClick={() => setOpen(!open)} aria-label="Open menu"><i /><i /></button></div></header>
        <div className={`menu ${open ? 'show' : ''}`}><div className="menu-links">{[['/', 'Home'], ['/npl', 'NPL Season 4'], ['/#team', 'Team squad'], ['/#location', 'Club map'], ['/admin', 'Admin preview']].map(([to, label], i) => <Link style={{ '--i': i }} onClick={() => setOpen(false)} key={label} href={to}>{label}<span>0{i + 1}</span></Link>)}</div><div className="menu-foot">Nirannaparambu · Kerala · 679328</div></div>
    </>
}
function Reveal({ children, className = '' }) {
    const ref = React.useRef(null);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const checkVisibility = () => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight + 150 && rect.bottom > -100) {
                el.classList.add('seen');
            }
        };
        checkVisibility();
        const ob = new IntersectionObserver(
            es => es.forEach(e => {
                if (e.isIntersecting) {
                    e.target.classList.add('seen');
                }
            }),
            { threshold: 0.02 }
        );
        ob.observe(el);
        return () => ob.disconnect();
    }, []);
    return <div ref={ref} className={`reveal ${className}`}>{children}</div>;
}
function Eyebrow({ children, dark = false }) { return <div className={`eyebrow ${dark ? 'eyebrow-dark' : ''}`}><i /> {children}</div> }
const huntersFormation = [
    { name: 'Shamveel', role: 'Goal Keeper', pos: 'gk' },
    { name: 'Salman', role: 'Center Back', pos: 'cb' },
    { name: 'Anas', role: 'Right Back', pos: 'rb' },
    { name: 'Fasil', role: 'Left Back', pos: 'lb' },
    { name: 'Sreekuttan', role: 'Center Forward', pos: 'cf' },
    { name: 'Dilshad', role: 'Left Forward', pos: 'rw' },
    { name: 'Ajmal', role: 'Right Forward', pos: 'rf' }
];

function CommitteeCard({ person, size = 'normal' }) {
    return (
        <article className={`committee-card ${size}`}>
            <div className="committee-avatar-frame">
                <img src={person.image} alt={person.name} loading="lazy" />
                <div className="committee-role-badge"><span>{person.role}</span></div>
            </div>
            <div className="committee-card-info">
                <h3>{person.name}</h3>
            </div>
        </article>
    );
}

function CommitteeSection() {
    const [activeTab, setActiveTab] = useState('all');

    return (
        <section id="management-committee" className="section committee-section paper">
            <Reveal>
                <div className="committee-header">
                    <div className="eyebrow squad-label"><i /> OFFICIAL ANNOUNCEMENT</div>
                    <div className="section-head">
                        <h2>CLUB MANAGEMENT<br /><em>2026–2027.</em></h2>
                        <span className="big-no">NPB</span>
                    </div>
                    <p className="committee-subtitle">
                        Introducing the official leadership & executive committee behind Hunters FC for the 2026–2027 season.
                    </p>
                </div>

                <div className="committee-tabs">
                    <button className={activeTab === 'all' ? 'active' : ''} onClick={() => setActiveTab('all')}>All Roles ({22})</button>
                    <button className={activeTab === 'officers' ? 'active' : ''} onClick={() => setActiveTab('officers')}>Officers</button>
                    <button className={activeTab === 'vps' ? 'active' : ''} onClick={() => setActiveTab('vps')}>Vice Presidents & Secretaries</button>
                    <button className={activeTab === 'wings' ? 'active' : ''} onClick={() => setActiveTab('wings')}>Media & Managers</button>
                    <button className={activeTab === 'executives' ? 'active' : ''} onClick={() => setActiveTab('executives')}>Executives ({10})</button>
                </div>

                {(activeTab === 'all' || activeTab === 'officers') && (
                    <div className="committee-group">
                        <h3 className="committee-group-title">CLUB OFFICERS</h3>
                        <div className="committee-officers-grid">
                            {committee2026.officers.map(p => <CommitteeCard key={p.name} person={p} size="featured" />)}
                        </div>
                    </div>
                )}

                {(activeTab === 'all' || activeTab === 'vps') && (
                    <div className="committee-group">
                        <div className="committee-dual-row">
                            <div className="committee-subgroup">
                                <h3 className="committee-group-title">VICE PRESIDENTS</h3>
                                <div className="committee-grid-2">
                                    {committee2026.vicePresidents.map(p => <CommitteeCard key={p.name} person={p} />)}
                                </div>
                            </div>
                            <div className="committee-subgroup">
                                <h3 className="committee-group-title">JOINT SECRETARIES</h3>
                                <div className="committee-grid-2">
                                    {committee2026.jointSecretaries.map(p => <CommitteeCard key={p.name} person={p} />)}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {(activeTab === 'all' || activeTab === 'wings') && (
                    <div className="committee-group">
                        <div className="committee-dual-row">
                            <div className="committee-subgroup flex-3">
                                <h3 className="committee-group-title">MEDIA WING</h3>
                                <div className="committee-grid-3">
                                    {committee2026.mediaWing.map(p => <CommitteeCard key={p.name} person={p} />)}
                                </div>
                            </div>
                            <div className="committee-subgroup flex-2">
                                <h3 className="committee-group-title">TEAM MANAGERS</h3>
                                <div className="committee-grid-2">
                                    {committee2026.teamManagers.map(p => <CommitteeCard key={p.name} person={p} />)}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {(activeTab === 'all' || activeTab === 'executives') && (
                    <div className="committee-group">
                        <h3 className="committee-group-title">EXECUTIVE MEMBERS</h3>
                        <div className="committee-executives-grid">
                            {committee2026.executives.map(p => <CommitteeCard key={p.name} person={p} size="exec" />)}
                        </div>
                    </div>
                )}
            </Reveal>
        </section>
    );
}

function ConfettiCanvas() {
    useEffect(() => {
        const canvas = document.getElementById('npl-confetti-canvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        const handleResize = () => {
            if (!canvas) return;
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', handleResize);

        const colors = ['#ffd400', '#ffffff', '#e2b900', '#ff5252', '#34d399', '#38bdf8'];
        const particles = Array.from({ length: 60 }).map(() => ({
            x: Math.random() * width,
            y: Math.random() * height - height,
            r: Math.random() * 6 + 3,
            d: Math.random() * 60 + 10,
            color: colors[Math.floor(Math.random() * colors.length)],
            tilt: Math.random() * 10 - 10,
            tiltAngleIncremental: Math.random() * 0.07 + 0.05,
            tiltAngle: 0
        }));

        let animationFrameId;
        const draw = () => {
            ctx.clearRect(0, 0, width, height);
            particles.forEach((p, i) => {
                p.tiltAngle += p.tiltAngleIncremental;
                p.y += (Math.cos(p.d) + 2 + p.r / 2) / 1.2;
                p.tilt = Math.sin(p.tiltAngle) * 15;

                if (p.y > height) {
                    particles[i] = {
                        x: Math.random() * width,
                        y: -20,
                        r: p.r,
                        d: p.d,
                        color: p.color,
                        tilt: p.tilt,
                        tiltAngleIncremental: p.tiltAngleIncremental,
                        tiltAngle: p.tiltAngle
                    };
                }

                ctx.beginPath();
                ctx.lineWidth = p.r;
                ctx.strokeStyle = p.color;
                ctx.moveTo(p.x + p.tilt + p.r / 2, p.y);
                ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r / 2);
                ctx.stroke();
            });
            animationFrameId = requestAnimationFrame(draw);
        };
        draw();

        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            id="npl-confetti-canvas"
            style={{
                position: 'fixed',
                inset: 0,
                pointerEvents: 'none',
                zIndex: 99
            }}
        />
    );
}

function IndependenceDaySection() {
    const [fullScreenModal, setFullScreenModal] = useState(false);

    return (
        <section id="independence-day" className="section independence-section">
            <Reveal>
                <div className="independence-container">
                    <div className="independence-copy">
                        <div className="eyebrow tricolor-eyebrow">
                            <span>🇮🇳 15 AUGUST</span> · INDEPENDENCE DAY CELEBRATION
                        </div>
                        <h2>HUNTERS FC<br /><em>AUGUST 15.</em></h2>
                        <p className="independence-lead">
                            Celebrating freedom, unity, and brotherhood! Hunters FC Nirannaparambu came together on August 15th for our annual Independence Day celebration, sports, and community festivities.
                        </p>
                        <div className="independence-meta-tags">
                            <span>🇮🇳 Flag Hoisting</span>
                            <span>⚽ Sports Meet</span>
                            <span>🤝 Community Unity</span>
                        </div>
                        <button className="btn ind-btn" onClick={() => setFullScreenModal(true)}>
                            <span>🔊 Watch Video Full Screen with Sound</span>
                            <Arrow />
                        </button>
                    </div>

                    {/* Inline Auto-playing Muted Video Frame */}
                    <div className="reel-inline-shell" onClick={() => setFullScreenModal(true)}>
                        <div className="reel-badge">
                            <span className="reel-pulse" /> TAP FOR FULLSCREEN WITH SOUND 🔊
                        </div>
                        <div className="reel-frame-wrapper">
                            <video
                                src="/videos/independenceDay2026.mp4"
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="inline-local-video"
                            />
                            <div className="reel-click-overlay">
                                <div className="play-icon-circle">
                                    <svg viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M8 5v14l11-7z" />
                                    </svg>
                                </div>
                                <span>Click for Fullscreen & Sound</span>
                            </div>
                        </div>
                    </div>
                </div>
            </Reveal>

            {/* Fullscreen Video Modal */}
            {fullScreenModal && (
                <div className="reel-fullscreen-modal" onClick={() => setFullScreenModal(false)}>
                    <div className="modal-inner video-modal-inner" onClick={e => e.stopPropagation()}>
                        <button className="modal-close-btn" onClick={() => setFullScreenModal(false)}>✕</button>
                        <div className="modal-reel-header">
                            <div className="eyebrow">🇮🇳 HUNTERS FC AUGUST 15</div>
                            <h3>Independence Day Celebration 2026</h3>
                        </div>
                        <div className="modal-video-container">
                            <video
                                src="/videos/independenceDay2026.mp4"
                                autoPlay
                                loop
                                controls
                                playsInline
                                className="modal-local-video"
                            />
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}

export function Home() {
    return <main>

        <section id="top" className="hero">
            <div className="hero-image" />
            <div className="hero-shade" />
            <img className="hero-crest" src="/assets/huntersFc/huntersFcLogo.png" alt="" />
            <div className="hero-copy">
                <Eyebrow>Hunters FC · NPB</Eyebrow>
                <h1>MORE THAN<br /><em>FOOTBALL.</em></h1>
                <p>A club built around passion, brotherhood and the community that made us.</p>
                <div className="button-row">
                    <Btn href="#management-committee">Committee 2026-27</Btn>
                    <Btn href="/npl" ghost>NPL Season 4</Btn>
                </div>
            </div>
            <div className="hero-index"><span>EST.</span><b>NPB</b><span>KERALA</span></div>
            <a className="scroll-cue" href="#management-committee"><i /><span>SCROLL TO DISCOVER</span></a>
        </section>
        <div className="club-marquee" aria-label="Football, community, brotherhood and purpose"><div><span>FOOTBALL</span><i>✦</i><span>COMMUNITY</span><i>✦</i><span>BROTHERHOOD</span><i>✦</i><span>PURPOSE</span><i>✦</i><span>FOOTBALL</span><i>✦</i><span>COMMUNITY</span><i>✦</i></div></div>
        
        {/* Committee Section Under Hero */}
        <CommitteeSection />

        {/* August 15 Independence Day Celebration Section */}
        <IndependenceDaySection />

        <section id="npl-spotlight" className="npl-tease section">
            <div className="npl-card winners-spotlight-card">
                <div className="npl-top">
                    <Eyebrow>NPL · Season 04</Eyebrow>
                    <span className="pulse trophy-pill"><i /> GAME COMPLETED</span>
                </div>
                <div className="npl-title-winners">
                    <img src="/assets/npl/nplLogo.png" alt="NPL Season 4 logo" />
                    <div>
                        <strong>GAME COMPLETED</strong>
                        <span>SEASON 04 CHAMPIONS</span>
                    </div>
                </div>
                
                {/* Logos only on homepage NPL spotlight */}
                <div className="home-champions-logos-only">
                    <div className="champion-logo-card winner">
                        <div className="champ-badge">🏆 WINNERS</div>
                        <div className="champ-logo-wrap">
                            <img src="/assets/npl/team/goldenFalconFC.png" alt="Golden Falcon" />
                            <div>
                                <b>GOLDEN FALCON</b>
                                <small>NPL Season 4 Champions</small>
                            </div>
                        </div>
                    </div>

                    <div className="champion-logo-card runner">
                        <div className="champ-badge runner-tag">🥈 RUNNERS UP</div>
                        <div className="champ-logo-wrap">
                            <img src="/assets/npl/team/AtleticoFC.png" alt="Atletico FC" />
                            <div>
                                <b>ATLETICO FC</b>
                                <small>NPL Season 4 Finalist</small>
                            </div>
                        </div>
                    </div>
                </div>

                <Btn href="/npl">View Champions Wall & Posters</Btn>
            </div>
        </section>


        <section id="team" className="paper section team"><Reveal><div className="eyebrow squad-label"><i /> Team Squad</div><div className="section-head"><h2>THE<br /><em>HUNTERS.</em></h2><span className="big-no">7S</span></div><FormationPitch /></Reveal></section>
        <section id="location" className="paper section location"><div className="location-backdrop" aria-hidden="true">NPB</div><div className="location-layout"><div className="location-copy"><Eyebrow dark>Home ground</Eyebrow><h2>FROM NPB.<br /><em>FOR NPB.</em></h2><p className="location-lead">This is where the Hunters belong our football home in the heart of Nirannaparambu.</p><a className="btn dark-btn location-directions" href="https://maps.app.goo.gl/EVdD9biwy6PmWjAs6" target="_blank" rel="noreferrer">Get directions <Arrow /></a></div><div className="map-shell"><div className="map-label"><div><span><i /> HUNTERS FC HOME</span><b>11.156666° N · 76.215632° E</b></div><strong>NPB <em>679328</em></strong></div><div className="map-frame"><iframe title="Hunters FC satellite map" loading="lazy" src="https://maps.google.com/maps?q=11.156666,76.215632&amp;t=k&amp;z=17&amp;output=embed" /><div className="map-club-pin"><img src="/assets/huntersFc/huntersFcLogo.png" alt="" /><span><small>YOU'VE FOUND US</small><b>HUNTERS FC</b></span></div><a className="map-open" href="https://maps.app.goo.gl/EVdD9biwy6PmWjAs6" target="_blank" rel="noreferrer" aria-label="Open Hunters FC in Google Maps">↗</a></div><footer><span>SATELLITE MAP PREVIEW</span><b>WELCOME TO OUR HOME.</b></footer></div></div></section>
        <Footer /><ClubBottomNav />
    </main>
}
function FormationPitch() { const [remote, setRemote] = useState(null); useEffect(() => watchHuntersSquad(data => data?.players?.length && setRemote(data.players), () => { }), []); const roleClass = { 'Goal Keeper': 'gk', 'Left Back': 'lb', 'Center Back': 'cb', 'Right Back': 'rb', 'Left Forward': 'rw', 'Center Forward': 'cf', 'Right Forward': 'rf' }; const source = remote || huntersFormation; const starters = source.filter(p => (p.status || 'active') !== 'substitute' && p.position !== 'Substitute').slice(0, 7).map(p => ({ ...p, role: p.role || p.position, pos: p.pos || roleClass[p.position] || 'cf' })); const subs = source.filter(p => p.status === 'substitute' || p.position === 'Substitute'); const shownSubs = subs.length ? subs : [{ name: 'Sabith', number: 8 }, { name: 'Shamil', number: 9 }, { name: 'Monas', number: 10 }]; return <div className="formation-shell"><div className="formation-stage"><div className="football-pitch"><div className="pitch-lines"><i className="half-line" /><i className="center-circle" /><i className="box box-top" /><i className="box box-bottom" /><i className="goal goal-top" /><i className="goal goal-bottom" /></div>{starters.map((p, i) => <div className={`player-marker ${p.pos}`} key={p.id || p.name}><span>{p.number || i + 1}</span><div><b>{p.name}</b><small>{p.role}</small></div></div>)}</div><aside className="sideline-subs" aria-label="Substitutes"><small>SUBS</small>{shownSubs.slice(0, 4).map((p, i) => <span key={p.id || p.name}><i>{String(p.number || i + 8).padStart(2, '0')}</i><b>{p.name}</b></span>)}</aside></div></div> }
function Footer() { return <footer className="site-footer"><div className="footer-panel"><div className="footer-columns"><div><span className="footer-pill">More than a club</span><h3>FOOTBALL.<br />COMMUNITY.<br />BROTHERHOOD.</h3></div><div><span className="footer-pill">Our home</span><h3>NIRANNAPARAMBU<br />KERALA · 679328</h3><a href="https://maps.app.goo.gl/EVdD9biwy6PmWjAs6" target="_blank" rel="noreferrer">Open Google Maps ↗</a></div><nav><span className="footer-pill">Explore</span><Link href="/#team">Team Squad</Link><Link href="/#location">Club Map</Link><Link href="/npl">NPL Season 4</Link><Link href="/admin">Admin preview</Link></nav></div><div className="footer-art"><div className="footer-sticker sticker-npb">NPB</div><div className="footer-sticker sticker-ball">⚽</div><div className="footer-sticker sticker-year">2026</div><div className="footer-logo-sticker"><Mark /></div><strong>HUNTERS</strong></div><div className="footer-meta"><small>© 2026 HUNTERS FC NPB</small><b>MORE THAN FOOTBALL.</b></div></div></footer> }
function ClubNavIcon({ name }) { const paths = { home: <><path d="M3 10.5 12 3l9 7.5" /><path d="M5.5 9.5V21h13V9.5M9 21v-7h6v7" /></>, squad: <><circle cx="9" cy="8" r="3" /><circle cx="17" cy="9" r="2.5" /><path d="M3.5 20c.4-4 2.2-6 5.5-6s5.1 2 5.5 6M14 15c3.8-.7 6 1.1 6.5 4.5" /></>, join: <><path d="M12 21s-7-4.4-7-10a4 4 0 0 1 7-2.7A4 4 0 0 1 19 11c0 5.6-7 10-7 10Z" /><path d="M12 7v8M8 11h8" /></>, npl: <><circle cx="12" cy="12" r="9" /><path d="m12 7 3 2.2-1.1 3.5h-3.8L9 9.2 12 7ZM6 10l3 1M18 10l-3 1M8 18l2.5-5.3M16 18l-2.5-5.3" /></>, top: <><path d="m5 11 7-7 7 7M12 4v17" /></> }; return <svg viewBox="0 0 24 24" aria-hidden="true">{paths[name]}</svg> }
function ClubBottomNav() { return <nav className="club-bottom-nav" aria-label="Mobile club navigation"><a className="active" href="#top"><i><ClubNavIcon name="home" /></i><span>Home</span></a><a href="#team"><i><ClubNavIcon name="squad" /></i><span>Squad</span></a><a href="#location"><i><ClubNavIcon name="join" /></i><span>Map</span></a><Link href="/npl"><i><ClubNavIcon name="npl" /></i><span>NPL</span></Link><button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}><i><ClubNavIcon name="top" /></i><span>Top</span></button></nav> }

export function Npl() {
    const [selectedImage, setSelectedImage] = useState(null);

    return (
        <main className="npl-page">
            <ConfettiCanvas />
            
            {/* Modal Lightbox for Poster */}
            {selectedImage && (
                <div className="npl-poster-modal" onClick={() => setSelectedImage(null)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <button className="modal-close" onClick={() => setSelectedImage(null)}>✕</button>
                        <img src={selectedImage.src} alt={selectedImage.alt} />
                        <div className="modal-caption">{selectedImage.caption}</div>
                    </div>
                </div>
            )}

            <section className="npl-hero">
                <div className="npl-grid" />
                <div className="npl-crest-wall" aria-hidden="true">
                    {teamLogos.map((logo, i) => <img src={logo} alt="" key={logo} style={{ '--crest': i }} />)}
                </div>
                <img className="npl-official-logo" src="/assets/npl/nplLogo.png" alt="Nirannaparambu Premier League Season 4" />
                <div className="npl-hero-copy">
                    <Eyebrow>Nirannaparambu Premier League</Eyebrow>
                    <div className="completed-pill">
                        <span className="trophy-gold">🏆</span> GAME COMPLETED · NPL SEASON 04
                    </div>
                    <h1>CHAMPIONS<span>04</span></h1>
                    <p>Congratulations to NPL Season 4 Winners Golden Falcon & Runners-Up Atletico FC!</p>
                    <div className="event-line">
                        <b>08 AUG 2026</b>
                        <span>THRILLOX FOOTBALL TURF · WANDOOR</span>
                    </div>
                    <img className="npl-type-art" src="/assets/npl/nplTyphography.png" alt="NPL Season 4 Malayalam typography" />
                </div>
            </section>

            <div className="npl-marquee" aria-label="NPL Season 4 Champions">
                <div>
                    <span>🏆 GOLDEN FALCON — NPL 04 CHAMPIONS</span><i>✦</i>
                    <span>🥈 ATLETICO FC — RUNNERS UP</span><i>✦</i>
                    <span>🏆 GOLDEN FALCON — NPL 04 CHAMPIONS</span><i>✦</i>
                    <span>🥈 ATLETICO FC — RUNNERS UP</span><i>✦</i>
                </div>
            </div>

            {/* Showcase Winners & Runners Section */}
            <section className="npl-content section npl-champions-showcase">
                <div className="champions-showcase-grid">
                    {/* WINNERS CARD */}
                    <article className="trophy-card winner-card">
                        <div className="trophy-card-header">
                            <div className="trophy-badge winner-tag">
                                <span>🏆 WINNERS</span>
                                <small>NPL SEASON 04 CHAMPIONS</small>
                            </div>
                            <div className="team-header-info">
                                <img src="/assets/npl/team/goldenFalconFC.png" alt="Golden Falcon" className="team-badge-large" />
                                <div>
                                    <h2>GOLDEN FALCON</h2>
                                    <span className="title-sub">NPL Season 4 Champions</span>
                                </div>
                            </div>
                        </div>

                        <div className="poster-frame" onClick={() => setSelectedImage({ src: '/assets/npl/nplWinners.jpg', alt: 'Golden Falcon NPL Winners', caption: '🏆 Golden Falcon — NPL Season 04 Winners Poster' })}>
                            <img src="/assets/npl/nplWinners.jpg" alt="Golden Falcon NPL Winners Poster" />
                            <div className="poster-overlay">
                                <span>🔍 Click / Tap to Expand Poster</span>
                            </div>
                        </div>
                    </article>

                    {/* RUNNERS UP CARD */}
                    <article className="trophy-card runner-card">
                        <div className="trophy-card-header">
                            <div className="trophy-badge runner-tag">
                                <span>🥈 RUNNERS UP</span>
                                <small>NPL SEASON 04 FINALIST</small>
                            </div>
                            <div className="team-header-info">
                                <img src="/assets/npl/team/AtleticoFC.png" alt="Atletico FC" className="team-badge-large" />
                                <div>
                                    <h2>ATLETICO FC</h2>
                                    <span className="title-sub">NPL Season 4 Runners Up</span>
                                </div>
                            </div>
                        </div>

                        <div className="poster-frame" onClick={() => setSelectedImage({ src: '/assets/npl/nplRunners.jpg', alt: 'Atletico FC NPL Runners Up', caption: '🥈 Atletico FC — NPL Season 04 Runners Up Poster' })}>
                            <img src="/assets/npl/nplRunners.jpg" alt="Atletico FC NPL Runners Up Poster" />
                            <div className="poster-overlay">
                                <span>🔍 Click / Tap to Expand Poster</span>
                            </div>
                        </div>
                    </article>
                </div>

                <SponsorShowcase />
            </section>

            <Footer />
        </main>
    );
}
function NplNav() { return <nav className="npl-nav"><a href="#">Overview</a><a href="#fixtures">Fixtures</a><a href="#standings">Standings</a><a href="#teams">Teams</a></nav> }
function TeamBadge({ n = 0 }) { return <span className="team-badge"><img src={teamLogos[n]} alt={`${teams[n]} logo`} /></span> }
function Fixture({ f }) { return <article className="fixture"><div><span>{f.status}</span><small>{f.round}</small></div><div className="fixture-teams"><p><TeamBadge n={teams.indexOf(f.home)} />{f.home}<b>{f.hs}</b></p><p><TeamBadge n={teams.indexOf(f.away)} />{f.away}<b>{f.as}</b></p></div><footer><b>{f.time}</b><span>Match centre ↗</span></footer></article> }
function Block({ id, title, aside, children }) { return <section className="npl-block" id={id || title.toLowerCase().replaceAll(' ', '-')}><div className="block-title"><h2>{title}</h2><span>{aside}</span></div>{children}</section> }
function SponsorShowcase() { return <Block title="BACKED BY" aside="OFFICIAL SPONSORS"><div className="sponsor-lead">{mainSponsors.map(s => <article key={s.title}><small>{s.title}</small><img src={s.image} alt={s.title} /></article>)}</div><div className="award-title"><span>INDIVIDUAL AWARD SPONSORS</span><i /></div><div className="sponsor-awards">{awardSponsors.map(s => <article key={s.title}><small>{s.title}</small><img src={s.image} alt={s.title} /></article>)}</div></Block> }

export function Admin() { const [section, setSection] = useState('Overview'); return <main className="admin"><aside><Link href="/" className="admin-brand"><Mark small /><b>HUNTERS<br />CONTROL</b></Link>{['Overview', 'Matches', 'Fixtures', 'Teams', 'Players', 'Club', 'Committee', 'Members', 'Community', 'Gallery', 'Sponsors', 'Settings'].map(x => <button className={section === x ? 'active' : ''} onClick={() => setSection(x)} key={x}><i />{x}</button>)}<div className="admin-user"><span>AD</span><div><b>Administrator</b><small>Demo mode</small></div></div></aside><section className="admin-main"><header><div><small>ADMIN PANEL / {section.toUpperCase()}</small><h1>{section}</h1></div><Link href="/">View website ↗</Link></header><div className="demo-note"><b>FRONTEND PREVIEW</b><span>Changes are stored as demo data until Firebase is connected.</span></div>{section === 'Overview' ? <AdminOverview /> : <AdminList title={section} />}</section><nav className="admin-mobile">{['Overview', 'Matches', 'Teams', 'Club', 'Settings'].map(x => <button onClick={() => setSection(x)} className={section === x ? 'active' : ''} key={x}><i />{x}</button>)}</nav></main> }
function AdminOverview() { return <><div className="admin-stats"><article><small>NPL STATUS</small><b>HAPPENING<br />TODAY</b><span className="status-dot">● Live-day mode</span></article><article><small>TEAMS</small><b className="num">08</b><span>All squads editable</span></article><article><small>FIXTURES</small><b className="num">15</b><span>3 scheduled today</span></article><article><small>CLUB CONTENT</small><b>12<span>/18</span></b><span>Sections completed</span></article></div><div className="admin-columns"><section><div className="admin-title"><h2>Match control</h2><button>All matches</button></div>{fixtures.slice(0, 2).map((f, i) => <div className="control-match" key={i}><span>{f.time}</span><div><b>{f.home}</b><small>vs</small><b>{f.away}</b></div><button>OPEN</button></div>)}</section><section><div className="admin-title"><h2>Quick actions</h2></div>{['Add club member', 'Create fixture', 'Upload gallery', 'New community story'].map(x => <button className="quick" key={x}>{x}<Arrow /></button>)}</section></div></> }
function AdminList({ title }) { return <section className="admin-list"><div className="admin-title"><div><h2>Manage {title.toLowerCase()}</h2><p>Content shown here is structured for the future Firebase collection.</p></div><button>+ Add new</button></div>{[1, 2, 3, 4].map((x) => <div className="list-row" key={x}><span>{String(x).padStart(2, '0')}</span><div><b>{title} demo entry {x}</b><small>Placeholder content · Updated today</small></div><i>•••</i></div>)}</section> }
function ScrollTop() { const pathname = usePathname(); useEffect(() => { window.scrollTo(0, 0) }, [pathname]); useEffect(() => { const ob = new IntersectionObserver(es => es.forEach(e => e.isIntersecting && e.target.classList.add('seen')), { threshold: .08 }); document.querySelectorAll('.reveal').forEach(x => ob.observe(x)); return () => { ob.disconnect() } }, [pathname]); return null }
export function ClubPage() { return <><ScrollTop /><Header /><Home /></> }
export function NplPage() { return <><ScrollTop /><Header /><Npl /></> }
