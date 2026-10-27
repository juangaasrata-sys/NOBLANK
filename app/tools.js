/* ====== ALAT PRAKTIS: kalkulator, aman-atau-buang, cek fakta, jalur UMKM ====== */
const TX={
id:{toolT:"Alat praktis",toolD:"Ilmu dari buku-buku di kuis ini, dipakai langsung di rumah dan usaha kecil.",
 tCalc:["Kalkulator dapur & rumah","Garam pengawet, air garam, alkohol, pemutih, tabir surya, kafein, panel surya, pupuk"],
 tSafe:["Aman atau buang?","Panduan cepat: lauk tertinggal, listrik padam, jamur, kemasan menggembung"],
 tFact:["Cek fakta hoaks","Klaim populer → fakta → sumber buku, siap dibagikan"],
 tUmkm:["Jalur UMKM pangan & rumahan","Keamanan produk, umur simpan, label, lalu kuis per modul"],
 back:"‹ Kembali ke menu",ref:"Dasar",res:"Hasil",copy:"Salin teks",start:"Mulai lagi",
 disc:"Panduan ini ringkasan umum keamanan pangan dan isi buku; bukan pengganti aturan BPOM/Dinkes atau saran tenaga kesehatan.",
 factSearch:"Cari klaim…",factAll:"Semua bab",factQuiz:"Kuis cek fakta",factN:n=>`${n} klaim`,claim:"Klaim / pertanyaan",fact:"Fakta",why:"Penjelasan",src:"Sumber",share:"Salin untuk dibagikan",
 umkmQuiz:"Kuis modul ini",umkmN:n=>`${n} soal terkait`,m_mitos:["Cek fakta","Soal mitos vs bukti"],m_umkm:["Jalur UMKM","Kuis modul UMKM"],
 home:"Di rumahmu",homePrak:n=>`${n} soal praktis/mitos untuk unsur ini`},
en:{toolT:"Practical tools",toolD:"Knowledge from the books in this quiz, put to work at home and in small businesses.",
 tCalc:["Kitchen & home calculators","Curing salt, brine, alcohol, bleach, sunscreen, caffeine, solar panels, fertiliser"],
 tSafe:["Keep or toss?","Quick guides: food left out, power cuts, mould, bulging packs"],
 tFact:["Myth checker","Popular claim → fact → book source, ready to share"],
 tUmkm:["Small food-business path","Product safety, shelf life, labelling, then a quiz per module"],
 back:"‹ Back to menu",ref:"Basis",res:"Result",copy:"Copy text",start:"Start over",
 disc:"A general food-safety summary based on the books; not a substitute for regulators' rules or health-professional advice.",
 factSearch:"Search claims…",factAll:"All chapters",factQuiz:"Myth-check quiz",factN:n=>`${n} claims`,claim:"Claim / question",fact:"Fact",why:"Explanation",src:"Source",share:"Copy to share",
 umkmQuiz:"Quiz this module",umkmN:n=>`${n} related questions`,m_mitos:["Myth check","Myth-vs-evidence questions"],m_umkm:["Business path","Business module quiz"],
 home:"In your home",homePrak:n=>`${n} practical/myth questions for this element`}};
Object.assign(T.id,{m_mitos:TX.id.m_mitos,m_umkm:TX.id.m_umkm});Object.assign(T.en,{m_mitos:TX.en.m_mitos,m_umkm:TX.en.m_umkm});
const X=()=>TX[LANG];
const tt=(a)=>a[LI()];
COUNTABLE.push("mitos","umkm");
const QMYTH=()=>QM.filter(q=>q.a==="mitos");

