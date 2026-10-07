const Q=[
["اعمال کا دارومدار نیتوں پر ہے۔","Hadith","Bukhari, Muslim"],
["تم میں سب سے بہتر وہ ہے جو قرآن سیکھے اور سکھائے۔","Hadith","Bukhari"],
["تم میں سے کوئی مومن نہیں ہو سکتا جب تک اپنے بھائی کے لیے وہی پسند نہ کرے جو اپنے لیے کرتا ہے۔","Hadith","Bukhari, Muslim"],
["جو اللہ اور آخرت کے دن پر ایمان رکھتا ہے، وہ اچھی بات کہے یا خاموش رہے۔","Hadith","Bukhari, Muslim"],
["اصل طاقتور وہ ہے جو غصے کے وقت اپنے آپ پر قابو رکھے۔","Hadith","Bukhari, Muslim"],
["اپنے بھائی کے سامنے مسکرانا بھی صدقہ ہے۔","Hadith","Tirmidhi"],
["تم میں سب سے اچھا وہ ہے جو اپنے گھر والوں کے لیے سب سے اچھا ہو۔","Hadith","Tirmidhi"],
["پاکیزگی آدھا ایمان ہے۔","Hadith","Muslim"],
["اللہ تمہاری صورتوں اور مالوں کو نہیں، تمہارے دلوں اور اعمال کو دیکھتا ہے۔","Hadith","Muslim"],
["آسانی کرو، سختی نہ کرو۔","Hadith","Bukhari, Muslim"],
["اللہ کو سب سے پیارا عمل وہ ہے جو مسلسل ہو، چاہے تھوڑا ہی ہو۔","Hadith","Bukhari, Muslim"],
["جو علم کے راستے پر چلتا ہے، اللہ اس کے لیے جنت کا راستہ آسان کر دیتا ہے۔","Hadith","Muslim"],
["دین خیر خواہی کا نام ہے۔","Hadith","Muslim"],
["بے شک مشکل کے ساتھ آسانی ہے۔","Quran","Surah Al-Inshirah 94:6"],
["بے شک اللہ صبر کرنے والوں کے ساتھ ہے۔","Quran","Surah Al-Baqarah 2:153"],
["تم مجھے یاد کرو، میں تمہیں یاد رکھوں گا۔","Quran","Surah Al-Baqarah 2:152"],
["اللہ کسی جان پر اس کی طاقت سے زیادہ بوجھ نہیں ڈالتا۔","Quran","Surah Al-Baqarah 2:286"],
["جو اللہ پر بھروسا کرے، تو وہ اس کے لیے کافی ہے۔","Quran","Surah At-Talaq 65:3"],
["سن لو! اللہ کے ذکر سے ہی دلوں کو سکون ملتا ہے۔","Quran","Surah Ar-Ra'd 13:28"],
["اللہ کی رحمت سے مایوس نہ ہو۔","Quran","Surah Az-Zumar 39:53"],
["میری رحمت ہر چیز کو گھیرے ہوئے ہے۔","Quran","Surah Al-A'raf 7:156"]
];
const G=[["#0b4f3a","#1a8f6a"],["#12355b","#2c6fb5"],["#4a2c6b","#8a5cc0"],["#6b2c3a","#b5576b"],["#1f4d4d","#3a9b9b"],["#5a4a1a","#b39a3a"]];
const $=id=>document.getElementById(id);
const sg=(k,d)=>{try{return JSON.parse(localStorage.getItem(k))||d}catch(e){return d}};
const ss=(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}};
let cat="All",me=sg("rw_me",null),reg=false;
function favs(){return me?sg("rw_f_"+me,[]):[]}
function render(){
 const f=favs(),s=$("q").value.trim();
 const list=Q.map((x,i)=>({x,i})).filter(({x,i})=>(cat==="All"||(cat==="Favourites"?f.includes(i):x[1]===cat))&&(!s||x[0].includes(s)||x[2].includes(s)));
 $("grid").innerHTML=list.length?list.map(({x,i})=>{const g=G[i%G.length];
  return `<div class="pic" style="background:linear-gradient(145deg,${g[0]},${g[1]})"><span class="tag">${x[1]}</span><div class="t">“${x[0]}”</div><div class="s"><span>${x[2]}</span><button class="heart" data-i="${i}" aria-label="Favourite">${f.includes(i)?"♥":"♡"}</button></div></div>`}).join(""):`<div class="empty">Nothing found${cat==="Favourites"&&!me?" — login to see your favourites":""}</div>`;
 $("cats").innerHTML=["All","Hadith","Quran","Favourites"].map(c=>`<button class="chip ${c===cat?"on":""}" data-c="${c}">${c}</button>`).join("");
 $("authBtn").textContent=me?`${me} · Logout`:"Login / Sign up";
}
$("cats").onclick=e=>{const c=e.target.dataset.c;if(c){cat=c;render()}};
$("q").oninput=render;
$("grid").onclick=e=>{const b=e.target.closest(".heart");if(!b)return;
 if(!me){openD();return}
 const i=+b.dataset.i,f=favs(),k=f.indexOf(i);k>-1?f.splice(k,1):f.push(i);ss("rw_f_"+me,f);render()};
function openD(){reg=false;sync();$("err").textContent="";$("dlg").showModal()}
function sync(){$("dt").textContent=reg?"New account":"Login";$("go").textContent=reg?"Sign up":"Login";$("sw").textContent=reg?"Back to login":"New account"}
$("authBtn").onclick=()=>{if(me){me=null;ss("rw_me",null);render()}else openD()};
$("sw").onclick=()=>{reg=!reg;sync()};
$("cl").onclick=()=>$("dlg").close();
$("go").onclick=()=>{
 const u=$("u").value.trim(),p=$("p").value,us=sg("rw_users",{});
 if(!u||p.length<4){$("err").textContent="Enter a username and a password of at least 4 characters";return}
 if(reg){if(us[u]){$("err").textContent="That username is already taken";return}us[u]=p;ss("rw_users",us)}
 else if(us[u]!==p){$("err").textContent="Wrong username or password";return}
 me=u;ss("rw_me",me);$("dlg").close();$("u").value=$("p").value="";render()};
render();