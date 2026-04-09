const STEPS = [
  {n:"01",title:"Consult",desc:"Tell me about your business. I'll map out exactly what you need."},
  {n:"02",title:"Build",desc:"I design and develop your site. You review and approve each step."},
  {n:"03",title:"Launch",desc:"Your site goes live. I handle hosting, domain, and setup."},
];

function ProcessSection() {
  return (
    <section style={{position:"relative",width:"100%",padding:"128px 40px",overflow:"hidden",background:"#0e0e0e"}}>
      <div style={{position:"absolute",inset:0,opacity:0.2,pointerEvents:"none",backgroundImage:"radial-gradient(rgba(123,57,252,0.15) 1px, transparent 1px)",backgroundSize:"32px 32px"}}/>
      <div style={{position:"relative",maxWidth:1280,margin:"0 auto",display:"flex",flexDirection:"column",gap:64}}>
        <div style={{textAlign:"center"}}>
          <p style={{fontSize:11,fontWeight:600,color:"rgba(204,195,217,0.5)",textTransform:"uppercase",letterSpacing:"0.14em",marginBottom:12}}>How it works</p>
          <h2 style={{fontSize:36,fontWeight:700,color:"#fff",margin:0,letterSpacing:"-0.02em"}}>The Process</h2>
          <p style={{fontFamily:"var(--font-serif)",fontStyle:"italic",fontSize:22,color:"#ccc3d9",marginTop:8}}>How we build excellence.</p>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:32}}>
          {STEPS.map(s=>(
            <div key={s.n} style={{display:"flex",flexDirection:"column",alignItems:"center",textAlign:"center",gap:16}}>
              <span style={{fontSize:96,fontWeight:700,color:"rgba(255,255,255,0.05)",lineHeight:1,marginBottom:-32,userSelect:"none"}}>{s.n}</span>
              <h3 style={{fontSize:24,fontWeight:700,color:"#fff",margin:0,position:"relative",display:"inline-block",paddingBottom:2,borderBottom:"1px solid #7b39fc"}}>{s.title}</h3>
              <p style={{fontSize:14,color:"#ccc3d9",lineHeight:1.6,margin:0,maxWidth:240}}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CtaSection() {
  return (
    <section style={{width:"100%",padding:"128px 40px",background:"#0e0e0e"}}>
      <div style={{maxWidth:1280,margin:"0 auto",display:"flex",flexDirection:"column",alignItems:"center",textAlign:"center",gap:48}}>
        <h2 style={{fontSize:56,fontWeight:700,color:"#fff",lineHeight:1.1,maxWidth:720,margin:0,letterSpacing:"-0.02em"}}>Let's make something meaningful together.</h2>
        <a href="#" style={{display:"inline-flex",alignItems:"center",gap:12,padding:"16px 32px",borderRadius:9999,background:"#7b39fc",color:"#fff",fontWeight:600,fontSize:16,textDecoration:"none",boxShadow:"0 8px 24px rgba(123,57,252,0.20)"}}>
          <span>Let's talk</span><span>→</span>
        </a>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{width:"100%",background:"#0e0e0e",padding:"24px 48px 40px",borderTop:"0.5px solid rgba(255,255,255,0.05)"}}>
      <div style={{maxWidth:1280,margin:"0 auto",display:"flex",alignItems:"center",justifyContent:"space-between",gap:16,flexWrap:"wrap"}}>
        <div>
          <span style={{fontFamily:"var(--font-serif)",fontStyle:"italic",color:"#fff",fontSize:18}}>Minh Tâm</span>
          <p style={{fontSize:11,color:"#4a4456",marginTop:4,fontWeight:300,letterSpacing:"0.04em"}}>© 2026 Minh Tâm. All rights reserved.</p>
        </div>
        <span style={{fontSize:11,color:"#4a4456",fontWeight:300,letterSpacing:"0.04em"}}>Let's make something meaningful together.</span>
        <div style={{display:"flex",alignItems:"center",gap:20}}>
          <a href="#" style={{color:"#4a4456",textDecoration:"none"}}>
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
          </a>
          <a href="#" style={{color:"#4a4456",textDecoration:"none"}}>
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.76a4.85 4.85 0 01-1.01-.07z"/></svg>
          </a>
        </div>
      </div>
    </footer>
  );
}

window.ProcessSection = ProcessSection;
window.CtaSection = CtaSection;
window.Footer = Footer;