/* ---------- KALKULATOR ---------- */
const fmt=(v,d=1)=>isFinite(v)?(+v.toFixed(d)).toLocaleString(LANG==="id"?"id-ID":"en-GB"):"–";
const CALCS=[
 {id:"cure",t:["Garam pengawet daging (dendeng, sosis, daging asap)","Meat curing salt (jerky, sausage, smoked meat)"],
  inp:[["w",["Berat daging + lemak (gram)","Meat + fat weight (g)"],1000]],
  f:v=>{const w=v.w;return [[["Garam (3%)","Salt (3%)"],fmt(w*.03)+" g"],[["Garam versi kurang asin (2,5%)","Milder salt (2.5%)"],fmt(w*.025)+" g"],[["Garam nitrit Cure #1 (0,25%)","Cure #1 nitrite salt (0.25%)"],fmt(w*.0025,2)+" g"],[["Dekstrosa untuk sosis fermentasi (0,5%)","Dextrose for fermented sausage (0.5%)"],fmt(w*.005)+" g"],[["Target berat bila dikeringkan (susut 30%)","Target weight when dried (30% loss)"],fmt(w*.7,0)+" g"]]},
  n:["Timbang, jangan takar sendok: garam kristal besar bisa beda berat hampir 2×. Cure #1 berisi 6,25% natrium nitrit dan beracun dalam jumlah besar. Nitrit diwajibkan untuk produk diasap suhu rendah atau sosis yang dikeringkan, bukan untuk lauk yang langsung dimasak.","Weigh, don't spoon: coarse salts can differ nearly 2× by volume. Cure #1 is 6.25% sodium nitrite and toxic in quantity. Nitrite is needed for low-temperature smoking or dried sausage, not for food cooked right away."],
  r:"Ruhlman & Polcyn (Salumi, Charcuterie); Marianski"},
 {id:"brine",t:["Air garam acar & asinan sayur","Brine for pickles & fermented vegetables"],
  inp:[["l",["Air (liter)","Water (litres)"],1],["p",["Kadar garam air rendaman (%)","Brine strength (%)"],5],["veg",["Atau: berat sayur rajang untuk dry-salt (gram)","Or: shredded veg for dry-salting (g)"],1000]],
  f:v=>[[["Garam untuk air rendaman","Salt for the brine"],fmt(v.l*1000*v.p/100)+" g"],[["Garam untuk sayur rajang (±2%)","Salt for shredded veg (±2%)"],fmt(v.veg*.02)+" g"]],
  n:["5% cocok untuk sayur utuh/potongan besar; kadarnya turun setelah sayur menyerap garam. Cuaca panas → sedikit lebih asin. Pastikan sayur selalu terendam, pakai air tanpa kaporit, wadah kaca/keramik tanpa timbal.","5% suits whole vegetables or chunks; it drops as vegetables absorb salt. Hot weather → a little saltier. Keep vegetables submerged, use unchlorinated water and glass or lead-free ceramic."],
  r:"Katz, Wild Fermentation"},
 {id:"abv",t:["Kadar alkohol minuman fermentasi","Alcohol in a home ferment"],
  inp:[["og",["Berat jenis awal (OG), mis. 1,050","Original gravity (OG), e.g. 1.050"],1.05],["fg",["Berat jenis akhir (FG), mis. 1,010","Final gravity (FG), e.g. 1.010"],1.01]],
  f:v=>[[["Perkiraan ABV","Estimated ABV"],fmt((v.og-v.fg)*131.25,1)+" %"]],
  n:["Rumus Richardson: ABV = (OG − FG) × 131,25. Kombucha atau tepache yang terlalu lama/hangat bisa melewati 0,5%; penting untuk isu halal dan anak-anak.","Richardson's formula: ABV = (OG − FG) × 131.25. Kombucha or tepache left long or warm can exceed 0.5%, which matters for halal concerns and children."],
  r:"Richardson, Flavor Lab Creations"},
 {id:"bleach",t:["Pengenceran pemutih (natrium hipoklorit)","Bleach dilution (sodium hypochlorite)"],
  inp:[["c",["Kadar produk (% NaOCl, lihat label; umumnya 5–6%)","Product strength (% NaOCl, see label; usually 5–6%)"],5.25],["ppm",["Target (ppm): 1000 permukaan umum, 5000 tumpahan muntah/darah","Target (ppm): 1000 general surfaces, 5000 vomit/blood spills"],1000],["v",["Volume larutan jadi (liter)","Final volume (litres)"],1]],
  f:v=>{const ml=v.ppm*v.v*1000/(v.c*10000);return [[["Pemutih yang dituang","Bleach to add"],fmt(ml,0)+" mL"],[["Air","Water"],fmt(v.v*1000-ml,0)+" mL"]]},
  n:["Pakai air dingin, buat baru setiap hari (larutan melemah), bersihkan kotoran dulu baru disinfeksi. JANGAN campur dengan pembersih asam (pembersih kerak/toilet) atau amonia: melepas gas klorin/kloramin beracun.","Use cold water, make fresh daily (it weakens), clean dirt off before disinfecting. NEVER mix with acidic (descaler/toilet) cleaners or ammonia: it releases toxic chlorine/chloramine gas."],
  r:"Bressanini, The Science of Cleaning"},
 {id:"spf",t:["Takaran tabir surya","Sunscreen amount"],
  inp:[["h",["Tinggi badan (cm)","Height (cm)"],160],["kg",["Berat badan (kg)","Weight (kg)"],55]],
  f:v=>{const bsa=Math.sqrt(v.h*v.kg/3600);const body=bsa*10000*2/1000;return [[["Wajah + leher (±2 mg/cm²)","Face + neck (±2 mg/cm²)"],"±1,25 g ≈ ¼ sdt"],[["Seluruh tubuh terbuka","Whole exposed body"],fmt(body,0)+" g ≈ "+fmt(body/5,1)+(LANG==="id"?" sdt":" tsp")]]},
  n:["Angka SPF diuji pada 2 mg/cm²; kebanyakan orang memakai separuhnya sehingga perlindungan jauh di bawah label. Ulangi setelah berkeringat/berenang atau ±2 jam di luar.","SPF is tested at 2 mg/cm²; most people apply half, so protection falls far below the label. Reapply after sweating/swimming or every ±2 hours outdoors."],
  r:"Wong, The Science of Beauty"},
 {id:"caf",t:["Kafein harian","Daily caffeine"],
  inp:[["k",["Cangkir kopi seduh (±95 mg)","Cups of brewed coffee (±95 mg)"],1],["s",["Kopi saset/instan (±60 mg)","Instant/sachet coffee (±60 mg)"],1],["t",["Gelas teh (±45 mg)","Cups of tea (±45 mg)"],1],["e",["Kaleng minuman energi (±80 mg)","Energy-drink cans (±80 mg)"],0],["c",["Kaleng cola (±35 mg)","Cans of cola (±35 mg)"],0]],
  f:v=>{const mg=v.k*95+v.s*60+v.t*45+v.e*80+v.c*35;return [[["Total kafein","Total caffeine"],fmt(mg,0)+" mg"],[["Batas dewasa sehat (400 mg)","Healthy-adult limit (400 mg)"],mg>400?(LANG==="id"?"Melebihi":"Over"):(LANG==="id"?"Masih di bawah":"Under")],[["Batas ibu hamil (200 mg)","Pregnancy limit (200 mg)"],mg>200?(LANG==="id"?"Melebihi":"Over"):(LANG==="id"?"Masih di bawah":"Under")]]},
  n:["Kadar tiap minuman sangat bervariasi (cold brew bisa jauh lebih tinggi). Kafein murni bubuk berbahaya: beberapa gram bisa fatal.","Caffeine varies a lot per drink (cold brew can be much higher). Pure caffeine powder is dangerous: a few grams can be fatal."],
  r:"Richardson; Hoffmann; Kingston"},
 {id:"solar",t:["Ukuran panel surya & baterai off-grid","Off-grid solar panel & battery size"],
  inp:[["wh",["Kebutuhan listrik per hari (Wh)","Daily energy need (Wh)"],1000],["psh",["Jam matahari puncak (Indonesia ±4)","Peak sun hours (Indonesia ±4)"],4],["d",["Hari cadangan saat mendung","Days of autonomy"],1],["vb",["Tegangan baterai (V)","Battery voltage (V)"],12],["dod",["Kedalaman pengosongan (0,5 aki basah; 0,8 LiFePO₄)","Depth of discharge (0.5 lead-acid; 0.8 LiFePO₄)"],.8]],
  f:v=>[[["Panel minimal (dengan rugi-rugi ±25%)","Minimum panel (with ±25% losses)"],fmt(v.wh/(v.psh*.75),0)+" Wp"],[["Kapasitas baterai","Battery capacity"],fmt(v.wh*v.d/(v.vb*v.dod),0)+" Ah"]],
  n:["Hitung Wh = daya alat (W) × jam pakai. Tambahkan cadangan 20–30% dan pastikan kabel serta sekring sesuai arus.","Wh = device watts × hours used. Add a 20–30% margin and size cables and fuses for the current."],
  r:"DIY Source, Off-Grid Solar Power for Beginners"},
 {id:"fert",t:["Takaran pupuk dari kebutuhan nitrogen","Fertiliser dose from nitrogen need"],
  inp:[["n",["Kadar N pada pupuk (%; urea 46, ZA 21, NPK 15-15-15 → 15)","Fertiliser N (%; urea 46, ammonium sulphate 21, 15-15-15 → 15)"],46],["dose",["Dosis N (gram per m²)","N dose (g per m²)"],5],["a",["Luas lahan (m²)","Area (m²)"],10]],
  f:v=>[[["Pupuk yang ditabur","Fertiliser to apply"],fmt(v.dose*v.a/(v.n/100),0)+" g"]],
  n:["Pavlis: uji tanah dulu dan jangan memupuk berlebihan; kelebihan N terbuang ke air dan memicu ledakan alga. Bagi dosis menjadi beberapa kali tabur.","Pavlis: test soil first and don't over-fertilise; excess N leaches into water and feeds algal blooms. Split the dose into several applications."],
  r:"Pavlis, Soil Science for Gardeners"}];
