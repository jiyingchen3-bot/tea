const stageData = [
  { kicker: 'STAGE ONE · PREPARATION', title: '好茶，從一顆柑開始。', description: '熟果放軟後開蓋，細心掏肉去籽。將高山茶與紫蘇、薄荷、甘草等草本配方拌勻回填，扎繩封口，讓果香與茶香先在其中相遇。', tags: ['熟果開蓋', '手工去籽', '草本回填', '扎繩封藏'], sound: '開啟工藝聲景' },
  { kicker: 'STAGE TWO · NINE CYCLES', title: '蒸、壓、曬、焙，反覆九回。', description: '入蒸籠蒸軟，重壓定形；白日迎接日光，入夜以炭火慢焙。每一回蒸曬焙藏，水分漸退、香氣漸沉，柑果慢慢化作深邃黑金。', tags: ['蒸籠蒸軟', '重壓定形', '日光曝曬', '炭火慢焙 × 9'], sound: '播放蒸曬聲景' },
  { kicker: 'STAGE THREE · PATIENT AGING', title: '把日光，交給歲月封存。', description: '完成九次循環後密封靜置。三年，茶湯琥珀甘醇；十年以上，香氣層層沉靜。每個年份，都是風土與時間共同完成的作品。', tags: ['密封靜置', '3 年琥珀甘醇', '10+ 年典藏', '安心收藏'], sound: '播放封藏聲景' }
];
const tabs = [...document.querySelectorAll('.craft-tab')];
const panel = document.querySelector('.stage-panel');
let audioContext = null;
let soundEnabled = false;
let soundTimer = null;

function renderStage(index) {
  const data = stageData[index];
  panel.querySelector('.stage-kicker').textContent = data.kicker;
  panel.querySelector('h3').textContent = data.title;
  panel.querySelector('.stage-description').textContent = data.description;
  panel.querySelector('.stage-tags').replaceChildren(...data.tags.map(tag => { const el = document.createElement('span'); el.textContent = tag; return el; }));
  panel.querySelector('.stage-counter').innerHTML = `0${index + 1} <i>/ 03</i>`;
  panel.querySelector('.sound-label').textContent = soundEnabled ? '靜音工藝聲景' : data.sound;
}
tabs.forEach((tab, index) => tab.addEventListener('click', () => {
  tabs.forEach((item, i) => { const active = i === index; item.classList.toggle('is-active', active); item.setAttribute('aria-selected', String(active)); });
  renderStage(index);
  if (soundEnabled) playCraftSound(index);
}));

function playCraftSound(stage) {
  if (!soundEnabled || !audioContext) return;
  const now = audioContext.currentTime;
  const osc = audioContext.createOscillator();
  const gain = audioContext.createGain();
  osc.type = stage === 1 ? 'triangle' : 'sine';
  osc.frequency.setValueAtTime(stage === 0 ? 190 : stage === 1 ? 115 : 260, now);
  osc.frequency.exponentialRampToValueAtTime(stage === 0 ? 90 : stage === 1 ? 65 : 120, now + .22);
  gain.gain.setValueAtTime(.0001, now);
  gain.gain.exponentialRampToValueAtTime(.055, now + .025);
  gain.gain.exponentialRampToValueAtTime(.0001, now + .35);
  osc.connect(gain).connect(audioContext.destination);
  osc.start(now); osc.stop(now + .36);
}
const soundButton = document.querySelector('.sound-button');
soundButton.addEventListener('click', async () => {
  soundEnabled = !soundEnabled;
  if (soundEnabled) {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) { soundEnabled = false; soundButton.querySelector('.sound-label').textContent = '此瀏覽器不支援音效'; return; }
    audioContext ||= new AudioCtx();
    if (audioContext.state === 'suspended') await audioContext.resume();
    soundTimer = window.setInterval(() => playCraftSound(1), 2200);
    playCraftSound(0);
  } else window.clearInterval(soundTimer);
  soundButton.setAttribute('aria-pressed', String(soundEnabled));
  soundButton.querySelector('.sound-label').textContent = soundEnabled ? '靜音工藝聲景' : stageData[tabs.findIndex(tab => tab.classList.contains('is-active'))].sound;
  soundButton.querySelector('.sound-state').textContent = soundEnabled ? 'ON' : 'OFF';
});

