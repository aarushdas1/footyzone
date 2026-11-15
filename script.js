/* ===== 1. SAMPLE DATA (all fictional/sample, edit freely) ===== */
const clubs = [
  {id:"mci",name:"Manchester City",short:"MCI",color:"#6cabdd",league:"Premier League",city:"Manchester",stadium:"Etihad Stadium",founded:1880},
  {id:"rma",name:"Real Madrid",short:"RMA",color:"#7a5cff",league:"La Liga",city:"Madrid",stadium:"Santiago Bernabéu",founded:1902},
  {id:"bar",name:"Barcelona",short:"BAR",color:"#a50044",league:"La Liga",city:"Barcelona",stadium:"Camp Nou",founded:1899},
  {id:"ars",name:"Arsenal",short:"ARS",color:"#ef0107",league:"Premier League",city:"London",stadium:"Emirates Stadium",founded:1886},
  {id:"liv",name:"Liverpool",short:"LIV",color:"#c8102e",league:"Premier League",city:"Liverpool",stadium:"Anfield",founded:1892},
  {id:"bay",name:"Bayern Munich",short:"BAY",color:"#dc052d",league:"Bundesliga",city:"Munich",stadium:"Allianz Arena",founded:1900},
  {id:"psg",name:"Paris Saint-Germain",short:"PSG",color:"#004170",league:"Ligue 1",city:"Paris",stadium:"Parc des Princes",founded:1970},
  {id:"che",name:"Chelsea",short:"CHE",color:"#034694",league:"Premier League",city:"London",stadium:"Stamford Bridge",founded:1905}
];
const players = [
  {name:"Erling Haaland",club:"mci",pos:"Forward",nat:"Norway",goals:18,assists:4},
  {name:"Kylian Mbappé",club:"rma",pos:"Forward",nat:"France",goals:16,assists:6},
  {name:"Lamine Yamal",club:"bar",pos:"Forward",nat:"Spain",goals:9,assists:11},
  {name:"Bukayo Saka",club:"ars",pos:"Forward",nat:"England",goals:10,assists:9},
  {name:"Mohamed Salah",club:"liv",pos:"Forward",nat:"Egypt",goals:14,assists:12},
  {name:"Jude Bellingham",club:"rma",pos:"Midfielder",nat:"England",goals:8,assists:7},
  {name:"Rodri",club:"mci",pos:"Midfielder",nat:"Spain",goals:4,assists:5},
  {name:"Declan Rice",club:"ars",pos:"Midfielder",nat:"England",goals:5,assists:8},
  {name:"Virgil van Dijk",club:"liv",pos:"Defender",nat:"Netherlands",goals:3,assists:1},
  {name:"William Saliba",club:"ars",pos:"Defender",nat:"France",goals:2,assists:1},
  {name:"Harry Kane",club:"bay",pos:"Forward",nat:"England",goals:20,assists:8},
  {name:"Thibaut Courtois",club:"rma",pos:"Goalkeeper",nat:"Belgium",goals:0,assists:0},
  {name:"Cole Palmer",club:"che",pos:"Midfielder",nat:"England",goals:12,assists:10},
  {name:"Ousmane Dembélé",club:"psg",pos:"Forward",nat:"France",goals:13,assists:7}
];
const news = [
  {t:"Title race heats up as leaders edge a thriller",c:"Premier League",e:"🏆",g:"#00e676,#00b0ff"},
  {t:"Champions League draw sets up a blockbuster tie",c:"Champions League",e:"🌟",g:"#00b0ff,#7a5cff"},
  {t:"El Clásico preview: what to expect in Madrid",c:"La Liga",e:"🔥",g:"#ff9100,#ef0107"},
  {t:"Young striker breaks scoring record for his country",c:"International",e:"🌍",g:"#00e676,#ff9100"},
  {t:"Manager praises squad depth after cup win",c:"Premier League",e:"👏",g:"#ff9100,#00b0ff"},
  {t:"Underdogs stun giants in European night of drama",c:"Champions League",e:"⚡",g:"#7a5cff,#00e676"},
  {t:"Teenage winger tipped as La Liga's next star",c:"La Liga",e:"✨",g:"#a50044,#ff9100"},
  {t:"Qualifiers: group leaders confirmed this week",c:"International",e:"🥇",g:"#00b0ff,#00e676"}
];
const matches = [
  {h:"ars",a:"liv",hs:2,as:1,st:"FT",date:"Sat 15:00",ven:"Emirates Stadium",ev:"Saka 23', Kane-style header 67' (fictional)"},
  {h:"mci",a:"che",hs:3,as:3,st:"FT",date:"Sat 17:30",ven:"Etihad Stadium",ev:"Six-goal thriller (fictional)"},
  {h:"rma",a:"bar",hs:null,as:null,st:"Upcoming",date:"Sun 20:00",ven:"Santiago Bernabéu",ev:"El Clásico. Kick-off 20:00 (fictional fixture)"},
  {h:"bay",a:"psg",hs:1,as:2,st:"FT",date:"Tue 20:00",ven:"Allianz Arena",ev:"Late winner in stoppage time (fictional)"},
  {h:"liv",a:"mci",hs:null,as:null,st:"Upcoming",date:"Next Sat",ven:"Anfield",ev:"Top-of-the-table clash (fictional fixture)"},
  {h:"che",a:"ars",hs:0,as:0,st:"FT",date:"Last Sun",ven:"Stamford Bridge",ev:"Goalless London derby (fictional)"}
];
// [name, W, D, L, GF, GA] after 12 sample games each
const league = [["Arsenal",9,2,1,24,8],["Manchester City",8,2,2,27,11],["Liverpool",8,1,3,22,12],["Chelsea",7,3,2,21,12],["Aston Villa",7,2,3,19,13],["Tottenham",6,3,3,20,15],["Newcastle",6,3,3,18,13],["Manchester United",6,2,4,17,15],["Brighton",5,4,3,18,16],["West Ham",5,3,4,16,17],["Brentford",5,2,5,17,17],["Fulham",4,4,4,14,15],["Crystal Palace",4,4,4,13,14],["Everton",4,3,5,12,15],["Wolves",4,2,6,13,19],["Bournemouth",3,4,5,13,18],["Nottm Forest",3,3,6,11,18],["Leicester",2,4,6,12,22],["Ipswich",2,3,7,10,21],["Southampton",1,3,8,8,24]]
  .map(([name,w,d,l,gf,ga])=>({name,p:w+d+l,w,d,l,gf,ga,gd:gf-ga,pts:w*3+d}));

