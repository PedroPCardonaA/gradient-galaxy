/* ================= FIGURE CATALOG (object figs: {k:"…", …}) ================= */
const PAL = ["#1e88e5","#e53935","#43a047","#fb8c00","#8e24aa","#00897b","#c0a000","#6d4c41","#d81b60","#3949ab"];
const esc = s => String(s ?? "").replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const lbl = v => esc(tx(v));
const PANEL_L = "ABCDEFGH";
function gauss(r){ let u=0; for(let i=0;i<6;i++) u+=r(); return (u-3)/Math.sqrt(.5); }
function niceTicks(a, b, n){
  const span = (b-a) || 1, raw = span/n, mag = Math.pow(10, Math.floor(Math.log10(raw))), f = raw/mag;
  const step = (f<1.5?1:f<3?2:f<7?5:10)*mag, out = [];
  for(let v = Math.floor(a/step+1e-9)*step; v <= b + step*.5 - 1e-12 || out.length < 2; v += step){ out.push(+v.toFixed(10)); if(out.length > 40) break; }
  if(out[out.length-1] < b - 1e-12) out.push(+(out[out.length-1]+step).toFixed(10));
  return out;
}
const numFmt = v => { const a = Math.abs(v); return a>=1000 ? String(Math.round(v)) : a>=10 ? String(+v.toFixed(1)) : String(+v.toFixed(a>=1?2:3)); };
function svgOpen(W, H, label){ return `<svg viewBox="0 0 ${W} ${H}" width="${W}" role="img" aria-label="${esc(label)}" font-family="system-ui,sans-serif">`; }
function figColors(){ return {fg:css("--text"), mu:css("--muted"), bg:css("--panel-solid"), acc:css("--accent")}; }

/* ---------- datasets ---------- */
function makeData(name, n, seed, noisy){
  let h = 0; for(const ch of String(name)) h = (h*31 + ch.charCodeAt(0)) | 0;
  const r = mulberry((seed||1)*7919 + h), g = () => gauss(r), P = [];
  const blob = (cs, sd) => { for(let i=0;i<n;i++){ const c = i % cs.length; P.push([cs[c][0]+g()*sd, cs[c][1]+g()*sd, c]); } };
  const nz = noisy ? 2.2 : 1;
  switch(name){
    case "blobs2": blob([[-.5,-.4],[.5,.4]], .18*nz); break;
    case "blobs3": blob([[-.55,-.4],[.55,-.35],[0,.55]], .15*(noisy?1.6:1)); break;
    case "blobs4": blob([[-.5,-.5],[.5,-.5],[-.5,.5],[.5,.5]], .14*(noisy?1.6:1)); break;
    case "tight": blob([[-.6,-.55],[.6,-.5],[-.55,.6],[.6,.55],[0,.02]], .06); break;
    case "overlap": blob([[-.22,-.12],[.22,.1],[0,.28]], .3); break;
    case "moons": for(let i=0;i<n;i++){ const c=i%2, t=Math.PI*r(); const x = c ? 1-Math.cos(t) : Math.cos(t), y = c ? .5-Math.sin(t) : Math.sin(t); P.push([(x-.5)*.65+g()*.035*nz*1.4, (y-.25)*.65+g()*.035*nz*1.4, c]); } break;
    case "circles": for(let i=0;i<n;i++){ const c=i%2, t=2*Math.PI*r(), rad = c ? .4 : .9; P.push([Math.cos(t)*rad+g()*.035*nz, Math.sin(t)*rad+g()*.035*nz, c]); } break;
    case "xor": for(let i=0;i<n;i++){ let x=r()*1.8-.9, y=r()*1.8-.9; if(Math.abs(x)<.1) x += x<0 ? -.1 : .1; if(Math.abs(y)<.1) y += y<0 ? -.1 : .1; let c = x*y>0 ? 0 : 1; if(noisy && r()<.06) c = 1-c; P.push([x,y,c]); } break;
    case "linear": while(P.length<n){ const x=r()*1.8-.9, y=r()*1.8-.9, d=y-.6*x; if(!noisy && Math.abs(d)<.1) continue; let c = d>0 ? 1 : 0; if(noisy && r()<.07) c = 1-c; P.push([x,y,c]); } break;
    case "aniso": { const a=Math.PI/6, d=[Math.cos(a),Math.sin(a)], nv=[-Math.sin(a),Math.cos(a)]; for(let i=0;i<n;i++){ const c=i%3, off=(c-1)*.36, l=g()*.38, s=g()*.045; P.push([d[0]*l+nv[0]*(off+s), d[1]*l+nv[1]*(off+s), c]); } } break;
    case "outliers": blob([[-.35,-.25],[.4,.3]], .14); P.length = Math.max(0, n-6); [[.95,-.9],[-.92,.88],[.9,.92],[-.95,-.7],[.05,-.97],[-.1,.96]].forEach(p => P.push([p[0],p[1],2])); break;
    default: blob([[0,0]], .3);
  }
  return P;
}
function kmeans(P, k, seed){
  const r = mulberry((seed||1)+101); let best = null;
  for(let rep=0; rep<8; rep++){
    const C = [P[Math.floor(r()*P.length)].slice(0,2)];
    while(C.length < k){ const d = P.map(p => Math.min(...C.map(c => (p[0]-c[0])**2+(p[1]-c[1])**2))); let s = d.reduce((a,b)=>a+b,0)*r(), j=0; for(; j<d.length-1; j++){ s -= d[j]; if(s<=0) break; } C.push(P[j].slice(0,2)); }
    let lab = [];
    for(let it=0; it<100; it++){
      lab = P.map(p => { let b=0, bd=Infinity; C.forEach((c,ci) => { const dd=(p[0]-c[0])**2+(p[1]-c[1])**2; if(dd<bd){ bd=dd; b=ci; } }); return b; });
      let moved = false;
      C.forEach((c,ci) => { const m = P.filter((_,i)=>lab[i]===ci); if(!m.length) return; const nx = m.reduce((s,p)=>s+p[0],0)/m.length, ny = m.reduce((s,p)=>s+p[1],0)/m.length; if(Math.abs(nx-c[0])+Math.abs(ny-c[1]) > 1e-10) moved = true; c[0]=nx; c[1]=ny; });
      if(!moved) break;
    }
    const inertia = P.reduce((s,p,i) => s+(p[0]-C[lab[i]][0])**2+(p[1]-C[lab[i]][1])**2, 0);
    if(!best || inertia < best.inertia) best = {lab, C, inertia};
  }
  return best;
}
function dbscan(P, eps, minPts){
  const n = P.length, lab = new Array(n).fill(undefined);
  const nb = i => { const o=[]; for(let j=0;j<n;j++){ const dx=P[i][0]-P[j][0], dy=P[i][1]-P[j][1]; if(dx*dx+dy*dy <= eps*eps) o.push(j); } return o; };
  let C = 0;
  for(let i=0;i<n;i++){
    if(lab[i]!==undefined) continue; const N = nb(i);
    if(N.length < minPts){ lab[i] = -1; continue; }
    lab[i] = C; const seed = N.filter(j=>j!==i), inS = new Set(seed);
    for(let k=0;k<seed.length;k++){ const j = seed[k]; if(lab[j]===-1) lab[j]=C; if(lab[j]!==undefined) continue; lab[j]=C; const N2 = nb(j); if(N2.length >= minPts) for(const m of N2) if(!inS.has(m)){ inS.add(m); seed.push(m); } }
    C++;
  }
  return {lab, C};
}
function classifier(P, kind){
  const cls = [...new Set(P.map(p=>p[2]))].sort((a,b)=>a-b);
  if(kind === "linear"){ const M = cls.map(c => { const m=P.filter(p=>p[2]===c); return [m.reduce((s,p)=>s+p[0],0)/m.length, m.reduce((s,p)=>s+p[1],0)/m.length]; });
    return (x,y) => { let b=0, bd=Infinity; M.forEach((m,i)=>{ const d=(x-m[0])**2+(y-m[1])**2; if(d<bd){ bd=d; b=i; } }); return cls[b]; }; }
  if(kind === "circle"){ const R = cls.map(c => { const m=P.filter(p=>p[2]===c); return m.reduce((s,p)=>s+Math.hypot(p[0],p[1]),0)/m.length; });
    return (x,y) => { const rr=Math.hypot(x,y); let b=0, bd=Infinity; R.forEach((v,i)=>{ if(Math.abs(rr-v)<bd){ bd=Math.abs(rr-v); b=i; } }); return cls[b]; }; }
  const k = kind === "wiggly" ? 1 : 15;
  return (x,y) => { const d = P.map(p => [(p[0]-x)**2+(p[1]-y)**2, p[2]]).sort((a,b)=>a[0]-b[0]).slice(0,k); const cnt = {}; d.forEach(e => cnt[e[1]] = (cnt[e[1]]||0) + 1); return +Object.keys(cnt).sort((a,b)=>cnt[b]-cnt[a])[0]; };
}

