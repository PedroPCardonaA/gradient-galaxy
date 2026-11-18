const fs=require('fs'); const src=fs.readFileSync(process.argv[2],'utf8');
const QB=[], XP={}, FIX={};
eval(['q1.js','q2.js','q3.js','q4.js','x1.js','x2.js','x3.js','x4.js','q1b.js','q2b.js','q3b.js','q4b.js','q1c.js','q2c.js','q3c.js','q4c.js','q1d.js','q2d.js','q3d.js','q4d.js','guide.js','fix1.js','fix2.js','fix3.js','fix4.js'].map(f=>fs.readFileSync(f,'utf8')).join('\n')+'\n;globalThis.GUIDE=GUIDE;');
for(const q of QB){ q.kind=q.kind||'single'; if(!q.x&&XP[q.id]) q.x=XP[q.id]; if(FIX[q.id]) Object.assign(q,FIX[q.id]); }
const FIGKINDS=['scatter','line','bars','loss','rocMulti','cm','tree','fit','act','grid','waterfall','superpixel'];
for(const id in FIX) if(!QB.some(q=>q.id===id)) console.log('FIX for unknown id',id);
const bi=p=>Array.isArray(p)&&p.length===2&&p.every(x=>typeof x==='string'&&x.trim());
const ids=new Set(); let errs=0; const err=(...a)=>{console.log(...a);errs++};
const per={}, kinds={}, srcs={};
for(const q of QB){
 if(ids.has(q.id)) err('dup',q.id); ids.add(q.id);
 if(!(q.t>=0&&q.t<=11)) err('bad t',q.id);
 if(!['single','tf','multi','num'].includes(q.kind)) err('bad kind',q.id);
 if(q.fig){ const k = typeof q.fig==='string' ? q.fig : (typeof q.fig.k==='string' ? q.fig.k : 'scatter'); if(typeof q.fig==='string' ? !['roc','shap','smiley'].includes(k) : !FIGKINDS.includes(k)) err('bad fig kind',q.id,k); }
 if(q.f!==undefined && !bi(q.f)) err('bad f',q.id);
 if(/\.c\d+$/.test(q.id) && !q.f) err('math q missing formula f',q.id);
 if(q.kind==='num'){ if(!bi(q.q)||!bi(q.w)) err('missing lang',q.id); if(!Number.isFinite(q.ans)) err('num ans',q.id); if(!(q.tol>0)) err('num tol',q.id); if(q.unit&&!bi(q.unit)) err('unit',q.id); if(!['e24','e25','notes','new'].includes(q.s)) err('bad s',q.id); per[q.t]=(per[q.t]||0)+1; kinds.num=(kinds.num||0)+1; srcs[q.s]=(srcs[q.s]||0)+1; if(ids.has(q.id+'#')) err('dup'); continue; }
 if(!bi(q.q)||!bi(q.w)||!q.o.every(bi)) err('missing lang',q.id);
 if(!['e24','e25','notes','new'].includes(q.s)) err('bad s',q.id);
 if(q.o.length>8) err('too many options',q.id);
 if(new Set(q.o.map(o=>o[0])).size!==q.o.length) err('dup option',q.id);
 if(!Array.isArray(q.x)||q.x.length!==q.o.length) { err('x length',q.id); continue; }
 if(q.kind==='multi'){
   if(!Array.isArray(q.a)||!q.a.length||new Set(q.a).size!==q.a.length||q.a.some(i=>!(Number.isInteger(i)&&i>=0&&i<q.o.length))) err('bad multi a',q.id);
   if(!q.x.every(bi)) err('multi x incomplete',q.id);
 } else {
   if(!(Number.isInteger(q.a)&&q.a>=0&&q.a<q.o.length)) err('bad a',q.id);
   if(q.x[q.a]!==null) err('x[a] not null',q.id);
   q.x.forEach((e,i)=>{ if(i!==q.a && !bi(e)) err('x missing',q.id,i); });
   if(q.kind==='tf' && JSON.stringify(q.o)!==JSON.stringify([["Sant","True"],["Usant","False"]])) err('tf options',q.id);
 }
 per[q.t]=(per[q.t]||0)+1; kinds[q.kind]=(kinds[q.kind]||0)+1; srcs[q.s]=(srcs[q.s]||0)+1;
}
{ const gids=new Set(), gper={}; if(typeof GUIDE==='undefined'||!Array.isArray(GUIDE)) err('GUIDE missing'); else {
  GUIDE.forEach(g=>{ if(!Number.isInteger(g.t)||g.t<0||g.t>11) err('guide bad t',g.t); if(!Array.isArray(g.items)||!g.items.length) err('guide empty topic',g.t);
    (g.items||[]).forEach(it=>{ if(gids.has(it.id)) err('guide dup id',it.id); gids.add(it.id); gper[g.t]=(gper[g.t]||0)+1;
      for(const k of ['n','f','e']) if(!bi(it[k])) err('guide bad '+k,it.id); if(it.ex!==undefined && !bi(it.ex)) err('guide bad ex',it.id);
      for(const k of ['n','f','e','ex']) if(it[k]) it[k].forEach(x=>{ if(/undefined|NaN/.test(x)) err('guide undefined/NaN in '+k,it.id); }); }); });
  for(let t=0;t<12;t++) if(!gper[t]) err('guide missing topic',t);
  console.log('guide cards',gids.size,JSON.stringify(gper)); } }
{ // LaTeX: every $…$ segment must parse with the bundled KaTeX
  const katex=require('./vendor/katex.min.js'); let nt=0; const warn={};
  const texCheck=(str,where)=>{ const parts=String(str).split('$'); if(parts.length%2===0){ err('unbalanced $ in',where); return; }
    parts.forEach((p,i)=>{ if(i%2===0) return; nt++; try{ katex.renderToString('\\displaystyle '+p,{throwOnError:true,strict:(code,msg)=>{ warn[code]=(warn[code]||0)+1; return 'ignore'; }}); }catch(e){ err('KaTeX error in',where,':',e.message); } }); };
  for(const q of QB) if(q.f) q.f.forEach((x,k)=>texCheck(x,q.id+'.f['+k+']'));
  if(typeof GUIDE!=='undefined') for(const g of GUIDE) for(const it of g.items) for(const k of ['f','e','ex']) if(it[k]) it[k].forEach((x,j)=>texCheck(x,it.id+'.'+k+'['+j+']'));
  console.log('tex segments',nt,'katex warnings',JSON.stringify(warn)); }
