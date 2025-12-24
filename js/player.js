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

  const hero = document.createElement('div'); hero.className='profile-hero';

  const photoWrap = document.createElement('div');
  const img = document.createElement('img'); img.className='profile-photo'; img.src = player.photo; img.alt = player.name;
  photoWrap.appendChild(img);
  hero.appendChild(photoWrap);

  const metaWrap = document.createElement('div');
  const card = document.createElement('div'); card.className='profile-card';
  const name = document.createElement('div'); name.className='profile-name'; name.textContent = player.name + ' #' + player.number;
  const meta = document.createElement('div'); meta.className='profile-meta'; meta.textContent = player.position + ' · ' + player.nationality + ' · ' + player.age + ' yrs';
  card.appendChild(name); card.appendChild(meta);

  // stats block
  const statsGrid = document.createElement('div'); statsGrid.className='stats-grid';
  // common stats: games, minutes, goals, assists
  const s = player.stats || {};
  function addStat(label, value){ const st = document.createElement('div'); st.className='stat'; st.innerHTML = '<strong>'+ (value==null?'-':value) +'</strong><small>'+label+'</small>'; statsGrid.appendChild(st); }
  addStat('Games', s.games);
  addStat('Minutes', s.minutes);
  if (player.position==='Goalkeeper'){
    addStat('Clean sheets', s.cleanSheets);
    addStat('Goals', s.goals || 0);
  } else {
    addStat('Goals', s.goals || 0);
    addStat('Assists', s.assists || 0);
  }

  card.appendChild(statsGrid);

  // personal details/bio
  const bio = document.createElement('div'); bio.className='bio';
  bio.innerHTML = '<strong>Personal</strong><br>Age: '+player.age+'<br>Height: '+(player.height||'—')+'<br>Weight: '+(player.weight||'—')+'<br>Nationality: '+player.nationality;
  card.appendChild(bio);

  metaWrap.appendChild(card);
  hero.appendChild(metaWrap);

  root.appendChild(hero);
})();
