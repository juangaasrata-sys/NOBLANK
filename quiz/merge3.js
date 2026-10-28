// node merge3.js page.html : appends quiz/buku18_qdata.json, adds 6 chapters + 18 BK keys
const fs=require("fs");const F=process.argv[2];const L=fs.readFileSync(F,"utf8").split("\n");
const qi=L.findIndex(l=>l.startsWith("const QDATA="));const line=L[qi];const end=line.lastIndexOf("]")+1;
const Q=JSON.parse(line.slice(12,end));const ids=new Set(Q.map(r=>r[0]));
for(const r of JSON.parse(fs.readFileSync("/home/user/NOBLANK/quiz/buku18_qdata.json"))){if(ids.has(r[0]))throw "dup "+r[0];Q.push(r)}
L[qi]="const QDATA="+JSON.stringify(Q)+line.slice(end);
if(L.some(l=>l.includes('["limbah",')))throw "already merged";
const ei=L.findIndex(l=>l.includes('["rawat",'));
L.splice(ei+1,0,
' ["rumah","Rumah Aman: Listrik, Beton & Panas Kota (Kenn, Schexnayder, Flanagan)","Safe Home: Wiring, Concrete & Urban Heat (Kenn, Schexnayder, Flanagan)","—"],',
' ["p3k","P3K & Cek Klaim Herbal (US Army, Jones)","First Aid & Herbal Claims (US Army, Jones)","—"],',
' ["limbah","Air Limbah, Plastik & Sampah Elektronik (Stephens, Schaub, Kumari)","Sewage, Plastic & E-waste (Stephens, Schaub, Kumari)","—"],',
' ["tambang","Tambang, Air Asam & Tanah Tercemar (Spitz, Tiwari, Bini)","Mining, Acid Drainage & Polluted Soil (Spitz, Tiwari, Bini)","—"],',
' ["warna","Pigmen & Zat Warna (Pfaff, Klöckl)","Pigments & Dyes (Pfaff, Klöckl)","—"],',
' ["organik","Mekanisme Reaksi Organik (Ahluwalia)","Organic Reaction Mechanisms (Ahluwalia)","—"],');
const B={KN:"Joe K. Kenn, Home Electrical Wiring for Renovation and Maintenance (2024)",MJ:"Mary Jones, Herbal Antibiotics (2016)",FA:"US Department of the Army, First Aid Handbook (2017)",SC:"Eve O. Schaub, Year of No Garbage (2023)",SW:"Anna Stephens & Mark Fuller (ed.), Sewage Treatment: Uses, Processes and Impact (2009)",KU:"Abha Kumari, Ashok Pandey & Sang-Hyoun Kim (ed.), Sustainable Technologies for Value Addition to Electronic Waste (2026)",SP:"Karlheinz Spitz & John Trudinger, Mining and the Environment: From Ore to Metal (2008)",TW:"Ashwani Kumar Tiwari, T.N. Singh & Abhay Kumar Singh (ed.), Mining Impact on Soil and Water Resources (2025)",BN:"Claudio Bini, From Soil Contamination to Land Restoration (2010)",FG:"Kylie Flanagan, Climate Resilience (2023)",SX:"Clifford J. Schexnayder dkk., Handbook for Building Construction",AH:"V.K. Ahluwalia & R.K. Parashar, Organic Reaction Mechanisms (2002)",PF:"Gerhard Pfaff, Inorganic Pigments",KL:"Ingo Klöckl, Handbook of Colorants Chemistry",LV:"Primo Levi, The Periodic Table (1975; terj. 1984)",HD:"Abbie Headon, The Periodic Table Illustrated (2025)",RY:"Geoffrey Rayner-Canham, The Periodic Table: Past, Present, and Future (2020)",RU:"James M. Russell, Elementary: The Periodic Table Explained (2019)"};
const bi=L.findIndex(l=>l.startsWith("const BK={"));
L[bi]=L[bi].replace(/\};\s*$/,","+Object.entries(B).map(([k,v])=>k+":"+JSON.stringify([v,v.replace("dkk.","et al.").replace("terj.","trans.")])).join(",")+"};");
if(!L[bi].includes("RU:["))throw "BK fail";
fs.writeFileSync(F,L.join("\n"));console.log("total",Q.length);