/* ---------- scatter ---------- */
function scatterPanel(o, ox, oy, S0, C){
  const n = o.n || 150, nk = typeof o.k === "number" ? o.k : (o.nk || o.clusters || 3);
  const P = makeData(o.data || "blobs3", n, o.seed || 1, !!o.boundary && o.noise !== false);
  const lim = 1.15, X = v => ox + (v+lim)/(2*lim)*S0, Y = v => oy + S0 - (v+lim)/(2*lim)*S0;
  let s = `<rect x="${ox}" y="${oy}" width="${S0}" height="${S0}" fill="${C.bg}" stroke="${C.mu}" stroke-opacity=".5"/>`;
  if(o.boundary){ const f = classifier(P, o.boundary), G = 46, cs = S0/G;
    for(let i=0;i<G;i++) for(let j=0;j<G;j++){ const x = -lim + (i+.5)/G*2*lim, y = lim - (j+.5)/G*2*lim; s += `<rect x="${(ox+i*cs).toFixed(2)}" y="${(oy+j*cs).toFixed(2)}" width="${cs.toFixed(2)}" height="${cs.toFixed(2)}" fill="${PAL[f(x,y)%PAL.length]}" fill-opacity=".24" shape-rendering="crispEdges"/>`; } }
  let lab = P.map(p => p[2]), cents = null;
  const col = o.color || "true";
  if(col === "kmeans"){ const km = kmeans(P, nk, o.seed || 1); lab = km.lab; cents = km.C; }
  else if(col === "dbscan"){ lab = dbscan(P, o.eps ?? .18, o.minPts ?? 5).lab; }
  const clip = v => Math.max(-lim+.02, Math.min(lim-.02, v));
  P.forEach((p,i) => { const x = X(clip(p[0])).toFixed(1), y = Y(clip(p[1])).toFixed(1);
    if(col === "none") s += `<circle cx="${x}" cy="${y}" r="3.2" fill="${C.mu}" fill-opacity=".8"/>`;
    else if(lab[i] === -1) s += `<circle cx="${x}" cy="${y}" r="3.2" fill="none" stroke="${C.fg}" stroke-opacity=".7"/>`;
    else s += `<circle cx="${x}" cy="${y}" r="3.4" fill="${PAL[lab[i]%PAL.length]}" stroke="rgba(0,0,0,.35)" stroke-width=".6"/>`; });
  if(cents) cents.forEach(c => { const x = X(c[0]), y = Y(c[1]); s += `<path d="M${x-7} ${y-7}L${x+7} ${y+7}M${x+7} ${y-7}L${x-7} ${y+7}" stroke="${C.fg}" stroke-width="3.2"/><path d="M${x-7} ${y-7}L${x+7} ${y+7}M${x+7} ${y-7}L${x-7} ${y+7}" stroke="${C.bg}" stroke-width="1.2"/>`; });
  return s;
}
function figScatter(f){
  const C = figColors(), base = {...f}; delete base.panels;
  const panels = f.panels ? f.panels.map(p => ({...base, ...p})) : [base];
  const multi = panels.length > 1, S0 = multi ? 210 : 300, gap = 18, top = multi ? 22 : 6;
  const W = panels.length*S0 + (panels.length-1)*gap + 12, H = S0 + top + 8;
  let s = svgOpen(W, H, "scatter plot");
  panels.forEach((p,i) => { const ox = 6 + i*(S0+gap); if(multi) s += `<text x="${ox+S0/2}" y="16" font-size="15" font-weight="800" text-anchor="middle" fill="${C.fg}">${PANEL_L[i]}</text>`; s += scatterPanel(p, ox, top, S0, C); });
  return s + `</svg>`;
}

