const screen=document.getElementById('screen');
const badge=document.getElementById('badge');
const moneyEl=document.getElementById('money');
const START_MONEY=250;

const cardBank={
 router:{text:'Router',key:'router',kind:'router',icon:'📡',price:150},
 adminRouter:{text:'Admin-Router',key:'adminRouter',kind:'router',icon:'🛡️',price:230},
 roomRouter:{text:'Raum-Router',key:'roomRouter',kind:'router',icon:'📶',price:180},
 guestRouter:{text:'Gäste-Router',key:'guestRouter',kind:'router',icon:'📡',price:180},
 labRouter:{text:'Computerraum-Router',key:'labRouter',kind:'router',icon:'🖧',price:210},

 smartphone:{text:'Smartphone',key:'smartphone',kind:'geraet',icon:'📱',price:100},
 laptop:{text:'Laptop',key:'laptop',kind:'geraet',icon:'💻',price:140},
 printer:{text:'Drucker',key:'printer',kind:'geraet',icon:'🖨️',price:120},
 console:{text:'Spielekonsole',key:'console',kind:'geraet',icon:'🎮',price:160},
 tablet:{text:'Tablet',key:'tablet',kind:'geraet',icon:'📱',price:120},
 tv:{text:'Smart-TV',key:'tv',kind:'geraet',icon:'🖥️',price:150},
 pc:{text:'PC',key:'pc',kind:'geraet',icon:'🖥️',price:130},
 teacherLaptop:{text:'Lehrer-Laptop',key:'teacherLaptop',kind:'geraet',icon:'💼',price:160},

 internet:{text:'Internet',key:'internet',kind:'netz',icon:'🌐',price:160},
 mobile:{text:'Mobilfunknetz',key:'mobile',kind:'netz',icon:'📶',price:120},


 messenger:{text:'Messenger-Server',key:'messenger',kind:'server',icon:'🗄️',price:180},
 cloud:{text:'Cloud-Server',key:'cloud',kind:'server',icon:'☁️',price:180},
 gameServer:{text:'Spielserver',key:'gameServer',kind:'server',icon:'🕹️',price:180},
 schoolServer:{text:'Schulserver',key:'schoolServer',kind:'server',icon:'🏫',price:220},

 faultRouter:{text:'Routerausfall',key:'faultRouter',kind:'stoerung',icon:'⚠️',price:120},
 faultServer:{text:'Serverstörung',key:'faultServer',kind:'stoerung',icon:'⚠️',price:120},
 faultWlan:{text:'WLAN ist aus',key:'faultWlan',kind:'stoerung',icon:'⚠️',price:120},
 faultNoSignal:{text:'Kein Empfang',key:'faultNoSignal',kind:'stoerung',icon:'⚠️',price:120},
 faultInternet:{text:'Internetverbindung gestört',key:'faultInternet',kind:'stoerung',icon:'⚠️',price:120},

 usb:{text:'USB-Stick',key:'usb',kind:'falsch',icon:'💾',price:0},
 calculator:{text:'Taschenrechner',key:'calculator',kind:'falsch',icon:'🧮',price:0},
 satellite:{text:'Satellit',key:'satellite',kind:'falsch',icon:'🛰️',price:0}
};

const rewards=[
 {key:'sticker',text:'Firmensticker',icon:'🏷️',price:40},
 {key:'coffee',text:'Kaffeeautomat',icon:'☕',price:80},
 {key:'tools',text:'Werkzeugkoffer',icon:'🧰',price:120},
 {key:'sign',text:'Neon-Schild',icon:'💡',price:160},
 {key:'van',text:'Servicewagen',icon:'🚐',price:250},
 {key:'gold',text:'Gold-Ausweis',icon:'🥇',price:300}
];

const networkContracts=[
 {id:'net1',diff:1,title:'Mini-Netz',short:'Ein Laptop soll ins Internet.',reward:130,slots:3,req:['router','laptop','internet'],edges:[['laptop','router'],['router','internet']]},
 {id:'net2',diff:2,title:'Kleines Heimnetz',short:'Smartphone und Laptop sollen online sein.',reward:230,slots:4,req:['router','smartphone','laptop','internet'],edges:[['smartphone','router'],['laptop','router'],['router','internet']]},
 {id:'net3',diff:3,title:'Gaming-Heimnetz',short:'Spielekonsole, Tablet und Laptop sollen über den Router ins Internet.',reward:180,slots:5,req:['router','console','tablet','laptop','internet'],edges:[['console','router'],['tablet','router'],['laptop','router'],['router','internet']]},
 {id:'net4',diff:4,title:'Homeoffice plus Drucker',short:'Laptop, Drucker, Smartphone und Tablet sollen im Heimnetz funktionieren.',reward:220,slots:6,req:['router','laptop','printer','smartphone','tablet','internet'],edges:[['laptop','router'],['printer','router'],['smartphone','router'],['tablet','router'],['router','internet']]},
 {id:'net5',diff:5,title:'WG-WLAN einrichten',short:'In einer WG sollen zwei getrennte WLANs aufgebaut werden. Leon nutzt Laptop und Drucker. Mia nutzt Smartphone, Tablet und Spielekonsole.',guide:'Es gibt zwei gleiche Routerkarten. Ein Router soll Leons Geräte verbinden, der andere Router soll Mias Geräte verbinden. Beide Router sollen direkt mit dem Internet verbunden werden.',reward:360,slots:8,req:['router','laptop','printer','smartphone','tablet','console','internet'],edges:[]},
 {id:'net6',diff:6,title:'Gästenetz einrichten',short:'Privat: Laptop und Smart-TV. Gäste: Smartphone und Tablet. Gäste sollen nicht im privaten WLAN sein.',guide:'Private Geräte gehören an den normalen Router. Gäste-Geräte gehören an den Gäste-Router. Der Gäste-Router wird mit dem normalen Router verbunden. Der normale Router verbindet alles mit dem Internet.',reward:650,slots:7,req:['router','guestRouter','laptop','smartphone','tablet','tv','internet'],edges:[['guestRouter','router'],['tablet','guestRouter'],['smartphone','guestRouter'],['laptop','router'],['tv','router'],['router','internet']]},
 {id:'net7',diff:7,title:'Schulnetz klein',short:'Ein kleiner Schulbereich soll vernetzt werden: Internetanschluss, Admin-Router, Raum-Router, Schulserver und Geräte.',guide:'Der Admin-Router ist die zentrale Stelle und verbindet die Schule mit dem Internet. Der Schulserver hängt am Admin-Router. Der Raum-Router hängt ebenfalls am Admin-Router. Lehrer-Laptop, Tablet, Drucker und PC gehören in den Raum und werden mit dem Raum-Router verbunden.',reward:700,slots:8,req:['adminRouter','roomRouter','schoolServer','teacherLaptop','tablet','printer','pc','internet'],edges:[['adminRouter','internet'],['roomRouter','adminRouter'],['schoolServer','adminRouter'],['teacherLaptop','roomRouter'],['tablet','roomRouter'],['printer','roomRouter'],['pc','roomRouter']]},
 {id:'net8',diff:8,title:'Schulnetz groß',short:'Ein großes Schulnetz soll vollständig aufgebaut werden: Lehrerzimmer, Klassenraum, Computerraum, zentrale Verwaltung und Internet.',guide:'Du musst in diesem Auftrag alle Karten benutzen. Der Admin-Router ist die Zentrale und verbindet die Schule mit dem Internet. Der Schulserver hängt direkt am Admin-Router. Außerdem hängen am Admin-Router drei weitere Router: der Lehrer-Router für das Lehrerzimmer, der Schüler-Router für den Klassenraum und der Lab-Router für den Computerraum. Lehrer-Laptop und Drucker gehören an den Lehrer-Router. Smart-TV und zwei Schüler-iPads gehören an den Schüler-Router. Vier PCs gehören an den Lab-Router.',reward:800,slots:15,req:['adminRouter','roomRouter','labRouter','schoolServer','teacherLaptop','tablet','pc','printer','tv','internet'],edges:[]},
];

const routeContracts=[
 {id:'route1',cat:'Nachricht',diff:3,title:'Chatnachricht verfolgen',short:'Eine Smartphone-Nachricht geht an einen Empfänger.',reward:190,req:['smartphone','router','internet','messenger','mobile'],kind:'route',
  routeTitle:'Ein Kunde möchte wissen, welchen Weg eine Smartphone-Nachricht nimmt.',
  route:[['senderDevice','Smartphone des Senders','📱','geraet'],['senderRouter','Router des Senders','📡','router'],['internet','Internet','🌐','netz'],['server','Messenger-Server','🗄️','server'],['receiverNetwork','Mobilfunknetz des Empfängers','📶','netz'],['receiverDevice','Smartphone des Empfängers','📱','geraet']]},
 {id:'route2',cat:'Nachricht',diff:4,title:'Datei in die Cloud schicken',short:'Eine Präsentation wird vom Laptop in die Cloud geschickt.',reward:190,req:['laptop','router','internet','cloud'],kind:'route',
  routeTitle:'Ein Kunde möchte wissen, wie eine Präsentation vom Laptop in die Cloud gelangt.',
  route:[['senderDevice','Laptop','💻','geraet'],['senderRouter','Router','📡','router'],['internet','Internet','🌐','netz'],['server','Cloud-Server','☁️','server']]},
 {id:'route3',cat:'Nachricht',diff:5,title:'Online-Spiel verbinden',short:'Eine Konsole verbindet sich mit einem Spielserver.',reward:200,req:['console','router','internet','gameServer'],kind:'route',
  routeTitle:'Ein Kunde möchte wissen, wie seine Konsole mit dem Spielserver verbunden ist.',
  route:[['senderDevice','Spielekonsole','🎮','geraet'],['senderRouter','Router','📡','router'],['internet','Internet','🌐','netz'],['server','Spielserver','🕹️','server']]}
];