function calcView(){const x=X();let h=`<section class="card"><h2>${esc(x.tCalc[0])}</h2><p class="muted small">${esc(x.disc)}</p></section>`;
 h+=CALCS.map(c=>`<section class="card calc" data-c="${c.id}"><h2>${esc(tt(c.t))}</h2><div class="cgrid">${c.inp.map(i=>`<label class="cin"><span class="small">${esc(tt(i[1]))}</span><input type="number" step="any" inputmode="decimal" data-k="${i[0]}" value="${i[2]}"></label>`).join("")}</div><div class="cres" role="status"></div><p class="small muted">${esc(tt(c.n))}</p><p class="small muted">${esc(x.ref)}: ${esc(c.r)}</p></section>`).join("");return h}
function bindCalc(){document.querySelectorAll(".calc").forEach(s=>{const c=CALCS.find(k=>k.id===s.dataset.c);const run=()=>{const v={};s.querySelectorAll("input").forEach(i=>v[i.dataset.k]=parseFloat(String(i.value).replace(",","."))||0);
  s.querySelector(".cres").innerHTML=`<table class="tbl"><tbody>${c.f(v).map(r=>`<tr><td>${esc(tt(r[0]))}</td><td class="n"><b>${esc(r[1])}</b></td></tr>`).join("")}</tbody></table>`};s.querySelectorAll("input").forEach(i=>i.oninput=run);run()})}