/* ---------- line ---------- */
function figLine(f){
  const series = f.series || [], hasLeg = series.length > 1 || !!(series[0] && series[0].name);
  const C = figColors(), W = 460, H = 290 + (hasLeg ? 18 : 0), L = 54, R = 16, T = hasLeg ? 32 : 14, B = 46;
  const xs = f.xs || [], all = series.flatMap(s => s.ys).filter(v => v!=null && isFinite(v));
  let ymin = f.yMin ?? (Math.min(...all) >= 0 ? 0 : Math.min(...all)), ymax = f.yMax ?? Math.max(...all);
  if(ymax === ymin) ymax = ymin + 1;
  const ticks = niceTicks(ymin, ymax, 6); ymin = Math.min(ymin, ticks[0]); ymax = ticks[ticks.length-1];
  const numeric = xs.every(v => typeof v === "number"), xmin = numeric ? Math.min(...xs) : 0, xmax = numeric ? Math.max(...xs) : xs.length-1;
  const X = (v,i) => L + (((numeric ? v : i) - xmin) / ((xmax-xmin)||1)) * (W-L-R), Y = v => H-B - (v-ymin)/(ymax-ymin)*(H-T-B);
  let s = svgOpen(W, H, "line chart");
  ticks.filter(v => v>=ymin-1e-9 && v<=ymax+1e-9).forEach(v => { s += `<line x1="${L}" x2="${W-R}" y1="${Y(v)}" y2="${Y(v)}" stroke="${C.mu}" stroke-opacity=".22"/><text x="${L-6}" y="${Y(v)+4}" font-size="11" text-anchor="end" fill="${C.mu}">${numFmt(v)}</text>`; });
  const every = Math.ceil(xs.length / 13);
  xs.forEach((v,i) => { if(i % every) return; s += `<line x1="${X(v,i)}" x2="${X(v,i)}" y1="${H-B}" y2="${H-B+4}" stroke="${C.mu}"/><text x="${X(v,i)}" y="${H-B+16}" font-size="11" text-anchor="middle" fill="${C.mu}">${esc(typeof v==="number" ? numFmt(v) : tx(v))}</text>`; });
  s += `<line x1="${L}" x2="${W-R}" y1="${H-B}" y2="${H-B}" stroke="${C.mu}"/><line x1="${L}" x2="${L}" y1="${T}" y2="${H-B}" stroke="${C.mu}"/>`;
  (f.marks || []).forEach(m => { const i = xs.indexOf(m), x = numeric ? X(m) : X(0, i); s += `<line x1="${x}" x2="${x}" y1="${T}" y2="${H-B}" stroke="${C.acc}" stroke-dasharray="5 4" stroke-width="1.6"/>`; });
  series.forEach((sr,si) => { const c = PAL[si % PAL.length], pts = sr.ys.map((y,i) => (y==null ? null : [X(xs[i],i), Y(y)])).filter(Boolean);
    s += `<polyline fill="none" stroke="${c}" stroke-width="2.4" ${si>0 && sr.dash ? 'stroke-dasharray="6 4"' : ""} points="${pts.map(p=>p[0].toFixed(1)+","+p[1].toFixed(1)).join(" ")}"/>`;
    if(xs.length <= 25) pts.forEach(p => s += `<circle cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" r="3" fill="${c}"/>`); });
  if(hasLeg){ let lx = L; series.forEach((sr,si) => { const nm = tx(sr.name); s += `<rect x="${lx}" y="10" width="14" height="4" fill="${PAL[si%PAL.length]}"/><text x="${lx+18}" y="16" font-size="11" fill="${C.fg}">${esc(nm)}</text>`; lx += 30 + nm.length*6.2; }); }
  s += `<text x="${(L+W-R)/2}" y="${H-8}" font-size="12" text-anchor="middle" fill="${C.fg}">${lbl(f.xLabel)}</text><text x="13" y="${(T+H-B)/2}" font-size="12" text-anchor="middle" fill="${C.fg}" transform="rotate(-90 13 ${(T+H-B)/2})">${lbl(f.yLabel)}</text>`;
  return s + `</svg>`;
}

