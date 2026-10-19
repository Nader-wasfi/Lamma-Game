/* ===== ألغاز الأرقام: مربع سحري، سودوكو 4×4، لعبة 24، متتاليات، فوازير ===== */
let GM;
/* ----- محرّك الشبكات (للمربع السحري والسودوكو) ----- */
function mpMagic(lv){stop();let g=[2,7,6,9,5,1,4,3,8];const rot=a=>[6,3,0,7,4,1,8,5,2].map(i=>a[i]);
for(let i=Math.random()*4|0;i>0;i--)g=rot(g);if(Math.random()<.5)g=[2,1,0,5,4,3,8,7,6].map(i=>g[i]);
const rows=[0,1,2].map(r=>[0,1,2].map(c=>r*3+c)),cols=[0,1,2].map(c=>[0,1,2].map(r=>r*3+c));
GM={k:'m',n:3,mx:9,t:'المربع السحري',d:'ضع الأرقام من 1 لـ 9 مرة واحدة، بحيث كل صف وعمود وقُطر مجموعه 15.',g:Array(9).fill(0),fix:Array(9).fill(false),sel:null,
grp:[[...Array(9).keys()]],lines:[...rows,...cols,[0,4,8],[2,4,6]],rows,re:`mpMagic(${lv})`};
shuf([...Array(9).keys()]).slice(0,lv).forEach(i=>{GM.g[i]=g[i];GM.fix[i]=true});mgR()}
function mpSudo(lv){stop();let g=[1,2,3,4,3,4,1,2,2,1,4,3,4,3,2,1];const dp=shuf([1,2,3,4]);g=g.map(v=>dp[v-1]);
const sw=()=>{let o=Math.random()<.5?[0,1]:[1,0],q=Math.random()<.5?[2,3]:[3,2],a=[...o,...q];return Math.random()<.5?[a[2],a[3],a[0],a[1]]:a},R=sw(),C=sw();
g=[...Array(16).keys()].map(i=>g[R[i/4|0]*4+C[i%4]]);
const L4=[0,1,2,3],rows=L4.map(r=>L4.map(c=>r*4+c)),cols=L4.map(c=>L4.map(r=>r*4+c)),box=[0,2,8,10].map(o=>[0,1,4,5].map(d=>o+d));
GM={k:'s',n:4,mx:4,t:'سودوكو 4×4',d:'ضع 1 لـ 4 في كل صف وعمود ومربع صغير من غير تكرار.',g:Array(16).fill(0),fix:Array(16).fill(false),sel:null,grp:[...rows,...cols,...box],lines:[...rows,...cols,...box],re:`mpSudo(${lv})`};
shuf([...Array(16).keys()]).slice(0,lv).forEach(i=>{GM.g[i]=g[i];GM.fix[i]=true});mgR()}
function mgBad(){const G=GM,b=new Set();G.grp.forEach(l=>{const seen={};l.forEach(i=>{const v=G.g[i];if(v)(seen[v]=seen[v]||[]).push(i)});Object.values(seen).forEach(a=>{if(a.length>1)a.forEach(i=>b.add(i))})});return b}
function mgWin(){const G=GM;if(G.g.includes(0)||mgBad().size)return false;return G.k=='s'||G.lines.every(l=>l.reduce((s,i)=>s+G.g[i],0)==15)}
function mgSums(){const G=GM;return G.rows.map(r=>r.some(i=>!G.g[i])?'؟':r.reduce((s,i)=>s+G.g[i],0)).join(' · ')}
function mgSel(i){if(!GM.fix[i]&&!GM.win){GM.sel=GM.sel==i?null:i;mgR()}}
function mgPut(v){const G=GM;if(G.sel==null||G.win)return;G.g[G.sel]=v;G.win=mgWin();mgR()}
function mgR(){const G=GM,bad=mgBad();
app.innerHTML=`<div class="top"><h2>${G.t}</h2>${bk('mpMenu')}</div><p>${G.d} اضغط على خانة وبعدين على رقم.</p>
<div class="gm" style="grid-template-columns:repeat(${G.n},1fr);max-width:${G.n*78}px">${G.g.map((v,i)=>`<button class="${G.fix[i]?'fx':''} ${G.sel==i?'sl':''} ${bad.has(i)?'bd':''}" onclick="mgSel(${i})">${v||''}</button>`).join('')}</div>
${G.k=='m'?`<p style="text-align:center;margin:8px 0">مجاميع الصفوف: <b style="color:var(--ink)">${mgSums()}</b></p>`:''}
<div class="pad2">${Array.from({length:G.mx},(_,i)=>`<button class="btn alt" onclick="mgPut(${i+1})">${i+1}</button>`).join('')}<button class="btn alt" onclick="mgPut(0)">⌫</button></div>
<p style="text-align:center;font-weight:900;color:var(--b);font-size:1.3rem;margin:0 0 10px">${G.win?'🎉 برافو! حليتها':''}</p>
<button class="btn big" onclick="${G.re}">لغز جديد ▶</button>`}
/* ----- لعبة 24 ----- */
let T4;
function solve24(n){const rec=a=>{if(a.length==1)return Math.abs(a[0].v-24)<1e-6?a[0].e:null;
for(let i=0;i<a.length;i++)for(let j=0;j<a.length;j++){if(i==j)continue;const r=a.filter((_,k)=>k!=i&&k!=j),x=a[i],y=a[j];
const c=[[x.v+y.v,`(${x.e}+${y.e})`],[x.v-y.v,`(${x.e}−${y.e})`],[x.v*y.v,`(${x.e}×${y.e})`]];if(y.v)c.push([x.v/y.v,`(${x.e}÷${y.e})`]);
for(const[v,e]of c){const s=rec([...r,{v,e}]);if(s)return s}}return null};return rec(n.map(v=>({v,e:String(v)})))}
function mp24(){stop();let n,s;do{n=[0,0,0,0].map(()=>1+Math.random()*9|0);s=solve24(n)}while(!s);T4={n,s,ex:[],used:[0,0,0,0],msg:'',hint:false,ok:false};t4R()}
function t4R(){const T=T4;
app.innerHTML=`<div class="top"><h2>لعبة الـ 24 🎯</h2>${bk('mpMenu')}</div><p>استخدم الأرقام الأربعة (كل رقم مرة واحدة) مع + − × ÷ والأقواس عشان توصل لـ <b>24</b>.</p>
<div class="panel"><div class="word" style="font-size:1.7rem;letter-spacing:2px;min-height:48px;direction:ltr">${T.ex.map(t=>t.t).join(' ')||'…'}</div></div>
<div class="pad2">${T.n.map((v,i)=>`<button class="btn" ${T.used[i]||T.ok?'disabled':''} onclick="t4Num(${i})">${v}</button>`).join('')}</div>
<div class="pad2">${['+','−','×','÷','(',')'].map(o=>`<button class="btn alt" onclick="t4Op('${o}')">${o}</button>`).join('')}<button class="btn alt" onclick="t4Back()">⌫</button></div>
<p style="text-align:center;font-weight:700;color:var(--ink);min-height:28px">${T.ok?'🎉 برافو! طلعت 24':T.msg}${T.hint?'<br>تلميح: '+T.s:''}</p>
<div class="row"><button class="btn" onclick="t4Chk()">تحقّق</button><button class="btn alt" onclick="T4.hint=true;t4R()">تلميح</button><button class="btn alt" onclick="mp24()">لغز جديد ▶</button></div>`}
function t4Num(i){const T=T4,l=T.ex[T.ex.length-1];if(T.used[i]||(l&&(l.i!=null||l.t==')')))return;T.ex.push({t:String(T.n[i]),i});T.used[i]=1;T.msg='';t4R()}
function t4Op(o){const l=T4.ex[T4.ex.length-1];if(o=='('&&l&&(l.i!=null||l.t==')'))return;T4.ex.push({t:o});T4.msg='';t4R()}
function t4Back(){const t=T4.ex.pop();if(t&&t.i!=null)T4.used[t.i]=0;T4.msg='';t4R()}
function t4Chk(){const T=T4;if(T.used.includes(0)){T.msg='لازم تستخدم الأرقام الأربعة';t4R();return}
try{const v=Function('"use strict";return ('+T.ex.map(t=>t.t.replace('×','*').replace('÷','/').replace('−','-')).join(' ')+')')();
if(Math.abs(v-24)<1e-9)T.ok=true;else T.msg='طلع '+(Math.round(v*100)/100)+' مش 24، جرّب تاني'}catch(e){T.msg='التعبير مش مظبوط'}t4R()}
/* ----- الرقم الجاي؟ ----- */
let SQ,SQN=0;
function mpSeq(){stop();const t=Math.random()*7|0,a=1+Math.random()*9|0,d=2+Math.random()*7|0,s=[];let rule;
if(t==0){for(let i=0;i<6;i++)s.push(a+d*i);rule=`كل رقم = اللي قبله + ${d}`}
else if(t==1){const r=2+(Math.random()*2|0);for(let i=0;i<6;i++)s.push(a*r**i);rule=`كل رقم = اللي قبله × ${r}`}
else if(t==2){for(let i=0;i<6;i++)s.push((a+i)**2);rule='أرقام مربعة: كل رقم هو مربع رقم صحيح'}
else if(t==3){let x=a,y=a+d;for(let i=0;i<6;i++){s.push(x);[x,y]=[y,x+y]}rule='كل رقم = مجموع الرقمين اللي قبله'}
else if(t==4){let x=a;for(let i=0;i<6;i++){s.push(x);x+=i%2?d:2}rule=`بنزود 2 وبعدين ${d} بالتبادل`}
else if(t==5){let x=a;for(let i=0;i<6;i++){s.push(x);x+=i+1}rule='الزيادة بتكبر: +1 وبعدين +2 وبعدين +3 وهكذا'}
else{for(let i=0;i<6;i++)s.push((a%4+1+i)**3);rule='أرقام مكعبة: كل رقم هو مكعب رقم صحيح'}
const ans=s[5];let o=new Set([ans]);for(const x of shuf([1,-1,2,-2,3,-3,5,10,-10]))if(o.size<4&&ans+x>0)o.add(ans+x);
SQ={s:s.slice(0,5),ans,o:shuf([...o]),rule,done:false};sqR()}
function sqR(){const Q=SQ;
app.innerHTML=`<div class="top"><h2>الرقم الجاي؟ ➡️</h2>${bk('mpMenu')}</div><p>إيه الرقم اللي بدل علامة الاستفهام؟ (صح: ${SQN})</p>
<div class="panel"><div class="word" style="font-size:1.9rem;letter-spacing:2px;direction:ltr">${Q.s.join(' , ')} , ❓</div></div>
${Q.o.map(v=>`<button class="opt" ${Q.done?'disabled':''} onclick="sqPick(${v})" id="o${v}">${v}</button>`).join('')}
<p style="text-align:center;font-weight:700;color:var(--ink)">${Q.done?'القاعدة: '+Q.rule:''}</p>${Q.done?'<button class="btn big" onclick="mpSeq()">اللي بعده ▶</button>':''}`}
function sqPick(v){const Q=SQ;if(Q.done)return;Q.done=true;if(v==Q.ans)SQN++;sqR();$('#o'+Q.ans).classList.add('ok');if(v!=Q.ans)$('#o'+v).classList.add('no')}
/* ----- فوازير أرقام ----- */
let MR;
function mpRid(){stop();MR={l:shuf(MRD),i:0,show:false};mrR()}
function mrR(){const M=MR,r=M.l[M.i%M.l.length];
app.innerHTML=`<div class="top"><h2>فوازير أرقام 💡</h2>${bk('mpMenu')}</div><p>لغز ${M.i%M.l.length+1} من ${M.l.length}. واحد يقرأ والباقي يخمّنوا.</p>
<div class="panel"><b style="font-size:1.25rem;line-height:1.8">${r[0]}</b></div>
${M.show?`<div class="panel" style="border-color:var(--b)"><b style="color:var(--b)">الإجابة:</b> ${r[1]}</div>`:'<button class="btn big alt" onclick="MR.show=true;mrR()">اعرض الإجابة</button>'}
<div style="height:10px"></div><button class="btn big" onclick="MR.i++;MR.show=false;mrR()">اللغز اللي بعده ▶</button>`}