const faultContracts=[
 {id:'fault1',cat:'Problem',diff:3,title:'Ganzes Haus offline',short:'Kein Gerät kann Webseiten öffnen.',reward:160,req:['faultRouter'],kind:'fault',d:'Im ganzen Haus funktioniert das Internet nicht. Kein Gerät kann Webseiten öffnen.',target:'senderRouter',fault:'Routerausfall',validAnswers:[{fault:'Routerausfall',target:'senderRouter'},{fault:'Internetverbindung gestört',target:'internet'}],hint:'Wenn alle Geräte betroffen sind, liegt der Fehler häufig beim Router oder an der Verbindung nach außen.'},
 {id:'fault2',cat:'Problem',diff:4,title:'Nur ein Gerät offline',short:'Nur ein einzelnes Gerät kommt nicht ins Netz.',reward:160,req:['faultWlan'],kind:'fault',d:'Nur ein Gerät kann keine Verbindung herstellen. Alle anderen Geräte funktionieren.',target:'senderDevice',fault:'WLAN ist aus',hint:'Wenn nur ein Gerät betroffen ist, liegt der Fehler wahrscheinlich bei diesem Gerät oder seiner WLAN-Verbindung.'},
 {id:'fault3',cat:'Problem',diff:5,title:'Messenger spinnt weltweit',short:'Viele Nutzer melden verspätete Nachrichten.',reward:170,req:['faultServer'],kind:'fault',d:'Viele Nutzer melden, dass Nachrichten verspätet ankommen, obwohl ihr Heimnetz funktioniert.',target:'server',fault:'Serverstörung',hint:'Wenn viele Nutzer betroffen sind, liegt das Problem eher am Dienst oder Server.'},
 {id:'fault4',cat:'Problem',diff:6,title:'Unterwegs kein Empfang',short:'Der Empfänger bekommt Nachrichten erst später.',reward:160,req:['faultNoSignal'],kind:'fault',d:'Der Empfänger bekommt die Nachricht erst später, weil er unterwegs keinen Empfang hat.',target:'receiverNetwork',fault:'Kein Empfang',hint:'Das Zielgerät kann erst Daten empfangen, wenn das Netz erreichbar ist.'},
 {id:'fault5',cat:'Problem',diff:7,title:'Internetweg gestört',short:'Eine Verbindung im Internet fällt aus.',reward:180,req:['faultInternet'],kind:'fault',d:'Eine Verbindung im Internet ist gestört. Trotzdem können Daten oft über einen anderen Weg ankommen.',target:'internet',fault:'Internetverbindung gestört',hint:'Das Internet ist vermascht aufgebaut. Deshalb sind oft alternative Wege möglich.'}
];

const contractPool=[...networkContracts,...routeContracts,...faultContracts];
const allContracts=['net1','net2','fault1','net3','route1','net4','fault2','net5','route2','net6','fault3','net7','fault4','net8','route3','fault5']
  .map(id=>contractPool.find(c=>c.id===id))
  .filter(Boolean);

let state;
function reset(){
 state={money:START_MONEY,sortRuns:0,deck:['router','laptop','usb','calculator'],done:[],selected:null,connections:[],connSel:null,connMode:false,results:[],rewards:[],mistakes:{},currentSortMistakes:0};
 hud();
}
function hud(){moneyEl.textContent=state.money;}

function setBadge(t){badge.textContent=t}
function has(k){return state.deck.includes(k)}
function missing(c){return c.req.filter(k=>!has(k))}
function shuffle(a){return [...a].sort(()=>Math.random()-.5)}
function uid(){return Math.random().toString(36).slice(2,9)}
function networkCapable(k){return ['geraet','netz','server','router'].includes(cardBank[k]?.kind)}
function rewardSort(){return state.sortRuns===0?100:50}

function mistakeCount(id){return Math.min(state.mistakes[id]||0,5)}
function currentReward(c){
 const base=c.reward;
 const m=mistakeCount(c.id);
 return Math.round(base*(1-0.1*m));
}
function addMistake(c){
 if(!state.mistakes[c.id])state.mistakes[c.id]=0;
 if(state.mistakes[c.id]<5)state.mistakes[c.id]++;
}
function mistakeText(c){
 const m=mistakeCount(c.id);
 const reward=currentReward(c);
 if(m>=5)return `Die Belohnung ist jetzt auf ${reward} $ begrenzt. Sie sinkt nicht weiter.`;
 return `Aktuelle Belohnung: ${reward} $. Bei einem weiteren Fehlversuch sinkt sie erneut.`;
}
function sortCurrentReward(){
 const base=rewardSort();
 const m=Math.min(state.currentSortMistakes||0,5);
 return Math.round(base*(1-0.1*m));
}
function addSortMistake(){
 if(!state.currentSortMistakes)state.currentSortMistakes=0;
 if(state.currentSortMistakes<5)state.currentSortMistakes++;
}
function sortMistakeText(){
 const r=sortCurrentReward();
 if((state.currentSortMistakes||0)>=5)return `Die Belohnung ist jetzt auf ${r} $ begrenzt. Sie sinkt nicht weiter.`;
 return `Aktuelle Belohnung: ${r} $. Bei einem weiteren Fehlversuch sinkt sie erneut.`;
}
function cardCategory(c){
 if(c.kind==='geraet')return 'Geräte';
 if(c.kind==='router')return 'Router';
 if(c.kind==='netz')return 'Netzwerke';
 if(c.kind==='server')return 'Server';
 if(c.kind==='stoerung')return 'Diagnose';
 return 'Sonstiges';
}
function groupedPile(title,cards){
 return `<div class="panel deck"><div class="deckHead"><h3>${title}</h3><div class="count">${countLabel(cards.length)}</div></div><div id="groupedPile"></div></div>`;
}
function fillGroupedPile(cards){
 const root=document.getElementById('groupedPile');
 const order=['Geräte','Router','Netzwerke','Räume','Server','Diagnose','Sonstiges'];
 order.forEach(cat=>{
   const group=cards.filter(c=>cardCategory(c)===cat);
   if(!group.length)return;
   const section=document.createElement('div');
   section.className='pileGroup';
   section.dataset.category=cat;
   section.innerHTML=`<h4>${cat}</h4><div class="cards"></div>`;
   const holder=section.querySelector('.cards');
   shuffle(group).forEach(c=>holder.appendChild(cardEl(c,c)));
   root.appendChild(section);
 });
}

function returnCardToGroupedPile(card){
 const root=document.getElementById('groupedPile');
 if(!root || !card)return;
 const cat=cardCategory(card.dataset);
 let section=root.querySelector(`.pileGroup[data-category="${cat}"]`);
 if(!section){
   section=document.createElement('div');
   section.className='pileGroup';
   section.dataset.category=cat;
   section.innerHTML=`<h4>${cat}</h4><div class="cards"></div>`;
   root.appendChild(section);
 }
 card.classList.remove('selected');
 section.querySelector('.cards').appendChild(card);
}

function start(){
 setBadge('Start'); reset();
 screen.innerHTML=`<section class="card hero"><div class="logo">NF</div><h2>Willkommen bei der NetzFix GmbH</h2><p>Du startest mit <strong>${START_MONEY} $</strong>. Die Netzaufträge werden Schritt für Schritt größer: erst wenige Karten, später mehrere Router und mehr Verbindungen. Wenn alle Aufträge erledigt sind, wird der Editor für eigene Level freigeschaltet.</p><div class="info"><strong>Neue Idee:</strong> Die SuS müssen nicht nur die richtigen Karten wählen, sondern später auch entscheiden, welcher Router welche Geräte verwaltet.</div><button class="primary" id="go">Zum Auftragsmenü</button></section>`;
 document.getElementById('go').onclick=menu;
}

function cardEl(c,data={}){
 const e=document.createElement('div'); e.className='gameCard'; e.draggable=true; e.dataset.id=uid();
 const d={...c,...data}; Object.keys(d).forEach(k=>e.dataset[k]=d[k]);
 e.dataset.kind=d.kind||c.kind;
 e.innerHTML=`<div class="icon">${d.icon||c.icon}</div><div class="ctext">${d.text||c.text}</div>`;
 e.onclick=()=>{if(state.connMode)return;document.querySelectorAll('.gameCard').forEach(x=>x.classList.remove('selected'));e.classList.add('selected');state.selected=e.dataset.id};
 e.ondragstart=ev=>{if(state.connMode){ev.preventDefault();return}ev.dataTransfer.setData('text/plain',e.dataset.id);state.selected=e.dataset.id};
 return e;
}
function setupZone(z,fn){
 z.ondragover=e=>{if(state.connMode)return;e.preventDefault();z.classList.add('dragOver')};
 z.ondragleave=()=>z.classList.remove('dragOver');
 z.ondrop=e=>{if(state.connMode)return;e.preventDefault();z.classList.remove('dragOver');const cid=e.dataTransfer.getData('text/plain')||state.selected;const c=document.querySelector(`[data-id="${cid}"]`);if(c)fn(c,z)};
 z.addEventListener('click',()=>{if(state.connMode||!state.selected)return;const c=document.querySelector(`[data-id="${state.selected}"]`);if(c)fn(c,z)});
}
function countLabel(n){return n===1?'1 Karte':`${n} Karten`}
function pile(title,cards){return `<div class="panel deck"><div class="deckHead"><h3>${title}</h3><div class="count">${countLabel(cards.length)}</div></div><div class="cards" id="pile"></div></div>`}
function fillPile(cards){const p=document.getElementById('pile');shuffle(cards).forEach(c=>p.appendChild(cardEl(c,c)))}
function feedback(kind,text){
 const f=document.getElementById('feedback');
 if(f){
   f.className='feedback '+kind;
   f.textContent=text;
 }
 if(kind==='bad')showPopup(text);
}
function showPopup(text){
 const old=document.getElementById('errorPopup');
 if(old)old.remove();
 const box=document.createElement('div');
 box.id='errorPopup';
 box.className='errorPopup';
 box.innerHTML=`<div class="errorPopupCard"><div class="errorPopupIcon">!</div><div class="errorPopupText"><strong>Noch nicht richtig</strong><p>${text}</p></div><button id="closePopup" class="secondary">OK</button></div>`;
 document.body.appendChild(box);
 document.getElementById('closePopup').onclick=()=>box.remove();
 box.addEventListener('click',(e)=>{if(e.target===box)box.remove();});
}
function clearMarks(){document.querySelectorAll('.drop,.slot,.netSlot').forEach(x=>x.classList.remove('correct','wrong'))}