/* ---------- bars ---------- */
function figBars(f){
  const C = figColors(), items = f.items || [], n = items.length, longest = Math.max(...items.map(it => tx(it[0]).length));
  const rot = n > 4 && longest > 7, W = Math.max(320, Math.min(620, 80 + n*Math.max(46, Math.min(80, longest*7)))), H = 270 + (rot ? 30 : 0), L = 52, R = 16, T = 18, B = rot ? 76 : 46;
  const vals = items.map(it => it[1]), total = vals.reduce((a,b)=>a+b,0), vmax = f.cumulative ? Math.max(total, ...vals) : Math.max(...vals);
  const ticks = niceTicks(0, vmax, 5), ymax = ticks[ticks.length-1], Y = v => H-B - v/ymax*(H-T-B), bw = (W-L-R)/n;
  let s = svgOpen(W, H, "bar chart");
  ticks.forEach(v => s += `<line x1="${L}" x2="${W-R}" y1="${Y(v)}" y2="${Y(v)}" stroke="${C.mu}" stroke-opacity=".22"/><text x="${L-6}" y="${Y(v)+4}" font-size="11" text-anchor="end" fill="${C.mu}">${numFmt(v)}</text>`);
  items.forEach((it,i) => { const x = L + i*bw + bw*.15, w = bw*.7, y = Y(it[1]);
    s += `<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${w.toFixed(1)}" height="${(H-B-y).toFixed(1)}" rx="3" fill="${PAL[0]}" fill-opacity=".85"/><text x="${(x+w/2).toFixed(1)}" y="${(y-4).toFixed(1)}" font-size="11" text-anchor="middle" fill="${C.fg}">${numFmt(it[1])}</text>`;
    const tx0 = (L + i*bw + bw/2).toFixed(1);
    s += rot ? `<text x="${tx0}" y="${H-B+14}" font-size="11" text-anchor="end" fill="${C.fg}" transform="rotate(-35 ${tx0} ${H-B+14})">${lbl(it[0])}</text>` : `<text x="${tx0}" y="${H-B+16}" font-size="11" text-anchor="middle" fill="${C.fg}">${lbl(it[0])}</text>`; });
  if(f.cumulative){ let c = 0; const pts = items.map((it,i) => { c += it[1]; return [L + i*bw + bw/2, Y(c)]; });
    s += `<polyline fill="none" stroke="${PAL[1]}" stroke-width="2.2" points="${pts.map(p=>p[0].toFixed(1)+","+p[1].toFixed(1)).join(" ")}"/>` + pts.map(p => `<circle cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" r="3.5" fill="${PAL[1]}"/>`).join("");
    s += `<rect x="${L+8}" y="${T}" width="12" height="4" fill="${PAL[1]}"/><text x="${L+24}" y="${T+6}" font-size="11" fill="${C.fg}">${S.lang==="en"?"cumulative":"kumulativ"}</text>`; }
  s += `<line x1="${L}" x2="${W-R}" y1="${H-B}" y2="${H-B}" stroke="${C.mu}"/><text x="${(L+W-R)/2}" y="${H-6}" font-size="12" text-anchor="middle" fill="${C.fg}">${lbl(f.xLabel)}</text>`;
  if(f.yLabel) s += `<text x="13" y="${(T+H-B)/2}" font-size="12" text-anchor="middle" fill="${C.fg}" transform="rotate(-90 13 ${(T+H-B)/2})">${lbl(f.yLabel)}</text>`;
  return s + `</svg>`;
}

/* ---------- loss curves ---------- */
function lossCurves(p){
  const r = mulberry(String(p).length*13 + 5), N = 50, tr = [], va = [];
  for(let e=0; e<N; e++){ const nz = r()-.5;
    switch(p){
      case "overfit": tr.push(.95*Math.exp(-e/9)+.04+.006*nz); va.push(.95*Math.exp(-e/9)+.16+.0004*Math.max(0,e-12)**2+.01*nz); break;
      case "underfit": tr.push(.78+.12*Math.exp(-e/4)+.01*nz); va.push(.82+.12*Math.exp(-e/4)+.01*nz); break;
      case "good": tr.push(.9*Math.exp(-e/8)+.08+.008*nz); va.push(.9*Math.exp(-e/8)+.13+.01*nz); break;
      case "oscillate": tr.push(.55+.25*Math.exp(-e/25)+(e%2?1:-1)*(.18+.08*r())); break;
      case "slow": tr.push(1-.007*e+.006*nz); break;
      case "diverge": tr.push(e<6 ? .95-.07*e+.01*nz : .55*Math.exp((e-6)/9)); break;
      case "noisy": tr.push(Math.max(.02, .9*Math.exp(-e/10)+.1+.16*nz)); break;
      default: tr.push(.9*Math.exp(-e/8)+.1);
    } }
  return {tr, va: va.length ? va : null};
}
function figLoss(f){
  const C = figColors(), panels = f.panels || [f.preset], multi = panels.length > 1;
  const PW = multi ? 220 : 380, PH = multi ? 170 : 230, gap = 14, top = multi ? 22 : 4, L = 36, B = 30;
  const W = panels.length*PW + (panels.length-1)*gap + 8, H = PH + top + 26;
  let s = svgOpen(W, H, "loss curves"), anyVal = false;
  panels.forEach((p,pi) => { const ox = 4 + pi*(PW+gap), {tr, va} = lossCurves(p), ymax = 1.3;
    const X = e => ox + L + e/49*(PW-L-8), Y = v => top + (PH-B) - Math.min(ymax, Math.max(0,v))/ymax*(PH-B-6);
    if(multi) s += `<text x="${ox+PW/2}" y="16" font-size="15" font-weight="800" text-anchor="middle" fill="${C.fg}">${PANEL_L[pi]}</text>`;
    s += `<rect x="${ox+L}" y="${top}" width="${PW-L-8}" height="${PH-B}" fill="${C.bg}" stroke="${C.mu}" stroke-opacity=".4"/>`;
    [0,.5,1].forEach(v => s += `<text x="${ox+L-4}" y="${Y(v)+4}" font-size="10" text-anchor="end" fill="${C.mu}">${v}</text>`);
    [0,10,20,30,40].forEach(e => s += `<text x="${X(e)}" y="${top+PH-B+13}" font-size="10" text-anchor="middle" fill="${C.mu}">${e}</text>`);
    s += `<polyline fill="none" stroke="${PAL[0]}" stroke-width="2.2" points="${tr.map((v,e)=>X(e).toFixed(1)+","+Y(v).toFixed(1)).join(" ")}"/>`;
    if(va){ anyVal = true; s += `<polyline fill="none" stroke="${PAL[3]}" stroke-width="2.2" stroke-dasharray="6 4" points="${va.map((v,e)=>X(e).toFixed(1)+","+Y(v).toFixed(1)).join(" ")}"/>`; }
    s += `<text x="${ox+L+(PW-L-8)/2}" y="${top+PH-4}" font-size="11" text-anchor="middle" fill="${C.fg}">epoch</text>`;
    if(pi===0) s += `<text x="${ox+11}" y="${top+(PH-B)/2}" font-size="11" text-anchor="middle" fill="${C.fg}" transform="rotate(-90 ${ox+11} ${top+(PH-B)/2})">loss</text>`; });
  const en = S.lang === "en", ly = H - 8;
  s += `<rect x="8" y="${ly-5}" width="16" height="3" fill="${PAL[0]}"/><text x="28" y="${ly}" font-size="11" fill="${C.fg}">${en?"training":"trening"}</text>`;
  if(anyVal) s += `<line x1="100" x2="116" y1="${ly-3.5}" y2="${ly-3.5}" stroke="${PAL[3]}" stroke-width="2.2" stroke-dasharray="5 3"/><text x="120" y="${ly}" font-size="11" fill="${C.fg}">${en?"validation":"validering"}</text>`;
  return s + `</svg>`;
}

