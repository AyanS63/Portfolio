'use client';

import { useEffect, useState } from 'react';
import initialRepos from './repos.json';
import { GitBranch as Github, Code2, Smartphone, Sparkles, Cpu, Mail, Download, Menu, X, Trophy, ExternalLink, Check, Copy, Star, GitFork, RefreshCw } from 'lucide-react';

const email = 'ayanshakeel6104@gmail.com';
const github = 'https://github.com/AyanS63';
const skills = [
  { icon: Code2, no: '01', title: 'Web development', text: 'Full-stack web applications with the MERN stack.', tags: ['MongoDB', 'Express.js', 'React', 'Node.js', 'JavaScript'], className: 'web' },
  { icon: Smartphone, no: '02', title: 'Mobile development', text: 'Cross-platform applications with a Firebase backend.', tags: ['Flutter', 'Dart', 'Firebase'], className: 'mobile' },
  { icon: Sparkles, no: '03', title: 'AI-assisted development', text: 'Using AI tools and prompt-based workflows to bring ideas into code.', tags: ['Prompt engineering', 'AI tools', 'AI-assisted coding'], className: 'ai' },
  { icon: Cpu, no: '04', title: 'Computer systems', text: 'A practical understanding of the technology behind the software.', tags: ['Computer hardware', 'Software installation'], className: 'systems' },
];
const category = repo => repo.language === 'Dart' ? 'Mobile' : ['JavaScript', 'TypeScript', 'HTML', 'CSS', 'PHP'].includes(repo.language) ? 'Web' : 'Other';
const label = name => name.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/[-_]/g, ' ');

function Projects() {
  const [repos, setRepos] = useState(initialRepos);
  const [state, setState] = useState('ready');
  const [filter, setFilter] = useState('All');
  const [attempt, setAttempt] = useState(0);
  const [expanded, setExpanded] = useState(false);
  useEffect(() => {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 15000);
    let active = true;
    // Keep the verified snapshot visible while refreshing.
    (async () => {
      try {
        let all = [];
        for (let page = 1; page <= 10; page++) {
          const response = await fetch(`https://api.github.com/users/AyanS63/repos?per_page=100&sort=updated&page=${page}`, { signal: controller.signal, headers: { Accept: 'application/vnd.github+json' } });
          if (!response.ok) throw new Error('GitHub unavailable');
          const data = await response.json();
          if (!Array.isArray(data)) throw new Error('Unexpected response');
          all = all.concat(data);
          if (data.length < 100) break;
        }
        if (active) { setRepos(all.filter(r => !r.fork && r.name.toLowerCase() !== 'ayans63')); setState('ready'); }
      } catch { if (active) setState(initialRepos.length ? 'ready' : 'error'); }
      finally { clearTimeout(timer); }
    })();
    return () => { active = false; clearTimeout(timer); controller.abort(); };
  }, [attempt]);
  const visible = repos.filter(r => filter === 'All' || category(r) === filter);
  return <section id="projects" className="section projects">
    <div className="section-head"><div><p className="eyebrow">02 / MY WORK</p><h2>Ideas into<br /><span className="serif">applications.</span></h2></div><div className="section-intro"><p>Explore my public GitHub repositories.<br />A look at what I’m building and learning.</p><a className="text-link" href={`${github}?tab=repositories`} target="_blank" rel="noreferrer"><Github size={17} /> Explore GitHub</a></div></div>
    <div className="project-toolbar"><div className="filters" aria-label="Filter projects">{['All', 'Web', 'Mobile', 'Other'].map(f => <button key={f} className={filter === f ? 'selected' : ''} aria-pressed={filter === f} onClick={() => { setFilter(f); setExpanded(false); }}>{f === 'All' ? 'All projects' : f}</button>)}</div><span className="repository-note">{state === 'ready' ? `${repos.length} original repositories` : 'Sourced from GitHub'}</span></div>
    {state === 'loading' && <div className="repo-status" role="status"><RefreshCw className="spin" size={24} /><h3>Loading my repositories</h3><p>Getting the latest projects from GitHub.</p></div>}
    {state === 'error' && <div className="repo-status"><Github size={32} /><h3>My work lives on GitHub.</h3><p>The repository feed is temporarily unavailable. You can still explore all my work on GitHub.</p><div className="status-actions"><a className="button primary" href={`${github}?tab=repositories`} target="_blank" rel="noreferrer">View repositories <Github size={17}/></a><button className="button outline" onClick={() => setAttempt(a => a + 1)}>Try again <RefreshCw size={16}/></button></div></div>}
    {state === 'ready' && visible.length === 0 && <div className="repo-status"><Code2 size={28}/><h3>No {filter === 'All' ? '' : filter.toLowerCase() + ' '}repositories to show yet.</h3><p>Explore another category or visit my GitHub profile.</p><a className="text-link" href={github} target="_blank" rel="noreferrer">GitHub profile <Github size={17}/></a></div>}
    {state === 'ready' && visible.length > 0 && <div className="project-grid">{(expanded ? visible : visible.slice(0, 6)).map((repo, i) => <article className={`project-card project-${category(repo).toLowerCase()}`} key={repo.id}>
      <div className="project-art" aria-hidden="true"><span className="project-index">PROJECT / {String(i + 1).padStart(2, '0')}</span>{category(repo) === 'Mobile' ? <Smartphone size={80} strokeWidth={1}/> : <Code2 size={88} strokeWidth={1}/>}<span className="project-lang">{repo.language || 'Repository'}</span></div>
      <div className="project-body"><div className="project-meta"><span>{category(repo)} development</span><span><Star size={13}/>{repo.stargazers_count} <GitFork size={13}/>{repo.forks_count}</span></div><h3>{label(repo.name)}</h3><p>{repo.description || `Explore the source code for ${label(repo.name)} on GitHub.`}</p><div className="project-links"><a href={repo.html_url} target="_blank" rel="noreferrer"><Github size={16}/> Source code</a>{repo.homepage && /^https?:\/\//.test(repo.homepage) && <a href={repo.homepage} target="_blank" rel="noreferrer">Live site <ExternalLink size={15}/></a>}</div></div>
    </article>)}</div>}
    {state === 'ready' && visible.length > 6 && <div className="show-projects"><button className="button outline" onClick={() => setExpanded(!expanded)}>{expanded ? 'Show fewer projects' : `Show all ${visible.length} projects`}</button></div>}
  </section>;
}

