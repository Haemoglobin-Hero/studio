'use client';

import { useState } from 'react';

type Message={role:'user'|'assistant';text:string;sources?:{book:string;page:number}[]};

const topics=[
['01','The Earth','Earth structure, movements and geographic coordinates'],
['02','Climate','Atmosphere, weather elements and climate patterns'],
['03','Natural Resources','Land, water, forests, minerals and conservation'],
['04','Population','Distribution, growth, migration and settlement'],
['05','Agriculture','Crops, farming systems and agricultural regions'],
['06','Industry','Industrial activities, resources and locations'],
['07','Transport','Transport networks, trade and connectivity'],
['08','Sri Lanka','Physical and human geography of Sri Lanka']
];

const quick=['Explain monsoon winds','What is population density?','Make a mind map of agriculture','Give me an exam-style answer'];

export default function Home(){
 const [query,setQuery]=useState('');
 const [messages,setMessages]=useState<Message[]>([]);
 const [loading,setLoading]=useState(false);
 const [active,setActive]=useState('');

 async function ask(text=query){
  const clean=text.trim(); if(!clean||loading)return;
  setQuery(''); setMessages(m=>[...m,{role:'user',text:clean}]); setLoading(true);
  try{
   const r=await fetch('/api/ask',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({query:clean})});
   const d=await r.json(); setMessages(m=>[...m,{role:'assistant',text:d.answer,sources:d.sources}]);
  }catch{setMessages(m=>[...m,{role:'assistant',text:'Study engine unavailable. Try again in a moment.'}]);}
  finally{setLoading(false);}
 }

 return <main className="shell">
  <aside className="sidebar">
   <div className="brand"><div className="brandMark">G</div><div><strong>GeoLab</strong><span>O/L Study Hub</span></div></div>
   <nav><a className="nav active">⌂ <span>Overview</span></a><a className="nav">◈ <span>AI Tutor</span><b>LIVE</b></a><a className="nav">▤ <span>Textbooks</span></a><a className="nav">⌁ <span>Mind Maps</span></a><a className="nav">✓ <span>Revision</span></a></nav>
   <div className="sourceCard"><div className="sourceIcon">📚</div><strong>O/L Geography</strong><span>2 textbooks connected</span><div className="bookRow"><span>G10</span><small>169 pages</small></div><div className="bookRow"><span>G11</span><small>168 pages</small></div></div>
   <div className="sideBottom"><span>Focused study</span><span>v0.1</span></div>
  </aside>

  <section className="content">
   <header className="topbar"><div><span className="eyebrow">SUBJECT WORKSPACE</span><h1>Geography <em>O/L</em></h1></div><div className="status"><i/> Textbooks indexed <button>⌘ K</button></div></header>

   <section className="hero"><div className="heroCopy"><span className="pill">● AI TUTOR • TEXTBOOK GROUNDED</span><h2>Study geography with<br/><span>the books beside you.</span></h2><p>Ask questions across Grade 10 and Grade 11. Answers are designed to point you back to the relevant textbook and page.</p><div className="heroStats"><div><strong>337</strong><span>book pages</span></div><div><strong>G10 + G11</strong><span>combined O/L source</span></div><div><strong>2×</strong><span>source-aware answers</span></div></div></div><div className="globe"><div className="orbit one"/><div className="orbit two"/><div className="earth">🌍</div><span className="floatTag one">SOURCE</span><span className="floatTag two">PAGE</span><span className="floatTag three">O/L</span></div></section>

   <section className="askCard"><div className="askHead"><div><span className="eyebrow">YOUR GEOGRAPHY TUTOR</span><h3>What are you studying?</h3></div><span className="tinyBadge">G10 + G11</span></div><div className="promptBox"><textarea value={query} onChange={e=>setQuery(e.target.value)} onKeyDown={e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();ask()}}} placeholder="Ask anything from your Geography textbooks..."/><button className="send" onClick={()=>ask()} disabled={loading}>{loading?'…':'↑'}</button></div><div className="quick">{quick.map(p=><button key={p} onClick={()=>ask(p)}>{p}</button>)}</div>{messages.length>0&&<div className="chat">{messages.map((m,i)=><div className={'msg '+m.role} key={i}><div className="avatar">{m.role==='user'?'You':'G'}</div><div className="bubble"><div>{m.text}</div>{m.sources?.length?<div className="sources">{m.sources.map((s,j)=><span key={j}>📖 {s.book} · p. {s.page}</span>)}</div>:null}</div></div>)}</div>}</section>

   <section className="grid2"><div className="panel"><div className="panelHead"><div><span className="eyebrow">CONTINUE LEARNING</span><h3>Explore topics</h3></div><span>8 focus areas</span></div><div className="topics">{topics.map(([n,t,d])=><button className={active===t?'topic activeTopic':'topic'} onClick={()=>setActive(t)} key={t}><span>{n}</span><div><strong>{t}</strong><small>{d}</small></div><b>→</b></button>)}</div></div>
   <div className="panel"><div className="panelHead"><div><span className="eyebrow">YOUR SOURCES</span><h3>Textbook shelf</h3></div><span>2 books</span></div><div className="bookCard"><div className="cover">10</div><div><strong>Geography — Grade 10</strong><small>English • 169 pages</small><p>Core O/L Geography foundation</p></div></div><div className="bookCard"><div className="cover">11</div><div><strong>Geography — Grade 11</strong><small>English • 168 pages</small><p>Advanced O/L Geography content</p></div></div><div className="reference"><span>✦</span><div><strong>Source-aware answers</strong><small>Responses will carry the exact book + page after the textbook index/RAG layer is connected.</small></div></div></div></section>
   <footer><span>GeoLab • O/L Geography workspace</span><span>Grade 10 + Grade 11 • English</span></footer>
  </section>
 </main>
}