/* ---------- multi ROC ---------- */
function figRocMulti(f){
  const C = figColors(), W = 440, H = 300, P = 40, sz = 246, X = v => P + v*sz, Y = v => H - P - v*sz + 10;
  let s = svgOpen(W, H, "ROC curves");
  for(let i=0;i<=5;i++){ const v=i/5; s += `<line x1="${X(v)}" y1="${Y(0)}" x2="${X(v)}" y2="${Y(1)}" stroke="${C.mu}" stroke-opacity=".18"/><line x1="${X(0)}" y1="${Y(v)}" x2="${X(1)}" y2="${Y(v)}" stroke="${C.mu}" stroke-opacity=".18"/><text x="${X(v)}" y="${Y(0)+14}" font-size="10" text-anchor="middle" fill="${C.mu}">${v.toFixed(1)}</text><text x="${X(0)-5}" y="${Y(v)+3}" font-size="10" text-anchor="end" fill="${C.mu}">${v.toFixed(1)}</text>`; }
  s += `<line x1="${X(0)}" y1="${Y(0)}" x2="${X(1)}" y2="${Y(1)}" stroke="${C.mu}" stroke-dasharray="5 4"/>`;
  (f.aucs || []).forEach((a,i) => { const c = Math.max(1e-3, 1/Math.max(1e-3,a) - 1), pts = [];
    for(let j=0;j<=100;j++){ const x = j/100; pts.push([X(x), Y(x===0 && c<1e-2 ? 0 : Math.pow(x, c))]); }
    s += `<polyline fill="none" stroke="${PAL[i%PAL.length]}" stroke-width="2.4" points="${pts.map(p=>p[0].toFixed(1)+","+p[1].toFixed(1)).join(" ")}"/>`;
    s += `<rect x="${X(1)+16}" y="${30+i*20}" width="14" height="4" fill="${PAL[i%PAL.length]}"/><text x="${X(1)+34}" y="${36+i*20}" font-size="12" fill="${C.fg}">${lbl((f.labels||[])[i] ?? PANEL_L[i])}</text>`; });
  s += `<text x="${X(.5)}" y="${H-4}" font-size="11" text-anchor="middle" fill="${C.fg}">FPR</text><text x="11" y="${Y(.5)}" font-size="11" text-anchor="middle" fill="${C.fg}" transform="rotate(-90 11 ${Y(.5)})">TPR</text>`;
  return s + `</svg>`;
}

/* ---------- confusion matrix heatmap ---------- */
function figCM(f){
  const C = figColors(), labs = f.labels || [], m = f.m || [], n = m.length, cs = n > 4 ? 46 : 58, L = 90, T = 46;
  const W = L + n*cs + 20, H = T + n*cs + 30, mx = Math.max(...m.flat()), en = S.lang === "en";
  let s = svgOpen(W, H, "confusion matrix");
  s += `<text x="${L+n*cs/2}" y="14" font-size="12" font-weight="700" text-anchor="middle" fill="${C.fg}">${en?"Predicted":"Predikert"}</text>`;
  s += `<text x="14" y="${T+n*cs/2}" font-size="12" font-weight="700" text-anchor="middle" fill="${C.fg}" transform="rotate(-90 14 ${T+n*cs/2})">${en?"True":"Sann"}</text>`;
  labs.forEach((l,i) => { s += `<text x="${L+i*cs+cs/2}" y="${T-8}" font-size="12" text-anchor="middle" fill="${C.fg}">${lbl(l)}</text><text x="${L-8}" y="${T+i*cs+cs/2+4}" font-size="12" text-anchor="end" fill="${C.fg}">${lbl(l)}</text>`; });
  m.forEach((row,i) => row.forEach((v,j) => { const a = mx ? v/mx : 0;
    s += `<rect x="${L+j*cs}" y="${T+i*cs}" width="${cs}" height="${cs}" fill="${PAL[0]}" fill-opacity="${(.06+.8*a).toFixed(2)}" stroke="${C.bg}" stroke-width="2"/><text x="${L+j*cs+cs/2}" y="${T+i*cs+cs/2+5}" font-size="14" font-weight="700" text-anchor="middle" fill="${a>.55?"#fff":C.fg}">${v}</text>`; }));
  return s + `</svg>`;
}

