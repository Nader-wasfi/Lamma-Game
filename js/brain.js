/* ===== ألعاب الذكاء: قايمة الأقسام (أعواد الكبريت / ألغاز الأرقام) ===== */
const bk=f=>`<button class="btn alt" onclick="${f}()">‹ رجوع</button>`;
function menu(title,intro,items,backfn){stop();
app.innerHTML=`<div class="top"><h2>${title}</h2>${bk(backfn)}</div><p>${intro}</p>${items.map(i=>`<button class="opt" onclick="${i[3]}"><b>${i[0]} ${i[1]}</b><br><small>${i[2]}</small></button>`).join('')}`}
function brain(){stop();document.body.dataset.game='brain';
app.innerHTML=`<div class="top"><h2>ألعاب الذكاء 🧩</h2>${back}</div><p>اختار نوع الألغاز:</p>
<div class="tiles"><button class="tile" data-game="match" onclick="mtMenu()"><span class="em">🔥</span><b>أعواد الكبريت</b><small>حرّك عود واحد وغيّر النتيجة أو الشكل</small></button>
<button class="tile" data-game="mathp" onclick="mpMenu()"><span class="em">🔢</span><b>ألغاز الأرقام</b><small>مربعات سحرية، 24، سودوكو وغيرها</small></button></div>`}
function mtMenu(){document.body.dataset.game='match';menu('أعواد الكبريت 🔥','اضغط على عود عشان تمسكه وبعدين على مكان فاضي عشان تحطه.',[
['➕','معادلات','حرّك عود واحد عشان المعادلة تبقى صح (ألغاز كتير بتتولّد تلقائي)','mtEq()'],
['⬜','أشكال ومربعات','شيل عيدان ويفضل عدد مربعات معيّن','mtShape(0)']],'brain')}
function mpMenu(){document.body.dataset.game='mathp';menu('ألغاز الأرقام 🔢','ألغاز تفكير مش مسائل، اختار اللي يعجبك:',[
['🔮','المربع السحري (سهل)','رتّب 1 لـ 9 في 9 مربعات، كل صف وعمود وقُطر مجموعه 15 (4 أرقام جاهزة)','mpMagic(4)'],
['🔮','المربع السحري (صعب)','نفس اللغز من غير أي رقم جاهز','mpMagic(0)'],
['🔢','سودوكو 4×4 (سهل)','كل صف وعمود ومربع صغير فيه 1 لـ 4 من غير تكرار','mpSudo(10)'],
['🔢','سودوكو 4×4 (صعب)','أرقام جاهزة أقل','mpSudo(6)'],
['🎯','لعبة الـ 24','استخدم الأرقام الأربعة والعمليات عشان توصل لـ 24','mp24()'],
['➡️','الرقم الجاي؟','كمّل المتتالية، أنواع كتير وبتتولّد تلقائي','mpSeq()'],
['💡','ألغاز وفوازير أرقام','أسئلة تفكير بإجابات، واحد يقرأ والباقي يخمّن','mpRid()']],'brain')}
