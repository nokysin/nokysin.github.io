!function(e){var n={};function r(t){if(n[t])return n[t].exports;var o=n[t]={i:t,l:!1,exports:{}};return e[t].call(o.exports,o,o.exports,r),o.l=!0,o.exports}r.m=e,r.c=n,r.d=function(e,n,t){r.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:t})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,n){if(1&n&&(e=r(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(r.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var o in e)r.d(t,o,function(n){return e[n]}.bind(null,o));return t},r.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(n,"a",n),n},r.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},r.p="",r(r.s=0)}([function(e,n,r){"use strict";r.r(n);const t={init:()=>{t.elements.loadElements()},templates:{totalTemplate:e=>`<tr>\n                <td>${t.formatter(e)}</td>\n            </tr>`,averageTemplate:(e,n)=>`<tr>\n                <td>${e}</td>\n                <td>${t.formatter(n)}</td>\n            </tr>`},render:{renderAllItems:(e,n,r)=>{t.render.renderTotal(e),t.render.renderAverageByTypeInElement(n,"month",t.elements.averageByMonthTable),t.render.renderAverageByTypeInElement(r,"department",t.elements.averageByDepTable)},renderTotal:e=>{t.elements.totalTable.innerHTML=t.templates.totalTemplate(e)},renderAverageByTypeInElement:(e,n,r)=>{const o=e.reduce((e,r)=>e+t.templates.averageTemplate(r[n],r.average),"");r.innerHTML=o}},elements:{totalTable:"#total tbody",averageByMonthTable:"#averageByMonth tbody",averageByDepTable:"#averageByDep tbody",loadElements:()=>{t.elements.totalTable=document.querySelector(t.elements.totalTable),t.elements.averageByMonthTable=document.querySelector(t.elements.averageByMonthTable),t.elements.averageByDepTable=document.querySelector(t.elements.averageByDepTable)}},formatter:e=>Intl.NumberFormat("ua-UA").format(e)},o=(e,n)=>e.reduce((e,r)=>e+Number(r[n]),0).toFixed(2),a=(e,n)=>{let r={};return e.forEach(e=>{const t=e[n];-1==Object.keys(r).indexOf(t)&&(r[t]=[]),r[t].push(e)}),r},l=(e,n)=>{const r=e.length;return(o(e,n)/r).toFixed(2)},i=(e,n)=>{let r=[];for(let t in e)r.push({[n]:t,average:l(e[t],"amount")});return r},s="MONTH,DEPARTMENT,EMPLOYEE,AMOUNT\n  2018-01,Legals,Smith A.,14289.66\n  2018-01,Legals,Jonson B.,7408.05\n  2018-01,Legals,Lee C.,10102.98\n  2018-01,Legals,Janaro R.,8127.94\n  2018-01,Legals,Conor J.,10341.33\n  2018-01,Legals,Conor S.,7010.52\n  2018-02,Legals,Smith A.,9927.47\n  2018-02,Legals,Jonson B.,7053.96\n  2018-02,Legals,Lee C.,7057.36\n  2018-02,Legals,Janaro R.,13043.93\n  2018-02,Legals,Conor J.,12613.82\n  2018-02,Legals,Conor S.,10310.33\n  2018-02,Legals,Travolta J.,10857.58\n  2018-03,Legals,Smith A.,11043.21\n  2018-03,Legals,Jonson B.,5144.06\n  2018-03,Legals,Conor J.,11022.75\n  2018-03,Legals,Conor S.,11651.08\n  2018-03,Legals,Clark A.,7889.03\n  2018-03,Legals,Doyle C.,6490.54\n  2018-01,Compliance,Smith A.,14980.55\n  2018-01,Compliance,Johnson B.,8132.88\n  2018-01,Compliance,Williams C.,5635.36\n  2018-01,Compliance,Jones D.,12454.79\n  2018-01,Compliance,Brown F.,5787.25\n  2018-01,Compliance,Davis G.,8618.50\n  2018-02,Compliance,Smith A.,5093.56\n  2018-02,Compliance,Johnson B.,11625.41\n  2018-02,Compliance,Williams C.,11875.55\n  2018-02,Compliance,Jones D.,10008.70\n  2018-02,Compliance,Brown F.,6291.20\n  2018-02,Compliance,Davis G.,12524.68\n  2018-02,Compliance,Miller H.,11630.42\n  2018-03,Compliance,Johnson B.,5681.83\n  2018-03,Compliance,Williams C.,10941.43\n  2018-03,Compliance,Jones D.,8859.54\n  2018-03,Compliance,Brown F.,6663.98\n  2018-03,Compliance,Davis G.,6988.17\n  2018-03,Compliance,Miller H.,14138.79\n  2018-01,Marketing & Sales,Wilson A.,13200.80\n  2018-01,Marketing & Sales,Moore B.,6145.94\n  2018-01,Marketing & Sales,Taylor C.,8459.98\n  2018-01,Marketing & Sales,Anderson D.,8639.86\n  2018-01,Marketing & Sales,Thomas E.,9384.85\n  2018-01,Marketing & Sales,Jackson F.,7018.11\n  2018-02,Marketing & Sales,White G.,13853.19\n  2018-02,Marketing & Sales,Moore B.,5292.43\n  2018-02,Marketing & Sales,Taylor C.,10465.98\n  2018-02,Marketing & Sales,Anderson D.,5907.43\n  2018-02,Marketing & Sales,Thomas E.,8700.87\n  2018-02,Marketing & Sales,Jackson F.,7444.12\n  2018-02,Marketing & Sales,Miller I.,12142.15\n  2018-03,Marketing & Sales,Moore B.,8600.83\n  2018-03,Marketing & Sales,Taylor C.,5185.76\n  2018-03,Marketing & Sales,Anderson D.,5491.73\n  2018-03,Marketing & Sales,Thomas E.,11236.40\n  2018-03,Marketing & Sales,Jackson F.,12056.60\n  2018-03,Marketing & Sales,Miller I.,6828.36\n  2018-01,Production,Harris A.,10125.18\n  2018-01,Production,Martin B.,5035.75\n  2018-01,Production,Thompson C.,12100.76\n  2018-01,Production,Garcia D.,13739.30\n  2018-01,Production,Martinez E.,9274.72\n  2018-01,Production,Robinson F.,10073.36\n  2018-02,Production,Clark H.,7193.33\n  2018-02,Production,Martin B.,13999.01\n  2018-02,Production,Thompson C.,14287.98\n  2018-02,Production,Garcia D.,8285.04\n  2018-02,Production,Martinez E.,14948.03\n  2018-02,Production,Robinson F.,13104.71\n  2018-02,Production,Driller R.,5443.28\n  2018-03,Production,Martin B.,14379.60\n  2018-03,Production,Thompson C.,13450.47\n  2018-03,Production,Garcia D.,11364.05\n  2018-03,Production,Martinez E.,5548.34\n  2018-03,Production,Robinson F.,10733.07\n  2018-03,Production,Driller R.,13843.69\n  2018-01,Service,King A.,8617.04\n  2018-01,Service,Wright B.,13078.48\n  2018-01,Service,Lopez C.,5150.28\n  2018-01,Service,Hill D.,14136.06\n  2018-01,Service,Scott E.,6731.88\n  2018-01,Service,Green F.,13076.14\n  2018-02,Service,Adams G.,12432.64\n  2018-02,Service,Wright B.,6735.59\n  2018-02,Service,Lopez C.,12947.72\n  2018-02,Service,Hill D.,14863.50\n  2018-02,Service,Scott E.,12849.35\n  2018-02,Service,Green F.,13825.99\n  2018-02,Service,Driller R.,11326.42\n  2018-03,Service,Wright B.,10512.58\n  2018-03,Service,Lopez C.,9330.24\n  2018-03,Service,Hill D.,5373.41\n  2018-03,Service,Scott E.,5327.75\n  2018-03,Service,Green F.,6972.30\n  2018-03,Service,Driller R.,10481.02\n  ".split("\n"),c=(e=>{const n=s[0].split(",").map(e=>e.toLowerCase());return e.map(e=>{let r={};return n.map((n,t)=>{r[n]=e[t]}),r})})(s.map(e=>e.split(",").map(e=>e.trim())).filter(e=>{const n=e[3];return!isNaN(Number(n))})),m=o(c,"amount"),u=i(a(c,"month"),"month"),d=i(a(c,"department"),"department");t.init(),t.render.renderAllItems(m,u,d)}]);