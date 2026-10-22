(()=>{
const $=s=>document.querySelector(s),el=(t,c,h)=>{const e=document.createElement(t);if(c)e.className=c;if(h!=null)e.innerHTML=h;return e};
const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const BLN=["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"],HR=["Sen","Sel","Rab","Kam","Jum","Sab","Min"];
const key=d=>d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0");
const fmt=k=>{const[y,m,d]=k.split("-");return +d+" "+BLN[m-1]+" "+y};
const reduce=matchMedia("(prefers-reduced-motion:reduce)").matches;

/* Tema: ikut perangkat, bisa diganti manual */
const root=document.documentElement;
try{const s=localStorage.getItem("tema");if(s)root.dataset.theme=s}catch(e){}
$("#theme").onclick=()=>{const dark=root.dataset.theme?root.dataset.theme==="dark":matchMedia("(prefers-color-scheme:dark)").matches;root.dataset.theme=dark?"light":"dark";try{localStorage.setItem("tema",root.dataset.theme)}catch(e){}};
$("#yr").textContent=new Date().getFullYear();$("#yrs").textContent=new Date().getFullYear()-1995;

/* Animasi muncul saat gulir */
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}}),{threshold:.12});
const reveal=()=>document.querySelectorAll("[data-reveal]:not(.in)").forEach((e,i)=>{e.style.setProperty("--d",(i%5)*80+"ms");io.observe(e)});

/* Hitung naik untuk angka tahun berdiri */
const cb=$("[data-count]");
if(cb&&!reduce){const to=+cb.dataset.count,t0=performance.now();const co=new IntersectionObserver(([e])=>{if(!e.isIntersecting)return;co.disconnect();const f=t=>{const p=Math.min(1,(t-t0-0)/1200);cb.textContent=Math.round(1900+(to-1900)*(1-Math.pow(1-p,3)));if(p<1)requestAnimationFrame(f)};requestAnimationFrame(f)});co.observe(cb)}

/* Menu aktif */
const links=[...document.querySelectorAll("#menu a")];
const sio=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)links.forEach(a=>{const on=a.hash==="#"+e.target.id;a.classList.toggle("on",on);if(on)a.scrollIntoView({block:"nearest",inline:"center"})})}),{rootMargin:"-45% 0px -50% 0px"});
document.querySelectorAll("main section[id]").forEach(s=>sio.observe(s));

/* Prestasi: filter gabungan */
const F={level:"Semua",field:"Semua",year:"Semua",q:""};
const years=[...new Set(PRESTASI.map(p=>p.tahun).filter(Boolean))].sort((a,b)=>b-a);
const opt=(sel,list)=>{sel.innerHTML="";["Semua",...list].forEach(v=>sel.append(new Option(v,v)))};
opt($("#f-field"),BIDANG);opt($("#f-year"),years);
const match=(p,skip)=>(skip==="level"||F.level==="Semua"||p.tingkat===F.level)&&(F.field==="Semua"||p.bidang===F.field)&&(F.year==="Semua"||String(p.tahun)===F.year)&&(!F.q||[p.judul,p.desk,p.bidang,p.tingkat].join(" ").toLowerCase().includes(F.q.toLowerCase()));
function renderP(){
  const box=$("#f-level");box.innerHTML="";
  ["Semua",...TINGKAT].forEach(l=>{const n=l==="Semua"?PRESTASI.length:PRESTASI.filter(p=>p.tingkat===l).length;
    const b=el("button","chip",esc(l)+" ("+n+")");b.type="button";b.setAttribute("aria-pressed",F.level===l);b.onclick=()=>{F.level=l;renderP()};box.append(b)});
  const r=PRESTASI.filter(p=>match(p));const list=$("#prestasi-list");list.innerHTML="";
  r.forEach(p=>list.append(el("article","pitem",`<span class="badge">${esc(p.tingkat)}</span><span class="badge">${esc(p.bidang)}</span><span class="badge">${p.tahun||""}</span><h3>${esc(p.judul)}</h3><p>${esc(p.desk)}</p><p>Sumber: ${esc(p.sumber)}</p>`)));
  if(!r.length)list.append(el("div","empty","<h3>Tidak ada prestasi yang cocok</h3><p>Coba ubah atau atur ulang filter.</p>"));
  $("#f-count").textContent=r.length+" dari "+PRESTASI.length+" prestasi";
}
$("#f-field").onchange=e=>{F.field=e.target.value;renderP()};
$("#f-year").onchange=e=>{F.year=e.target.value;renderP()};
$("#f-q").oninput=e=>{F.q=e.target.value.trim();renderP()};
$("#f-reset").onclick=()=>{Object.assign(F,{level:"Semua",field:"Semua",year:"Semua",q:""});$("#f-field").value=$("#f-year").value="Semua";$("#f-q").value="";renderP()};
renderP();