function menu(){
 state.connMode=false; state.connSel=null; state.selected=null;
 setBadge('Auftragsmenü'); hud();
 screen.innerHTML=`<section class="card"><h2>Auftragsmenü</h2><p>Die Aufträge werden Schritt für Schritt größer. Dazwischen kommen auch Diagnose- und Nachrichtenaufträge, damit es nicht immer nur ums Verbinden geht.</p>${customUnlockBox()}<div class="topMenuActions"><button class="secondary" id="lager">Lager ansehen</button><button class="secondary" id="shop">Shop öffnen</button></div><div class="grid">${customLevelTiles()}${sortTile()}${allContracts.map(contractTile).join('')}</div></section>`;
 document.querySelectorAll('[data-contract]').forEach(b=>b.onclick=()=>runContract(b.dataset.contract));
 document.querySelectorAll('[data-shop]').forEach(b=>b.onclick=()=>shop(b.dataset.shop));
 document.querySelectorAll('[data-custom-play]').forEach(b=>b.onclick=()=>playSavedCustomLevel(parseInt(b.dataset.customPlay,10)));
 document.querySelectorAll('[data-custom-edit]').forEach(b=>b.onclick=()=>editSavedCustomLevel(parseInt(b.dataset.customEdit,10)));
 document.getElementById('lager').onclick=lager;
 document.getElementById('shop').onclick=()=>shop(null);
 const customBtn=document.getElementById('customBuilderBtn');
 if(customBtn && !customBtn.disabled)customBtn.onclick=()=>customBuilder(true);
}
function allLevelsDone(){
 return allContracts.every(c=>state.done.includes(c.id));
}
function customUnlockBox(){
 const done=state.done.length;
 const total=allContracts.length;
 if(allLevelsDone()){
   return `<div class="unlockBox success"><div><strong>Eigenes Level freigeschaltet!</strong><br>Du kannst eigene Netzwerkszenarien entwerfen. Gespeicherte eigene Level erscheinen oben vor dem Sortierauftrag.</div><button class="primary" id="customBuilderBtn">Eigenes Level erstellen</button></div>`;
 }
 return `<div class="unlockBox locked"><div><strong>Eigenes Level gesperrt</strong><br>Freischaltung nach allen Aufträgen: ${done}/${total} erledigt.</div><button class="secondary" id="customBuilderBtn" disabled>Eigenes Level erstellen</button></div>`;
}
function customLevelTiles(){
 if(!state.customLevels || !state.customLevels.length)return '';
 return state.customLevels.map((lvl,i)=>`<div class="tile customLevelTile"><h3>★ ${escapeHtml(lvl.name)}</h3><p>${escapeHtml(lvl.task)}</p><p><strong>${lvl.items.length}</strong> Items · <strong>${lvl.slots}</strong> Slots · <strong>${(lvl.solutionEdges||[]).length}</strong> Linien</p><div class="buttonRow"><button class="primary" data-custom-play="${i}">Spielen</button><button class="secondary" data-custom-edit="${i}">Bearbeiten</button></div></div>`).join('');
}
function sortTile(){return `<div class="job"><h3>Sortierauftrag</h3><p>Sortiere Lagerkarten: netzwerkfähig oder nicht netzwerkfähig.</p><div class="meta"><span class="pill">${state.sortRuns===0?'erstes Mal':'Wiederholung'}</span><span class="pill">+${rewardSort()} $</span></div><button class="primary" data-contract="sort">Starten</button></div>`}
function contractTile(c){
 const done=state.done.includes(c.id), miss=missing(c);
 const reward=currentReward(c);
 const penalty=mistakeCount(c.id);
 return `<div class="job ${done?'done':''}"><h3>${c.title}</h3><p>${c.short}</p><div class="meta">${done?'<span class="pill done">erledigt</span>':miss.length?`<span class="pill warn">${miss.length} Karte(n) fehlen</span>`:'<span class="pill">bereit</span>'}<span class="pill">+${reward} $</span>${penalty?`<span class="pill warn">${penalty} Fehlversuch(e)</span>`:''}</div>${done?'<button class="secondary" disabled>Abgeschlossen</button>':miss.length?`<button class="shopButton" data-shop="${c.id}">Fehlende Karten kaufen</button>`:`<button class="primary" data-contract="${c.id}">Auftrag starten</button>`}</div>`;
}
function runContract(id){
 if(id==='sort')return jobSort();
 const c=allContracts.find(x=>x.id===id); if(!c)return;
 if(missing(c).length)return shop(c.id);
 if(c.id==='net5')return jobWGDualRouter(c);
 if(c.id==='net8')return jobSchoolMega(c);
 if(networkContracts.includes(c))return jobNetwork(c);
 if(c.kind==='route')return jobRoute(c);
 if(c.kind==='fault')return jobFault(c);
}
function complete(c,msg){
 let paid=0;
 if(c.id==='sort'){
   paid=sortCurrentReward();
   state.sortRuns++;
   state.money+=paid;
   state.results.push(`Sortierauftrag: +${paid} $`);
 }else if(!state.done.includes(c.id)){
   paid=currentReward(c);
   state.done.push(c.id);
   state.money+=paid;
   state.results.push(`${c.title}: +${paid} $`);
 }
 hud();
 const customDone=allLevelsDone();
 screen.innerHTML=`<section class="card hero"><div class="logo">✓</div><h2>Auftrag abgeschlossen!</h2><p>${msg}</p><div class="case"><strong>Auszahlung:</strong> +${paid} $<br><strong>Guthaben:</strong> ${state.money} $</div>${customDone?'<div class="unlockBox success"><div><strong>Alle Aufträge erledigt!</strong><br>Jetzt ist der Editor für eigene Level freigeschaltet.</div><button class="primary" id="customBuilderBtn">Eigenes Level erstellen</button></div>':''}<div class="buttonRow"><button class="primary" id="menu">Zum Auftragsmenü</button><button class="secondary" id="shop">Shop öffnen</button></div></section>`;
 document.getElementById('menu').onclick=menu;
 document.getElementById('shop').onclick=()=>shop(null);
 const customBtn=document.getElementById('customBuilderBtn');
 if(customBtn)customBtn.onclick=()=>customBuilder(true);
}
function lager(){
 setBadge('Lager'); hud();

 const groups=[
  {title:'Router und Netzwerke', keys:['router','adminRouter','roomRouter','guestRouter','labRouter','internet','mobile']},
  {title:'Geräte', keys:['smartphone','laptop','printer','console','tablet','tv','pc','teacherLaptop']},
  {title:'Server', keys:['messenger','cloud','gameServer','schoolServer']},
  {title:'Diagnosewerkzeuge', keys:['faultRouter','faultServer','faultWlan','faultNoSignal','faultInternet']},
  {title:'Sonstiges', keys:['usb','calculator','satellite']}
 ];

 const groupHtml=groups.map(g=>{
   const owned=g.keys.filter(k=>has(k)).map(k=>cardBank[k]).filter(Boolean);
   if(!owned.length)return '';
   return `<div class="lagerGroup"><h3>${g.title}</h3><div class="cards">${owned.map(c=>`<div class="gameCard" data-kind="${c.kind}"><div class="icon">${c.icon}</div><div class="ctext">${c.text}</div></div>`).join('')}</div></div>`;
 }).join('');

 screen.innerHTML=`<section class="card"><div class="taskToolbar"><h2>Lager</h2><div class="taskActions"><button class="secondary smallCheck" id="back">Zurück</button><button class="secondary smallCheck" id="shopBtn">Shop öffnen</button></div></div><p>Diese Karten besitzt deine Firma. Sie sind nach Bereichen sortiert, damit du schneller findest, was du brauchst.</p>${groupHtml}</section>`;
 document.getElementById('back').onclick=menu;
 document.getElementById('shopBtn').onclick=()=>shop(null);
}
function shop(contractId){
 setBadge('Shop'); hud();
 const c=allContracts.find(x=>x.id===contractId); const rec=c?missing(c):[];
 const all=['router','internet','smartphone','laptop','printer','adminRouter','roomRouter','guestRouter','labRouter','console','tablet','tv','pc','teacherLaptop','mobile','messenger','cloud','gameServer','schoolServer','faultRouter','faultServer','faultWlan','faultNoSignal','faultInternet'];
 screen.innerHTML=`<section class="card"><div class="buttonRow" style="margin-top:0;margin-bottom:14px;"><button class="secondary" id="backTop">← Zurück</button></div><h2>Shop</h2>${c?`<div class="case"><strong>Empfohlen für:</strong> ${c.title}<br>Fehlt: ${rec.length?rec.map(k=>cardBank[k].text).join(', '):'nichts'}</div>`:'<p>Kaufe gezielt Karten. Für schwere Aufträge brauchst du später zusätzliche Router und Server.</p>'}<div class="shopGrid">${all.map(k=>shopItem(k,rec)).join('')}</div><div class="buttonRow"><button class="secondary" id="back">Zurück</button></div></section>`;
 document.querySelectorAll('[data-buy]').forEach(b=>b.onclick=()=>{buyCard(b.dataset.buy);shop(contractId)});
 document.getElementById('back').onclick=menu;
 document.getElementById('backTop').onclick=menu;
}
function shopItem(k,rec){
 const c=cardBank[k], owned=has(k), recommended=rec.includes(k);
 return `<div class="shopItem ${owned?'owned':''} ${recommended?'recommended':''}"><h3>${c.icon} ${c.text}</h3><div class="meta">${owned?'<span class="pill done">im Lager</span>':`<span class="pill">${c.price} $</span>`}${recommended?'<span class="pill warn">empfohlen</span>':''}</div><button class="${owned?'secondary':'shopButton'}" ${owned||state.money<c.price?'disabled':''} data-buy="${k}">${owned?'Gekauft':'Kaufen'}</button></div>`;
}
function buyCard(k){const c=cardBank[k];if(!c||has(k)||state.money<c.price)return;state.money-=c.price;state.deck.push(k);hud();}