/* ---------- AMAN ATAU BUANG ---------- */
/* node: {q:[id,en], o:[[label, next]]} ; leaf: {r:"ok|warn|bad", t:[id,en]} */
const SAFE=[
 {id:"left",t:["Lauk/nasi tertinggal di suhu ruang","Food left at room temperature"],src:"Marianski (zona bahaya 4–60 °C); pedoman umum keamanan pangan",
  n:{q:["Berapa lama makanan matang itu dibiarkan di luar kulkas?","How long has the cooked food been out of the fridge?"],o:[
   [["Kurang dari 2 jam","Under 2 hours"],{r:"ok",t:["Masih aman. Dinginkan sekarang dalam wadah dangkal agar cepat dingin, lalu panaskan sampai benar-benar panas sebelum dimakan.","Still safe. Refrigerate now in shallow containers so it cools fast, and reheat until steaming hot."]}],
   [["2–4 jam","2–4 hours"],{q:["Apakah ruangan sangat panas (di atas ±32 °C, mis. di mobil atau dapur terik)?","Was it very hot (above ±32 °C, e.g. in a car or hot kitchen)?"],o:[
     [["Ya","Yes"],{r:"bad",t:["Buang. Di atas 32 °C batasnya hanya 1 jam. Racun bakteri seperti Bacillus cereus (nasi) dan S. aureus tahan panas, jadi dipanaskan ulang pun tidak aman.","Throw it out. Above 32 °C the limit is only 1 hour. Toxins from Bacillus cereus (rice) and S. aureus are heat-stable, so reheating doesn't make it safe."]}],
     [["Tidak","No"],{r:"warn",t:["Habiskan sekarang setelah dipanaskan sampai mendidih/panas merata; jangan disimpan lagi. Untuk anak kecil, ibu hamil, lansia, atau orang sakit: lebih baik dibuang.","Eat it now, reheated until steaming throughout; don't store it again. For young children, pregnant women, the elderly or the ill: better to discard."]}]]}],
   [["Lebih dari 4 jam / tidak tahu","Over 4 hours / not sure"],{r:"bad",t:["Buang. Bau dan rupa bukan petunjuk: patogen biasanya tidak mengubah bau. Dari 10 bakteri, 6 jam di suhu hangat bisa menjadi jutaan.","Throw it out. Smell and look are no guide: pathogens usually don't change smell. 10 bacteria can become millions in 6 warm hours."]}]]}},
 {id:"power",t:["Listrik padam / kulkas mati","Power cut / fridge off"],src:"Pedoman umum keamanan pangan; Marianski",
  n:{q:["Bagian mana yang ingin dicek?","Which part are you checking?"],o:[
   [["Kulkas (chiller)","Fridge"],{q:["Sudah berapa lama mati, dan pintu jarang dibuka?","How long has it been off, with the door mostly shut?"],o:[
     [["Kurang dari 4 jam","Under 4 hours"],{r:"ok",t:["Umumnya aman. Jangan buka-buka pintu. Setelah menyala, pastikan suhu kembali ≤ 4 °C.","Generally safe. Keep the door shut. Once back on, check it returns to ≤ 4 °C."]}],
     [["Lebih dari 4 jam","Over 4 hours"],{r:"bad",t:["Buang daging, ayam, ikan, susu, santan, lauk matang, nasi, dan makanan sisa yang sudah lebih dari 2 jam di atas 5 °C. Sayur/buah utuh, mentega, selai, kecap, dan saus botol umumnya masih boleh.","Discard meat, poultry, fish, milk, coconut milk, cooked dishes, rice and leftovers held above 5 °C for over 2 hours. Whole fruit/veg, butter, jam, soy sauce and bottled sauces are usually fine."]}]]}],
   [["Freezer","Freezer"],{q:["Apakah makanan masih ada kristal es atau terasa sedingin kulkas (≤ 4 °C)?","Does food still have ice crystals or feel fridge-cold (≤ 4 °C)?"],o:[
     [["Ya","Yes"],{r:"ok",t:["Boleh dibekukan ulang, walau tekstur bisa turun. Freezer penuh bertahan ±48 jam, setengah penuh ±24 jam bila pintu tertutup.","It can be refrozen, though texture may suffer. A full freezer holds ±48 hours, half-full ±24 hours with the door shut."]}],
     [["Tidak, sudah cair & hangat","No, thawed and warm"],{r:"bad",t:["Daging, ikan, dan olahan beku yang sudah cair lebih dari 2 jam di atas 5 °C sebaiknya dibuang.","Meat, fish and frozen dishes thawed and above 5 °C for over 2 hours should be discarded."]}]]}]]}},
 {id:"mould",t:["Ada jamur di makanan","Mould on food"],src:"Katz (Wild Fermentation); Ruhlman & Polcyn (Salumi); pedoman umum",
  n:{q:["Jamurnya ada di makanan apa?","What food has the mould?"],o:[
   [["Makanan lunak/basah: roti, nasi, lauk, selai, buah lunak, yoghurt","Soft/moist food: bread, rice, dishes, jam, soft fruit, yoghurt"],{r:"bad",t:["Buang semuanya. Akar jamur (miselium) menyebar jauh di bawah permukaan dan sebagian jamur membuat racun (mikotoksin). Jangan dicium dalam-dalam.","Throw it all out. Mould roots (mycelium) spread well below the surface and some moulds make toxins (mycotoxins). Don't sniff it closely."]}],
   [["Makanan keras: keju keras, wortel, kol","Hard food: hard cheese, carrots, cabbage"],{r:"warn",t:["Potong sedikitnya 2–3 cm di sekitar dan di bawah bercak, jangan sampai pisau menyentuh jamur. Bila jamurnya luas, buang.","Cut off at least 2–3 cm around and below the spot, keeping the knife out of the mould. If it's widespread, discard."]}],
   [["Asinan/sayur fermentasi atau kombucha","Fermented vegetables or kombucha"],{q:["Seperti apa lapisannya?","What does the growth look like?"],o:[
     [["Lapisan tipis putih/krem, rata","Thin, flat white/cream film"],{r:"ok",t:["Biasanya ragi permukaan (kahm). Buang lapisan beserta sayur atas yang lunak; isi di bawah cairan umumnya aman. Pastikan sayur tetap terendam.","Usually surface yeast (kahm). Remove it with any soft top layer; what's under the brine is usually fine. Keep vegetables submerged."]}],
     [["Berbulu, berwarna (hijau, biru, hitam, merah muda)","Fuzzy or coloured (green, blue, black, pink)"],{r:"bad",t:["Buang seluruh isi wadah. Cuci wadah dengan sabun dan air panas sebelum dipakai lagi.","Discard the whole batch. Wash the vessel with soap and hot water before reuse."]}]]}],
   [["Salami/daging kering","Salami/dried meat"],{r:"warn",t:["Jamur putih seperti tepung biasanya jamur baik. Jamur hijau, kuning, hitam, atau berbulu: lap dengan cuka; bila menembus ke dalam, buang.","White, floury mould is usually beneficial. Green, yellow, black or fuzzy: wipe with vinegar; if it has penetrated inside, discard."]}]]}},
 {id:"can",t:["Kaleng/botol menggembung atau aneh","Bulging or odd can/jar"],src:"Ruhlman & Polcyn; Marianski (botulisme, pH 4,6)",
  n:{q:["Apa yang terlihat?","What do you see?"],o:[
   [["Tutup/kaleng menggembung, bocor, menyembur saat dibuka, cairan keruh/berbusa, atau bau aneh","Lid/can bulging, leaking, spurting on opening, cloudy/foamy liquid or odd smell"],{r:"bad",t:["Buang tanpa dicicipi, termasuk sambal botol, ikan/daging kaleng, dan bumbu dalam minyak. Bungkus rapat sebelum dibuang dan cuci tangan; racun botulinum bisa mematikan dalam jumlah sangat kecil.","Discard without tasting, including bottled sambal, canned fish/meat and herbs in oil. Wrap it tightly before binning and wash hands; botulinum toxin can kill in tiny amounts."]}],
   [["Penyok kecil, bukan di sambungan, tidak berkarat","Small dent, not on a seam, no rust"],{r:"ok",t:["Umumnya aman. Penyok tajam di sambungan atau bibir kaleng, atau karat dalam: buang.","Generally safe. A sharp dent on the seam or rim, or deep rust: discard."]}],
   [["Produk buatan sendiri (sambal, bawang putih dalam minyak, rendang) disimpan di suhu ruang","Homemade product (sambal, garlic in oil, rendang) kept at room temperature"],{r:"warn",t:["Makanan berasam rendah (pH > 4,6) yang ditutup rapat tanpa proses suhu tinggi (±116 °C, panci presto) berisiko botulisme. Simpan di kulkas dan habiskan dalam beberapa hari, atau asamkan resepnya.","Low-acid food (pH > 4.6) sealed without high-temperature processing (±116 °C, pressure canner) risks botulism. Refrigerate and use within days, or acidify the recipe."]}]]}},
 {id:"ferm",t:["Minuman fermentasi buatan sendiri","Homemade fermented drink"],src:"Richardson; Katz",
  n:{q:["Bagaimana kondisinya?","What's it like?"],o:[
   [["Asam segar seperti cuka/buah, sedikit bersoda, ada lapisan kenyal (SCOBY)","Pleasantly sour like vinegar/fruit, lightly fizzy, rubbery disc (SCOBY)"],{r:"ok",t:["Normal. Simpan dingin dan buka tutup botol berkala agar tekanan tidak berlebih.","Normal. Keep it cold and burp bottles regularly so pressure doesn't build."]}],
   [["Menyembur hebat saat dibuka","Gushes violently when opened"],{r:"warn",t:["Tanda gula berlebih atau kontaminasi. Bila juga berbau aneh, buang. Kurangi gula untuk karbonasi dan pakai botol yang tahan tekanan.","A sign of excess sugar or contamination. If it also smells off, discard. Use less priming sugar and pressure-rated bottles."]}],
   [["Jamur berbulu/berwarna atau bau busuk/aneh","Fuzzy/coloured mould or a rotten/odd smell"],{r:"bad",t:["Buang beserta SCOBY-nya, cuci wadah, dan mulai lagi dengan alat yang disanitasi.","Discard with the SCOBY, wash the vessel and restart with sanitised equipment."]}]]}},
 {id:"thaw",t:["Daging/ayam beku dicairkan","Thawed meat/chicken"],src:"Marianski; pedoman umum",
  n:{q:["Bagaimana cara mencairkannya?","How was it thawed?"],o:[
   [["Di dalam kulkas","In the fridge"],{r:"ok",t:["Paling aman. Masak dalam 1–2 hari; boleh dibekukan ulang sebelum dimasak.","Safest. Cook within 1–2 days; it can be refrozen before cooking."]}],
   [["Direndam air dingin / microwave","In cold water / microwave"],{r:"warn",t:["Masak segera setelah cair. Jangan dibekukan ulang dalam keadaan mentah.","Cook right after thawing. Don't refreeze it raw."]}],
   [["Dibiarkan di meja dapur","Left on the counter"],{q:["Berapa lama?","For how long?"],o:[
     [["Kurang dari 2 jam","Under 2 hours"],{r:"warn",t:["Masak segera sampai matang sempurna (ayam dan daging giling sampai ±72 °C di bagian tengah).","Cook at once, thoroughly (chicken and minced meat to ±72 °C at the centre)."]}],
     [["Lebih dari 2 jam","Over 2 hours"],{r:"bad",t:["Lebih aman dibuang. Permukaan daging sudah lama di zona bahaya walau bagian tengahnya masih beku.","Safer to discard. The surface sat in the danger zone even if the centre was still frozen."]}]]}]]}}];
