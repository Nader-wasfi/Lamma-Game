/* ---------- أتوبيس كومبليت ---------- */
const AR='أبتثجحخدذرزسشصطعغفقكلمنهوي'.split('');
const cats=['اسم','حيوان','نبات','جماد','بلاد'];
let bl='؟',bt=60;
function bus(){stop();bl='؟';bt=60;RE=br;br()}
function br(){
app.innerHTML=`<div class="top"><h2>أتوبيس كومبليت</h2>${back}</div>
<div class="panel"><div class="letter" id="lt">${bl}</div><div class="time" id="tm">${bt}</div>
<p style="text-align:center;margin:8px 0">اكتبوا ${cats.join('، ')} بالحرف ده في الخانات تحت</p>
<div class="row"><select id="dur" onchange="bt=+this.value;$('#tm').textContent=bt"><option value="30">30 ثانية</option><option value="60" selected>60 ثانية</option><option value="90">90 ثانية</option></select></div>
<button class="btn big" onclick="bgo()">حرف جديد وابدأ ▶</button></div>
<div class="panel">${cats.map(c=>`<input type="text" placeholder="${c}" aria-label="${c}">`).join('')}</div>
<div class="panel"><b>اللاعبين والنقاط</b><p style="margin:4px 0">اكتب اسم كل لاعب</p>
${P.map((n,i)=>`<div class="pl"><input type="text" value="${esc(n)}" oninput="P[${i}]=this.value" aria-label="اسم اللاعب ${i+1}"><button class="btn alt" onclick="bs(${i},-5)">−5</button><button class="btn alt" onclick="bs(${i},5)">+5</button><button class="btn" onclick="bs(${i},10)">+10</button><b id="s${i}" style="min-width:32px;text-align:center">${S[i]}</b>${P.length>2?`<button class="btn alt" onclick="P.splice(${i},1);S.splice(${i},1);br()" aria-label="حذف">✕</button>`:''}</div>`).join('')}
<div class="row" style="margin:10px 0 0"><button class="btn alt" onclick="P.push('لاعب '+(P.length+1));S.push(0);br()">+ ضيف لاعب</button><button class="btn alt" onclick="S=S.map(()=>0);br()">صفّر النقاط</button></div></div>`}
function bs(i,v){S[i]+=v;$('#s'+i).textContent=S[i]}
function bgo(){stop();bl=pick(AR);bt=+$('#dur').value;$('#lt').textContent=bl;$('#tm').textContent=bt;
document.querySelectorAll('.panel input[type=text][placeholder]').forEach(i=>i.value='');
timer=setInterval(()=>{bt--;$('#tm').textContent=bt;if(bt<=0){stop();$('#tm').textContent='⏰ خلص الوقت!';navigator.vibrate&&navigator.vibrate(400)}},1000)}