console.log('total',QB.length,'errors',errs); console.log('per topic',JSON.stringify(per)); console.log('kinds',JSON.stringify(kinds),'sources',JSON.stringify(srcs));
// scoring tests
const grab=n=>src.match(new RegExp('function '+n+'\\([\\s\\S]*?\\n}\\n'))[0];
eval(['isEmpty','parseNum','resultOf','pointsFor','scoreExam','gradeFor'].map(grab).join('\n')); const GRADES=[[89,"A"],[77,"B"],[65,"C"],[53,"D"],[41,"E"],[-Infinity,"F"]];
const S4={kind:'single',o:[1,2,3,4],a:2}, TF={kind:'tf',o:[1,2],a:0}, MU={kind:'multi',o:[1,2,3,4,5],a:[0,3]};
const chk=(name,got,exp)=>{ const ok=Math.abs(got-exp)<1e-9 || got===exp; console.log((ok?'OK  ':'FAIL')+' '+name+' = '+got+(ok?'':' (expected '+exp+')')); if(!ok) errs++; };
chk('single correct',pointsFor(S4,2),1); chk('single wrong',pointsFor(S4,0),-0.25); chk('single skip',pointsFor(S4,null),0);
chk('tf wrong',pointsFor(TF,1),-0.5); chk('multi exact',pointsFor(MU,[3,0]),1); chk('multi subset',pointsFor(MU,[0]),-0.2); chk('multi superset',pointsFor(MU,[0,1,3]),-0.2); chk('multi empty',pointsFor(MU,[]),0);
const g=[{t:0,start:0,len:4},{t:1,start:4,len:4}];
let r=scoreExam([S4,S4,S4,S4,S4,S4,S4,S4],[2,0,0,0, 0,0,0,null],g);
chk('group [c,w,w,w] raw',r.groups[0].raw,0.25); chk('group [w,w,w,s] floored',r.groups[1].floored,0); chk('group [w,w,w,s] raw',r.groups[1].raw,-0.75); chk('exam total',r.total,0.25);
const all=Array(40).fill(S4); r=scoreExam(all,Array(40).fill(2),Array.from({length:10},(_,i)=>({t:i,start:i*4,len:4}))); chk('40 all correct pct',r.pct,100); chk('grade A',r.grade,'A');
chk('grade 88.9->B',gradeFor(88.9),'B'); chk('grade 89->A',gradeFor(89),'A'); chk('grade 41->E',gradeFor(41),'E'); chk('grade 40.9->F',gradeFor(40.9),'F');
r=scoreExam([S4,S4],[0,0],null); chk('no groups negative total',r.total,-0.5);
const NU={kind:'num',ans:0.571,tol:0.005};
chk('num correct',pointsFor(NU,0.57),1); chk('num wrong',pointsFor(NU,0.6),-0.25); chk('num empty',pointsFor(NU,null),0); chk('num zero is answer',resultOf({kind:'num',ans:0,tol:.01},0),'correct');
chk('parse 0,57',parseNum('0,57'),0.57); chk('parse 1/3',parseNum('1/3'),1/3); chk('parse 57 %',parseNum('57 %'),57); chk('parse -2',parseNum('-2'),-2); chk('parse junk',parseNum('abc'),null); chk('parse empty',parseNum('  '),null); chk('parse 1e3',parseNum('1e3'),1000);
console.log('ERRORS TOTAL',errs);
