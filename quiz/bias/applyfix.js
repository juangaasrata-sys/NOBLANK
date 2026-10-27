// usage: node applyfix.js page.html fix1.jsonl [fix2.jsonl ...]
// each line: {"id":"abc1234","c":["ID","EN"]} and/or "d":{"1":["ID","EN"],...}  (option index 1-3)
const fs=require("fs");const F=process.argv[2];
const L=fs.readFileSync(F,"utf8").split("\n");const qi=L.findIndex(l=>l.startsWith("const QDATA="));
const line=L[qi],end=line.lastIndexOf("]")+1;const Q=JSON.parse(line.slice(12,end));const by={};Q.forEach(r=>by[r[0]]=r);
let n=0,still=[],bad=0;const ids=new Set();
for(const f of process.argv.slice(3))for(const ln of fs.readFileSync(f,"utf8").split("\n")){if(!ln.trim())continue;let p;try{p=JSON.parse(ln)}catch(e){console.log("JSON",f,ln.slice(0,80));bad++;continue}
 const r=by[p.id];if(!r){console.log("noid",p.id);bad++;continue}
 if(p.c){if(p.c.length!==2||!p.c[0]||!p.c[1]){console.log("badc",p.id);bad++;continue}r[7][0]=p.c}
 if(p.d)for(const k in p.d){const i=+k;if(i<1||i>3||p.d[k].length!==2){console.log("badd",p.id);bad++;continue}r[7][i]=p.d[k]}
 if(new Set(r[7].map(o=>o[0])).size!==4){console.log("dupopt",p.id);bad++}
 n++;ids.add(p.id)}
for(const id of ids){const l=by[id][7].map(o=>o[0].length);if(l[0]-Math.max(l[1],l[2],l[3])>=4)still.push(id+":"+l.join(","))}
L[qi]="const QDATA="+JSON.stringify(Q)+line.slice(end);if(!bad)fs.writeFileSync(F,L.join("\n"));
let lo=0,ra=0;for(const r of Q){const l=r[7].map(o=>o[0].length);if(l[0]===Math.max(...l))lo++;ra+=l[0]/((l[1]+l[2]+l[3])/3)}
console.log("patched",n,"errors",bad,"still-long",still.length,still.join(" "));
console.log("bank: correct-longest",(lo/Q.length*100).toFixed(0)+"%","ratio",(ra/Q.length).toFixed(2));
