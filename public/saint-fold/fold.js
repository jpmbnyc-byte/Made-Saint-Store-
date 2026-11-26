'use strict';
const $ = selector => document.querySelector(selector);
const $$ = selector => [...document.querySelectorAll(selector)];
const pieceNames = { set: 'Full set', jacket: 'Jacket', pants: 'Track pant' };
const points = {
  jacket: [
    ['Fold collar', 'The funnel neck stands clear of the throat when zipped. Turn your head to check the clearance.', [53,11],[42,10],[51,11]],
    ['Shoulder & chest', 'The body leaves room for a light layer. Reach forward and check for pulling across the chest and upper back.', [70,32],[59,32],[69,29]],
    ['M-wave panels', 'The wave should read continuously across the closed zipper, body and sleeves. The maker checks alignment for each size.', [52,51],[55,50],[52,56]],
    ['Sleeve & cuff', 'The gathered cuff rests at the wrist. A slight bend in the elbow should leave enough sleeve to move.', [91,93],[48,94],[91,92]],
    ['Jacket hem', 'The gathered hem sits around the upper hip. It should hold the jacket’s shape while leaving room to sit.', [54,90],[77,87],[54,90]]
  ],
  pants: [
    ['Waistband', 'The elastic waist sits level at your preferred wearing height. It should stay in place when you sit and stand.', [52,4],[53,4],[52,4]],
    ['Seat & thigh', 'The upper leg falls easily from the hip. Bend or sit to check for pulling through the seat and thigh.', [72,30],[55,30],[72,30]],
    ['Knee wave', 'The wave wraps the leg around the knee area. Its exact position for each size is confirmed during pattern review.', [73,54],[55,54],[74,55]],
    ['Open hem', 'The straight hem falls over the shoe. Your inside-leg measurement tells the maker where you want it to finish.', [76,96],[56,96],[76,96]]
  ]
};
const fields = {
  height:['Height','Stand barefoot against a wall. Measure from the floor to the top of your head.',65,275],
  chest:['Chest','Pass the tape under your arms and around the fullest part of your chest. Keep it level and breathe normally.',30,300],
  shoulder:['Shoulder width','Ask someone to measure across your upper back from the outer point of one shoulder to the other.',15,100],
  sleeve:['Sleeve length','With your elbow slightly bent, measure from the outer shoulder, over the elbow, to your wrist bone.',12,130],
  waist:['Wearing waist','Wrap the tape around your body at the height where you want the waistband to sit.',30,300],
  hip:['Hip & seat','Stand with your feet together. Measure level around the fullest part of your seat.',30,320],
  inseam:['Inside leg','In the shoes you plan to wear, measure from the top of the inner leg to your preferred hem. A second person can help.',15,155]
};
const views = ['front','side','back'];
const sizes = {jacket:[[369,478],[136,457],[360,477]],pants:[[203,486],[116,486],[198,486]]};
const state = {piece:'set',mode:'product',view:'front',part:'jacket',point:0,unit:'cm',step:0,values:{},pending:{},ease:'',hem:'',notes:'',help:false};
const activeKeys = () => ['height', ...(state.piece!=='pants'?['chest','shoulder','sleeve']:[]), ...(state.piece!=='jacket'?['waist','hip','inseam']:[])];
const steps = () => [...activeKeys(),'preference','review'];
let opener=null, returnStep=null, savedScroll=0;
const esc = value => String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function pressed(el,yes){el.setAttribute('aria-pressed',String(yes));}
function display(cm){return Number.isFinite(cm)?String(+(cm/(state.unit==='in'?2.54:1)).toFixed(2)):'';}
function fittingPart(key){return ['waist','hip','inseam'].includes(key)||state.piece==='pants'?'pants':'jacket';}
function imagePath(part,view){return 'assets/'+part+'-'+view+'.webp';}
function drawProduct(){
  for(const key of ['mode','view','piece']) $$('[data-'+key+']').forEach(b=>pressed(b,b.dataset[key]===state[key]));
  const isMap=state.mode==='map', part=state.part, point=points[part][state.point];
  $('#plate-label').textContent='Ivory Oxblood';
  $('#piece-map').innerHTML=isMap&&state.piece==='set'?['jacket','pants'].map(p=>'<button data-part="'+p+'" aria-pressed="'+(p===part)+'">'+pieceNames[p]+'</button>').join(''):'';
  $('#figure-caption').textContent=isMap?pieceNames[part]+' · Fit map':'Design reference';
  $('#angle-caption').textContent=state.view[0].toUpperCase()+state.view.slice(1)+' view';
  const shown=isMap?[part]:state.piece==='set'?['jacket','pants']:[state.piece];
  const angle=views.indexOf(state.view);
  $('#figures').innerHTML=shown.map(p=>{
    const pins=isMap?points[p].map(([name,description,...coords],i)=>'<button class="pin" data-point="'+i+'" data-number="'+(i+1)+'" aria-label="'+esc(name)+'" aria-pressed="'+(i===state.point)+'" style="left:'+coords[angle][0]+'%;top:'+coords[angle][1]+'%"></button>').join(''):'';
    return '<div class="figure" data-figure="'+p+'"><img src="'+imagePath(p,state.view)+'" alt="'+pieceNames[p]+', '+state.view+' design drawing in Ivory Oxblood">'+pins+'</div>';
  }).join('');
  resizeFigures();
  $('#fit-info').innerHTML=isMap?'<div class="point-title"><h3>'+point[0]+'</h3><span class="fit-counter">'+(state.point+1)+' / '+points[part].length+'</span></div><p class="body">'+point[1]+'</p><div class="fit-nav"><button data-move="-1" aria-label="Previous fit point">←</button><button data-move="1">Next fit point →</button></div>':'';
  $('#main-action').innerHTML=(isMap?'Find my fit':'See the fit')+' <span>→</span>';
  $('#second-action').innerHTML=(isMap?'Return to product view':'Go to measurements')+' <span>→</span>';
}
function resizeFigures(){
  const box=$('#figures'),items=$$('.figure'),idx=views.indexOf(state.view);
  if(!items.length)return;
  const ratios=items.map(el=>{const [w,h]=sizes[el.dataset.figure][idx];return w/h;});
  const height=Math.min(box.clientHeight,(box.clientWidth*(items.length>1?.94:1))/ratios.reduce((a,b)=>a+b,0));
  items.forEach((el,i)=>{el.style.width=height*ratios[i]+'px';el.style.height=height+'px';});
}
new ResizeObserver(resizeFigures).observe($('#figures'));
function changePiece(piece){
  if(piece===state.piece)return;
  state.piece=piece;state.part=piece==='pants'?'pants':'jacket';state.point=0;
  state.step=0;returnStep=null;state.help=false;drawProduct();
}
function setMode(mode,bring=false){state.mode=mode;drawProduct();if(bring&&innerWidth<=780)$('.gallery').scrollIntoView({block:'start'});}
function openFit(trigger){
  opener=trigger;savedScroll=window.scrollY;const dialog=$('#fitting');
  drawForm();dialog.showModal();$('#fitting-title').focus({preventScroll:true});
}
function finishPanel(){$('#fitting').close();}
$('#fitting').addEventListener('close',()=>{opener?.focus({preventScroll:true});window.scrollTo(0,savedScroll);});
function stepTo(i){
  state.step=Math.max(0,Math.min(steps().length-1,i));state.help=false;drawForm();
  $('#fitting').scrollTop=0;$('#fitting-title').focus({preventScroll:true});
}
function next(){if(returnStep!==null){returnStep=null;stepTo(steps().length-1);}else stepTo(state.step+1);}
function choiceGroup(key,options,label){return '<p class="control-label">'+label+'</p><div class="choices" role="group" aria-label="'+label+'">'+options.map(v=>'<button class="choice" data-choice="'+key+'" data-value="'+v+'" aria-pressed="'+(state[key]===v)+'">'+v+'</button>').join('')+'</div>';}
function measurement(key){
  const [label,guide]=fields[key];
  return '<h2 id="fitting-title" tabindex="-1">'+label+'</h2><p class="fit-copy" id="guide">'+guide+'</p><div class="measure-row"><input aria-label="'+label+' in '+state.unit+'" aria-describedby="guide" id="reading" type="number" step="any" inputmode="decimal" placeholder="0.0" value="'+display(state.values[key])+'"><div class="units" role="group" aria-label="Measurement units">'+['cm','in'].map(u=>'<button data-unit="'+u+'" aria-pressed="'+(state.unit===u)+'">'+u+'</button>').join('')+'</div></div><button class="help" id="help" aria-expanded="'+state.help+'">No measuring tape?</button>'+(state.help?'<div class="helpbox">Use a non-stretch cord. Mark both ends of the distance, then lay it flat against a ruler. If you only have a phone, leave this reading for your fitting.<button class="help" id="defer">Add this measurement later →</button><button class="help" id="defer-all">Continue with preferences only →</button></div>':'')+'<div class="error" role="alert"></div><div class="actions"><button class="primary" id="next">Continue <span>→</span></button></div>';
}
function preference(){
  return '<h2 id="fitting-title" tabindex="-1">How should it feel?</h2><p class="fit-copy">Choose the ease you like. The atelier will review it alongside your measurements.</p>'+choiceGroup('ease',['Closer','As designed','Roomier'],'Overall ease')+(state.piece!=='jacket'?choiceGroup('hem',['Above shoe','At shoe','Soft break'],'Trouser hem'):'')+'<label class="control-label" for="notes">Fit notes · optional</label><textarea id="notes" maxlength="240" rows="2" placeholder="Anything the atelier should know?">'+esc(state.notes)+'</textarea><div class="error" role="alert"></div><div class="actions"><button class="primary" id="next">Review fitting <span>→</span></button></div>';
}
function brief(){
  const keys=activeKeys(), readings=keys.map(k=>[fields[k][0],state.pending[k]||!Number.isFinite(state.values[k])?'To measure':display(state.values[k])+' '+state.unit]);
  return {piece:state.piece,title:'The Saint Fold · Ivory Oxblood · '+pieceNames[state.piece],readings,fit:Object.fromEntries(keys.filter(k=>!state.pending[k]&&Number.isFinite(state.values[k])).map(k=>[k,String(+state.values[k].toFixed(2))])),ease:state.ease,hem:state.piece==='jacket'?'':state.hem,notes:state.notes};
}
function briefText(b){return [b.title,...b.readings.map(([k,v])=>k+': '+v),'Ease: '+b.ease,b.hem?'Trouser hem: '+b.hem:'',b.notes?'Notes: '+b.notes:'','For atelier review.'].filter(Boolean).join('\n');}
const inStore=()=>['madesaint.store','www.madesaint.store'].includes(location.hostname)||document.documentElement.dataset.store==='true';
function review(){
  const b=brief();
  const rows=[...b.readings,['Overall ease',state.ease],...(b.hem?[['Trouser hem',b.hem]]:[]),...(b.notes?[['Fit notes',b.notes]]:[])];
  return '<h2 id="fitting-title" tabindex="-1">Review your fitting</h2><p class="fit-copy">Ivory Oxblood · '+pieceNames[state.piece]+'</p>'+rows.map(([k,v],i)=>'<div class="review-row"><span>'+esc(k)+'</span><span>'+esc(v)+' <button class="edit" data-edit="'+Math.min(i,activeKeys().length)+'" aria-label="Edit '+esc(k)+'">Edit</button></span></div>').join('')+'<p class="note">'+(inStore()?'Continue to Private Wardrobe to add contact details and send your fitting for review.':'Download your brief for Private Wardrobe. Your entries stay in this tab until you close or refresh it.')+'</p><div class="error" role="alert"></div><button class="primary" id="'+(inStore()?'handoff':'download')+'">'+(inStore()?'Continue to Private Wardrobe':'Download fit brief')+' <span>→</span></button>'+(inStore()?'<button class="help" id="download">Download a copy</button>':'<a class="help" href="https://www.madesaint.store/wardrobe#introduction" target="_blank" rel="noopener">Open Private Wardrobe →</a>');
}
function drawForm(){
  const all=steps(),key=all[state.step],part=fittingPart(key);
  $('#fit-art').innerHTML='<img src="'+imagePath(part,'front')+'" alt="'+pieceNames[part]+' front design reference"><em>The Saint Fold · Ivory Oxblood</em>';
  $('#fit-form').innerHTML='<div class="step-label">'+pieceNames[state.piece]+' &nbsp; / &nbsp; '+(state.step+1)+' of '+all.length+'</div><div class="rule"><div style="width:'+((state.step+1)/all.length*100)+'%"></div></div>'+(key==='review'?review():key==='preference'?preference():measurement(key))+(state.step>0?'<button class="back" id="back">← Back</button>':'');
}
function download(){
  const text=briefText(brief()),url=URL.createObjectURL(new Blob([text],{type:'text/plain;charset=utf-8'}));
  const a=document.createElement('a');a.href=url;a.download='MADE-SAINT-Saint-Fold-Fitting.txt';a.click();setTimeout(()=>URL.revokeObjectURL(url),1500);
}
document.addEventListener('input',e=>{
  if(e.target.id==='reading'){
    const key=steps()[state.step], val=e.target.value;
    state.values[key]=val===''?null:Number(val)*(state.unit==='in'?2.54:1);
    delete state.pending[key];$('.error').textContent='';
  }
  if(e.target.id==='notes')state.notes=e.target.value;
});
document.addEventListener('click',e=>{
  const b=e.target.closest('button');if(!b)return;
  const d=b.dataset,id=b.id,key=steps()[state.step];
  if(d.mode)return setMode(d.mode);
  if(d.piece)return changePiece(d.piece);
  if(d.view){state.view=d.view;return drawProduct();}
  if(d.part){state.part=d.part;state.point=0;return drawProduct();}
  if(d.point!=null||d.move){const n=points[state.part].length;state.point=d.point!=null?Number(d.point):(state.point+Number(d.move)+n)%n;drawProduct();const restore=d.move?'[data-move="'+d.move+'"]':'[data-point="'+d.point+'"]';$(restore)?.focus({preventScroll:true});return;}
  if(id==='main-action')return state.mode==='product'?setMode('map',true):openFit(b);
  if(id==='second-action')return state.mode==='map'?setMode('product',true):openFit(b);
  if(b.hasAttribute('data-open'))return openFit(b);
  if(id==='close-fit')return finishPanel();
  if(d.unit){state.unit=d.unit;drawForm();$('[data-unit="'+d.unit+'"]').focus();return;}
  if(id==='help'){state.help=!state.help;drawForm();$('#help').focus();return;}
  if(id==='defer'){state.pending[key]=true;return next();}
  if(id==='defer-all'){for(const k of activeKeys())if(!Number.isFinite(state.values[k])||state.values[k]<fields[k][2]||state.values[k]>fields[k][3])state.pending[k]=true;returnStep=null;return stepTo(activeKeys().length);}
  if(d.choice){state[d.choice]=d.value;drawForm();$('[data-choice="'+d.choice+'"][data-value="'+d.value+'"]').focus();return;}
  if(id==='next'){
    if(fields[key]){
      const cm=state.values[key],field=fields[key];
      if(!Number.isFinite(cm)||cm<field[2]||cm>field[3]){$('.error').textContent='Check this reading and the selected unit, or choose “Add this measurement later.”';$('#reading').focus();return;}
      delete state.pending[key];
    }else if(!state.ease||(state.piece!=='jacket'&&!state.hem)){$('.error').textContent='Select your '+(!state.ease?'preferred ease.':'preferred trouser hem.');return;}
    return next();
  }
  if(id==='back'){returnStep=null;return stepTo(state.step-1);}
  if(d.edit!=null){returnStep=state.step;return stepTo(Number(d.edit));}
  if(id==='download')return download();
  if(id==='handoff'){
    try{sessionStorage.setItem('made-saint-fold-handoff',JSON.stringify(brief()));location.assign('/wardrobe?fitting=saint-fold#introduction');}
    catch{$('.error').textContent='This browser could not carry your brief across. Download a copy for Private Wardrobe.';}
  }
});
drawProduct();