/* ---------- decision tree ---------- */
function figTree(f){
  const C = figColors(), en = S.lang === "en", LH = 14, padX = 10, gapX = 16, gapY = 40;
  const prep = nd => { const lines = tx(nd.text).split("\n"); const w = Math.max(...lines.map(l=>l.length))*6.4 + 2*padX, h = lines.length*LH + 10;
    const ch = [nd.left, nd.right].filter(Boolean).map(prep); const cw = ch.reduce((s,c)=>s+c.tw,0) + (ch.length>1 ? gapX : 0);
    return {lines, w, h, ch, tw: Math.max(w, cw), leaf: !ch.length, hasL: !!nd.left}; };
  const root = prep(f.node || {text:"?"});
  const depth = n => 1 + Math.max(0, ...n.ch.map(depth)), maxH = (n) => Math.max(n.h, ...n.ch.map(maxH));
  const rowH = maxH(root) + gapY, W = root.tw + 20, H = depth(root)*rowH - gapY + 20;
  let s = svgOpen(W, H, "decision tree");
  const place = (n, x0, y) => { const cx = x0 + n.tw/2; let cx0 = x0 + (n.tw - (n.ch.reduce((a,c)=>a+c.tw,0) + (n.ch.length>1?gapX:0)))/2;
    n.ch.forEach((c,i) => { const ccx = cx0 + c.tw/2; s += `<line x1="${cx}" y1="${y+n.h}" x2="${ccx}" y2="${y+rowH}" stroke="${C.mu}" stroke-width="1.5"/><text x="${(cx+ccx)/2 + (i===0?-8:8)}" y="${y+n.h+gapY/2}" font-size="11" text-anchor="${i===0?"end":"start"}" fill="${C.mu}">${i===0 ? (en?"True":"Sant") : (en?"False":"Usant")}</text>`; place(c, cx0, y+rowH); cx0 += c.tw + gapX; });
    s += `<rect x="${cx-n.w/2}" y="${y}" width="${n.w}" height="${n.h}" rx="7" fill="${n.leaf ? "color-mix(in srgb, "+PAL[2]+" 14%, "+C.bg+")" : C.bg}" stroke="${n.leaf ? PAL[2] : C.acc}" stroke-width="1.5"/>`;
    n.lines.forEach((l,i) => s += `<text x="${cx}" y="${y+16+i*LH}" font-size="11.5" text-anchor="middle" fill="${C.fg}" font-family="ui-monospace,Menlo,monospace">${esc(l)}</text>`); };
  place(root, 10, 10);
  return s + `</svg>`;
}

/* ---------- polynomial fits ---------- */
function polyFit(xs, ys, deg){
  const m = deg+1, T = t => { const o=[1,t]; for(let k=2;k<m;k++) o.push(2*t*o[k-1]-o[k-2]); return o.slice(0,m); };
  const A = Array.from({length:m}, () => new Array(m+1).fill(0));
  xs.forEach((x,i) => { const b = T(2*x-1); for(let a=0;a<m;a++){ for(let c=0;c<m;c++) A[a][c] += b[a]*b[c]; A[a][m] += b[a]*ys[i]; } });
  for(let a=0;a<m;a++) A[a][a] += 1e-10;
  for(let c=0;c<m;c++){ let p=c; for(let r=c+1;r<m;r++) if(Math.abs(A[r][c])>Math.abs(A[p][c])) p=r; [A[c],A[p]]=[A[p],A[c]];
    for(let r=0;r<m;r++){ if(r===c) continue; const fct = A[r][c]/A[c][c]; for(let k=c;k<=m;k++) A[r][k] -= fct*A[c][k]; } }
  const w = A.map((row,i) => row[m]/row[i]);
  return x => T(2*x-1).reduce((s,b,i)=>s+b*w[i], 0);
}
function figFit(f){
  const C = figColors(), r = mulberry(11), n = 15, xs = [], ys = [];
  for(let i=0;i<n;i++){ const x = (i + .15 + .7*r())/n; xs.push(x); ys.push(Math.sin(2*Math.PI*x) + gauss(r)*.22); }
  const degs = f.degrees || [1,3,12], PW = 200, PH = 170, gap = 14, W = degs.length*PW + (degs.length-1)*gap + 8, H = PH + 26;
  let s = svgOpen(W, H, "polynomial fits");
  degs.forEach((d,pi) => { const ox = 4 + pi*(PW+gap), oy = 22, fn = polyFit(xs, ys, d), X = x => ox + x*PW, Y = y => oy + (PH-4)/2 - Math.max(-1.9, Math.min(1.9, y))/1.9*((PH-8)/2);
    s += `<text x="${ox+PW/2}" y="16" font-size="15" font-weight="800" text-anchor="middle" fill="${C.fg}">${PANEL_L[pi]}</text><rect x="${ox}" y="${oy}" width="${PW}" height="${PH-4}" fill="${C.bg}" stroke="${C.mu}" stroke-opacity=".4"/>`;
    const pts = []; for(let j=0;j<=160;j++){ const x = j/160; pts.push(X(x).toFixed(1)+","+Y(fn(x)).toFixed(1)); }
    s += `<polyline fill="none" stroke="${PAL[1]}" stroke-width="2.2" points="${pts.join(" ")}"/>`;
    xs.forEach((x,i) => s += `<circle cx="${X(x).toFixed(1)}" cy="${Y(ys[i]).toFixed(1)}" r="3.6" fill="${PAL[0]}" stroke="${C.bg}"/>`); });
  return s + `</svg>`;
}

