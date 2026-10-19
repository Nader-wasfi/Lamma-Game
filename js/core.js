/* ===== النواة: أدوات مشتركة + اللاعبين + الصفحة الرئيسية ===== */
const $=s=>document.querySelector(s),app=$('#app');
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;');
const pick=a=>a[Math.random()*a.length|0];
const shuf=a=>a.map(v=>[Math.random(),v]).sort((x,y)=>x[0]-y[0]).map(x=>x[1]);
let timer=null,RE=()=>{};
const stop=()=>{clearInterval(timer);timer=null;removeEventListener('deviceorientation',window.huTilt||(()=>{}))};
const back='<button class="btn alt" onclick="home()">‹ الرئيسية</button>';

/* اللاعبين (مشتركين بين الألعاب) */
let P=['لاعب 1','لاعب 2'],S=[0,0];
function pset(n){while(P.length<n){P.push('لاعب '+(P.length+1));S.push(0)}P.length=n;S.length=n}
function pnames(){return P.map((n,i)=>`<input type="text" value="${esc(n)}" oninput="P[${i}]=this.value" aria-label="اسم اللاعب ${i+1}">`).join('')}
function psel(min,max,fn){let o='';for(let n=min;n<=max;n++)o+=`<option ${n==P.length?'selected':''}>${n}</option>`;
return `<label>عدد اللاعبين</label><select onchange="pset(+this.value);${fn}()">${o}</select>`}
function pe(){return P.map((n,i)=>`<div class="pl"><input type="text" value="${esc(n)}" oninput="P[${i}]=this.value" aria-label="اسم اللاعب ${i+1}">${P.length>2?`<button class="btn alt" onclick="P.splice(${i},1);S.splice(${i},1);RE()" aria-label="حذف">✕</button>`:''}</div>`).join('')+`<button class="btn alt" onclick="P.push('لاعب '+(P.length+1));S.push(0);RE()">+ ضيف لاعب</button>`}

/* قائمة الألعاب: [الدالة، الإيموجي، الاسم، الوصف، لون1، لون2] */
const GAMES=[
['xo','❌⭕','إكس أو','لاعبين أو ضد الكمبيوتر','#ff5a5f','#ff8a5f'],
['c4','🔴🟡','4 في صف','اربط 4 قطع قبل صاحبك','#f59e0b','#ef6c00'],
['bingo','🎱','بنجو','أرقام 1–25، أول 5 خطوط يكسب','#10b981','#0ea5a4'],
['bus','🚌','أتوبيس كومبليت','حرف عشوائي ووقت ونقاط','#0ea5e9','#6366f1'],
['spy','🕵️','الجاسوس','الكل يعرف الكلمة إلا واحد','#6c4cf1','#a855f7'],
['hu','🤳','Heads Up','التليفون على جبهتك وصحابك يمثّلوا','#ec4899','#f43f5e'],
['hang','🔤','حزّر الكلمة','إعدام الكلمات بالعربي','#14b8a6','#22c55e'],
['qz','🧠','ثقافة عامة','أسئلة بالدور بين اللاعبين','#8b5cf6','#3b82f6']];
function home(){stop();
app.innerHTML=`<header class="hero"><div class="logo">🎉</div><h1>لمّة</h1><p>ألعاب للجلسات من غير ورق ولا إنترنت. افتح وابدأ، لوحدك أو مع صحابك على نفس التليفون.</p></header>
<div class="tiles">${GAMES.map(g=>`<button class="tile" style="--t1:${g[4]};--t2:${g[5]}" onclick="${g[0]}()"><span class="em">${g[1]}</span><b>${g[2]}</b><small>${g[3]}</small></button>`).join('')}</div>`}