/* Kalender agenda (minggu mulai Senin) */
const today=new Date(),T=key(today);let cur=new Date(today.getFullYear(),today.getMonth(),1),sel=T;
const evOn=k=>AGENDA.filter(e=>e.a<=k&&k<=e.b);
const evHTML=e=>`<div class="ev" style="--c:${JENIS[e.t].c}"><b>${esc(e.j)}</b>${JENIS[e.t].n} &middot; ${e.a===e.b?fmt(e.a):fmt(e.a)+" s.d. "+fmt(e.b)}${e.k?"<br>"+esc(e.k):""}</div>`;
function renderC(){
  $("#c-title").textContent=BLN[cur.getMonth()]+" "+cur.getFullYear();
  const g=$("#c-grid");g.innerHTML="";HR.forEach(h=>g.append(el("div","dow",h)));
  const off=(new Date(cur.getFullYear(),cur.getMonth(),1).getDay()+6)%7,start=new Date(cur.getFullYear(),cur.getMonth(),1-off);
  for(let i=0;i<42;i++){const d=new Date(start.getFullYear(),start.getMonth(),start.getDate()+i),k=key(d),es=evOn(k);
    const b=el("button","day"+(d.getMonth()!==cur.getMonth()?" out":"")+(k===T?" today":"")+(k===sel?" sel":""));b.type="button";
    b.innerHTML=`<span>${d.getDate()}</span><span class="mk">${es.map(e=>`<i class="${JENIS[e.t].s}" style="--c:${JENIS[e.t].c}"></i>`).join("")}</span>`;
    b.setAttribute("aria-label",fmt(k)+(es.length?": "+es.map(e=>e.j).join(", "):", belum ada agenda"));b.setAttribute("aria-pressed",k===sel);
    b.onclick=()=>{sel=k;if(d.getMonth()!==cur.getMonth())cur=new Date(d.getFullYear(),d.getMonth(),1);renderC()};g.append(b)}
  const es=evOn(sel);$("#c-sel-title").textContent=fmt(sel);
  $("#c-sel").innerHTML=es.length?es.map(evHTML).join(""):'<p class="muted">Belum ada agenda tercatat pada tanggal ini.</p>';
  const up=AGENDA.filter(e=>e.b>=T).sort((a,b)=>a.a.localeCompare(b.a)).slice(0,5);
  $("#c-next5").innerHTML=up.length?up.map(evHTML).join(""):'<p class="muted">Belum ada agenda mendatang.</p>';
}
$("#c-legend").innerHTML=Object.values(JENIS).map(j=>`<li><i class="${j.s}" style="--c:${j.c}"></i>${j.n}</li>`).join("");
$("#c-prev").onclick=()=>{cur=new Date(cur.getFullYear(),cur.getMonth()-1,1);renderC()};
$("#c-next").onclick=()=>{cur=new Date(cur.getFullYear(),cur.getMonth()+1,1);renderC()};
$("#c-today").onclick=()=>{cur=new Date(today.getFullYear(),today.getMonth(),1);sel=T;renderC()};
renderC();

/* Galeri + lightbox */
let gk="Semua";
function renderG(){
  const c=$("#g-chips");c.innerHTML="";["Semua","Kegiatan","Lomba"].forEach(k=>{const b=el("button","chip",k);b.type="button";b.setAttribute("aria-pressed",gk===k);b.onclick=()=>{gk=k;renderG()};c.append(b)});
  const g=$("#g-grid");g.innerHTML="";
  GALERI.filter(x=>gk==="Semua"||x.k===gk).forEach(x=>{const f=el("figure","",`<img src="${x.src}" alt="Foto ${esc(x.cap)} (foto contoh)" loading="lazy"><figcaption><span>${esc(x.cap)}</span><span class="badge">${x.k}</span></figcaption>`);
    f.tabIndex=0;const open=()=>{$("#lb-img").src=x.src;$("#lb-img").alt=x.cap;$("#lb-cap").textContent=x.cap;$("#lb").hidden=false;$("#lb-x").focus()};f.onclick=open;f.onkeydown=e=>{if(e.key==="Enter")open()};g.append(f)});
}
$("#lb-x").onclick=()=>$("#lb").hidden=true;$("#lb").onclick=e=>{if(e.target.id==="lb")$("#lb").hidden=true};
addEventListener("keydown",e=>{if(e.key==="Escape")$("#lb").hidden=true});
renderG();

/* Fasilitas dan berita */
$("#fas").innerHTML=FASILITAS.map(f=>`<div class="card" data-reveal><h3>${esc(f.n)}</h3><p>${esc(f.d)}</p></div>`).join("");
$("#news").innerHTML=BERITA.map(n=>`<article class="card" data-reveal><span class="badge">${esc(n.c)}</span><h3>${esc(n.j)}</h3><p>${esc(n.t)}</p></article>`).join("");
reveal();
})();
