/* ===== Heads Up: التليفون على الجبهة والباقي يمثّلوا الكلمة ===== */
let HU,HUS={};
function hu(){stop();
app.innerHTML=`<div class="top"><h2>Heads Up</h2>${back}</div>
<p>حطّ التليفون على جبهتك والشاشة ناحية صحابك. هما يمثّلوا لك الكلمة من غير ما يقولوها وإنت تخمّن. كل كلمة صح تتحسب نقطة.</p>
<div class="panel"><label>النوع</label><select id="hc">${Object.keys(HUW).map(k=>`<option>${k}</option>`).join('')}</select>
<label>الوقت</label><select id="hd"><option value="45">45 ثانية</option><option value="60" selected>60 ثانية</option><option value="90">90 ثانية</option></select>
<label>طريقة الإجابة</label><select id="hm"><option value="touch">لمس (صاحبك يضغط)</option><option value="tilt">ميل التليفون (لتحت = صح، لفوق = تخطي)</option></select></div>
<button class="btn big" onclick="huGo()">ابدأ ▶</button>`}
function huGo(){if($('#hc'))HUS={c:$('#hc').value,d:+$('#hd').value,m:$('#hm').value};HU={w:shuf(HUW[HUS.c]),i:0,ok:[],sk:0,t:HUS.d,tilt:HUS.m=='tilt',lock:true,base:null};
if(HU.tilt&&window.DeviceOrientationEvent&&DeviceOrientationEvent.requestPermission)DeviceOrientationEvent.requestPermission().catch(()=>{});
let n=3;huCount(n);timer=setInterval(()=>{n--;if(n>0)huCount(n);else{stop();huPlay()}},1000)}
function huCount(n){app.innerHTML=`<div class="reveal" style="background:var(--d);font-size:6rem">${n}</div><p style="text-align:center">حطّ التليفون على جبهتك</p>`}
function huPlay(){addEventListener('deviceorientation',huTilt);huR();
timer=setInterval(()=>{HU.t--;const e=$('#hut');if(e)e.textContent=HU.t;if(HU.t<=0)huEnd()},1000)}
function huR(f){app.innerHTML=`<div class="hu ${f||''}"><div class="hut" id="hut">${HU.t}</div><div class="huw">${HU.w[HU.i]}</div>
<div class="hub"><button class="skip" onclick="huAns(0)">تخطي</button><button class="okb" onclick="huAns(1)">صح ✓</button></div></div>`}
function huAns(ok){if(!HU||HU.t<=0)return;if(ok)HU.ok.push(HU.w[HU.i]);else HU.sk++;HU.i++;navigator.vibrate&&navigator.vibrate(ok?60:20);
if(HU.i>=HU.w.length)huEnd();else huR(ok?'g':'o')}
function huTilt(e){if(!HU||!HU.tilt||e.beta==null)return;if(HU.base==null){HU.base=e.beta;HU.lock=false;return}
const d=e.beta-HU.base;if(Math.abs(d)<15)HU.lock=false;else if(!HU.lock&&Math.abs(d)>40){HU.lock=true;huAns(d>0?1:0)}}
function huEnd(){stop();
app.innerHTML=`<div class="top"><h2>خلص الوقت ⏰</h2>${back}</div>
<div class="panel"><div class="letter" style="color:var(--b)">${HU.ok.length}</div><p style="text-align:center;margin:0">كلمة صح · ${HU.sk} تخطي</p></div>
<div class="panel"><div class="called">${HU.ok.map(w=>`<span>${w}</span>`).join('')||'مفيش كلمات صح المرة دي'}</div></div>
<button class="btn big" onclick="huGo()">جولة تانية</button><div style="height:10px"></div><button class="btn big alt" onclick="hu()">تغيير الإعدادات</button>`}
