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

/* قائمة الألعاب: [الدالة، الإيموجي، الاسم، الوصف] (ألوان كل لعبة في css/themes.css) */
const GAMES=[
['xo','❌⭕','إكس أو','لاعبين أو ضد الكمبيوتر'],
['c4','🔴🟡','4 في صف','اربط 4 قطع قبل صاحبك'],
['ludo','🎲','ليدو','٢–٤ لاعبين، نرد وقطع'],
['bingo','🎱','بنجو','أرقام 1–25، أول 5 خطوط يكسب'],
['bus','🚌','أتوبيس كومبليت','حرف عشوائي ووقت ونقاط'],
['spy','🕵️','الجاسوس','الكل يعرف الكلمة إلا واحد'],
['hu','🤳','Heads Up','التليفون على جبهتك وصحابك يمثّلوا'],
['hang','🔤','حزّر الكلمة','إعدام الكلمات بالعربي'],
['qz','🧠','ثقافة عامة','أسئلة بالدور بين اللاعبين'],
['brain','🧩','ألعاب ذكاء','أعواد كبريت وألغاز أرقام']];
/* تشغيل لعبة: بيظبط الثيم (الألوان والأشكال) وبعدين بيشغّل دالة اللعبة */
function play(g){document.body.dataset.game=g;window[g]()}
function home(){stop();document.body.dataset.game='home';
app.innerHTML=`<header class="hero"><div class="logo">🎉</div><h1 dir="ltr">Lamma Game</h1><p>ألعاب للجلسات من غير ورق ولا إنترنت. افتح وابدأ، لوحدك أو مع صحابك على نفس التليفون.</p></header>
<div class="tiles">${GAMES.map(g=>`<button class="tile" data-game="${g[0]}" onclick="play('${g[0]}')"><span class="em">${g[1]}</span><b>${g[2]}</b><small>${g[3]}</small></button>`).join('')}</div>`}