function makeEmptyCustomDraft(){
 return {
   name:'Eigenes Netzwerkszenario',
   task:'Beschreibe hier, was aufgebaut werden soll.',
   slots:6,
   items:[
     {key:'customRouter',text:'Router',kind:'router',icon:'📡'},
     {key:'customLaptop',text:'Laptop',kind:'geraet',icon:'💻'},
     {key:'customInternet',text:'Internet',kind:'netz',icon:'🌐'}
   ],
   solutionEdges:[],
   editIndex:null
 };
}
function ensureCustomDraft(reset=false){
 if(reset || !state.customDraft){
   state.customDraft=makeEmptyCustomDraft();
 }
}
function saveCustomDraftFromForm(){
 if(!state.customDraft)return;
 const name=document.getElementById('customName');
 const task=document.getElementById('customTask');
 const slots=document.getElementById('customSlots');
 if(name)state.customDraft.name=name.value.trim()||'Eigenes Netzwerkszenario';
 if(task)state.customDraft.task=task.value.trim()||'Beschreibe hier, was aufgebaut werden soll.';
 if(slots)state.customDraft.slots=Math.max(1,Math.min(30,parseInt(slots.value||'6',10)));
}
function customBuilder(reset=false){
 if(!allLevelsDone())return menu();
 ensureCustomDraft(reset);
 setBadge('Eigenes Level'); hud();
 const d=state.customDraft;
 screen.innerHTML=`<section class="card"><div class="taskToolbar"><h2>${d.editIndex===null?'Eigenes Level erstellen':'Eigenes Level bearbeiten'}</h2><div class="taskActions"><button class="secondary smallCheck" id="back">Zurück</button><button class="primary smallCheck" id="startCustom">Level starten</button></div></div><p>Entwirf ein eigenes Netzwerkszenario. Du kannst Karten erstellen, festlegen, wie viele Slots gebraucht werden, und eine Aufgabe formulieren.</p><div class="customEditor"><div class="panel"><h3>Szenario</h3><label>Szenarienname</label><input id="customName" class="textInput" value="${escapeAttr(d.name)}"><label>Aufgabe</label><textarea id="customTask" class="textArea">${escapeHtml(d.task)}</textarea><label>Anzahl der Slots</label><input id="customSlots" class="textInput" type="number" min="1" max="30" value="${d.slots}"></div><div class="panel"><h3>Item erstellen</h3><label>Name des Items</label><input id="newItemName" class="textInput" placeholder="z. B. Beamer, Router, Server"><label>Symbol</label><input id="newItemIcon" class="textInput" value="📦"><label>Kategorie</label><select id="newItemKind" class="textInput"><option value="geraet">Gerät</option><option value="router">Router</option><option value="netz">Netzwerk</option><option value="server">Server</option><option value="stoerung">Diagnose</option><option value="falsch">Sonstiges</option></select><button class="shopButton fullWidth" id="addItem">Item hinzufügen</button></div></div><div class="panel"><h3>Items im eigenen Level</h3><div class="customItemList">${d.items.map((it,i)=>customItemRow(it,i)).join('')}</div></div><div class="buttonRow"><button class="secondary" id="backBottom">Zurück</button><button class="primary" id="startCustomBottom">Level starten</button></div></section>`;

 document.getElementById('back').onclick=menu;
 document.getElementById('backBottom').onclick=menu;
 document.getElementById('startCustom').onclick=()=>{saveCustomDraftFromForm();customPlay()};
 document.getElementById('startCustomBottom').onclick=()=>{saveCustomDraftFromForm();customPlay()};
 document.getElementById('addItem').onclick=()=>{
   saveCustomDraftFromForm();
   const name=(document.getElementById('newItemName').value||'Neues Item').trim();
   const icon=(document.getElementById('newItemIcon').value||'📦').trim();
   const kind=document.getElementById('newItemKind').value||'geraet';
   state.customDraft.items.push({key:'custom_'+Date.now()+'_'+Math.floor(Math.random()*1000),text:name,kind,icon});
   if(state.customDraft.slots<state.customDraft.items.length)state.customDraft.slots=state.customDraft.items.length;
   customBuilder(false);
 };
 document.querySelectorAll('[data-del-custom]').forEach(btn=>{
   btn.onclick=()=>{
     saveCustomDraftFromForm();
     const idx=parseInt(btn.dataset.delCustom,10);
     state.customDraft.items.splice(idx,1);
     customBuilder(false);
   };
 });
}
function customItemRow(it,i){
 return `<div class="customItemRow"><div class="gameCard miniCard" data-kind="${it.kind}"><div class="icon">${escapeHtml(it.icon)}</div><div class="ctext">${escapeHtml(it.text)}</div></div><span class="pill">${cardCategory(it)}</span><button class="secondary" data-del-custom="${i}">Entfernen</button></div>`;
}
function cloneCustomLevel(d){
 return {
   name:d.name,
   task:d.task,
   slots:d.slots,
   items:d.items.map(it=>({...it})),
   solutionEdges:(d.solutionEdges||[]).map(edge=>[...edge])
 };
}
function saveCustomLevel(){
 ensureCustomDraft();
 saveCustomDraftFromForm();
 if(!state.customLevels)state.customLevels=[];
 const level=cloneCustomLevel(state.customDraft);
 const editIndex=state.customDraft.editIndex;
 if(editIndex===null || editIndex===undefined){
   state.customLevels.unshift(level);
 }else{
   state.customLevels.splice(editIndex,1);
   state.customLevels.unshift(level);
 }
 state.customDraft=null;
 return 0;
}
function editSavedCustomLevel(index){
 const lvl=state.customLevels[index];
 if(!lvl)return menu();
 state.customDraft={...cloneCustomLevel(lvl),editIndex:index};
 customBuilder(false);
}
function playSavedCustomLevel(index){
 const lvl=state.customLevels[index];
 if(!lvl)return menu();
 customPlay(lvl,false);
}
function itemNameByKey(items,key){
 const item=items.find(it=>it.key===key);
 return item?item.text:key;
}
function edgeKey(a,b){
 return [a,b].sort().join('::');
}
function currentCustomEdgesByItem(){
 const slotToKey={};
 document.querySelectorAll('.customMap .netSlot').forEach(slot=>{
   const card=slot.querySelector('.gameCard');
   if(card)slotToKey[slot.dataset.slotid]=card.dataset.key;
 });
 return state.connections.map(([a,b])=>{
   const ka=slotToKey[a];
   const kb=slotToKey[b];
   return ka&&kb?[ka,kb]:null;
 }).filter(Boolean);
}
function saveCustomSolutionFromCanvas(){
 if(!state.customDraft)return;
 state.customDraft.solutionEdges=currentCustomEdgesByItem();
}
function formatMissingEdges(edges,items){
 if(!edges.length)return '';
 return edges.map(([a,b])=>`${escapeHtml(itemNameByKey(items,a))} ↔ ${escapeHtml(itemNameByKey(items,b))}`).join('<br>');
}
function customPlay(level=null,fromDraft=true){
 if(!allLevelsDone())return menu();
 let d;
 if(level){
   d=cloneCustomLevel(level);
 }else{
   ensureCustomDraft();
   saveCustomDraftFromForm();
   d=cloneCustomLevel(state.customDraft);
 }
 state.connMode=false;
 state.connSel=null;
 state.selected=null;
 state.connections=[];
 setBadge(fromDraft?'Musterlösung bauen':'Eigenes Level'); hud();

 const cards=d.items.map(it=>({...it}));
 const slotCount=Math.max(d.slots,cards.length);
 const titleText=fromDraft?'Musterlösung für eigenes Level bauen':'Eigenes Level spielen';
 const actionButton=fromDraft?'Musterlösung speichern':'Prüfen';

 screen.innerHTML=`<section class="card"><h2>${escapeHtml(d.name)}</h2><div class="case"><strong>Aufgabe:</strong> ${escapeHtml(d.task)}</div>${fromDraft?'<div class="howToBox"><strong>Musterlösung festlegen:</strong><ol><li>Lege alle Karten so hin, wie die Lösung aussehen soll.</li><li>Verbinde die Karten mit Linien.</li><li>Klicke auf „Musterlösung speichern“. Genau diese Verbindungen werden später geprüft.</li></ol></div>':'<div class="howToBox"><strong>Auftrag lösen:</strong><ol><li>Lege alle benötigten Karten in die Slots.</li><li>Verbinde die Karten mit Linien.</li><li>Klicke auf „Prüfen“. Dann wird mit der gespeicherten Musterlösung verglichen.</li></ol></div>'}<div id="mode" class="mode">Modus: Karten legen</div><div class="layout">${groupedPile('Eigene Karten',cards)}<div class="panel"><div class="networkToolbar"><h3>${titleText}</h3><div class="networkActions"><button class="lineTool" id="modeBtn" title="Linien verbinden" aria-label="Linien verbinden"><svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="12" cy="36" r="5"></circle><circle cx="36" cy="12" r="5"></circle><line x1="16" y1="32" x2="32" y2="16"></line></svg></button><button class="primary smallCheck" id="finishCustom">${actionButton}</button></div></div><div class="networkWrap customWrap" id="wrap"><svg class="networkSvg" id="svg"></svg><div class="networkMap customMap">${Array.from({length:slotCount},(_,i)=>`<div class="netSlot customSlot" data-slotid="customSlot${i}"></div>`).join('')}</div></div><div class="hint"><strong>${fromDraft?'Speichern':'Prüfen'}:</strong> ${fromDraft?'Die Linien werden als Musterlösung gespeichert.':'Es wird geprüft, ob alle Karten gelegt wurden und ob die Linien zur Musterlösung passen.'}</div></div></div><div class="buttonRow"><button class="secondary" id="editCustom">${fromDraft?'Zurück zum Editor':'Zum Menü'}</button><button class="secondary" id="menu">Zum Menü</button></div><div id="feedback" class="feedback"></div></section>`;

 fillGroupedPile(cards);

 document.querySelectorAll('.customMap .netSlot').forEach(s=>{
   setupZone(s,(card,slot)=>{
     const oldSlot=card.closest('.netSlot');
     const oldSlotId=oldSlot ? oldSlot.dataset.slotid : null;
     const targetSlotId=slot.dataset.slotid;

     const ex=slot.querySelector('.gameCard');
     if(ex && ex!==card){
       returnCardToGroupedPile(ex);
     }

     slot.appendChild(card);
     state.selected=null;
     card.classList.remove('selected');

     state.connections=state.connections.filter(conn=>{
       if(conn.includes(targetSlotId))return false;
       if(oldSlotId && conn.includes(oldSlotId))return false;
       return true;
     });
     draw();
   });

   s.addEventListener('click',()=>{if(state.connMode)connClick(s)});
   s.addEventListener('dblclick',()=>{
     if(state.connMode)return;
     const card=s.querySelector('.gameCard');
     if(!card)return;
     state.connections=state.connections.filter(conn=>!conn.includes(s.dataset.slotid));
     returnCardToGroupedPile(card);
     draw();
   });
 });

 document.getElementById('modeBtn').onclick=toggleMode;
 document.getElementById('finishCustom').onclick=()=>fromDraft?customDone(true):checkSavedCustomLevel(d);
 document.getElementById('editCustom').onclick=fromDraft?()=>customBuilder(false):menu;
 document.getElementById('menu').onclick=menu;
 setTimeout(draw,30);
}
function customDone(shouldSave=true){
 if(shouldSave){
   saveCustomSolutionFromCanvas();
   const placed=document.querySelectorAll('.customMap .netSlot .gameCard').length;
   if(placed<state.customDraft.items.length){
     return feedback('warn','Lege zuerst alle Items in das eigene Level, bevor du die Musterlösung speicherst.');
   }
   if(!state.customDraft.solutionEdges || state.customDraft.solutionEdges.length===0){
     return feedback('warn','Verbinde mindestens zwei Karten mit einer Linie, bevor du die Musterlösung speicherst.');
   }
   saveCustomLevel();
 }
 screen.innerHTML=`<section class="card hero"><div class="logo">★</div><h2>${shouldSave?'Eigenes Level gespeichert!':'Eigenes Level gespielt!'}</h2><p>${shouldSave?'Dein eigenes Level steht jetzt ganz oben im Auftragsmenü. Beim Spielen werden die gespeicherten Linien als Musterlösung geprüft.':'Du hast dein eigenes Level gespielt.'}</p><div class="buttonRow"><button class="primary" id="newCustom">Neues eigenes Level</button><button class="secondary" id="menu">Zum Auftragsmenü</button></div></section>`;
 document.getElementById('newCustom').onclick=()=>customBuilder(true);
 document.getElementById('menu').onclick=menu;
}
function checkSavedCustomLevel(level){
 clearMarks();
 const placed=[];
 document.querySelectorAll('.customMap .netSlot').forEach(slot=>{
   const card=slot.querySelector('.gameCard');
   if(card)placed.push({slot:slot.dataset.slotid,key:card.dataset.key,el:slot});
 });

 if(placed.length<level.items.length){
   return feedback('warn','Es fehlen noch Karten. Lege zuerst alle Karten in die Slots.');
 }

 const needed=level.items.map(it=>it.key).sort().join('|');
 const have=placed.map(p=>p.key).sort().join('|');
 if(needed!==have){
   placed.forEach(p=>{
     if(!level.items.some(it=>it.key===p.key))p.el.classList.add('wrong');
   });
   return feedback('bad','Das ist noch nicht richtig. Versuche es nochmal.');
 }

 const solution=(level.solutionEdges||[]).map(([a,b])=>edgeKey(a,b));
 if(solution.length===0){
   return feedback('warn','Für dieses eigene Level wurde noch keine Musterlösung gespeichert. Bearbeite das Level und speichere dort die richtigen Linien.');
 }

 const current=currentCustomEdgesByItem().map(([a,b])=>edgeKey(a,b));
 const missing=solution.filter(e=>!current.includes(e));
 const extra=current.filter(e=>!solution.includes(e));

 if(missing.length===0 && extra.length===0){
   placed.forEach(p=>p.el.classList.add('correct'));
   return feedback('good','Richtig! Du hast das eigene Level genauso verbunden wie in der Musterlösung.');
 }

 placed.forEach(p=>p.el.classList.add('wrong'));
 feedback('bad','Das ist noch nicht richtig. Versuche es nochmal.');
}
function escapeHtml(s){
 return String(s).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));
}
function escapeAttr(s){
 return escapeHtml(s).replace(/`/g,'&#096;');
}

function jobSort(){
 state.connMode=false; state.connSel=null; state.selected=null; state.currentSortMistakes=0;
 setBadge('Sortierauftrag'); hud();
 const keys=state.sortRuns===0?['router','laptop','usb','calculator']:state.deck;
 const cards=keys.map(k=>({...cardBank[k],network:networkCapable(k)?'yes':'no'}));
 screen.innerHTML=`<section class="card"><div class="taskToolbar"><h2>Sortierauftrag</h2><div class="taskActions"><button class="primary smallCheck" id="checkSortTop">Prüfen</button><button class="secondary smallCheck" id="backSortTop">Zurück</button></div></div><div class="case"><strong>Auftrag:</strong> Sortiere die Karten. Was kann Teil eines Netzwerks sein?</div><div class="layout">${pile('Karten',cards)}<div class="panel"><div class="drop" data-zone="yes"><h4>Kann Teil eines Netzwerks sein</h4></div><div class="drop" data-zone="no"><h4>Hier nicht netzwerkfähig / Ablenkung</h4></div></div></div><div id="feedback" class="feedback"></div></section>`;
 fillPile(cards);
 document.querySelectorAll('.drop').forEach(z=>setupZone(z,(c,d)=>{
   d.appendChild(c);
   state.selected=null;
   c.classList.remove('selected');
 }));

 const checkSort=()=>{
   clearMarks();let ok=true,total=0;
   document.querySelectorAll('.drop .gameCard').forEach(c=>{
     total++;
     const z=c.closest('.drop').dataset.zone;
     if(c.dataset.network!==z)ok=false;
   });
   if(total<cards.length)return feedback('warn','Lege zuerst alle Karten in einen Bereich.');
   document.querySelectorAll('.drop').forEach(z=>z.classList.add(ok?'correct':'wrong'));
   if(ok)complete({id:'sort'},'Sortierauftrag gelöst.');
   else{addSortMistake();feedback('bad','Noch nicht ganz. Geräte, Router, Netze und Server können Teil eines Netzwerkplans sein. USB-Stick, Taschenrechner oder Satellit sind hier Ablenkungen. '+sortMistakeText());}
 };

 document.getElementById('checkSortTop').onclick=checkSort;
 document.getElementById('backSortTop').onclick=menu;
}






function jobWGDualRouter(c){
 setBadge('WG-Auftrag'); hud();
 state.connMode=false;
 state.connSel=null;
 state.selected=null;
 state.connections=[];

 const cards=[
   {...cardBank.router,key:'routerA',text:'Router'},
   {...cardBank.router,key:'routerB',text:'Router'},
   {...cardBank.laptop},
   {...cardBank.printer},
   {...cardBank.smartphone},
   {...cardBank.tablet},
   {...cardBank.console},
   {...cardBank.internet}
 ];

 screen.innerHTML=`<section class="card"><h2>${c.title}</h2><div class="case"><strong>Kundenmeldung:</strong> ${c.short}<br><br><strong>Genauer Auftrag:</strong> ${c.guide}</div><div class="howToBox"><strong>So gehst du vor:</strong><ol><li>Lege alle acht Karten in freie Felder.</li><li>Eine Routerkarte soll Leon verbinden: Laptop und Drucker.</li><li>Die andere Routerkarte soll Mia verbinden: Smartphone, Tablet und Spielekonsole.</li><li>Beide Router werden mit dem Internet verbunden.</li></ol></div><div id="mode" class="mode">Modus: Karten legen</div><div class="layout">${groupedPile('Lagerkarten',cards)}<div class="panel"><div class="networkToolbar"><h3>WG-Netz aufbauen</h3><div class="networkActions"><button class="lineTool" id="modeBtn" title="Linien verbinden" aria-label="Linien verbinden"><svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="12" cy="36" r="5"></circle><circle cx="36" cy="12" r="5"></circle><line x1="16" y1="32" x2="32" y2="16"></line></svg></button><button class="primary smallCheck" id="checkTop">Prüfen</button></div></div><div class="networkWrap" id="wrap"><svg class="networkSvg" id="svg"></svg><div class="networkMap">${Array.from({length:8},(_,i)=>`<div class="netSlot slot-${i}" data-slotid="s${i}"></div>`).join('')}</div></div><div class="hint"><strong>Linien verbinden:</strong> Die Position ist egal. Wichtig ist nur: Leon hängt an einem Router, Mia an dem anderen Router, beide Router hängen am Internet.</div></div></div><div class="buttonRow"><button class="secondary" id="back">Zurück</button></div><div id="feedback" class="feedback"></div></section>`;

 fillGroupedPile(cards);

 document.querySelectorAll('.netSlot').forEach(s=>{
   setupZone(s,(card,slot)=>{
     const oldSlot=card.closest('.netSlot');
     const oldSlotId=oldSlot ? oldSlot.dataset.slotid : null;
     const targetSlotId=slot.dataset.slotid;

     const ex=slot.querySelector('.gameCard');
     if(ex && ex!==card){
       returnCardToGroupedPile(ex);
     }

     slot.appendChild(card);
     state.selected=null;
     card.classList.remove('selected');

     state.connections=state.connections.filter(conn=>{
       if(conn.includes(targetSlotId))return false;
       if(oldSlotId && conn.includes(oldSlotId))return false;
       return true;
     });
     draw();
   });

   s.addEventListener('click',()=>{if(state.connMode)connClick(s)});
   s.addEventListener('dblclick',()=>{
     if(state.connMode)return;
     const card=s.querySelector('.gameCard');
     if(!card)return;
     state.connections=state.connections.filter(conn=>!conn.includes(s.dataset.slotid));
     returnCardToGroupedPile(card);
     draw();
   });
 });

 document.getElementById('modeBtn').onclick=toggleMode;
 document.getElementById('checkTop').onclick=()=>checkWGDualRouter(c);
 document.getElementById('back').onclick=menu;
 setTimeout(draw,30);
}

function checkWGDualRouter(c){
 clearMarks();

 const placed=[];
 document.querySelectorAll('.netSlot').forEach(s=>{
   const card=s.querySelector('.gameCard');
   if(card)placed.push({slot:s.dataset.slotid,key:card.dataset.key,el:s});
 });

 if(placed.length<8)return feedback('warn','Lege zuerst alle acht Karten in die Felder.');
 if(placed.length>8)return feedback('warn','Es dürfen nur acht Karten gelegt werden.');

 const needed=['routerA','routerB','laptop','printer','smartphone','tablet','console','internet'].sort().join('|');
 const have=placed.map(p=>p.key).sort().join('|');

 if(have!==needed){
   addMistake(c);
   return feedback('bad','Die Auswahl passt noch nicht. Du brauchst zwei Routerkarten, Laptop, Drucker, Smartphone, Tablet, Spielekonsole und Internet. '+mistakeText(c));
 }

 const routerA=placed.find(p=>p.key==='routerA');
 const routerB=placed.find(p=>p.key==='routerB');
 const internet=placed.find(p=>p.key==='internet');

 const groupLeon=['laptop','printer'];
 const groupMia=['smartphone','tablet','console'];

 const norm=state.connections.map(normConn);

 const lineExists=(a,b)=>norm.includes(normConn([a.slot,b.slot]));
 const connectedToRouter=(deviceKey,router)=>{
   const device=placed.find(p=>p.key===deviceKey);
   return device && lineExists(device,router);
 };

 const routerAIsLeon=groupLeon.every(k=>connectedToRouter(k,routerA)) && groupMia.every(k=>connectedToRouter(k,routerB));
 const routerBIsLeon=groupLeon.every(k=>connectedToRouter(k,routerB)) && groupMia.every(k=>connectedToRouter(k,routerA));

 let ok=false;
 if(routerAIsLeon){
   ok=lineExists(routerA,internet) && lineExists(routerB,internet);
 }
 if(routerBIsLeon){
   ok=lineExists(routerA,internet) && lineExists(routerB,internet);
 }

 const requiredLineCount=7;
 if(!ok || norm.length!==requiredLineCount){
   addMistake(c);
   return feedback('bad','Die Verbindungen passen noch nicht. Ein Router verbindet Laptop und Drucker. Der andere Router verbindet Smartphone, Tablet und Spielekonsole. Beide Router müssen direkt mit dem Internet verbunden sein. Zusätzliche Linien sind falsch. '+mistakeText(c));
 }

 placed.forEach(p=>p.el.classList.add('correct'));
 complete(c,'Du hast zwei getrennte WLAN-Bereiche aufgebaut: Leon an einem Router, Mia am anderen Router, beide Router direkt mit dem Internet verbunden.');
}


function jobSchoolMega(c){
 setBadge('Großes Schulnetz'); hud();
 state.connMode=false;
 state.connSel=null;
 state.selected=null;
 state.connections=[];

 const cards=[
   {...cardBank.adminRouter},
   {...cardBank.schoolServer},
   {...cardBank.internet},
   {...cardBank.labRouter},
   {...cardBank.roomRouter, key:'teacherRouter', text:'Lehrer-Router'},
   {...cardBank.roomRouter, key:'studentRouter', text:'Schüler-Router'},
   {...cardBank.teacherLaptop},
   {...cardBank.printer},
   {...cardBank.tv},
   {...cardBank.tablet, key:'tablet1', text:'Schüler-iPad'},
   {...cardBank.tablet, key:'tablet2', text:'Schüler-iPad'},
   {...cardBank.pc, key:'pc1', text:'PC'},
   {...cardBank.pc, key:'pc2', text:'PC'},
   {...cardBank.pc, key:'pc3', text:'PC'},
   {...cardBank.pc, key:'pc4', text:'PC'}
 ];

 screen.innerHTML=`<section class="card"><h2>${c.title}</h2>
   <div class="case"><strong>Kundenmeldung:</strong> ${c.short}<br><br><strong>Genauer Auftrag:</strong> ${c.guide}</div>
   <div class="howToBox"><strong>So gehst du vor:</strong><ol><li>Lege alle Karten in freie Felder.</li><li>Überlege, welche Geräte zusammengehören.</li><li>Verbinde die Geräte mit dem passenden Router.</li><li>Verbinde alle Unterrouter, den Schulserver und das Internet mit dem Admin-Router.</li><li>Prüfe erst, wenn wirklich alle Karten und Linien passen.</li></ol></div>
   <div id="mode" class="mode">Modus: Karten legen</div>
   <div class="layout">
     ${groupedPile('Lagerkarten',cards)}
     <div class="panel megaSchoolPanel">
       <div class="networkToolbar">
         <h3>Großes Schulnetz aufbauen</h3>
         <div class="networkActions">
           <button class="lineTool" id="modeBtn" title="Linien verbinden" aria-label="Linien verbinden">
             <svg viewBox="0 0 48 48" aria-hidden="true">
               <circle cx="12" cy="36" r="5"></circle>
               <circle cx="36" cy="12" r="5"></circle>
               <line x1="16" y1="32" x2="32" y2="16"></line>
             </svg>
           </button>
           <button class="primary smallCheck" id="checkTop">Prüfen</button>
         </div>
       </div>
       <div class="megaSchoolHint"><strong>Benötigte Bereiche:</strong> Lehrerzimmer (Lehrer-Laptop, Drucker), Klassenraum (Smart-TV, 2 Schüler-iPads), Computerraum (4 PCs), dazu Admin-Router, Lehrer-Router, Schüler-Router, Lab-Router, Schulserver und Internet.</div>
       <div class="networkWrap megaWrap" id="wrap">
         <svg class="networkSvg" id="svg"></svg>
         <div class="networkMap megaMap">
           <div class="netSlot mega-0" data-slotid="mega0"></div>
           <div class="netSlot mega-1" data-slotid="mega1"></div>
           <div class="netSlot mega-2" data-slotid="mega2"></div>

           <div class="netSlot mega-3" data-slotid="mega3"></div>
           <div class="netSlot mega-4" data-slotid="mega4"></div>
           <div class="netSlot mega-5" data-slotid="mega5"></div>

           <div class="netSlot mega-6" data-slotid="mega6"></div>
           <div class="netSlot mega-7" data-slotid="mega7"></div>

           <div class="netSlot mega-8" data-slotid="mega8"></div>
           <div class="netSlot mega-9" data-slotid="mega9"></div>
           <div class="netSlot mega-10" data-slotid="mega10"></div>

           <div class="netSlot mega-11" data-slotid="mega11"></div>
           <div class="netSlot mega-12" data-slotid="mega12"></div>
           <div class="netSlot mega-13" data-slotid="mega13"></div>
           <div class="netSlot mega-14" data-slotid="mega14"></div>
         </div>
       </div>
       <div class="hint"><strong>Linien verbinden:</strong> Klicke auf das Linien-Symbol. Wenn es leuchtet, klickst du zwei gefüllte Felder nacheinander an, um sie zu verbinden.</div>
     </div>
   </div>
   <div class="buttonRow"><button class="secondary" id="back">Zurück</button></div>
   <div id="feedback" class="feedback"></div>
 </section>`;

 fillGroupedPile(cards);

 document.querySelectorAll('.netSlot').forEach(s=>{
   setupZone(s,(card,slot)=>{
     const oldSlot=card.closest('.netSlot');
     const oldSlotId=oldSlot ? oldSlot.dataset.slotid : null;
     const targetSlotId=slot.dataset.slotid;

     const ex=slot.querySelector('.gameCard');
     if(ex && ex!==card){
       returnCardToGroupedPile(ex);
     }

     slot.appendChild(card);
     state.selected=null;
     card.classList.remove('selected');

     state.connections=state.connections.filter(conn=>{
       if(conn.includes(targetSlotId))return false;
       if(oldSlotId && conn.includes(oldSlotId))return false;
       return true;
     });
     draw();
   });

   s.addEventListener('click',()=>{if(state.connMode)connClick(s)});
   s.addEventListener('dblclick',()=>{
     if(state.connMode)return;
     const card=s.querySelector('.gameCard');
     if(!card)return;
     state.connections=state.connections.filter(conn=>!conn.includes(s.dataset.slotid));
     returnCardToGroupedPile(card);
     draw();
   });
 });

 document.getElementById('modeBtn').onclick=toggleMode;
 document.getElementById('checkTop').onclick=()=>checkSchoolMega(c);
 document.getElementById('back').onclick=menu;
 setTimeout(draw,30);
}

function checkSchoolMega(c){
 clearMarks();

 const placed=[];
 document.querySelectorAll('.netSlot').forEach(s=>{
   const card=s.querySelector('.gameCard');
   if(card)placed.push({slot:s.dataset.slotid,key:card.dataset.key,el:s});
 });

 if(placed.length<15)return feedback('warn','Lege zuerst alle 15 Karten in die Felder.');
 if(placed.length>15)return feedback('warn','Es dürfen nur 15 Karten gelegt werden.');

 const needed=['adminRouter','schoolServer','internet','labRouter','teacherRouter','studentRouter','teacherLaptop','printer','tv','tablet1','tablet2','pc1','pc2','pc3','pc4'].sort().join('|');
 const have=placed.map(p=>p.key).sort().join('|');

 if(have!==needed){
   addMistake(c);
   return feedback('bad','Die Auswahl passt noch nicht. Du brauchst alle 15 Karten dieses Auftrags: Internet, Admin-Router, Schulserver, drei Unterrouter und alle Geräte. '+mistakeText(c));
 }

 const norm=state.connections.map(normConn);
 const lineBetween=(aKey,bKey)=>{
   const a=placed.find(p=>p.key===aKey);
   const b=placed.find(p=>p.key===bKey);
   return a&&b&&norm.includes(normConn([a.slot,b.slot]));
 };

 const requiredPairs=[
   ['internet','adminRouter'],
   ['schoolServer','adminRouter'],
   ['teacherRouter','adminRouter'],
   ['studentRouter','adminRouter'],
   ['labRouter','adminRouter'],
   ['teacherLaptop','teacherRouter'],
   ['printer','teacherRouter'],
   ['tv','studentRouter'],
   ['tablet1','studentRouter'],
   ['tablet2','studentRouter'],
   ['pc1','labRouter'],
   ['pc2','labRouter'],
   ['pc3','labRouter'],
   ['pc4','labRouter']
 ];

 const allLinesOk=requiredPairs.every(([a,b])=>lineBetween(a,b));

 if(!allLinesOk || norm.length!==requiredPairs.length){
   addMistake(c);
   return feedback('bad','Die Verbindungen passen noch nicht. Der Admin-Router verbindet Internet, Schulserver und die drei Unterrouter. Lehrer-Laptop und Drucker gehören an den Lehrer-Router. Smart-TV und zwei Schüler-iPads gehören an den Schüler-Router. Vier PCs gehören an den Lab-Router. Zusätzliche Linien sind falsch. '+mistakeText(c));
 }

 placed.forEach(p=>p.el.classList.add('correct'));
 complete(c,'Du hast ein großes Schulnetz aufgebaut: zentrale Verwaltung über den Admin-Router, ein Lehrerbereich, ein Klassenraum mit Schülergeräten und ein Computerraum mit vier PCs.');
}

function jobNetwork(c){
 setBadge('Netzaufbau'); hud(); state.connections=[]; state.connSel=null; state.connMode=false;
 const cards=state.deck.map(k=>({...cardBank[k]}));
 screen.innerHTML=`<section class="card"><h2>${c.title}</h2><div class="case"><strong>Kundenmeldung:</strong> ${c.short}${c.guide?`<br><br><strong>Genauer Auftrag:</strong> ${c.guide}`:''}</div><div class="howToBox"><strong>So gehst du vor:</strong><ol><li>Wähle nur die Karten, die wirklich zum Auftrag passen.</li><li>Lege die Karten in freie Felder. Die Position ist egal.</li><li>Klicke auf das Linien-Symbol und verbinde die Karten sinnvoll.</li><li>Prüfe erst, wenn Auswahl und Linien passen.</li></ol></div><div id="mode" class="mode">Modus: Karten legen</div><div class="layout">${groupedPile('Lagerkarten',cards)}<div class="panel"><div class="networkToolbar"><h3>Netzwerk aufbauen</h3><div class="networkActions"><button class="lineTool" id="modeBtn" title="Linien verbinden" aria-label="Linien verbinden"><svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="12" cy="36" r="5"></circle><circle cx="36" cy="12" r="5"></circle><line x1="16" y1="32" x2="32" y2="16"></line></svg></button><button class="primary smallCheck" id="checkTop">Prüfen</button></div></div><div class="networkWrap" id="wrap"><svg class="networkSvg" id="svg"></svg><div class="networkMap">${Array.from({length:c.slots},(_,i)=>`<div class="netSlot slot-${i}" data-slotid="s${i}"></div>`).join('')}</div></div><div class="hint"><strong>Linien verbinden:</strong> Klicke oben auf das Linien-Symbol. Wenn es leuchtet, klickst du zwei gefüllte Felder nacheinander an, um sie zu verbinden. Eine bestehende Linie kannst du durch dieselben zwei Klicks wieder entfernen.</div></div></div><div class="buttonRow"><button class="secondary" id="back">Zurück</button></div><div id="feedback" class="feedback"></div></section>`;
 fillGroupedPile(cards);
 document.querySelectorAll('.netSlot').forEach(s=>{
   setupZone(s,(card,slot)=>{
     const oldSlot=card.closest('.netSlot');
     const oldSlotId=oldSlot ? oldSlot.dataset.slotid : null;
     const targetSlotId=slot.dataset.slotid;

     const ex=slot.querySelector('.gameCard');
     if(ex && ex!==card){
       returnCardToGroupedPile(ex);
     }

     slot.appendChild(card);
     state.selected=null;
     card.classList.remove('selected');

     state.connections=state.connections.filter(x=>{
       if(x.includes(targetSlotId))return false;
       if(oldSlotId && x.includes(oldSlotId))return false;
       return true;
     });
     draw();
   });
   s.addEventListener('click',()=>{if(state.connMode)connClick(s)});
   s.addEventListener('dblclick',()=>{
     if(state.connMode)return;
     const card=s.querySelector('.gameCard');
     if(!card)return;
     state.connections=state.connections.filter(x=>!x.includes(s.dataset.slotid));
     returnCardToGroupedPile(card);
     draw();
   });
 });
 document.getElementById('modeBtn').onclick=toggleMode;
 document.getElementById('checkTop').onclick=()=>checkNetwork(c);
 document.getElementById('back').onclick=menu; setTimeout(draw,30);
}
function checkNetwork(c){
 clearMarks();
 const placed=[];document.querySelectorAll('.netSlot').forEach(s=>{const card=s.querySelector('.gameCard');if(card)placed.push({slot:s.dataset.slotid,key:card.dataset.key,el:s})});
 if(placed.length<c.req.length)return feedback('warn',`Lege zuerst ${c.req.length} Karten in die Felder.`);
 if(placed.length>c.req.length)return feedback('warn',`Es dürfen nur ${c.req.length} Karten gelegt werden.`);
 const have=placed.map(p=>p.key).sort().join('|'), want=[...c.req].sort().join('|');
 if(have!==want){placed.forEach(p=>{if(!c.req.includes(p.key))p.el.classList.add('wrong')});addMistake(c);return feedback('bad','Die Auswahl passt noch nicht. Lies den Kundenauftrag genau und wähle nur die benötigten Karten. '+mistakeText(c))}
 const norm=state.connections.map(normConn);
 const required=c.edges.map(e=>{
   const a=placed.find(p=>p.key===e[0]), b=placed.find(p=>p.key===e[1]);
   return a&&b?normConn([a.slot,b.slot]):null;
 }).filter(Boolean);
 const ok=required.every(r=>norm.includes(r)) && norm.length===required.length;
 if(!ok){addMistake(c);return feedback('bad','Prüfe die Linien: Die richtigen Karten sind gewählt, aber die Verbindungen passen noch nicht. Es dürfen auch keine zusätzlichen Linien gelegt werden. '+mistakeText(c));}
 placed.forEach(p=>p.el.classList.add('correct'));
 complete(c,'Du hast das Netzwerk richtig aufgebaut.');
}
function toggleMode(){
 state.connMode=!state.connMode;
 state.selected=null;
 document.querySelectorAll('.gameCard').forEach(c=>c.classList.remove('selected'));
 document.querySelectorAll('.netSlot, .roomSlot').forEach(s=>s.classList.remove('connectionSelected'));
 state.connSel=null;
 document.getElementById('mode').textContent=state.connMode?'Modus: Linien verbinden':'Modus: Karten legen';
 const btn=document.getElementById('modeBtn');
 if(btn)btn.classList.toggle('active',state.connMode);
}
function connClick(s){const sid=s.dataset.slotid;if(!s.querySelector('.gameCard'))return;if(!state.connSel){state.connSel=sid;s.classList.add('connectionSelected');return}if(state.connSel===sid){s.classList.remove('connectionSelected');state.connSel=null;return}const other=document.querySelector(`.netSlot[data-slotid="${state.connSel}"]`);if(other)other.classList.remove('connectionSelected');s.classList.remove('connectionSelected');const pair=[state.connSel,sid],n=normConn(pair);if(state.connections.map(normConn).includes(n))state.connections=state.connections.filter(c=>normConn(c)!==n);else state.connections.push(pair);state.connSel=null;draw()}
function normConn(c){return [...c].sort().join('|')}
function draw(){const svg=document.getElementById('svg'),wrap=document.getElementById('wrap');if(!svg||!wrap||window.innerWidth<760)return;svg.innerHTML='';const wr=wrap.getBoundingClientRect();state.connections.forEach(([a,b])=>{const A=document.querySelector(`.netSlot[data-slotid="${a}"]`),B=document.querySelector(`.netSlot[data-slotid="${b}"]`);if(!A||!B||!A.querySelector('.gameCard')||!B.querySelector('.gameCard'))return;const ar=A.getBoundingClientRect(),br=B.getBoundingClientRect();const line=document.createElementNS('http://www.w3.org/2000/svg','line');line.setAttribute('x1',ar.left+ar.width/2-wr.left);line.setAttribute('y1',ar.top+ar.height/2-wr.top);line.setAttribute('x2',br.left+br.width/2-wr.left);line.setAttribute('y2',br.top+br.height/2-wr.top);svg.appendChild(line)})}

function jobRoute(c){
 state.connMode=false; state.connSel=null; state.selected=null;
 setBadge('Nachricht'); hud();

 const route=c.route.map(r=>({key:r[0],text:r[1],icon:r[2],kind:r[3]}));

 // Kontrollierte Ablenkungskarten:
 // Keine Karten aus dem Lager als Ablenkung, damit nicht zwei fast gleiche Karten auftauchen.
 const distractors=[
   {text:'USB-Stick',key:'distractor',kind:'falsch',icon:'💾'},
   {text:'Taschenrechner',key:'distractor',kind:'falsch',icon:'🧮'},
   {text:'Satellit',key:'distractor',kind:'falsch',icon:'🛰️'}
 ];
 const cards=shuffle(route.concat(distractors));

 screen.innerHTML=`<section class="card"><h2>${c.title}</h2><div class="case"><strong>Kundenfall:</strong> ${c.routeTitle}<br><strong>Hinweis:</strong> Nicht alle Karten werden benötigt.</div><div class="layout">${pile('Stationskarten',cards)}<div class="panel"><div class="taskToolbar"><h3>Nachrichtenweg</h3><div class="taskActions"><button class="primary smallCheck" id="checkTop">Prüfen</button><button class="secondary smallCheck" id="backTop">Zurück</button></div></div><div class="route">${route.map((r,i)=>`<div class="slot" data-key="${r.key}"><div class="slotLabel">${i===0?'Start':i===route.length-1?'Ziel':'Station '+(i+1)}</div></div>`).join('')}</div></div></div><div class="buttonRow"><button class="primary" id="check">Prüfen</button><button class="secondary" id="back">Zurück</button></div><div id="feedback" class="feedback"></div></section>`;
 fillPile(cards);

 document.querySelectorAll('.slot').forEach(s=>setupZone(s,(card,slot)=>{
   const ex=slot.querySelector('.gameCard');
   if(ex)document.getElementById('pile').appendChild(ex);
   slot.appendChild(card);
   state.selected=null;
   card.classList.remove('selected');
 }));

 const checkRoute=()=>{
   clearMarks();
   let cor=0,filled=0;
   document.querySelectorAll('.slot').forEach(s=>{
     const card=s.querySelector('.gameCard');
     if(card){
       filled++;
       if(card.dataset.key===s.dataset.key){
         cor++;
         s.classList.add('correct');
       }else{
         s.classList.add('wrong');
       }
     }
   });
   if(filled<route.length)return feedback('warn','Fülle zuerst alle Felder.');
   if(cor===route.length)complete(c,'Du hast den Datenweg richtig geordnet.');
   else{addMistake(c);feedback('bad',`Noch nicht ganz. ${cor} von ${route.length} Stationen sind richtig. ${mistakeText(c)}`);}
 };

 document.getElementById('check').onclick=checkRoute;
 document.getElementById('checkTop').onclick=checkRoute;
 document.getElementById('back').onclick=menu;
 document.getElementById('backTop').onclick=menu;
}
function jobFault(c){
 state.connMode=false; state.connSel=null; state.selected=null;
 setBadge('Problem'); hud();

 const route=[
  ['senderDevice','Kundengerät'],
  ['senderRouter','Router im Haus'],
  ['internet','Internet'],
  ['server','Server'],
  ['receiverNetwork','Mobilfunknetz'],
  ['receiverDevice','Empfängergerät']
 ];

 const diagnosisMap={
  faultRouter:{label:'Routerausfall',target:'senderRouter'},
  faultServer:{label:'Serverstörung',target:'server'},
  faultWlan:{label:'WLAN ist aus',target:'senderDevice'},
  faultNoSignal:{label:'Kein Empfang',target:'receiverNetwork'},
  faultInternet:{label:'Internetverbindung gestört',target:'internet'}
 };

 // Wichtig: Es werden nur Diagnosekarten angezeigt, die wirklich im Lager sind.
 // Wenn später mehrere Diagnosekarten vorhanden sind, wird die Aufgabe automatisch anspruchsvoller.
 const ownedDiagnosis=['faultRouter','faultServer','faultWlan','faultNoSignal','faultInternet']
  .filter(k=>has(k))
  .map(k=>({
    text:diagnosisMap[k].label,
    target:diagnosisMap[k].target,
    cardKey:k,
    kind:'stoerung',
    icon:'⚠️'
  }));

 const validAnswers=c.validAnswers || [{fault:c.fault,target:c.target}];

 screen.innerHTML=`<section class="card"><h2>${c.title}</h2><div class="case"><strong>Servicefall:</strong> ${c.d}<br><strong>Bedienung:</strong> Diagnosekarte anklicken oder ziehen und auf die passende Station legen.</div><div class="layout">${pile('Diagnosekarten',ownedDiagnosis)}<div class="panel"><div class="taskToolbar"><h3>Wo könnte der Fehler liegen?</h3><div class="taskActions"><button class="primary smallCheck" id="checkTop">Prüfen</button><button class="secondary smallCheck" id="backTop">Zurück</button></div></div><div class="route">${route.map(r=>`<div class="slot" data-key="${r[0]}"><div class="slotLabel">${r[1]}</div></div>`).join('')}</div></div></div><div class="buttonRow"><button class="primary" id="check">Prüfen</button><button class="secondary" id="back">Zurück</button></div><div id="feedback" class="feedback"></div></section>`;
 fillPile(ownedDiagnosis);

 document.querySelectorAll('.slot').forEach(s=>setupZone(s,(card,slot)=>{
   document.querySelectorAll('.route .gameCard').forEach(x=>document.getElementById('pile').appendChild(x));
   slot.appendChild(card);
   state.selected=null;
   card.classList.remove('selected');
 }));

 const checkFault=()=>{
   clearMarks();
   const placed=document.querySelector('.route .gameCard');
   if(!placed)return feedback('warn','Lege zuerst eine Diagnosekarte auf eine Station.');
   const s=placed.closest('.slot');

   const isCorrect=validAnswers.some(ans=>placed.dataset.text===ans.fault && s.dataset.key===ans.target)
                  || (placed.dataset.text===c.fault && s.dataset.key===c.target);

   if(isCorrect){
     s.classList.add('correct');
     complete(c,'Richtig zugeordnet. '+c.hint);
   }else{
     s.classList.add('wrong');
     addMistake(c);feedback('bad','Noch nicht ganz. Tipp: '+c.hint+' '+mistakeText(c));
   }
 };
 document.getElementById('check').onclick=checkFault;
 document.getElementById('checkTop').onclick=checkFault;
 document.getElementById('back').onclick=menu;
 document.getElementById('backTop').onclick=menu;
}

start();