export default function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  async function copyEmail() { try { await navigator.clipboard.writeText(email); setCopied(true); setCopyError(false); setTimeout(() => setCopied(false), 2500); } catch { setCopyError(true); } }
  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="header"><a href="#" className="brand" aria-label="Ayan Shakeel home">ayan<span>.</span><span className="brand-code">/ dev</span></a><button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-controls="navigation" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}>{menuOpen ? <X/> : <Menu/>}</button><nav id="navigation" className={menuOpen ? 'open' : ''}>{[['About', '#about'], ['Projects', '#projects'], ['Journey', '#journey']].map(([name, href]) => <a key={name} href={href} onClick={() => setMenuOpen(false)}>{name}</a>)}<a className="nav-contact" href="#contact" onClick={() => setMenuOpen(false)}>Let’s talk <Mail size={15}/></a></nav></header>
    <main id="main">
      <section className="hero"><div className="hero-top"><span className="availability"><span/> Open to my first developer role</span><span className="hero-location">WEB · MOBILE · AI</span></div>
        <div className="hero-grid"><div className="hero-copy"><p className="intro">HEY, I’M AYAN SHAKEEL</p><h1>Code with<br />curiosity.<br /><span className="serif lime">Build with purpose.</span></h1><p className="hero-description">MERN stack & Flutter developer turning ideas into web and mobile experiences, with a little help from AI.</p><div className="hero-actions"><a className="button primary" href="#projects">Explore my work <Code2 size={18}/></a><a className="button ghost" href="/Ayan_Shakeel_CV.docx" download>Download CV <Download size={17}/></a></div></div>
        <div className="hero-side"><div className="profile-code"><div className="code-bar"><span/><span/><span/><small>developer.js</small><Code2 size={16}/></div><div className="code-content"><span className="code-comment">// A little about me</span><p><span className="purple">const</span> developer <span className="muted">= {'{'}</span></p><p className="indent">name: <span className="lime">'Ayan Shakeel'</span>,</p><p className="indent">focus: [<span className="lime">'Web'</span>, <span className="lime">'Mobile'</span>],</p><p className="indent">stack: [<span className="lime">'MERN'</span>, <span className="lime">'Flutter'</span>],</p><p className="indent">backend: <span className="lime">'Firebase'</span>,</p><p className="indent">mindset: <span className="lime">'Always learning'</span></p><p className="muted">{'};'}</p><div className="code-output"><span>●</span> Ready for the next challenge<span className="cursor">_</span></div></div></div><div className="award-note"><div className="award-icon"><Trophy size={25}/></div><div><strong>Curiosity. Put to the test.</strong><p>Aptech competition winner<br/>Prompt engineering & mobile apps</p></div><span className="award-number">02</span></div></div></div>
        <div className="hero-bottom"><span>BUILDING · LEARNING · REPEATING</span><a href={github} target="_blank" rel="noreferrer"><Github size={18}/> AyanS63</a><span>SCROLL TO EXPLORE</span></div>
      </section>
      <div className="stack-strip" aria-label="Core technologies">{['React', 'Node.js', 'MongoDB', 'Flutter', 'Firebase', 'AI Tools'].map(x => <span key={x}><span className="plus">+</span>{x}</span>)}</div>
      <section id="about" className="section about"><div className="section-head"><div><p className="eyebrow">01 / WHAT I BRING</p><h2>One curious mind.<br/><span className="serif">A versatile toolkit.</span></h2></div><p className="section-intro">I’m an entry-level developer studying at Aptech Learning. My interests span full-stack web development, mobile apps, and the possibilities of AI-assisted coding.</p></div><div className="skills-grid">{skills.map(({icon: Icon, ...s}) => <article className={`skill-card ${s.className}`} key={s.no}><div className="skill-top"><Icon size={27} strokeWidth={1.5}/><span>{s.no}</span></div><h3>{s.title}</h3><p>{s.text}</p><div className="tags">{s.tags.map(tag => <span key={tag}>{tag}</span>)}</div></article>)}</div></section>
      <Projects/>
      <section id="journey" className="section journey"><div><p className="eyebrow">03 / THE JOURNEY SO FAR</p><h2>Learning by doing.<br/><span className="serif">Growing every day.</span></h2><p className="journey-description">At the start of my professional journey, with a foundation in development and a drive to keep improving.</p><div className="achievement"><Trophy size={30}/><div><span className="eyebrow">APTECH COMPETITIONS</span><h3>Two wins. More motivation.</h3><p>Winner — Prompt Engineering Competition</p><p>Winner — Mobile App Competition</p></div></div></div><div className="timeline">{[{date:'2023 — PRESENT',title:'ADSE Diploma',place:'Aptech Learning',detail:'In progress',active:true},{date:'2021 — 2023',title:'College Education',place:'Govt Islamia Science & Commerce College'},{date:'2010 — 2020',title:'School Education',place:'Little Folks School'}].map(item => <article key={item.title} className={item.active ? 'timeline-item active' : 'timeline-item'}><span className="timeline-dot"/><span className="timeline-date">{item.date}</span><h3>{item.title}</h3><p>{item.place}</p>{item.detail && <span className="in-progress">{item.detail}</span>}</article>)}</div></section>
      <section id="contact" className="contact"><div className="contact-top"><span className="eyebrow">04 / LET’S CONNECT</span><span>GOOD THINGS START WITH A CONVERSATION</span></div><h2>Have something<br/>in <span className="serif">mind?</span> Let’s talk.</h2><p>I’m looking for my first professional development opportunity.<br/>If my skills fit your team, I’d love to hear from you.</p><div className="email-row"><a href={`mailto:${email}`}>{email}</a><button onClick={copyEmail} aria-label="Copy email address">{copied ? <Check size={22}/> : <Copy size={22}/>}</button></div><span className="copy-message" role="status">{copied ? 'Email copied.' : copyError ? 'Please select and copy the email address above.' : ''}</span><div className="contact-links"><a href={`mailto:${email}`}><Mail size={18}/> Say hello</a><a href={github} target="_blank" rel="noreferrer"><Github size={18}/> GitHub</a><a href="/Ayan_Shakeel_CV.docx" download><Download size={18}/> My CV</a></div></section>
    </main><footer><a className="brand" href="#">ayan<span>.</span></a><p>© {new Date().getFullYear()} Ayan Shakeel</p><span>Made with React & curiosity.</span></footer>
  </>;
}
