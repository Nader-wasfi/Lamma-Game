/* مساعد للبيانات: بيحوّل 'كلمة|كلمة|كلمة' لقايمة. زوّد كلمات بس بفاصل | */
const mk=o=>Object.fromEntries(Object.entries(o).map(([k,v])=>[k,v.split('|')]));
