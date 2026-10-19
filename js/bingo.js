/* ===== بنجو 1–25: كل لاعب عنده كارت، بالدور كل واحد يختار رقم، أول 5 خطوط يكسب ===== */
const R5=[0,1,2,3,4];
const BL=[...R5.map(r=>R5.map(c=>r*5+c)),...R5.map(c=>R5.map(r=>r*5+c)),[0,6,12,18,24],[4,8,12,16,20]];
let BN;
function bingo(){stop();RE=bingo;
app.innerHTML=`<div class="top"><h2>بنجو 1–25</h2>${back}</div>
<p>كل لاعب عنده كارت فيه الأرقام من 1 لـ 25 مخلوطة. بالدور كل لاعب يختار رقم ويتعلّم عند الكل. أول واحد يكمّل 5 خطوط (عرض أو طول أو قُطر) يكسب.</p>
<div class="panel">${psel(1,8,'bingo')}${pnames()}</div><button class="btn big" onclick="bnGo()">ابدأ اللعبة</button>`}
function bnGo(){BN={cards:P.map(()=>shuf(Array.from({length:25},(_,i)=>i+1))),called:[],turn:0,view:0,win:[]};bnR()}
function bnDone(i){const c=BN.cards[i];return BL.filter(l=>l.every(k=>BN.called.includes(c[k])))}
function bnPick(n){if(BN.win.length||BN.called.includes(n))return;BN.called.push(n);navigator.vibrate&&navigator.vibrate(40);
const w=P.map((_,i)=>i).filter(i=>bnDone(i).length>=5);
if(w.length){BN.win=w;BN.view=w[0]}else BN.turn=(BN.turn+1)%P.length;bnR()}
function bnMix(){BN.cards[BN.view]=shuf(BN.cards[BN.view]);bnR()}
function bnR(){const w=BN.win,c=BN.cards[BN.view],ln=new Set(bnDone(BN.view).flat());
app.innerHTML=`<div class="top"><h2>بنجو 1–25</h2>${back}</div>
<div class="panel">${w.length?`<p class="win">🎉 ${w.map(i=>esc(P[i])).join(' و ')} كسب!</p>`:`<p class="turn">الدور على <b>${esc(P[BN.turn])}</b>، اختار رقم</p>`}
<div class="pad">${Array.from({length:25},(_,i)=>`<button ${BN.called.includes(i+1)||w.length?'disabled':''} onclick="bnPick(${i+1})">${i+1}</button>`).join('')}</div></div>
<div class="chips">${P.map((n,i)=>`<button class="chip ${i==BN.view?'on':''}" onclick="BN.view=${i};bnR()">${esc(n)} <b>${bnDone(i).length}/5</b></button>`).join('')}</div>
<div class="bg">${c.map((n,k)=>`<div class="bc ${BN.called.includes(n)?'on':''} ${ln.has(k)?'ln':''}">${n}</div>`).join('')}</div>
<div class="row">${BN.called.length?'':'<button class="btn alt" onclick="bnMix()">اخلط الكارت</button>'}<button class="btn alt" onclick="bnGo()">لعبة جديدة</button></div>`}
