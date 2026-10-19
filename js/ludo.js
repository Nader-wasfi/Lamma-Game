/* ===== ليدو: من 2 لـ 4 لاعبين على نفس التليفون ===== */
const LP=[[1,6],[2,6],[3,6],[4,6],[5,6],[6,5],[6,4],[6,3],[6,2],[6,1],[6,0],[7,0],[8,0],[8,1],[8,2],[8,3],[8,4],[8,5],[9,6],[10,6],[11,6],[12,6],[13,6],[14,6],[14,7],[14,8],[13,8],[12,8],[11,8],[10,8],[9,8],[8,9],[8,10],[8,11],[8,12],[8,13],[8,14],[7,14],[6,14],[6,13],[6,12],[6,11],[6,10],[6,9],[5,8],[4,8],[3,8],[2,8],[1,8],[0,8],[0,7],[0,6]];
const HC=[[[1,7],[2,7],[3,7],[4,7],[5,7]],[[7,1],[7,2],[7,3],[7,4],[7,5]],[[13,7],[12,7],[11,7],[10,7],[9,7]],[[7,13],[7,12],[7,11],[7,10],[7,9]]];
const LB=[[0,0],[9,0],[9,9],[0,9]],ST=[0,13,26,39],SAFE=[0,8,13,21,26,34,39,47];
const CL=['#ef4444','#22c55e','#facc15','#3b82f6'],CN=['الأحمر','الأخضر','الأصفر','الأزرق'];
let LD;
function ludo(){stop();RE=ludo;
app.innerHTML=`<div class="top"><h2>ليدو 🎲</h2>${back}</div>
<p>ارمي النرد، وهات 6 عشان تطلّع قطعة. وصّل القطع الأربعة للنص قبل الكل. لو كلت قطعة أو جبت 6 بترمي تاني.</p>
<div class="panel">${psel(2,4,'ludo')}${pnames()}</div><button class="btn big" onclick="ldGo()">ابدأ اللعبة</button>`}
function ldGo(){const cols=P.length==2?[0,2]:P.length==3?[0,1,2]:[0,1,2,3];LD={cols,pc:{},turn:0,dice:null,mv:[],msg:'',win:null,tk:0};cols.forEach(c=>LD.pc[c]=[-1,-1,-1,-1]);ldR()}
const ldAbs=(c,p)=>(ST[c]+p)%52;
function ldXY(c,p,k){if(p<0){const[bx,by]=LB[c];return[bx+(k%2?4.5:1.5),by+(k>1?4.5:1.5)]}
if(p<=50){const[x,y]=LP[ldAbs(c,p)];return[x+.5,y+.5]}
if(p<56){const[x,y]=HC[c][p-51];return[x+.5,y+.5]}
return[[6.7,7.5],[7.5,6.7],[8.3,7.5],[7.5,8.3]][c]}
function ldRoll(){const G=LD;if(G.dice!=null||G.win!=null)return;const d=1+Math.random()*6|0,c=G.cols[G.turn],tk=++G.tk;
G.dice=d;G.mv=[0,1,2,3].filter(k=>{const p=G.pc[c][k];return p<0?d==6:p+d<=56});
if(!G.mv.length){G.msg='مفيش حركة متاحة، الدور بيعدّي';ldR();setTimeout(()=>{if(LD===G&&G.tk==tk)ldNext()},1100)}
else if(G.mv.length==1){G.msg='';ldR();setTimeout(()=>{if(LD===G&&G.tk==tk)ldMove(G.mv[0])},600)}
else{G.msg='اختار القطعة اللي هتتحرك';ldR()}}
function ldNext(){const G=LD;G.dice=null;G.mv=[];G.msg='';G.turn=(G.turn+1)%G.cols.length;ldR()}
function ldMove(k){const G=LD,c=G.cols[G.turn],d=G.dice;if(d==null||!G.mv.includes(k))return;const a=G.pc[c];a[k]=a[k]<0?0:a[k]+d;let cap=false;
if(a[k]<=50&&!SAFE.includes(ldAbs(c,a[k])))G.cols.forEach(o=>{if(o!=c)G.pc[o].forEach((p,j)=>{if(p>=0&&p<=50&&ldAbs(o,p)==ldAbs(c,a[k])){G.pc[o][j]=-1;cap=true}})});
G.dice=null;G.mv=[];G.msg=cap?'🔥 كلت قطعة! ارمي تاني':d==6?'جبت 6، ارمي تاني':'';
if(a.every(p=>p==56))G.win=G.turn;else if(d!=6&&!cap)G.turn=(G.turn+1)%G.cols.length;ldR()}
function ldR(){const G=LD,c=G.cols[G.turn];let s='';
[0,1,2,3].forEach(i=>{const[bx,by]=LB[i];s+=`<rect x="${bx}" y="${by}" width="6" height="6" fill="${CL[i]}"/><rect x="${bx+.8}" y="${by+.8}" width="4.4" height="4.4" rx=".6" fill="#fff" opacity=".88"/>`});
LP.forEach(([x,y],i)=>{const sc=ST.indexOf(i);s+=`<rect x="${x}" y="${y}" width="1" height="1" fill="${sc>=0?CL[sc]:'#fff'}" stroke="#94a3b8" stroke-width=".05"/>`+(SAFE.includes(i)&&sc<0?`<text x="${x+.5}" y="${y+.74}" font-size=".7" text-anchor="middle" fill="#94a3b8">★</text>`:'')});
HC.forEach((h,i)=>h.forEach(([x,y])=>s+=`<rect x="${x}" y="${y}" width="1" height="1" fill="${CL[i]}" opacity=".8" stroke="#fff" stroke-width=".05"/>`));
s+=`<polygon points="6,6 9,6 7.5,7.5" fill="${CL[1]}"/><polygon points="9,6 9,9 7.5,7.5" fill="${CL[2]}"/><polygon points="9,9 6,9 7.5,7.5" fill="${CL[3]}"/><polygon points="6,9 6,6 7.5,7.5" fill="${CL[0]}"/>`;
const grp={};G.cols.forEach(col=>G.pc[col].forEach((p,k)=>{const xy=ldXY(col,p,k);(grp[xy.join()]=grp[xy.join()]||[]).push({col,k,xy})}));
Object.values(grp).forEach(arr=>arr.forEach((o,i)=>{const x=o.xy[0]+(i-(arr.length-1)/2)*.3,mv=o.col==c&&G.mv.includes(o.k);
s+=`<circle cx="${x}" cy="${o.xy[1]}" r="${mv?.42:.36}" fill="${CL[o.col]}" stroke="${mv?'#12263a':'#fff'}" stroke-width=".1" class="${mv?'pm':''}" ${mv?`onclick="ldMove(${o.k})"`:''}/>`}));
app.innerHTML=`<div class="top"><h2>ليدو 🎲</h2>${back}</div>
<div class="ldbar">${G.win!=null?`<b>🏆 ${esc(P[G.win])} كسب!</b>`:`<span class="dot" style="background:${CL[c]}"></span> الدور على <b>${esc(P[G.turn])}</b> (${CN[c]})`}</div>
<svg viewBox="0 0 15 15" class="ldb">${s}</svg>
<div class="row" style="margin-top:12px;align-items:stretch"><div class="die">${G.dice?String.fromCharCode(9855+G.dice):'🎲'}</div>
<button class="btn big" style="flex:1" onclick="${G.win!=null?'ldGo()':'ldRoll()'}" ${G.dice!=null&&G.win==null?'disabled':''}>${G.win!=null?'لعب تاني':'ارمي النرد'}</button></div>
<p style="text-align:center;font-weight:700;color:var(--ink)">${G.msg}</p>`}