let SAFEST=null;
function safeView(){const x=X();
 if(!SAFEST)return `<section class="card"><h2>${esc(x.tSafe[0])}</h2><p class="muted small">${esc(x.disc)}</p><div class="grid modes">${SAFE.map(s=>`<button class="btn mode" data-sf="${s.id}"><b>${esc(tt(s.t))}</b></button>`).join("")}</div></section>`;
 const s=SAFE.find(k=>k.id===SAFEST.id);let node=s.n;SAFEST.path.forEach(i=>node=node.o[i][1]);
 let h=`<section class="card"><h2>${esc(tt(s.t))}</h2>`;
 if(SAFEST.path.length){let nd=s.n;h+=`<ol class="small muted">${SAFEST.path.map(i=>{const li=`<li>${esc(tt(nd.q))} → <b>${esc(tt(nd.o[i][0]))}</b></li>`;nd=nd.o[i][1];return li}).join("")}</ol>`}
 if(node.q)h+=`<p class="qtext">${esc(tt(node.q))}</p><div class="opts">${node.o.map((o,i)=>`<button class="opt" data-sp="${i}"><span>${esc(tt(o[0]))}</span></button>`).join("")}</div>`;
 else{const lab={ok:LANG==="id"?"Aman":"Keep",warn:LANG==="id"?"Hati-hati":"Caution",bad:LANG==="id"?"Buang":"Toss"}[node.r];const cls={ok:"ok",warn:"",bad:"bad"}[node.r];
  h+=`<div class="opt ${cls}" style="cursor:default;flex-direction:column;gap:6px" role="status"><b style="font-size:1.1rem">${node.r==="ok"?"✓":node.r==="bad"?"✕":"!"} ${esc(lab)}</b><span>${esc(tt(node.t).replace(/^(Buang|Throw it out)\.\s*/,""))}</span></div>`}
 h+=`<p class="small muted" style="margin-top:12px">${esc(x.ref)}: ${esc(s.src)}. ${esc(x.disc)}</p><div class="row"><button class="btn" id="sfRe">${esc(x.start)}</button><button class="btn" id="sfList">${esc(x.tSafe[0])}</button></div></section>`;return h}
function bindSafe(){document.querySelectorAll("[data-sf]").forEach(b=>b.onclick=()=>{SAFEST={id:b.dataset.sf,path:[]};renderTool("safe")});
 document.querySelectorAll("[data-sp]").forEach(b=>b.onclick=()=>{SAFEST.path.push(+b.dataset.sp);renderTool("safe")});
 if($("#sfRe"))$("#sfRe").onclick=()=>{SAFEST.path=[];renderTool("safe")};if($("#sfList"))$("#sfList").onclick=()=>{SAFEST=null;renderTool("safe")}}

