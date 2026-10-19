/* ---------- XO ---------- */
const L=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
let xs,xb,xt,xcpu=false,xover;
function win(b){for(const l of L)if(b[l[0]]&&b[l[0]]==b[l[1]]&&b[l[0]]==b[l[2]])return l;return null}
function mm(b,p){const w=win(b);if(w)return{s:b[w[0]]=='O'?1:-1};if(b.every(x=>x))return{s:0};
let best=null;b.forEach((v,i)=>{if(v)return;b[i]=p;const r=mm(b,p=='O'?'X':'O');b[i]=null;
if(!best||(p=='O'?r.s>best.s:r.s<best.s))best={s:r.s,i}});return best}
function xo(c){stop();if(c!==undefined)xcpu=c;xs={X:0,O:0,D:0};xnew()}
function xnew(){xb=Array(9).fill(null);xt='X';xover=false;xr()}
function xr(){const w=win(xb);
app.innerHTML=`<div class="top"><h2>إكس أو</h2>${back}</div>
<div class="row"><button class="btn ${xcpu?'alt':''}" onclick="xo(false)">لاعبين</button><button class="btn ${xcpu?'':'alt'}" onclick="xo(true)">ضد الكمبيوتر</button></div>
<div class="panel score"><div><b style="color:var(--a)">${xs.X}</b>❌ أنت</div><div><b>${xs.D}</b>تعادل</div><div><b style="color:var(--b)">${xs.O}</b>⭕ ${xcpu?'الكمبيوتر':'اللاعب 2'}</div></div>
<p style="text-align:center;font-weight:700;color:var(--ink)">${w?'الفايز: '+(xb[w[0]]=='X'?'❌':'⭕'):xover?'تعادل!':'الدور على '+(xt=='X'?'❌':'⭕')}</p>
<div class="board">${xb.map((v,i)=>`<button class="cell ${v||''} ${w&&w.includes(i)?'w':''}" onclick="xp(${i})" aria-label="خانة ${i+1}">${v?(v=='X'?'✕':'◯'):''}</button>`).join('')}</div>
<button class="btn big" onclick="xnew()">جولة جديدة</button>`}
function xp(i){if(xb[i]||xover)return;xb[i]=xt;xfin();
if(!xover){xt=xt=='X'?'O':'X';if(xcpu&&xt=='O'){xb[mm(xb.slice(),'O').i]='O';xfin();xt='X'}}xr()}
function xfin(){const w=win(xb);if(w){xs[xb[w[0]]]++;xover=true}else if(xb.every(x=>x)){xs.D++;xover=true}}
