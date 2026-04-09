function Navbar() {
  return (
    <div style={{position:"fixed",top:20,left:"50%",transform:"translateX(-50%)",zIndex:50}}>
      <nav style={{display:"inline-flex",alignItems:"center",gap:22,padding:"10px 22px",borderRadius:9999,backdropFilter:"blur(12px)",background:"rgba(255,255,255,0.05)",border:"0.5px solid rgba(255,255,255,0.06)",boxShadow:"0 0 50px rgba(123,57,252,0.10)",whiteSpace:"nowrap"}}>
        <span style={{width:8,height:8,borderRadius:"50%",background:"#7b39fc",animation:"pulse-dot 2s infinite"}}/>
        {[["Home",true],["Projects"],["Learning"],["About"],["Contact"]].map(([k,active])=>(
          <a key={k} href="#" style={{fontFamily:"var(--font-sans)",fontSize:13,color:active?"#fff":"rgba(255,255,255,0.60)",textDecoration:"none",fontWeight:active?600:400,display:"flex",alignItems:"center",gap:6}}>
            {k}
            {active && <span style={{width:4,height:4,borderRadius:"50%",background:"#7b39fc"}}/>}
          </a>
        ))}
        <span style={{fontFamily:"var(--font-mono)",fontSize:11,color:"rgba(238,234,248,0.45)",letterSpacing:"0.1em"}}>EN / VI</span>
      </nav>
    </div>
  );
}
window.Navbar = Navbar;