const ageData = {
  3: { title: '初見琥珀', color: '蜜金琥珀', flavor: '柑香明亮・甘潤清甜', position: '初藏分享・日常品飲', description: '茶湯透亮如蜂蜜琥珀，柑香清新而柔和。入口甘潤，草本氣息輕輕停留，是品味酸柑茶歲月變化的美好起點。', liquid: 'radial-gradient(ellipse,#d59a42,#9e5225 65%,#6c341f)', code: 'AMBER · 03' },
  5: { title: '沉香入韻', color: '深琥珀金', flavor: '熟果香沉・茶韻飽滿', position: '風味進階・款待珍藏', description: '色澤轉為深琥珀金，熟果香與茶韻逐漸融合。入口醇厚圓潤，回甘綿長，適合在慢下來的午後與親友分享。', liquid: 'radial-gradient(ellipse,#bd7632,#713a24 65%,#48251b)', code: 'AMBER · 05' },
  10: { title: '歲月藏金', color: '紅棕琥珀', flavor: '陳香幽遠・甘醇悠長', position: '年份典藏・傳家之選', description: '茶湯深沉如紅棕琥珀，柑香、茶韻與草本陳香層層舒展。口感柔和醇厚，餘韻安靜悠長，值得為重要時刻開封。', liquid: 'radial-gradient(ellipse,#92502e,#4d2a20 65%,#2c1b17)', code: 'AMBER · 10+' }
};
document.querySelectorAll('.age-option').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('.age-option').forEach(item => { const active = item === button; item.classList.toggle('is-active', active); item.setAttribute('aria-selected', String(active)); });
  const data = ageData[button.dataset.age];
  const details = document.querySelector('.age-details');
  details.querySelector('h3').innerHTML = `${data.title}<span> · ${button.dataset.age === '10' ? '10 年以上' : `${button.dataset.age} 年`}</span>`;
  details.querySelector('p:not(.eyebrow)').textContent = data.description;
  const values = details.querySelectorAll('dd'); values[0].textContent = data.color; values[1].textContent = data.flavor; values[2].textContent = data.position;
  document.querySelector('.tea-liquid').style.background = data.liquid;
  document.querySelector('.tea-color-label').textContent = data.code;
}));

document.querySelectorAll('.experience-card').forEach(card => card.addEventListener('click', () => {
  document.querySelectorAll('.experience-card').forEach(item => item.classList.toggle('is-selected', item === card));
}));
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');
menuToggle.addEventListener('click', () => { const open = menuToggle.getAttribute('aria-expanded') !== 'true'; menuToggle.setAttribute('aria-expanded', String(open)); menuToggle.setAttribute('aria-label', open ? '關閉選單' : '開啟選單'); nav.classList.toggle('is-open', open); });
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => { nav.classList.remove('is-open'); menuToggle.setAttribute('aria-expanded', 'false'); menuToggle.setAttribute('aria-label', '開啟選單'); }));

const dateInput = document.querySelector('#booking-date');
const today = new Date();
dateInput.min = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
document.querySelector('#booking-form').addEventListener('submit', event => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  const planCard = document.querySelector('.experience-card.is-selected');
  const plan = planCard.querySelector('strong').textContent;
  const result = document.querySelector('#booking-result');
  const safe = value => String(value || '未填寫').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const date = safe(data.get('date'));
  const guests = safe(data.get('guests'));
  const time = safe(data.get('time'));
  const note = safe(data.get('notes') || '無');
  result.innerHTML = `<strong>預約意願已整理，${safe(data.get('name'))}，期待與您相見。</strong><br>體驗方案：${safe(plan)}　｜　日期：${date}　｜　時段：${time}　｜　人數：${guests} 位<br>聯絡方式：${safe(data.get('contact'))}<br>客製備註：${note}<br><span>接下來將由專人聯繫確認席位，並安排迎賓茶與工序導覽。此示範網站不會傳送或保存您的個人資料。</span>`;
  result.hidden = false;
  result.scrollIntoView({behavior: 'smooth', block: 'center'});
});
