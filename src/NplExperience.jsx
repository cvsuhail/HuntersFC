'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { teamLogos, mainSponsors, awardSponsors } from './data';

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
        const particles = Array.from({ length: 70 }).map(() => ({
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

function Eyebrow({ children, dark = false }) {
    return <div className={`eyebrow ${dark ? 'eyebrow-dark' : ''}`}><i /> {children}</div>;
}

function SponsorShowcase() {
    return (
        <section className="npl-block">
            <div className="block-title">
                <h2>BACKED BY</h2>
                <span>OFFICIAL SPONSORS</span>
            </div>
            <div className="sponsor-lead">
                {mainSponsors.map(s => (
                    <article key={s.title}>
                        <small>{s.title}</small>
                        <img src={s.image} alt={s.title} />
                    </article>
                ))}
            </div>
            <div className="award-title">
                <span>INDIVIDUAL AWARD SPONSORS</span>
                <i />
            </div>
            <div className="sponsor-awards">
                {awardSponsors.map(s => (
                    <article key={s.title}>
                        <small>{s.title}</small>
                        <img src={s.image} alt={s.title} />
                    </article>
                ))}
            </div>
        </section>
    );
}

function Footer() {
    return (
        <footer className="site-footer">
            <div className="footer-panel">
                <div className="footer-columns">
                    <div>
                        <span className="footer-pill">More than a club</span>
                        <h3>FOOTBALL.<br />COMMUNITY.<br />BROTHERHOOD.</h3>
                    </div>
                    <div>
                        <span className="footer-pill">Our home</span>
                        <h3>NIRANNAPARAMBU<br />KERALA · 679328</h3>
                        <a href="https://maps.app.goo.gl/EVdD9biwy6PmWjAs6" target="_blank" rel="noreferrer">Open Google Maps ↗</a>
                    </div>
                    <nav>
                        <span className="footer-pill">Explore</span>
                        <Link href="/#team">Team Squad</Link>
                        <Link href="/#location">Club Map</Link>
                        <Link href="/npl">NPL Season 4</Link>
                    </nav>
                </div>
                <div className="footer-art">
                    <div className="footer-sticker sticker-npb">NPB</div>
                    <div className="footer-sticker sticker-ball">⚽</div>
                    <div className="footer-sticker sticker-year">2026</div>
                    <strong>HUNTERS</strong>
                </div>
                <div className="footer-meta">
                    <small>© 2026 HUNTERS FC NPB</small>
                    <b>MORE THAN FOOTBALL.</b>
                </div>
            </div>
        </footer>
    );
}

export default function NplExperience() {
    const [selectedImage, setSelectedImage] = useState(null);

    return (
        <main className="npl-page">
            <ConfettiCanvas />
            
            {/* Topbar back button */}
            <header className="lc-topbar">
                <Link href="/" aria-label="Back to Hunters FC">←</Link>
                <div>
                    <img src="/assets/npl/nplLogo.png" alt="NPL Logo" />
                    <span><small>NIRANNAPARAMBU</small><b>NPL SEASON 4</b></span>
                </div>
                <i>04</i>
            </header>

            {/* Modal Lightbox for Posters */}
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
