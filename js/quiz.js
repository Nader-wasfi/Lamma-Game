/* ===== أسئلة ثقافة عامة: اختيار عدد اللاعبين وعدد الأسئلة ===== */
let QN=10,QZ;
function qz(){stop();RE=qz;
app.innerHTML=`<div class="top"><h2>ثقافة عامة</h2>${back}</div>
<p>الأسئلة بالدور بين اللاعبين. اختار العدد واكتب الأسامي.</p>
<div class="panel">${psel(1,8,'qz')}${pnames()}
<label>عدد الأسئلة</label><select onchange="QN=+this.value">${[5,10,15,20].map(n=>`<option ${n==QN?'selected':''}>${n}</option>`).join('')}</select></div>
<button class="btn big" onclick="qgo()">ابدأ</button>`}
function qgo(){QZ={q:shuf(Q).slice(0,QN),i:0,sc:P.map(()=>0)};qr()}
function qr(){const z=QZ,n=z.q.length;
if(z.i>=n){const m=Math.max(...z.sc);
app.innerHTML=`<div class="top"><h2>النتيجة</h2>${back}</div><div class="panel">${P.map((p,i)=>`<div class="pl"><b style="flex:1">${z.sc[i]==m&&P.length>1?'🏆 ':''}${esc(p)}</b><b>${z.sc[i]} من ${Math.ceil((n-i)/P.length)}</b></div>`).join('')}</div><button class="btn big" onclick="qgo()">لعب تاني</button>`;return}
const q=z.q[z.i];z.o=shuf(q.slice(1));
app.innerHTML=`<div class="top"><h2>سؤال ${z.i+1} من ${n}</h2>${back}</div>
<p style="margin-bottom:6px">الدور على: <b style="color:var(--d)">${esc(P[z.i%P.length])}</b></p>
<div class="panel"><b style="font-size:1.2rem">${q[0]}</b></div>
${z.o.map((t,i)=>`<button class="opt" onclick="qc(${i})">${t}</button>`).join('')}<div id="nx"></div>`}
function qc(i){const z=QZ,q=z.q[z.i];if(document.querySelector('.opt.ok'))return;
document.querySelectorAll('.opt').forEach((b,k)=>{if(z.o[k]==q[1])b.classList.add('ok');else if(k==i)b.classList.add('no')});
if(z.o[i]==q[1])z.sc[z.i%P.length]++;
$('#nx').innerHTML=`<button class="btn big" onclick="QZ.i++;qr()">${z.i==z.q.length-1?'شوف النتيجة':'السؤال اللي بعده'}</button>`}