/* ---------- activation functions ---------- */
const ACT = {relu:x=>Math.max(0,x), sigmoid:x=>1/(1+Math.exp(-x)), step:x=>x>=0?1:0, tanh:Math.tanh, linear:x=>x, leakyrelu:x=>x>0?x:.1*x};
function figAct(f){
  const C = figColors(), fns = f.fns || ["relu","sigmoid","tanh"], PW = 160, PH = 140, gap = 12, W = fns.length*PW + (fns.length-1)*gap + 8, H = PH + 26;
  let s = svgOpen(W, H, "activation functions");
  fns.forEach((fn,pi) => { const ox = 4 + pi*(PW+gap), oy = 22, X = x => ox + (x+4)/8*PW, Y = y => oy + (2.5-Math.max(-1.5,Math.min(2.5,y)))/4*PH, g = ACT[fn] || ACT.linear;
    s += `<text x="${ox+PW/2}" y="16" font-size="14" font-weight="800" text-anchor="middle" fill="${C.fg}">${f.labelled ? esc(fn) : PANEL_L[pi]}</text><rect x="${ox}" y="${oy}" width="${PW}" height="${PH}" fill="${C.bg}" stroke="${C.mu}" stroke-opacity=".4"/>`;
    s += `<line x1="${ox}" x2="${ox+PW}" y1="${Y(0)}" y2="${Y(0)}" stroke="${C.mu}" stroke-opacity=".7"/><line x1="${X(0)}" x2="${X(0)}" y1="${oy}" y2="${oy+PH}" stroke="${C.mu}" stroke-opacity=".7"/>`;
    [-1,1,2].forEach(v => s += `<line x1="${X(0)-3}" x2="${X(0)+3}" y1="${Y(v)}" y2="${Y(v)}" stroke="${C.mu}"/><text x="${X(0)-5}" y="${Y(v)+4}" font-size="9" text-anchor="end" fill="${C.mu}">${v}</text>`);
    [-2,2].forEach(v => s += `<text x="${X(v)}" y="${Y(0)+12}" font-size="9" text-anchor="middle" fill="${C.mu}">${v}</text>`);
    if(fn === "step") s += `<polyline fill="none" stroke="${PAL[1]}" stroke-width="2.6" points="${X(-4)},${Y(0)} ${X(0)},${Y(0)}"/><polyline fill="none" stroke="${PAL[1]}" stroke-width="2.6" points="${X(0)},${Y(1)} ${X(4)},${Y(1)}"/><circle cx="${X(0)}" cy="${Y(1)}" r="3" fill="${PAL[1]}"/><circle cx="${X(0)}" cy="${Y(0)}" r="3" fill="${C.bg}" stroke="${PAL[1]}"/>`;
    else { const pts = []; for(let j=0;j<=120;j++){ const x = -4 + j/15; pts.push(X(x).toFixed(1)+","+Y(g(x)).toFixed(1)); } s += `<polyline fill="none" stroke="${PAL[1]}" stroke-width="2.6" points="${pts.join(" ")}"/>`; } });
  return s + `</svg>`;
}

/* ---------- grid world ---------- */
function figGrid(f){
  const C = figColors(), n = f.n || 4, cs = 66, W = n*cs + 12, H = n*cs + 12, eq = (a,r,c) => a && a[0]===r && a[1]===c;
  let s = svgOpen(W, H, "grid world");
  for(let r=0;r<n;r++) for(let c=0;c<n;c++){ const x = 6+c*cs, y = 6+r*cs, hole = (f.holes||[]).some(h => eq(h,r,c)), goal = eq(f.goal,r,c);
    s += `<rect x="${x}" y="${y}" width="${cs}" height="${cs}" fill="${hole ? "#1b2a4a" : goal ? "color-mix(in srgb,#ffd166 35%,"+C.bg+")" : "color-mix(in srgb,#bfe3ff 30%,"+C.bg+")"}" stroke="${C.mu}" stroke-opacity=".6"/>`;
    s += `<text x="${x+4}" y="${y+12}" font-size="9" fill="${C.mu}">${r},${c}</text>`;
    if(hole) s += `<text x="${x+cs/2}" y="${y+cs/2+9}" font-size="26" text-anchor="middle">🕳️</text>`;
    if(goal) s += `<text x="${x+cs/2}" y="${y+cs/2+9}" font-size="26" text-anchor="middle">🎁</text>`;
    if(eq(f.start,r,c)) s += `<text x="${x+cs-6}" y="${y+14}" font-size="13" font-weight="800" text-anchor="end" fill="${C.fg}">S</text>`;
    const a = f.arrows && f.arrows[r] && f.arrows[r][c]; if(a && !hole && !goal) s += `<text x="${x+cs/2}" y="${y+cs/2+9}" font-size="26" font-weight="800" text-anchor="middle" fill="${C.acc}">${esc(a)}</text>`;
    const v = f.values && f.values[r] && f.values[r][c];
    if(v !== undefined && v !== null && v !== "" && !hole && !goal){
      if(Array.isArray(v)){ const pos = [[cs/2,13],[cs/2,cs-5],[8,cs/2+4],[cs-8,cs/2+4]], anc = ["middle","middle","start","end"];
        v.forEach((q,i) => { if(i<4) s += `<text x="${x+pos[i][0]}" y="${y+pos[i][1]}" font-size="10" text-anchor="${anc[i]}" fill="${C.fg}">${esc(numFmt(q))}</text>`; }); }
      else s += `<text x="${x+cs/2}" y="${y+cs-7}" font-size="12" font-weight="700" text-anchor="middle" fill="${hole?"#fff":C.fg}">${esc(typeof v==="number"?numFmt(v):v)}</text>`; }
    if(eq(f.agent,r,c)) s += `<text x="${x+cs/2}" y="${y+cs/2+9}" font-size="26" text-anchor="middle">🤖</text>`; }
  return s + `</svg>`;
}

