/* ---------- 4 في صف ---------- */
let g4,t4,o4,w4=[0,0],c4w=[];
function c4(){stop();w4=[0,0];c4n()}
function c4n(){g4=Array(42).fill(0);t4=1;o4=0;c4w=[];c4r()}
function c4win(){for(let r=0;r<6;r++)for(let c=0;c<7;c++){const v=g4[r*7+c];if(!v)continue;
for(const[dc,dr]of[[1,0],[0,1],[1,1],[1,-1]]){let k=1;while(k<4){const R=r+dr*k,C=c+dc*k;if(R<0||R>5||C<0||C>6||g4[R*7+C]!=v)break;k++}
if(k==4){c4w=[0,1,2,3].map(j=>(r+dr*j)*7+c+dc*j);return v}}}return 0}
function c4p(c){if(o4)return;for(let r=5;r>=0;r--)if(!g4[r*7+c]){g4[r*7+c]=t4;const v=c4win();
if(v){o4=v;w4[v-1]++}else if(g4.every(x=>x))o4=3;else t4=3-t4;break}c4r()}
function c4r(){
app.innerHTML=`<div class="top"><h2>4 في صف</h2>${back}</div>
<div class="panel score"><div><b style="color:var(--a)">${w4[0]}</b>🔴 الأحمر</div><div><b style="color:#c98700">${w4[1]}</b>🟡 الأصفر</div></div>
<p style="text-align:center;font-weight:700;color:var(--ink);margin:0">${o4==3?'تعادل!':o4?'الفايز: '+(o4==1?'🔴':'🟡'):'الدور على '+(t4==1?'🔴':'🟡')}</p>
<div class="c4">${g4.map((v,i)=>`<button class="${v==1?'r':v==2?'y':''} ${c4w.includes(i)?'w':''}" onclick="c4p(${i%7})" aria-label="عمود ${i%7+1}"></button>`).join('')}</div>
<button class="btn big" onclick="c4n()">جولة جديدة</button>`}