/* ---------- CEK FAKTA ---------- */
let FACT={ch:"",s:"",n:30};
function factText(q){const li=LI(),x=X();return `❓ ${q.q[li]}\n✅ ${q.o[0][li]}\n${q.x[li]}\n📚 ${refTxt(q)||chName(q.b)}`}
function factView(){const x=X(),li=LI();const all=QMYTH();const chs=[...new Set(all.map(q=>q.b))].sort((a,b)=>CHI[a]-CHI[b]);
 const s=FACT.s.trim().toLowerCase();const list=all.filter(q=>(!FACT.ch||q.b===FACT.ch)&&(!s||(q.q[li]+" "+q.x[li]+" "+q.o[0][li]).toLowerCase().includes(s)));
 let h=`<section class="card"><h2>${esc(x.tFact[0])}</h2><div class="row" style="margin-bottom:8px"><input type="search" id="fS" placeholder="${esc(x.factSearch)}" value="${esc(FACT.s)}" style="flex:1 1 200px"><select id="fC"><option value="">${esc(x.factAll)}</option>${chs.map(c=>`<option value="${c}" ${FACT.ch===c?"selected":""}>${esc(chName(c))}</option>`).join("")}</select></div><div class="row"><span class="muted small">${esc(x.factN(list.length))}</span><span class="sp"></span><button class="btn pri sm" id="fQ">${esc(x.factQuiz)}</button></div></section>`;
 h+=`<div id="fL">${list.slice(0,FACT.n).map(q=>`<section class="card"><div class="small muted">${esc(x.claim)} · ${esc(chName(q.b))}</div><p style="margin:4px 0 8px;font-weight:600">${esc(q.q[li])}</p><div class="fb"><b class="okt">${esc(x.fact)}:</b> ${esc(q.o[0][li])}<div style="margin-top:6px">${esc(q.x[li])}</div><div class="ref">${esc(refTxt(q)||chName(q.b))}</div></div><div class="row" style="margin-top:8px"><button class="btn sm" data-fc="${q.id}">${esc(x.share)}</button></div></section>`).join("")}</div>`;
 if(list.length>FACT.n)h+=`<div class="row"><button class="btn" id="fMore">+ ${Math.min(30,list.length-FACT.n)}</button></div>`;
 return h+`<textarea class="cp hidden" id="cpBox3" readonly aria-label="text"></textarea>`}
function bindFact(){const re=()=>{renderTool("fact");const i=$("#fS");if(i){i.focus();i.setSelectionRange(i.value.length,i.value.length)}};
 $("#fS").oninput=e=>{FACT.s=e.target.value;FACT.n=30;clearTimeout(bindFact._t);bindFact._t=setTimeout(re,250)};
 $("#fC").onchange=e=>{FACT.ch=e.target.value;FACT.n=30;renderTool("fact")};
 $("#fQ").onclick=()=>start("mitos:"+(FACT.ch||""));if($("#fMore"))$("#fMore").onclick=()=>{FACT.n+=30;renderTool("fact")};
 document.querySelectorAll("[data-fc]").forEach(b=>b.onclick=()=>copyText(factText(QID[b.dataset.fc]),$("#cpBox3")))}

/* ---------- JALUR UMKM ---------- */
const UMKM=[
 {id:"u1",t:["1. Dasar keamanan pangan","1. Food-safety basics"],ch:["awet","pangan","gizi","kimpan"],
  p:[["Zona bahaya 4–60 °C: lauk matang maksimal 2 jam di suhu ruang (1 jam bila sangat panas).","Danger zone 4–60 °C: cooked food at most 2 hours at room temperature (1 hour if very hot)."],["Pagar berlapis (hurdle): garam, asam (pH), kering (aw), suhu, pengawet, kebersihan. Satu pagar jarang cukup.","Hurdles: salt, acid (pH), dryness (aw), temperature, preservatives, hygiene. One is rarely enough."],["pH ≤ 4,6 atau aw ≤ 0,85 masing-masing sudah menghambat bakteri berbahaya. Ukur dengan kertas pH; aw dengan alat atau uji laboratorium.","pH ≤ 4.6 or aw ≤ 0.85 each hold back dangerous bacteria. Check pH with strips; aw with a meter or a lab test."],["Racun bakteri (B. cereus, S. aureus) tahan panas: memanaskan ulang makanan basi tidak menyelamatkannya.","Bacterial toxins (B. cereus, S. aureus) survive heat: reheating spoiled food doesn't rescue it."]]},
 {id:"u2",t:["2. Produk botol, kaleng & beku","2. Bottled, canned & frozen products"],ch:["awet","pangan","rasa"],
  p:[["Sambal botol, bumbu dalam minyak, dan lauk kaleng berasam rendah butuh pengasaman (pH ≤ 4,6) atau proses ±116 °C; kalau tidak, wajib simpan dingin.","Bottled sambal, herbs in oil and low-acid canned dishes need acidification (pH ≤ 4.6) or ±116 °C processing; otherwise they must be refrigerated."],["Frozen food: bekukan cepat, jaga −18 °C, jangan cairkan lalu bekukan ulang di tingkat penjual.","Frozen food: freeze fast, hold at −18 °C, never thaw-and-refreeze along the chain."],["Timbang garam dan pengawet (nitrit, benzoat) sesuai batas; pakai timbangan digital, bukan sendok.","Weigh salt and preservatives (nitrite, benzoate) to the limits; use a digital scale, not spoons."]]},
 {id:"u3",t:["3. Minuman & fermentasi","3. Drinks & ferments"],ch:["fermen","minuman","eksper","kakao"],
  p:[["Kombucha/tepache: tutup kain saat fermentasi, botol tahan tekanan saat karbonasi, simpan dingin; alkohol bisa naik bila hangat atau diberi gula lagi.","Kombucha/tepache: cloth cover while fermenting, pressure-rated bottles for carbonation, keep cold; alcohol rises if warm or re-sugared."],["Sanitasi semua alat yang menyentuh cairan bergula sebelum ragi bekerja.","Sanitise everything touching sugary liquid before the yeast takes hold."],["Tanda buang: jamur berwarna/berbulu, bau busuk, menyembur hebat.","Toss if: coloured/fuzzy mould, foul smell, violent gushing."]]},
 {id:"u4",t:["4. Umur simpan, rasa & kemasan","4. Shelf life, flavour & packaging"],ch:["rasa","kopi","kimpan","roti"],
  p:[["Oksigen, cahaya, panas, dan kelembapan adalah musuh rasa: kemasan kedap, gelap, dan sejuk memperpanjang umur.","Oxygen, light, heat and moisture ruin flavour: airtight, dark, cool packs extend life."],["Kopi bubuk lebih cepat basi daripada biji; susu di botol bening rusak oleh cahaya.","Ground coffee stales faster than beans; milk in clear bottles is damaged by light."],["Uji umur simpan sederhana: simpan sampel di suhu jual, cicipi dan catat berkala.","Simple shelf-life test: keep samples at selling temperature, taste and log regularly."]]},
 {id:"u5",t:["5. Kebersihan dapur produksi","5. Production-kitchen hygiene"],ch:["bersih","mikro"],
  p:[["Bersihkan dulu (sabun, gosok) baru disinfeksi; disinfektan tidak menembus kotoran.","Clean first (soap, scrubbing), then disinfect; disinfectant can't penetrate dirt."],["Pemutih diencerkan dengan air dingin, dibuat baru setiap hari, jangan dicampur asam atau amonia.","Dilute bleach in cold water, make it fresh daily, never mix with acid or ammonia."],["Cuci tangan dan sarung tangan: S. aureus berasal dari tangan, hidung, dan tenggorokan pekerja.","Handwashing and gloves: S. aureus comes from workers' hands, noses and throats."]]},
 {id:"u6",t:["6. Kosmetik & sabun rumahan","6. Homemade cosmetics & soap"],ch:["kosmetik","kulit","rawat"],
  p:[["Produk berbasis air butuh pengawet yang tepat; 'alami' tidak otomatis aman.","Water-based products need proper preservatives; 'natural' isn't automatically safe."],["Cantumkan bahan (INCI), tanggal, dan masa pakai setelah dibuka (PAO).","List ingredients (INCI), dates and period-after-opening (PAO)."],["Produk kosmetik yang diedarkan wajib notifikasi BPOM.","Cosmetics on sale need BPOM notification."]]},
 {id:"u7",t:["7. Kompos, pupuk & pertanian kecil","7. Compost, fertiliser & small farming"],ch:["tanah","kompos"],
  p:[["Uji tanah sebelum memupuk; kelebihan pupuk mencemari air.","Test soil before fertilising; excess fertiliser pollutes water."],["Kompos matang: tidak panas, berbau tanah, bahan asal tak dikenali lagi.","Mature compost: no longer hot, smells earthy, original materials unrecognisable."]]}];