/* ---------- SHAP waterfall ---------- */
function figWaterfall(f){
  const C = figColors(), items = f.items || [], base = f.base || 0, fx = base + items.reduce((s,it)=>s+it[1],0);
  const L = 120, R = 70, T = 26, rh = 30, W = 480, H = T + items.length*rh + 52;
  let cum = base; const spans = items.map(it => { const a = cum, b = cum + it[1]; cum = b; return [a,b]; });
  const lo = Math.min(base, fx, ...spans.flat()), hi = Math.max(base, fx, ...spans.flat()), pad = (hi-lo)*.08 || .1;
  const ticks = niceTicks(lo-pad, hi+pad, 5), xmin = ticks[0], xmax = ticks[ticks.length-1], X = v => L + (v-xmin)/(xmax-xmin)*(W-L-R);
  let s = svgOpen(W, H, "SHAP waterfall");
  const ay = T + items.length*rh + 6;
  ticks.forEach(v => s += `<line x1="${X(v)}" x2="${X(v)}" y1="${T-6}" y2="${ay}" stroke="${C.mu}" stroke-opacity=".18"/><text x="${X(v)}" y="${ay+14}" font-size="10" text-anchor="middle" fill="${C.mu}">${numFmt(v)}</text>`);
  s += `<line x1="${X(base)}" x2="${X(base)}" y1="${T-8}" y2="${ay}" stroke="${C.mu}" stroke-dasharray="4 3"/><text x="${X(base)}" y="${ay+30}" font-size="11" text-anchor="middle" fill="${C.fg}">E[f(x)] = ${numFmt(base)}</text>`;
  s += `<line x1="${X(fx)}" x2="${X(fx)}" y1="${T-8}" y2="${ay}" stroke="${C.fg}" stroke-dasharray="2 3"/><text x="${X(fx)}" y="${T-12}" font-size="11" font-weight="700" text-anchor="middle" fill="${C.fg}">f(x) = ${f.hideF ? "?" : numFmt(fx)}</text>`;
  items.forEach((it,i) => { const [a,b] = spans[i], y = T + i*rh + 4, pos = it[1] >= 0, c = pos ? "#ff0052" : "#1e88e5", x0 = X(Math.min(a,b)), w = Math.max(2, Math.abs(X(b)-X(a)));
    s += `<text x="${L-8}" y="${y+15}" font-size="12" text-anchor="end" fill="${C.fg}">${lbl(it[0])}</text><rect x="${x0.toFixed(1)}" y="${y}" width="${w.toFixed(1)}" height="${rh-10}" rx="3" fill="${c}" fill-opacity=".85"/>`;
    s += `<text x="${(pos ? x0+w+4 : x0-4).toFixed(1)}" y="${y+15}" font-size="11" font-weight="700" text-anchor="${pos?"start":"end"}" fill="${c}">${it[1]>=0?"+":"−"}${numFmt(Math.abs(it[1]))}</text>`; });
  return s + `</svg>`;
}

/* ---------- superpixels (image SHAP) ---------- */
function figSuperpixel(){
  const C = figColors(), W = 300, H = 200, bs = 5, r = mulberry(5), seeds = [];
  for(let i=0;i<6;i++) for(let j=0;j<4;j++) seeds.push([(i+.2+.6*r())*W/6, (j+.2+.6*r())*H/4]);
  const base = (x,y) => { const dHead = Math.hypot(x-170, y-82), dBody = Math.hypot((x-150)/62, (y-128)/34);
    if(dHead < 30) return "#c98a4b"; if(Math.hypot(x-150,y-62)<10 || Math.hypot(x-190,y-62)<10) return "#a86b33"; if(dBody < 1) return "#b97a40"; if(y > 150) return "#7cb342"; return "#9fd3ff"; };
  const shap = seeds.map(([x,y]) => { const head = Math.hypot(x-170,y-82) < 40, body = Math.hypot((x-150)/70,(y-128)/40) < 1; return head ? .9 : body ? .45 : y > 150 ? -.35 : -.1 + .1*r(); });
  const owner = (x,y) => { let b=0, bd=Infinity; seeds.forEach((s,i) => { const d=(x-s[0])**2+(y-s[1])**2; if(d<bd){ bd=d; b=i; } }); return b; };
  const G = []; for(let y=0;y<H;y+=bs){ const row=[]; for(let x=0;x<W;x+=bs) row.push(owner(x+bs/2,y+bs/2)); G.push(row); }
  const PWd = W + 20;
  let s = svgOpen(PWd*2 + 10, H + 30, "image split into superpixels");
  [0,1].forEach(pi => { const ox = 6 + pi*(PWd+4), oy = 22;
    s += `<text x="${ox+W/2}" y="15" font-size="12" font-weight="700" text-anchor="middle" fill="${C.fg}">${pi===0 ? (S.lang==="en"?"Image + superpixels":"Bilde + superpiksler") : (S.lang==="en"?"SHAP per superpixel":"SHAP per superpiksel")}</text>`;
    G.forEach((row,j) => row.forEach((o,i) => { const x = i*bs, y = j*bs; let fill = base(x+bs/2, y+bs/2);
      if(pi===1){ const v = shap[o]; fill = v >= 0 ? `rgba(255,0,82,${(.15+.75*v).toFixed(2)})` : `rgba(30,136,229,${(.15+.9*-v).toFixed(2)})`; }
      s += `<rect x="${ox+x}" y="${oy+y}" width="${bs+.3}" height="${bs+.3}" fill="${fill}"/>`;
      if(i+1<row.length && row[i+1]!==o) s += `<rect x="${ox+x+bs-.6}" y="${oy+y}" width="1.2" height="${bs}" fill="#fff" fill-opacity=".85"/>`;
      if(j+1<G.length && G[j+1][i]!==o) s += `<rect x="${ox+x}" y="${oy+y+bs-.6}" width="${bs}" height="1.2" fill="#fff" fill-opacity=".85"/>`; })); });
  return s + `</svg>`;
}

const FIGK = {scatter:figScatter, line:figLine, bars:figBars, loss:figLoss, rocMulti:figRocMulti, cm:figCM, tree:figTree, fit:figFit, act:figAct, grid:figGrid, waterfall:figWaterfall, superpixel:figSuperpixel};
function figKind(f){ return typeof f === "string" ? f : (typeof f.k === "string" ? f.k : "scatter"); }
function figHTML(f){
  if(!f) return "";
  try{ if(typeof f === "string") return FIGS[f] ? FIGS[f]() : ""; const fn = FIGK[figKind(f)]; return fn ? fn(f) : ""; }
  catch(e){ console.error("figure failed", f, e); return ""; }
}
