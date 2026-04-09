const SCATTER = [
  {top:"12%",left:"52%",text:"0xf3a1"},{top:"18%",left:"68%",text:"→ 443"},
  {top:"26%",left:"44%",text:"01001101"},{top:"32%",left:"74%",text:"node_14"},
  {top:"38%",left:"56%",text:"—ε: 2.4e-8"},{top:"44%",left:"40%",text:"0x1a2b"},
  {top:"50%",left:"78%",text:"req: 200"},{top:"56%",left:"48%",text:"lat: 1.2ms"},
  {top:"62%",left:"64%",text:"sig: 0xfe"},{top:"68%",left:"42%",text:"TTL: 64"},
  {top:"22%",left:"60%",text:"buf[128]"},{top:"74%",left:"70%",text:"pid: 3821"},
];
const METRICS = [{v:"700k",u:"+",l:"Social reach"},{v:"8",u:" days",l:"Avg. delivery"},{v:"6",u:"+",l:"Sites launched"}];

function HeroSection() {
  return (
    <section style={{position:"relative",width:"100%",minHeight:"100vh",overflow:"hidden",fontFamily:"var(--font-mono)",background:"#0e0e0e"}}>
      <div style={{position:"absolute",inset:0,pointerEvents:"none",backgroundImage:"linear-gradient(rgba(123,57,252,0.09) 1px, transparent 1px), linear-gradient(90deg, rgba(123,57,252,0.09) 1px, transparent 1px)",backgroundSize:"40px 40px"}}/>
      <div style={{position:"absolute",top:"-5%",left:"-15%",width:"65%",height:"70%",background:"radial-gradient(ellipse at center, rgba(123,57,252,0.11) 0%, transparent 70%)",pointerEvents:"none"}}/>
      <div style={{position:"absolute",right:260,bottom:60,fontFamily:"var(--font-mono)",fontSize:"clamp(120px,14vw,200px)",fontWeight:700,color:"rgba(123,57,252,0.04)",lineHeight:1,letterSpacing:"-0.06em",pointerEvents:"none"}}>v1</div>
      <div style={{position:"absolute",top:0,left:0,width:2,height:"100%",background:"#7b39fc"}}/>
      <div style={{position:"absolute",top:28,left:36,width:20,height:20,borderTop:"1px solid #7b39fc",borderLeft:"1px solid #7b39fc"}}/>
      <div style={{position:"absolute",bottom:28,right:28,width:20,height:20,borderBottom:"1px solid rgba(123,57,252,0.3)",borderRight:"1px solid rgba(123,57,252,0.3)"}}/>
      {SCATTER.map(s=><div key={s.text} style={{position:"absolute",top:s.top,left:s.left,fontSize:9,fontFamily:"var(--font-mono)",color:"rgba(123,57,252,0.55)",letterSpacing:"0.06em",pointerEvents:"none"}}>{s.text}</div>)}
      <div style={{position:"absolute",top:40,left:72,fontSize:10,letterSpacing:"0.25em",color:"#7b39fc",textTransform:"uppercase",fontFamily:"var(--font-mono)",display:"flex",alignItems:"center",gap:8}}>
        <span style={{width:5,height:5,borderRadius:"50%",background:"#7b39fc",animation:"pulse-dot 2s infinite"}}/>
        Available for new projects · 2026
      </div>
      <div style={{position:"absolute",inset:0,display:"flex",justifyContent:"center"}}>
        <div style={{width:"100%",maxWidth:1280,display:"flex"}}>
          <div style={{flex:1,display:"flex",flexDirection:"column",justifyContent:"center",paddingLeft:52,paddingRight:24,paddingTop:80,paddingBottom:64}}>
            <h1 style={{fontFamily:"var(--font-sans)",fontSize:"clamp(36px,5.5vw,62px)",fontWeight:700,lineHeight:1,color:"#f0e6ff",margin:0,letterSpacing:"-0.03em",maxWidth:520}}>
              <div>Modern websites.</div>
              <div style={{color:"#7b39fc"}}>Built to convert.</div>
            </h1>
            <p style={{marginTop:18,fontSize:11,lineHeight:1.9,color:"#ccc3d9",letterSpacing:"0.03em",maxWidth:340,fontFamily:"var(--font-sans)"}}>I design and build fast, beautiful websites for local businesses — from landing pages to full storefronts. Ready in days, not months.</p>
            <div style={{display:"flex",flexWrap:"wrap",gap:8,marginTop:24}}>
              {[["700k-follower client",true],["Ready in 8 days",true],["An Giang based",false]].map(([c,on])=>(
                <span key={c} style={{fontSize:10,letterSpacing:"0.14em",textTransform:"uppercase",padding:"5px 10px",border:on?"0.5px solid rgba(123,57,252,0.35)":"0.5px solid rgba(238,234,248,0.1)",color:on?"rgba(123,57,252,0.8)":"rgba(238,234,248,0.25)",background:on?"rgba(123,57,252,0.08)":"transparent",fontFamily:"var(--font-sans)"}}>{c}</span>
              ))}
            </div>
            <div style={{display:"flex",flexWrap:"wrap",alignItems:"center",gap:16,marginTop:32}}>
              <a href="#" style={{fontFamily:"var(--font-sans)",fontSize:11,letterSpacing:"0.14em",textTransform:"uppercase",background:"#7b39fc",color:"#0e0e0e",padding:"12px 24px",textDecoration:"none"}}>Get Started</a>
              <a href="#" style={{fontFamily:"var(--font-sans)",fontSize:11,letterSpacing:"0.12em",textTransform:"uppercase",background:"transparent",border:"0.5px solid rgba(123,57,252,0.3)",color:"rgba(238,234,248,0.45)",padding:"12px 24px",textDecoration:"none"}}>Browse Templates</a>
            </div>
          </div>
          <div style={{width:240,borderLeft:"0.5px solid rgba(123,57,252,0.15)",padding:"28px 24px",display:"flex",flexDirection:"column",justifyContent:"center"}}>
            {METRICS.map((m,i)=>(
              <div key={m.l} style={{padding:"20px 0",borderBottom:i<2?"0.5px solid rgba(123,57,252,0.1)":"none"}}>
                <p style={{fontFamily:"var(--font-sans)",fontSize:30,fontWeight:700,color:"#f0e6ff",lineHeight:1,margin:0}}>{m.v}<span style={{color:"#7b39fc",fontSize:18}}>{m.u}</span></p>
                <p style={{fontSize:9,letterSpacing:"0.18em",textTransform:"uppercase",color:"rgba(238,234,248,0.28)",marginTop:5,fontFamily:"var(--font-mono)"}}>{m.l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div style={{position:"absolute",bottom:80,left:52,fontSize:9,letterSpacing:"0.2em",color:"rgba(123,57,252,0.5)",fontFamily:"var(--font-mono)"}}>001 / 006</div>
      <div style={{position:"absolute",bottom:0,left:0,right:0,height:"30%",background:"linear-gradient(to bottom, transparent, #0e0e0e)",pointerEvents:"none"}}/>
    </section>
  );
}
window.HeroSection = HeroSection;
