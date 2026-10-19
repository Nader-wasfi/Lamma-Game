/* ===== أعواد الكبريت: (1) معادلات بتتولّد تلقائي (2) أشكال ومربعات ===== */
const SEGN='abcdefg',DIG=['abcdef','bc','abdeg','abcdg','bcfg','acdfg','acdefg','abc','abcdefg','abcdfg'].map(s=>[...s].reduce((m,c)=>m|1<<SEGN.indexOf(c),0));
/* حالة المعادلة: 23 خانة عود = رقم1 (0-6) + علامة (7 أفقي، 8 رأسي) + رقم2 (9-15) + النتيجة (16-22) */
function mtState(a,op,b,c){const st=[],dg=v=>{for(let i=0;i<7;i++)st.push(!!(DIG[v]>>i&1))};dg(a);st.push(true,op=='+');dg(b);dg(c);return st}
function mtEval(st){const dv=o=>{let m=0;for(let i=0;i<7;i++)if(st[o+i])m|=1<<i;return DIG.indexOf(m)};
const a=dv(0),b=dv(9),c=dv(16);if(a<0||b<0||c<0||!st[7])return null;return(st[8]?a+b:a-b)==c}
let MQ=null,MS,MN=0;
function mtBuild(){MQ=[];for(let a=0;a<10;a++)for(let b=0;b<10;b++)for(let c=0;c<10;c++)for(const op of'+-'){const st=mtState(a,op,b,c);if(mtEval(st)!==false)continue;
const sol=[];st.forEach((p,i)=>{if(!p)return;st.forEach((q,j)=>{if(q)return;const t=st.slice();t[i]=false;t[j]=true;if(mtEval(t)===true)sol.push([i,j])})});if(sol.length)MQ.push({st,sol})}}
function mtEq(){stop();if(!MQ)mtBuild();const p=pick(MQ);MS={st:p.st.slice(),o:p.st.slice(),sol:p.sol,sel:null,bad:false,done:false,hint:null};mtR()}
function mtSlots(){const G={a:[3,0,10,3],b:[13,3,3,12],c:[13,18,3,12],d:[3,30,10,3],e:[0,18,3,12],f:[0,3,3,12],g:[3,15,10,3]},sl=[];
const dig=ox=>[...SEGN].forEach(k=>{const[x,y,w,h]=G[k];sl.push([ox+x,y+2,w,h])});dig(2);sl.push([28,17,10,3],[31.5,13.5,3,10]);dig(44);dig(94);return sl}
function mtStick(x,y,w,h,on,sel,hint,fn){const hd=w>h?[x+1.6,y+h/2]:[x+w/2,y+1.6];
return`<g onclick="${fn}" style="cursor:pointer"><rect x="${x-3}" y="${y-3}" width="${w+6}" height="${h+6}" fill="transparent"/>`+(on?`<g ${sel?'transform="translate(0,-2.5)"':''} ${hint?'class="hint"':''}><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="1.2" fill="#d6a35c" stroke="${sel?'#12263a':'#8a5a20'}" stroke-width=".5"/><circle cx="${hd[0]}" cy="${hd[1]}" r="2" fill="#dc2626"/></g>`:`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="1.2" fill="none" stroke="var(--mut)" stroke-width=".4" stroke-dasharray="1.5 1.2" opacity=".6"/>`)+'</g>'}
function mtR(){const M=MS;
app.innerHTML=`<div class="top"><h2>معادلة الكبريت</h2>${bk('mtMenu')}</div>
<p>حرّك <b>عود واحد بس</b> عشان المعادلة تبقى صح. اضغط على عود وبعدين على مكان فاضي. (حلّيت: ${MN})</p>
<div class="panel"><svg viewBox="0 0 116 38" class="mtsvg">${mtSlots().map((s,i)=>mtStick(...s,M.st[i],M.sel==i,M.hint==i,`mtTap(${i})`)).join('')}
<rect x="70" y="14" width="14" height="3" rx="1.2" fill="#b98a4a"/><rect x="70" y="22" width="14" height="3" rx="1.2" fill="#b98a4a"/></svg></div>
<p style="text-align:center;font-weight:700;color:var(--ink)">${M.done?'🎉 برافو! المعادلة بقت صح':M.bad?'❌ مش دي، دوس "رجّع" وجرّب تاني':M.sel!=null?'اختار المكان الجديد للعود':''}</p>
<div class="row"><button class="btn alt" onclick="MS.st=MS.o.slice();MS.sel=null;MS.bad=false;mtR()">رجّع</button><button class="btn alt" onclick="MS.hint=MS.sol[0][0];mtR()">تلميح</button><button class="btn" onclick="mtEq()">${M.done?'لغز جديد ▶':'تخطي ▶'}</button></div>`}
function mtTap(i){const M=MS;if(M.done||M.bad)return;
if(M.sel==null){if(M.st[i]){M.sel=i;M.hint=null}}else if(M.sel==i)M.sel=null;else if(M.st[i])M.sel=i;
else{M.st[i]=true;M.st[M.sel]=false;M.sel=null;if(mtEval(M.st)===true){M.done=true;MN++}else M.bad=true}mtR()}
/* ----- أشكال ومربعات ----- */
let SH;
function mtShape(i){stop();SH={i,p:MSH[i%MSH.length],rem:[],done:false,hint:false};mtSR()}
function shSq(p,rem){const{w,h}=p,H=(x,y)=>y*w+x,V=(x,y)=>(h+1)*w+y*(w+1)+x,ok=id=>!rem.includes(id);let c=0;
for(let s=1;s<=Math.min(w,h);s++)for(let x=0;x+s<=w;x++)for(let y=0;y+s<=h;y++){let f=true;for(let k=0;k<s&&f;k++)if(!ok(H(x+k,y))||!ok(H(x+k,y+s))||!ok(V(x,y+k))||!ok(V(x+s,y+k)))f=false;if(f)c++}return c}
function mtSR(){const S=SH,{w,h,rm,t}=S.p,u=20,n=(h+1)*w+h*(w+1);let s='';
for(let id=0;id<n;id++){let x,y,ww,hh;if(id<(h+1)*w){x=id%w;y=id/w|0;[x,y,ww,hh]=[x*u+6,y*u+4-1.5,u-4,3]}else{const j=id-(h+1)*w;x=j%(w+1);y=j/(w+1)|0;[x,y,ww,hh]=[x*u+4-1.5,y*u+6,3,u-4]}
s+=mtStick(x,y,ww,hh,!S.rem.includes(id),false,S.hint&&S.p.sol[0]==id,`mtShTap(${id})`)}
const left=rm-S.rem.length,full=S.rem.length==rm,cnt=shSq(S.p,S.rem);
app.innerHTML=`<div class="top"><h2>أشكال الكبريت</h2>${bk('mtMenu')}</div>
<p>لغز ${S.i%MSH.length+1} من ${MSH.length}: شيل <b>${rm}</b> ${rm>2?'عيدان':'عودين'} ويفضل <b>${t?t+' مربعات':'ولا مربع'}</b> بالظبط (أي حجم). اضغط على العود عشان تشيله، واضغط عليه تاني عشان ترجّعه.</p>
<div class="panel"><svg viewBox="0 0 ${w*u+8} ${h*u+8}" class="mtsvg" style="max-width:${(w*u+8)*5}px">${s}</svg></div>
<p style="text-align:center;font-weight:700;color:var(--ink)">${S.done?'🎉 برافو! فضل '+cnt+' بالظبط':full?'❌ فضل '+cnt+' مش '+t+'، رجّع عود وجرّب':'باقي تشيل '+left}</p>
<div class="row"><button class="btn alt" onclick="SH.rem=[];SH.done=false;mtSR()">رجّع الكل</button><button class="btn alt" onclick="SH.hint=true;mtSR()">تلميح</button><button class="btn" onclick="mtShape(SH.i+1)">${S.done?'لغز جديد ▶':'تخطي ▶'}</button></div>`}
function mtShTap(id){const S=SH;if(S.done)return;const k=S.rem.indexOf(id);if(k>=0)S.rem.splice(k,1);else if(S.rem.length<S.p.rm)S.rem.push(id);
S.done=S.rem.length==S.p.rm&&shSq(S.p,S.rem)==S.p.t;mtSR()}
