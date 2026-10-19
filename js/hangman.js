/* ---------- حزّر الكلمة ---------- */
const KB='ابتثجحخدذرزسشصضطظعغفقكلمنهوي'.split('');
let hw,hc,hg,hl;
function hang(){stop();hc=pick(Object.keys(HW));hw=pick(HW[hc]);hg=[];hl=6;hr()}
function hr(){const won=[...hw].every(c=>hg.includes(c)),lost=hl<=0;
app.innerHTML=`<div class="top"><h2>حزّر الكلمة</h2>${back}</div>
<div class="panel"><p style="text-align:center;margin:0">النوع: <b style="color:var(--ink)">${hc}</b> · المحاولات: ${'❤️'.repeat(hl)}${'🖤'.repeat(6-hl)}</p>
<div class="word">${[...hw].map(c=>hg.includes(c)||lost?c:'_').join(' ')}</div>
${won?'<p style="text-align:center;font-size:1.4rem;font-weight:900;color:var(--b);margin:0 0 8px">🎉 برافو!</p>':lost?'<p style="text-align:center;font-size:1.2rem;font-weight:900;color:var(--a);margin:0 0 8px">خسرت، جرّب تاني</p>':''}</div>
<div class="kb">${KB.map(k=>`<button ${hg.includes(k)||won||lost?'disabled':''} onclick="hp('${k}')">${k}</button>`).join('')}</div>
<button class="btn big" style="margin-top:14px" onclick="hang()">كلمة جديدة</button>`}
function hp(k){hg.push(k);if(!hw.includes(k))hl--;hr()}
