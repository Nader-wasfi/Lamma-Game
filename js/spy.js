/* ---------- الجاسوس ---------- */
let sg;
function spy(){stop();RE=spy;
app.innerHTML=`<div class="top"><h2>الجاسوس</h2>${back}</div>
<p>كل واحد يشوف الكلمة السرية في دوره، إلا الجاسوس مش هيعرفها. اسألوا بعض وحاولوا تكشفوه من غير ما تقولوا الكلمة.</p>
<div class="panel"><b>اللاعبين (3 على الأقل)</b><div style="margin-top:8px">${pe()}</div></div>
<div class="panel"><label>النوع</label><select id="c">${Object.keys(W).map(k=>`<option>${k}</option>`).join('')}</select></div>
<button class="btn big" onclick="sgo()">ابدأ اللعبة</button>`}
function sgo(){if(P.length<3){alert('محتاجين 3 لاعبين على الأقل');return}
const c=$('#c')?$('#c').value:sg.c;sg={c,w:pick(W[c]),s:Math.random()*P.length|0,i:0,shown:false};sr()}
function sr(){if(sg.i>=P.length){sd();return}
const spyNow=sg.shown&&sg.i==sg.s;
app.innerHTML=`<div class="top"><h2>دور ${esc(P[sg.i])}</h2>${back}</div>
<div class="reveal ${spyNow?'spy':''}" onclick="ss()">${sg.shown?(spyNow?'أنت الجاسوس 🕵️<small>النوع: '+sg.c+'</small>':sg.w+'<small>النوع: '+sg.c+'</small>'):'اضغط عشان تشوف دورك<small>وبعدها اخفي الشاشة وسلّم التليفون</small>'}</div>
${sg.shown?'<button class="btn big" onclick="sg.i++;sg.shown=false;sr()">تمام، اللي بعده</button>':''}`}
function ss(){if(!sg.shown){sg.shown=true;sr()}}
function sd(){let t=300;
app.innerHTML=`<div class="top"><h2>ابدأوا النقاش</h2>${back}</div>
<div class="panel"><div class="time" id="st">5:00</div><p style="text-align:center;margin:6px 0 0">اسألوا بعض بالدور، وفي الآخر صوّتوا على الجاسوس.</p></div>
<div class="reveal" style="background:var(--b)" onclick="this.innerHTML='الجاسوس: ${esc(P[sg.s])}<small>الكلمة كانت: ${sg.w}</small>'">اضغط لكشف الجاسوس</div>
<button class="btn big" onclick="sgo()">جولة جديدة</button>`;
timer=setInterval(()=>{t--;const e=$('#st');if(!e||t<0){stop();return}e.textContent=Math.floor(t/60)+':'+String(t%60).padStart(2,'0')},1000)}