function umkmView(){const x=X();let h=`<section class="card"><h2>${esc(x.tUmkm[0])}</h2><p class="muted small">${esc(LANG==="id"?"Untuk usaha rumahan: izin edar pangan olahan rumahan (SPP-IRT) dan sertifikasi halal kini diurus lewat sistem daring pemerintah (OSS, SIHALAL; usaha mikro bisa jalur self-declare). Cek ketentuan terbaru di Dinkes/BPOM/BPJPH setempat.":"For home producers: home-food permits (SPP-IRT) and halal certification are now handled online (OSS, SIHALAL; micro businesses can self-declare). Check current rules with local health/BPOM/BPJPH offices.")} ${esc(x.disc)}</p></section>`;
 h+=UMKM.map(m=>{const n=umkmPool(m.id).length;return `<section class="card"><h2>${esc(tt(m.t))}</h2><ul class="mini small">${m.p.map(p=>`<li>${esc(tt(p))}</li>`).join("")}</ul><div class="row"><span class="muted small">${esc(x.umkmN(n))}</span><span class="sp"></span><button class="btn pri sm" data-um="${m.id}" ${n?"":"disabled"}>${esc(x.umkmQuiz)}</button></div></section>`}).join("");return h}
function umkmPool(id){const m=UMKM.find(k=>k.id===id);if(!m)return [];return QM.filter(q=>m.ch.includes(q.b)&&["praktik","mitos","tubuh","material","guna"].includes(q.a))}
function bindUmkm(){document.querySelectorAll("[data-um]").forEach(b=>b.onclick=()=>start("umkm:"+b.dataset.um))}

/* ---------- view router + menu card ---------- */
function renderTool(v){const x=X();let body="";
 if(v==="calc")body=calcView();else if(v==="safe")body=safeView();else if(v==="fact")body=factView();else body=umkmView();
 $("#app").innerHTML=header()+`<div class="row" style="margin-bottom:12px"><button class="btn" id="tBack">${esc(x.back)}</button></div>`+body+`<div class="row"><button class="btn" id="tBack2">${esc(x.back)}</button></div>`;
 bindLang(()=>renderTool(v));$("#tBack").onclick=$("#tBack2").onclick=()=>{renderMenu()};
 if(v==="calc")bindCalc();else if(v==="safe")bindSafe();else if(v==="fact")bindFact();else bindUmkm();
 if(!(v==="fact"&&document.activeElement&&document.activeElement.id==="fS"))window.scrollTo({top:0})}
function toolCard(){const x=X();const b=(k,v)=>`<button class="btn mode" data-tool="${v}"><b>${esc(x[k][0])}</b><span>${esc(x[k][1])}</span></button>`;
 return `<section class="card"><h2>${esc(x.toolT)}</h2><p class="muted small" style="margin-top:-4px">${esc(x.toolD)}</p><div class="grid modes">${b("tCalc","calc")}${b("tSafe","safe")}${b("tFact","fact")}${b("tUmkm","umkm")}</div></section>`}
function bindTools(){document.querySelectorAll("[data-tool]").forEach(b=>b.onclick=()=>{if(b.dataset.tool==="safe")SAFEST=null;renderTool(b.dataset.tool)})}
const _pool=pool;pool=function(m){const [k,arg]=m.split(":");if(k==="mitos")return novOrder(QMYTH().filter(q=>!arg||q.b===arg)).map(q=>q.id);if(k==="umkm")return novOrder(umkmPool(arg)).map(q=>q.id);return _pool(m)};
const _modeName=modeName;modeName=function(m){const [k,arg]=m.split(":");if(k==="umkm"){const u=UMKM.find(x=>x.id===arg);return L().m_umkm[0]+(u?": "+tt(u.t):"")}if(k==="mitos"&&!arg)return L().m_mitos[0];return _modeName(m)};

