/* player.js - renders the profile page using window.PLAYERS and ?id param */
(function(){
  'use strict';
  function qsParam(name){
    const u = new URLSearchParams(window.location.search);
    return u.get(name);
  }
  const id = qsParam('id');
  const root = document.getElementById('profile-root');
  if (!root) return;
  const players = window.PLAYERS || [];
  const player = players.find(p=>p.id===id) || null;

  if (!player){
    root.innerHTML = '<div class="center"><h2>Player not found</h2><p>Invalid player id.</p></div>';
    return;
  }

  // determine current language
  function getLang(){
    try{ const s = localStorage.getItem('jaiyq_lang'); if (s) return s; }catch(e){}
    const nav = (navigator.language||'').toLowerCase();
    return nav.startsWith('ru') ? 'ru' : 'kk';
  }
  const lang = getLang();

  const hero = document.createElement('div'); hero.className='profile-hero';

  const photoWrap = document.createElement('div');
  const displayName = (player.name && typeof player.name==='object') ? (player.name[lang]||player.name.en||player.name.ru||player.name.kk) : player.name;
  const displayNat = (player.nationality && typeof player.nationality==='object') ? (player.nationality[lang]||player.nationality.en||player.nationality.ru||player.nationality.kk) : player.nationality;
  const img = document.createElement('img'); img.className='profile-photo'; img.src = player.photo; img.alt = displayName;
  photoWrap.appendChild(img);
  hero.appendChild(photoWrap);

  const metaWrap = document.createElement('div');
  const card = document.createElement('div'); card.className='profile-card';
  const name = document.createElement('div'); name.className='profile-name'; name.textContent = displayName + ' #' + player.number;
  const meta = document.createElement('div'); meta.className='profile-meta';
  // create meta with localized nationality and age; use data-key placeholders for labels if needed
  meta.textContent = player.position + ' · ' + displayNat + ' · ' + player.age + ' ' + (lang === 'ru' ? 'лет' : 'жыл');
  card.appendChild(name); card.appendChild(meta);

  // stats block
  const statsGrid = document.createElement('div'); statsGrid.className='stats-grid';
  // common stats: games, minutes, goals, assists
  const s = player.stats || {};
  function addStat(labelKey, value){ const st = document.createElement('div'); st.className='stat'; st.innerHTML = '<strong>'+ (value==null?'-':value) +'</strong><small data-key="'+labelKey+'">'+labelKey+'</small>'; statsGrid.appendChild(st); }
  addStat('games', s.games);
  addStat('minutes', s.minutes);
  if (player.position==='Goalkeeper'){
    addStat('clean_sheets', s.cleanSheets);
    addStat('goals', s.goals || 0);
  } else {
    addStat('goals', s.goals || 0);
    addStat('assists', s.assists || 0);
  }

  card.appendChild(statsGrid);

  // personal details/bio
  const bio = document.createElement('div'); bio.className='bio';
  bio.innerHTML = '<strong data-key="personal">Personal</strong><br><span data-key="age_label">Age</span>: '+player.age+'<br><span data-key="height_label">Height</span>: '+(player.height||'—')+'<br><span data-key="weight_label">Weight</span>: '+(player.weight||'—')+'<br><span data-key="nationality_label">Nationality</span>: '+displayNat;
  card.appendChild(bio);

  metaWrap.appendChild(card);
  hero.appendChild(metaWrap);

  root.appendChild(hero);
})();