/* ===== 2. HELPERS ===== */
const $ = id => document.getElementById(id);
const clubById = id => clubs.find(c => c.id === id);
const badge = (c, sm) => `<span class="badge ${sm ? "sm" : ""}" style="background:${c.color}">${c.short}</span>`;
const initials = n => n.split(" ").map(w => w[0]).slice(0, 2).join("");
let favs = [];
try { favs = JSON.parse(localStorage.getItem("fz-favs")) || []; } catch (e) {}

/* ===== 3. NEWS ===== */
const cats = ["All", "Premier League", "Champions League", "La Liga", "International"];
let newsCat = "All";
const newsCard = n => `<article class="card"><div class="news-img" style="background:linear-gradient(135deg,${n.g})">${n.e}</div><span class="tag">${n.c}</span><h3>${n.t}</h3><p class="muted">Sample headline</p></article>`;
function renderNews() {
  $("newsTabs").innerHTML = cats.map(c => `<button class="btn ${c === newsCat ? "on" : "ghost"}" data-cat="${c}">${c}</button>`).join("");
  $("newsGrid").innerHTML = news.filter(n => newsCat === "All" || n.c === newsCat).map(newsCard).join("");
}
$("newsTabs").addEventListener("click", e => { if (e.target.dataset.cat) { newsCat = e.target.dataset.cat; renderNews(); } });

/* ===== 4. PLAYERS (search + filter + favourites) ===== */
let favOnly = false;
function renderPlayers() {
  const q = $("globalSearch").value.toLowerCase().trim();
  const pos = $("posFilter").value, club = $("clubFilter").value;
  const list = players.filter(p => {
    const c = clubById(p.club);
    return (!q || (p.name + c.name + p.nat).toLowerCase().includes(q)) &&
      (pos === "All" || p.pos === pos) && (club === "All" || p.club === club) &&
      (!favOnly || favs.includes(p.name));
  });
  $("playerGrid").innerHTML = list.length ? list.map(p => {
    const c = clubById(p.club), f = favs.includes(p.name);
    return `<article class="card player"><button class="fav" data-name="${p.name}" aria-label="Favourite ${p.name}">${f ? "♥" : "♡"}</button>
      <span class="badge" style="background:${c.color}">${initials(p.name)}</span><h3>${p.name}</h3>
      <p class="muted">${p.pos} · ${p.nat}</p><p>${c.name}</p>
      <div class="stats"><div><b>${p.goals}</b>Goals</div><div><b>${p.assists}</b>Assists</div></div></article>`;
  }).join("") : `<p class="empty">No players found. Try another search or filter.</p>`;
}
$("playerGrid").addEventListener("click", e => {
  const n = e.target.dataset.name; if (!n) return;
  favs = favs.includes(n) ? favs.filter(x => x !== n) : [...favs, n];
  try { localStorage.setItem("fz-favs", JSON.stringify(favs)); } catch (err) {}
  renderPlayers();
});
$("clubFilter").innerHTML += clubs.map(c => `<option value="${c.id}">${c.name}</option>`).join("");
["posFilter", "clubFilter"].forEach(id => $(id).addEventListener("change", renderPlayers));
$("globalSearch").addEventListener("input", () => {
  renderPlayers();
  if ($("globalSearch").value) $("players").scrollIntoView();
});
$("favOnly").addEventListener("click", e => {
  favOnly = !favOnly; e.target.classList.toggle("on", favOnly);
  e.target.textContent = favOnly ? "♥ Favourites only" : "♡ Favourites only";
  renderPlayers();
});

