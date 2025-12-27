/* team.js
   Renders players grouped by position on team.html using window.PLAYERS.
   Clicking a player card navigates to player.html?id=<playerId>
*/
(function(){
  'use strict';
  const root = document.getElementById('players-root');
  if (!root) return; // only run on team.html

  // Group players by position preserving order
  const order = ['Goalkeeper','Defender','Midfielder','Forward'];
  const groups = {};
  order.forEach(k=>groups[k]=[]);
  (window.PLAYERS||[]).forEach(p=>{
    if (!groups[p.position]) groups[p.position]=[];
    groups[p.position].push(p);
  });

  function createCard(player){
    const a = document.createElement('a');
    a.className='player-card';
    a.href = 'player.html?id='+encodeURIComponent(player.id);
    a.setAttribute('aria-label', player.name + ' #' + player.number);

    const img = document.createElement('img');
    img.className='player-photo';
    img.src = player.photo;
    img.alt = player.name;
    a.appendChild(img);

    const info = document.createElement('div');
    info.className='player-info';

  const name = document.createElement('div'); name.className='player-name'; name.textContent = player.name;
  const num = document.createElement('div'); num.className='player-number'; num.textContent = '#'+player.number;
  const meta = document.createElement('div'); meta.className='player-meta'; meta.textContent = player.nationality;

    info.appendChild(name);
    info.appendChild(num);
    info.appendChild(meta);

    a.appendChild(info);

  const bottom = document.createElement('div'); bottom.className='player-bottom';
  const age = document.createElement('div'); age.className='age';
  // show number and localized years label
  age.innerHTML = player.age + ' <span data-key="years">жыл</span>';
  const more = document.createElement('div'); more.textContent = ''; more.className='muted';
  more.setAttribute('data-key','more_info');
    bottom.appendChild(age);
    bottom.appendChild(more);
    a.appendChild(bottom);

    return a;
  }

  // Render each group
  Object.keys(groups).forEach(pos => {
    if (!groups[pos] || groups[pos].length===0) return;
    const section = document.createElement('section');
    section.className = 'position-group';

      const h2 = document.createElement('h2');
      // use data-key for translation
      const key = groupNames[pos] || null;
      if (key) {
        h2.setAttribute('data-key', key);
        h2.textContent = translate(key);
      } else {
        h2.textContent = pos;
      }
    section.appendChild(title);

    const grid = document.createElement('div');
    grid.className='players-grid';

    groups[pos].forEach(p=>{
      const card = createCard(p);
      grid.appendChild(card);
    });

    section.appendChild(grid);
    root.appendChild(section);
  });

})();
