const WORKS = [
  {title:"DUSK",tag:"F&B · Specialty drinks",bg:"linear-gradient(135deg,#1f1f1f 0%,#2a2a2a 50%,#0e0e0e 100%)"},
  {title:"Barber District",tag:"Barbershop · Booking",bg:"linear-gradient(135deg,#131313 0%,#1b1b1b 50%,#2a2a2a 100%)"},
  {title:"Thiệp Cưới Đình Toàn",tag:"Wedding Cards · 3D viewer",bg:"linear-gradient(135deg,#1b1b1b 0%,#2a2a2a 50%,#1f1f1f 100%)"},
  {title:"Cẩm Giang Shop",tag:"Dried specialty foods · Live client",bg:"linear-gradient(135deg,#2a2a2a 0%,#1b1b1b 50%,#0e0e0e 100%)"},
];

function WorkCard({ work, offset }) {
  const [h, setH] = React.useState(false);
  return (
    <div style={{marginTop:offset?96:0}} onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)}>
      <a href="#" style={{position:"relative",display:"block",borderRadius:14,overflow:"hidden",aspectRatio:"16/10",background:work.bg,cursor:"pointer",textDecoration:"none"}}>
        <div style={{position:"absolute",left:20,bottom:20,fontFamily:"var(--font-serif)",fontStyle:"italic",fontSize:28,color:"rgba(255,255,255,0.35)"}}>{work.title}</div>
        <div style={{position:"absolute",inset:0,background:"rgba(123,57,252,0.20)",display:"flex",alignItems:"center",justifyContent:"center",opacity:h?1:0,transition:"opacity 0.5s"}}>
          <span style={{color:"#fff",fontSize:40}}>↗</span>
        </div>
      </a>
      <div style={{marginTop:24,display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
        <div>
          <h3 style={{fontSize:20,fontWeight:600,color:"#fff",margin:0}}>{work.title}</h3>
          <p style={{color:"#ccc3d9",fontSize:14,marginTop:4,fontWeight:300}}>{work.tag}</p>
        </div>
        <span style={{fontSize:10,letterSpacing:"0.18em",textTransform:"uppercase",color:"#d0bcff",border:"0.5px solid rgba(123,57,252,0.2)",padding:"4px 12px",borderRadius:9999}}>2026</span>
      </div>
    </div>
  );
}

function WorksSection() {
  return (
    <section id="works" style={{width:"100%",padding:"96px 40px",background:"#0e0e0e"}}>
      <div style={{maxWidth:1280,margin:"0 auto",display:"flex",flexDirection:"column",gap:64}}>
        <div style={{display:"flex",alignItems:"flex-end",justifyContent:"space-between"}}>
          <div>
            <p style={{fontSize:11,fontWeight:600,color:"rgba(204,195,217,0.5)",textTransform:"uppercase",letterSpacing:"0.14em",marginBottom:12}}>Demo Projects</p>
            <h2 style={{fontSize:36,fontWeight:700,color:"#fff",margin:0,letterSpacing:"-0.02em"}}>What I can build for you</h2>
            <p style={{fontFamily:"var(--font-serif)",fontStyle:"italic",fontSize:22,color:"#ccc3d9",marginTop:4}}>Crafted for impact.</p>
          </div>
          <a href="#" style={{fontSize:14,color:"rgba(204,195,217,0.6)",textDecoration:"none"}}>See all →</a>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:48}}>
          {WORKS.map((w,i)=><WorkCard key={w.title} work={w} offset={i%2===1}/>)}
        </div>
      </div>
    </section>
  );
}
window.WorksSection = WorksSection;
