// usage: node inject.js page.html  — adds practical-tools block, CSS and menu hooks (idempotent check)
const fs=require("fs");const F=process.argv[2];let s=fs.readFileSync(F,"utf8");
if(s.includes("ALAT PRAKTIS"))throw "already injected";
const block=fs.readFileSync(__dirname+"/tools.js","utf8");
const css=`.cgrid{display:grid;gap:10px;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));margin-bottom:10px}
.cin{display:flex;flex-direction:column;gap:4px;min-width:0}
input[type=number],input[type=search]{font:inherit;color:var(--ink);min-height:40px;border-radius:8px;border:1px solid var(--line);background:var(--card);padding:6px 10px;width:100%;min-width:0}
input:focus-visible{outline:3px solid var(--acc);outline-offset:1px}
.cres{margin:4px 0 8px}
`;
const rep=(a,b)=>{if(s.split(a).length!==2)throw "not unique: "+a;s=s.replace(a,b)};
rep("footer{color:var(--ink2)",css+"footer{color:var(--ink2)");
rep("h+=thCard()+covCard()","h+=toolCard()+thCard()+covCard()");
rep("bindAna();bindWeak();bindHist();bindExp()}","bindAna();bindWeak();bindHist();bindExp();bindTools()}");
rep("/* ====== BOOT ====== */",block+"\n/* ====== BOOT ====== */");
fs.writeFileSync(F,s);console.log("ok");