/* ===== 5. CLUBS (click for details) ===== */
const clubCard = c => `<article class="card club" data-club="${c.id}" tabindex="0">${badge(c)}<h3>${c.name}</h3><p class="muted">${c.league}</p></article>`;
$("clubGrid").innerHTML = clubs.map(clubCard).join("");
$("trendingGrid").innerHTML = clubs.slice(0, 4).map(clubCard).join("");
function openClub(id) {
  const c = clubById(id), sq = players.filter(p => p.club === id);
  $("modalBody").innerHTML = `<div style="display:flex;gap:1rem;align-items:center">${badge(c)}<div><h2>${c.name}</h2><p class="muted">${c.league}</p></div></div>
    <p style="margin:1rem 0">📍 ${c.city} · 🏟️ ${c.stadium} · 📅 Founded ${c.founded}</p>
    <h3>Featured players (sample stats)</h3><ul>${sq.length ? sq.map(p => `<li>${p.name} · ${p.pos} · ${p.goals} goals, ${p.assists} assists</li>`).join("") : "<li>No sample players yet.</li>"}</ul>`;
  $("modal").hidden = false;
}
document.addEventListener("click", e => { const c = e.target.closest("[data-club]"); if (c) openClub(c.dataset.club); });
document.addEventListener("keydown", e => {
  if (e.key === "Enter" && e.target.dataset.club) openClub(e.target.dataset.club);
  if (e.key === "Escape") $("modal").hidden = true;
});
$("closeModal").onclick = () => $("modal").hidden = true;
$("modal").addEventListener("click", e => { if (e.target.id === "modal") $("modal").hidden = true; });

/* ===== 6. MATCHES ===== */
const matchCard = m => {
  const h = clubById(m.h), a = clubById(m.a);
  return `<article class="card match" tabindex="0"><p class="muted">${m.date} · <span class="${m.st === "FT" ? "" : "live"}">${m.st}</span></p>
    <div class="row"><div>${badge(h, 1)}<br>${h.short}</div><div class="score">${m.hs === null ? "vs" : m.hs + " - " + m.as}</div><div>${badge(a, 1)}<br>${a.short}</div></div>
    <button class="btn ghost" data-more>Match details</button>
    <div class="more">🏟️ ${m.ven}<br>${m.ev}</div></article>`;
};
$("matchGrid").innerHTML = matches.map(matchCard).join("");
$("featuredGrid").innerHTML = matches.slice(0, 3).map(matchCard).join("");
document.addEventListener("click", e => { if (e.target.dataset.more !== undefined) e.target.closest(".match").classList.toggle("open"); });

/* ===== 7. LEAGUE TABLE ===== */
let sortKey = "pts";
function renderTable() {
  const rows = [...league].sort((a, b) => b[sortKey] - a[sortKey] || b.gd - a.gd || b.gf - a.gf);
  $("table").querySelector("tbody").innerHTML = rows.map((t, i) => {
    const cls = sortKey !== "pts" ? "" : i < 4 ? "ucl" : i < 6 ? "uel" : i >= league.length - 3 ? "rel" : "";
    return `<tr class="${cls}"><td>${i + 1}</td><td>${t.name}</td><td>${t.p}</td><td>${t.w}</td><td>${t.d}</td><td>${t.l}</td><td>${t.gf}</td><td>${t.ga}</td><td>${t.gd > 0 ? "+" : ""}${t.gd}</td><td>${t.pts}</td></tr>`;
  }).join("");
}
$("table").querySelector("thead").addEventListener("click", e => { if (e.target.dataset.k) { sortKey = e.target.dataset.k; renderTable(); } });

/* ===== 8. HEADLINES, THEME, MOBILE MENU, LOADER ===== */
$("headlineGrid").innerHTML = news.slice(0, 3).map(newsCard).join("");
const setTheme = t => { document.documentElement.dataset.theme = t; $("themeBtn").textContent = t === "dark" ? "🌙" : "☀️"; try { localStorage.setItem("fz-theme", t); } catch (e) {} };
let saved = "dark"; try { saved = localStorage.getItem("fz-theme") || "dark"; } catch (e) {}
setTheme(saved);
$("themeBtn").onclick = () => setTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark");
$("menuBtn").onclick = () => $("nav").classList.toggle("open");
$("nav").addEventListener("click", () => $("nav").classList.remove("open"));
renderNews(); renderPlayers(); renderTable();
window.addEventListener("load", () => setTimeout(() => $("loader").classList.add("done"), 900));