/* ---------- DI RUMAHMU (kartu unsur) ---------- */
const HOME={
 H:["Air (H₂O), gula, lemak, dan hampir semua makanan; hidrogen peroksida untuk luka dan pemutih oksigen.","Water (H₂O), sugars, fats and nearly all food; hydrogen peroxide for wounds and oxygen bleach."],
 C:["Arang aktif, gula dan pati, plastik, deterjen, kopi; CO₂ di soda dan fermentasi.","Activated charcoal, sugar and starch, plastics, detergents, coffee; CO₂ in soda and ferments."],
 N:["Protein, pupuk urea/ZA, garam nitrit pengawet daging, amonia pembersih, gas N₂O tabung krim kocok.","Protein, urea fertiliser, nitrite curing salt, ammonia cleaners, N₂O whipped-cream chargers."],
 O:["Oksigen yang membuat minyak tengik dan kopi basi; pemutih oksigen (perkarbonat); air.","Oxygen that turns oil rancid and coffee stale; oxygen bleach (percarbonate); water."],
 F:["Fluorida pasta gigi; lapisan antilengket (PTFE) pada wajan.","Fluoride toothpaste; non-stick (PTFE) pan coatings."],
 Na:["Garam dapur, baking soda, natrium benzoat (pengawet), MSG, sabun.","Table salt, baking soda, sodium benzoate preservative, MSG, soap."],
 Mg:["Garam Inggris (MgSO₄), klorofil sayur hijau, kesadahan air sumur.","Epsom salt (MgSO₄), chlorophyll in greens, well-water hardness."],
 Al:["Panci dan foil aluminium, tawas penjernih air, antiperspiran.","Aluminium pans and foil, alum water clarifier, antiperspirants."],
 Si:["Silika gel penyerap lembap, kaca, pasir, panel surya.","Silica-gel desiccants, glass, sand, solar panels."],
 P:["Fosfat di deterjen, pupuk, tulang dan gigi, minuman cola.","Phosphates in detergents, fertiliser, bones and teeth, cola drinks."],
 S:["Bau bawang putih dan telur busuk, aroma kopi (furfuriltiol), SLS di sampo, sulfit pengawet.","Garlic and rotten-egg smells, coffee aroma (furfurylthiol), SLS in shampoo, sulphite preservatives."],
 Cl:["Garam dapur (NaCl), kaporit dan pemutih (hipoklorit), pipa PVC.","Table salt (NaCl), chlorinated water and bleach (hypochlorite), PVC pipes."],
 K:["Pupuk KCl, pisang dan kelapa, garam rendah natrium, sabun cair (KOH).","KCl fertiliser, bananas and coconut, low-sodium salt, liquid soap (KOH)."],
 Ca:["Kapur sirih, cangkang telur, tulang, kerak ketel, susu dan tahu (kalsium sulfat).","Betel lime, eggshells, bones, kettle scale, milk and tofu (calcium sulphate)."],
 Ti:["Titanium dioksida di tabir surya mineral, cat putih, pasta gigi.","Titanium dioxide in mineral sunscreen, white paint, toothpaste."],
 Fe:["Wajan besi, darah (hemoglobin), sayur hijau dan hati, karat, oksida besi di bedak dan alas bedak.","Cast-iron pans, blood (haemoglobin), greens and liver, rust, iron oxides in face powder."],
 Cu:["Kabel listrik, pipa, panci tembaga, mineral penting di hati dan kacang.","Electrical wiring, pipes, copper pans, an essential mineral in liver and nuts."],
 Zn:["Seng oksida tabir surya dan salep ruam popok, atap seng (galvanis), tablet seng untuk diare anak.","Zinc oxide sunscreen and nappy cream, galvanised roofing, zinc tablets for child diarrhoea."],
 Br:["Penghambat api pada elektronik dan busa kasur.","Flame retardants in electronics and mattress foam."],
 Ag:["Perhiasan perak, plester luka berion perak, pelapis antibakteri.","Silver jewellery, silver-ion wound dressings, antibacterial coatings."],
 Sn:["Kaleng makanan (pelat timah), solder.","Food tins (tinplate), solder."],
 I:["Garam beryodium pencegah gondok (GAKY), povidon-iodin antiseptik.","Iodised salt against goitre, povidone-iodine antiseptic."],
 W:["Filamen bohlam pijar lama, mata bor.","Old incandescent filaments, drill bits."],
 Hg:["Termometer dan lampu hemat energi (CFL) lama, krim pemutih ilegal, tambal gigi amalgam.","Old thermometers and CFL bulbs, illegal whitening creams, amalgam fillings."],
 Pb:["Cat lama, glasir keramik tertentu, aki basah; hindari wadah berglasir mencolok untuk fermentasi asam.","Old paint, some ceramic glazes, lead-acid batteries; avoid bright-glazed crocks for acidic ferments."],
 Li:["Baterai ponsel, laptop, dan motor listrik; jangan dibuang ke sampah biasa.","Phone, laptop and e-scooter batteries; don't put them in household rubbish."],
 Ne:["Lampu neon reklame berwarna merah-jingga.","Red-orange advertising neon signs."],
 Ar:["Gas pengisi bohlam dan jendela kaca ganda.","Fill gas in bulbs and double-glazed windows."]};
const _renderEl=renderEl;renderEl=function(){_renderEl();const s=ELCUR,h=HOME[s],x=X();const np=Q.filter(q=>q.u.includes(s)&&(q.a==="praktik"||q.a==="mitos")).length;
 if(!h&&!np)return;const at=$("#elBody .eluse");if(!at)return;
 const div=document.createElement("div");div.innerHTML=`<h4>🏠 ${esc(x.home)}</h4>${h?`<p class="eluse">${esc(h[LI()])}</p>`:""}${np?`<p class="muted small">${esc(x.homePrak(np))}</p>`:""}`;
 at.insertAdjacentElement("afterend",div)};
