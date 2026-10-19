/* =========================================================
   GEMS — shared header, footer, lists and pop-ups.
   ========================================================= */
(function () {
  const D = window.GEMS_DATA || {};
  const page = document.body.dataset.page || "home";
  /* Site root, worked out from where this script lives (assets/js/site.js),
     so links work on gems-jk.org, on username.github.io/repo, and locally. */
  const ROOT = new URL("../../", document.currentScript.src).href;
  const u = p => ROOT + p.replace(/^\//, "");

  /* ---------- Every new page starts at the very top ----------
     Browsers (and embedded previews) sometimes keep or restore the old scroll
     position. Only a real in-page anchor like #host or #comments may override it. */
  const toTop = () => window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  if ("scrollRestoration" in history) history.scrollRestoration = "manual";
  const jumpTarget = () => {
    const id = decodeURIComponent(location.hash.slice(1));
    return id && document.getElementById(id);
  };
  const startAtTop = () => { const t = jumpTarget(); if (t) t.scrollIntoView({ behavior: "instant" }); else toTop(); };
  window.addEventListener("pageshow", startAtTop);
  window.GEMS_TOTOP = toTop;

  /* ---------- Settings you may want to change ---------- */
  const LINKS = {
    email1: "info@gems-stem.org",
    email2: "j2kim2027@chadwickschool.org",
    instagram: "https://www.instagram.com/gems_forall/",
    tiktok: "https://www.tiktok.com/@gems_forall"
  };

  /* Initiatives dropdown (also used for the pill bar on each initiative page) */
  const INITIATIVES = [
    { id: "hidden_gems", href: "hidden_gems/", label: "Hidden GEMS", icon: '<i class="ion ion-mic"></i>', desc: "Our podcast with women in STEM" },
    { id: "opal", href: "opal/", label: "OPAL", icon: '<i class="ph ph-book-open"></i>', desc: "A STEM textbook and 56-experiment kit for ages 10–14" },
    { id: "gems_lab", href: "gems_lab/", label: "GEMS Lab", icon: '<i class="ion ion-flask"></i>', desc: "37 physics experiments you can run at home, with full lab worksheets" },
    { id: "workshops", href: "workshops/", label: "In-Person Workshops", icon: '<i class="ph ph-users"></i>', desc: "Multi-day STEM workshops at children's centers" }
  ];
  const inInitiatives = page === "initiatives" || INITIATIVES.some(i => i.id === page);

  const NAV = [
    ["home", "/", "Home"],
    ["about", "/about/", "About"],
    ["initiatives", "/initiatives/", "Initiatives"],
    ["collaborators", "/collaborators/", "Collaborators"],
    ["newsletter", "/newsletter/", "Newsletter"],
    ["testimonials", "/testimonials/", "Testimonials"],
    ["contact", "/contact/", "Contact"]
  ];

  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  /* ---------- Header ---------- */
  const dropItems = INITIATIVES.map(i => `
    <a class="drop-item${i.id === page ? " current" : ""}" href="${u(i.href)}"${i.id === page ? ' aria-current="page"' : ""}>
      <span class="drop-icon">${i.icon}</span>
      <span><span class="drop-title">${i.label}</span><span class="drop-desc">${i.desc}</span></span>
    </a>`).join("");

  const navLinks = NAV.map(([id, href, label]) => {
    if (id === "initiatives") return `
      <div class="nav-drop">
        <a href="${u(href)}" class="nav-drop-link${inInitiatives ? " active" : ""}"${page === "initiatives" ? ' aria-current="page"' : ""}>${label}</a>
        <button class="nav-drop-btn" aria-expanded="false" aria-label="Show initiatives"><i class="ph ph-caret-down"></i></button>
        <div class="drop-panel" role="menu">${dropItems}</div>
      </div>`;
    return `<a href="${u(href)}"${id === page ? ' class="active" aria-current="page"' : ""}>${label}</a>`;
  }).join("");

  const mobileLinks = NAV.map(([id, href, label]) => {
    const a = `<a href="${u(href)}"${(id === page || (id === "initiatives" && page === "initiatives")) ? ' class="active" aria-current="page"' : ""}>${label}</a>`;
    if (id !== "initiatives") return a;
    return a + `<div class="mobile-sub">${INITIATIVES.map(i =>
      `<a href="${u(i.href)}"${i.id === page ? ' class="active" aria-current="page"' : ""}>${i.icon}${i.label}</a>`).join("")}</div>`;
  }).join("");

  document.body.insertAdjacentHTML("afterbegin", `
    <header class="site-header">
      <a class="logo" href="${u("/")}" aria-label="GEMS home"><img src="${u("assets/img/gems-logo.png")}" alt="GEMS" data-label="Logo"></a>
      <nav class="site-nav" aria-label="Main">${navLinks}</nav>
      <div class="header-actions">
        <a class="btn btn-pink shadow-ink header-cta" href="${u("get_involved/")}">Get involved<i class="ph ph-arrow-right"></i></a>
        <button class="header-signin js-account" data-open="signin" data-icon aria-label="Sign in" title="Sign in"><i class="ph ph-user"></i></button>
      </div>
      <button class="menu-toggle" aria-label="Open menu" aria-expanded="false"><i class="ph ph-list"></i></button>
    </header>
    <div class="mobile-menu">${mobileLinks}
      <div class="mobile-actions">
        <a class="btn btn-pink shadow-ink" href="${u("get_involved/")}">Get involved<i class="ph ph-arrow-right"></i></a>
        <button class="btn btn-cream shadow-ink js-account" data-open="signin">Sign in</button>
      </div>
    </div>
  `);

  const toggle = document.querySelector(".menu-toggle");
  toggle.addEventListener("click", () => {
    const open = document.body.classList.toggle("menu-open");
    toggle.setAttribute("aria-expanded", open);
    toggle.innerHTML = open ? '<i class="ph ph-x"></i>' : '<i class="ph ph-list"></i>';
  });

  /* Dropdown: opens on hover (CSS) and on click/tap or keyboard (here) */
  const drop = document.querySelector(".nav-drop"), dropBtn = drop.querySelector(".nav-drop-btn");
  const setDrop = open => { drop.classList.toggle("open", open); dropBtn.setAttribute("aria-expanded", open); };
  dropBtn.addEventListener("click", e => { e.stopPropagation(); setDrop(!drop.classList.contains("open")); });
  document.addEventListener("click", e => { if (!drop.contains(e.target)) setDrop(false); });
  drop.addEventListener("keydown", e => { if (e.key === "Escape") { setDrop(false); dropBtn.focus(); } });
  drop.addEventListener("focusout", e => { if (!drop.contains(e.relatedTarget)) setDrop(false); });

  /* ---------- Footer ---------- */
  document.body.insertAdjacentHTML("beforeend", `
    <footer class="site-footer">
      <div class="footer-cols">
        <div>
          <div class="footer-brand">GEMS</div>
          <p class="footer-tag">Empower an alliance for STEM thinkers of all genders.</p>
        </div>
        <div>
          <div class="footer-h">Explore</div>
          <div class="footer-links">
            <a href="${u("about/")}">About</a>
            <a href="${u("initiatives/")}">Initiatives</a>
            <a href="${u("hidden_gems/")}">Hidden GEMS</a>
            <a href="${u("opal/")}">OPAL</a>
            <a href="${u("gems_lab/")}">GEMS Lab</a>
            <a href="${u("workshops/")}">In-Person Workshops</a>
            <a href="${u("collaborators/")}">Collaborators</a>
            <a href="${u("newsletter/")}">Newsletter</a>
            <a href="${u("testimonials/")}">Testimonials</a>
            <a href="${u("get_involved/")}">Get Involved</a>
          </div>
        </div>
        <div>
          <div class="footer-h">Connect</div>
          <div class="footer-links">
            <a href="mailto:${LINKS.email1}"><i class="ion ion-mail"></i>${LINKS.email1}</a>
            <a href="mailto:${LINKS.email2}"><i class="ion ion-mail"></i>${LINKS.email2}</a>
            <a href="${LINKS.instagram}" target="_blank" rel="noopener"><i class="ph ph-instagram-logo"></i>@gems_forall</a>
            <a href="${LINKS.tiktok}" target="_blank" rel="noopener"><i class="ph ph-tiktok-logo"></i>@gems_forall</a>
          </div>
        </div>
      </div>
      <div class="footer-rule"></div>
      <div class="footer-bottom">
        <span>© GEMS - Girls in Engineering, Mathematics, and Science.</span>
        <nav class="footer-legal" aria-label="Legal">
          <a href="${u("privacy/")}"${page === "privacy" ? ' aria-current="page"' : ""}>Privacy Policy</a>
          <a href="${u("terms/")}"${page === "terms" ? ' aria-current="page"' : ""}>Terms of Service</a>
        </nav>
        <span>Chadwick International · Songdo, South Korea</span>
      </div>
    </footer>
  `);

  /* ---------- Lists rendered from data.js ---------- */
  const watchUrl = (kind, item) => kind === "podcast"
    ? u("hidden_gems/watch.html") + "#podcast-" + item.slug
    : u("gems_lab/watch.html") + "#lab-" + item.slug;
  const plural = (n, word) => `${n} ${word}${n === 1 ? "" : "s"}`;

  const expCard = (e, i) => `
    <a class="exp-card" href="${watchUrl("lab", e)}" aria-label="Watch: ${esc(e.title)}">
      <div class="thumb"><img src="${esc(u(e.image))}" alt="" loading="lazy" data-label="Experiment ${i + 1} thumbnail">
        <span class="play-badge" aria-hidden="true"><i class="ph ph-play"></i></span>
        ${e.length ? `<span class="len">${esc(e.length)}</span>` : ""}</div>
      <div class="inner">
        <h3 class="display-m">${esc(e.title)}</h3>
        <p class="body">${esc(e.text)}</p>
        <div class="views">${plural(e.views, "view")}</div>
      </div>
    </a>`;

  const epCard = (e, i) => `
    <article class="ep-card c-${e.color || "pink"}">
      <div class="display-m ep-num">${(D.episodes || []).indexOf(e) + 1 || i + 1}</div>
      <h3 class="display-m"><a href="${watchUrl("podcast", e)}">${esc(e.title)}</a></h3>
      <p class="body">${esc(e.text)}</p>
      <div class="ep-play">
        <a href="${watchUrl("podcast", e)}"><i class="ph ph-play"></i>PLAY</a>
        <span class="views">${plural(e.views, "view")}</span>
      </div>
    </article>`;

  const briefingUrl = b => u("newsletter/briefing.html") + "#" + b.slug;
  const briefing = b => `
    <article class="briefing">
      <div class="briefing-side bg-${b.color}">
        <div>
          <div class="meta"><i class="ph ph-calendar-blank"></i>${esc(b.date)}</div>
          <div class="cat">${esc(b.category)}</div>
        </div>
        <div class="meta"><i class="ph ph-map-pin"></i>${esc(b.place)}</div>
      </div>
      <div class="briefing-body">
        <h3 class="display-m"><a href="${briefingUrl(b)}">${esc(b.title)}</a></h3>
        <p class="body">${esc(b.text)}</p>
        <a class="text-link" href="${briefingUrl(b)}">${esc(b.button)}<i class="ph ph-arrow-up-right"></i></a>
      </div>
    </article>`;

  /* Full briefing page (newsletter/briefing.html#slug) */
  const renderPost = () => {
    const el = document.getElementById("post");
    if (!el) return;
    const list = D.briefings || [];
    const slug = decodeURIComponent(location.hash.slice(1));
    const i = list.findIndex(b => b.slug === slug);
    if (i < 0) {
      document.title = "Briefing not found · GEMS";
      el.innerHTML = `<section class="post-head"><div class="eyebrow">Newsletter</div>
        <h1 class="post-title">That briefing isn't here.</h1>
        <p class="body">It may have been renamed or removed.</p>
        <a class="btn btn-dark shadow-pink" href="${u("newsletter/")}" style="margin-top:30px">All briefings<i class="ph ph-arrow-right"></i></a></section>`;
      return;
    }
    const b = list[i];
    const prev = list[i - 1], next = list[i + 1];
    document.title = b.title + " · GEMS";
    el.innerHTML = `
      <section class="post-head">
        <div class="eyebrow">${esc(b.category)}</div>
        <h1 class="post-title">${esc(b.title)}</h1>
        <p class="body post-lede">${esc(b.text)}</p>
      </section>
      <div class="post-rule"></div>
      <section class="post-body">
        ${(b.body || []).map(p => `<p class="body">${esc(p)}</p>`).join("")}
        <div class="post-images">
          ${(b.images || []).map((src, k) => `<img src="${esc(u(src))}" alt="${esc(b.title)} — photo ${k + 1}" loading="${k ? "lazy" : "eager"}" data-label="Photo ${k + 1}">`).join("")}
        </div>
        <nav class="post-nav" aria-label="More briefings">
          ${prev ? `<a href="${briefingUrl(prev)}"><span class="eyebrow">← Newer</span><span class="post-nav-title">${esc(prev.title)}</span></a>` : "<span></span>"}
          ${next ? `<a href="${briefingUrl(next)}" class="next"><span class="eyebrow">Older →</span><span class="post-nav-title">${esc(next.title)}</span></a>` : "<span></span>"}
        </nav>
      </section>`;
    toTop();
  };
  renderPost();
  window.addEventListener("hashchange", renderPost);

  /* Collaborators */
  const badge = c => `<span class="collab-badge">${esc(c.short)}</span>`;
  const collabStrip = () => (D.collaborators || []).map(c =>
    `<a class="collab-badge" href="${u("collaborators/")}#${esc(c.id)}" title="${esc(c.name)}">${esc(c.short)}</a>`).join("");
  const collabEntry = (c, i) => `
    <article class="collab${i % 2 ? " flip" : ""}" id="${esc(c.id)}">
      <div class="collab-logo">${badge(c)}</div>
      <div class="collab-body">
        <h2 class="collab-name">${esc(c.name)}</h2>
        <div class="collab-meta">${esc(c.meta)}</div>
        ${c.website ? `<a class="collab-site" href="${esc(c.website)}" target="_blank" rel="noopener">Visit website →</a>` : ""}
        <div class="collab-rel"><div class="collab-label pink">Our relationship</div><p class="body">${esc(c.relationship)}</p></div>
        ${c.about ? `<p class="body collab-about">${esc(c.about)}</p>` : ""}
        ${(c.together || []).length ? `<div class="collab-label">What we do together</div>
          <ul class="collab-list">${c.together.map(t => `<li><i class="ph ph-diamond"></i>${esc(t)}</li>`).join("")}</ul>` : ""}
        ${c.pending ? `<span class="collab-pending">Statement pending</span>` : ""}
      </div>
    </article>`;

  /* ---------- Initiative pages ---------- */
  const pills = current => INITIATIVES.map(i =>
    `<a class="pill${i.id === current ? " active" : ""}" href="${u(i.href)}"${i.id === current ? ' aria-current="page"' : ""}>${i.label}</a>`).join("");

  const CAT = Object.fromEntries((D.labCategories || []).map(c => [c.id, c]));
  const expBySlug = Object.fromEntries((D.experiments || []).map(e => [e.slug, e]));
  const libCard = x => {
    const c = CAT[x.category] || {}, v = x.video && expBySlug[x.video];
    const search = [x.title, x.concept, c.label].join(" ").toLowerCase();
    return `<article class="lib-card" data-cat="${esc(x.category)}" data-search="${esc(search)}">
      <div class="lib-num bg-${c.color || "pink"}">${String(x.num).padStart(2, "0")}</div>
      <div class="lib-body">
        <div class="lib-tags"><span class="tag-outline">${esc(c.label || "")}</span><span class="tag-solid">Phase ${x.phase}</span></div>
        <h3 class="lib-title">${esc(x.title)}</h3>
        <p class="lib-concept">${esc(x.concept)}</p>
        ${v ? `<a class="btn btn-pink shadow-ink lib-btn" href="${watchUrl("lab", v)}"><i class="ph ph-play"></i>Watch</a>`
            : `<span class="btn lib-btn lib-soon" aria-disabled="true"><i class="ph ph-play"></i>Filming</span>`}
      </div>
    </article>`;
  };

  const epGuestCard = (e, i) => `
    <article class="guest-card" data-cat="${esc(e.category || "")}">
      <div class="guest-top"><span class="guest-cat">${esc(e.category || "")}</span>
        ${e.slug ? `<span class="guest-badge ep">Ep ${String(i + 1).padStart(2, "0")}</span>` : `<span class="guest-badge soon">Coming soon</span>`}</div>
      <h3 class="guest-name">${esc(e.guest)}</h3>
      ${e.role ? `<p class="guest-role">${esc(e.role)}</p>` : ""}
      ${e.affiliation ? `<p class="guest-aff">${esc(e.affiliation)}</p>` : ""}
      ${e.slug ? `<a class="guest-play" href="${watchUrl("podcast", e)}"><i class="ph ph-play"></i>Play episode</a>`
               : `<p class="guest-soon">Episode coming soon.</p>`}
    </article>`;

  const latestEpisode = () => {
    const list = D.episodes || [], i = list.length - 1, e = list[i];
    if (!e) return `<div class="empty-box">Our first episode is on its way.</div>`;
    return `<article class="latest-ep">
      <div class="latest-num">Ep ${String(i + 1).padStart(2, "0")}</div>
      <div>
        <div class="guest-cat">${esc(e.category || "")}</div>
        <h3 class="latest-title"><a href="${watchUrl("podcast", e)}">${esc(e.title)}</a></h3>
        <p class="body">${esc(e.text)}</p>
        <a class="btn btn-dark shadow-pink" href="${watchUrl("podcast", e)}" style="margin-top:20px"><i class="ph ph-play"></i>Play episode</a>
      </div>
    </article>`;
  };

  const pastWorkshops = () => (D.briefings || []).filter(b => /^tutoring-workshop/.test(b.slug)).map(b => `
    <article class="tl-item">
      <div class="tl-date">${esc(b.date)}</div>
      <h3 class="tl-title"><a href="${u("newsletter/briefing.html")}#${esc(b.slug)}">${esc(b.title)}</a></h3>
      <p class="tl-place">Baraka Children's Center, South Korea</p>
      <p class="body">${esc(b.text)}</p>
      <a class="text-link" href="${u("newsletter/briefing.html")}#${esc(b.slug)}">Read the briefing<i class="ph ph-arrow-up-right"></i></a>
    </article>`).join("");

  /* Filter chips + search for the library and the episode grid */
  const wireFilter = (root, items, getSearch) => {
    const chips = root.querySelectorAll("[data-filter]"), box = root.querySelector("[data-search-input]"), empty = root.querySelector("[data-empty]");
    let cat = "all";
    const apply = () => {
      const q = (box && box.value || "").trim().toLowerCase(); let shown = 0;
      items().forEach(el => {
        const ok = (cat === "all" || el.dataset.cat === cat) && (!q || (getSearch(el) || "").includes(q));
        el.hidden = !ok; if (ok) shown++;
      });
      if (empty) empty.hidden = shown > 0;
    };
    chips.forEach(ch => ch.addEventListener("click", () => {
      cat = ch.dataset.filter;
      chips.forEach(c => { const on = c === ch; c.classList.toggle("active", on); c.setAttribute("aria-pressed", on); });
      apply();
    }));
    if (box) box.addEventListener("input", apply);
  };

  /* ---------- Testimonials: one section per school, photo/video tiles + viewer ---------- */
  const T_SHOW = 3;                                   // one row on desktop (2 on tablet/phone) before "Show all"
  const mmss = s => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
  const tTile = (m, si, mi) => `
    <button class="t-tile${mi >= T_SHOW ? " t-extra" : ""}" data-school="${si}" data-item="${mi}"
            aria-label="${m.type === "video" ? "Play video" : "View photo"} ${mi + 1}">
      <img src="${u("assets/testimonials/" + (m.type === "video" ? m.poster : m.src))}" alt="" loading="lazy" decoding="async" width="${m.w}" height="${m.h}">
      ${m.type === "video" ? `<span class="t-play"><i class="ph ph-play"></i></span><span class="t-dur">${mmss(m.duration || 0)}</span>` : ""}
    </button>`;
  const tSchool = (t, si) => {
    const media = t.media || [];
    const nP = media.filter(m => m.type === "photo").length, nV = media.length - nP;
    const counts = [nP && plural(nP, "photo"), nV && plural(nV, "video")].filter(Boolean).join(" · ");
    return `<section class="section rule-top wrap t-school" id="school-${t.school}">
      <div class="t-head">
        <div><div class="eyebrow ink">${String(si + 1).padStart(2, "0")} · Testimonials</div><h2 class="display-m">${esc(t.name || "School " + t.school)}</h2></div>
        ${media.length ? `<span class="t-count">${counts}</span>` : `<span class="sticker bg-orange">Coming soon</span>`}
      </div>
      ${media.length ? `<div class="t-grid">${media.map((m, mi) => tTile(m, si, mi)).join("")}</div>
        ${media.length > 2 ? `<button class="btn btn-cream shadow-ink t-more${media.length <= T_SHOW ? " t-more-narrow" : ""}" aria-expanded="false">Show all ${media.length}<i class="ph ph-caret-down"></i></button>` : ""}`
      : `<div class="t-grid">${["camera", "video-camera", "camera"].map(ic => `<div class="t-empty"><i class="ph ph-${ic}"></i><span>${ic === "camera" ? "Photo" : "Video"} coming soon</span></div>`).join("")}</div>`}
    </section>`;
  };

  document.querySelectorAll("[data-render]").forEach(el => {
    const [kind, limit] = el.dataset.render.split(":");
    const n = limit ? +limit : Infinity;
    const exps = (D.experiments || []).map((e, i) => ({ ...e, _i: i }));
    if (kind === "experiments") el.innerHTML = exps.slice(0, n).map(expCard).join("");
    if (kind === "featured") el.innerHTML = exps.filter(e => e.featured).slice(0, n).map(expCard).join("");
    if (kind === "featured-episodes") el.innerHTML = (D.episodes || []).filter(e => e.featured).slice(0, n).map(epCard).join("");
    if (kind === "episodes") el.innerHTML = (D.episodes || []).slice(0, n).map(epCard).join("");
    if (kind === "briefings") el.innerHTML = (D.briefings || []).map(briefing).join("");
    if (kind === "collab-strip") el.innerHTML = collabStrip();
    if (kind === "init-pills") el.innerHTML = pills(el.dataset.current);
    if (kind === "library") el.innerHTML = (D.library || []).map(libCard).join("");
    if (kind === "lab-filters") el.innerHTML = `<button class="chip active" data-filter="all" aria-pressed="true">All</button>` +
      (D.labCategories || []).map(c => `<button class="chip" data-filter="${esc(c.id)}" aria-pressed="false">${esc(c.label)}</button>`).join("");
    if (kind === "lab-extra") {
      const inLib = new Set((D.library || []).map(x => x.video).filter(Boolean));
      el.innerHTML = (D.experiments || []).map((e, i) => ({ ...e, _i: i })).filter(e => !inLib.has(e.slug)).map(expCard).join("");
    }
    if (kind === "guests") el.innerHTML = (D.episodes || []).map(epGuestCard).join("") +
      (D.upcomingGuests || []).map(g => epGuestCard(g, -1)).join("");
    if (kind === "guest-filters") {
      const cats = [...new Set([...(D.episodes || []), ...(D.upcomingGuests || [])].map(e => e.category).filter(Boolean))];
      el.innerHTML = `<button class="chip active" data-filter="all" aria-pressed="true">All</button>` +
        cats.map(c => `<button class="chip" data-filter="${esc(c)}" aria-pressed="false">${esc(c)}</button>`).join("");
    }
    if (kind === "latest-episode") el.innerHTML = latestEpisode();
    if (kind === "past-workshops") el.innerHTML = pastWorkshops();
    if (kind === "lab-count") el.textContent = (D.library || []).length;
    if (kind === "testimonials") el.innerHTML = (D.testimonials || []).map(tSchool).join("");
    if (kind === "school-count") el.textContent = (D.testimonials || []).length;
    if (kind === "collaborators") el.innerHTML = (D.collaborators || []).map(collabEntry).join("");
    if (kind === "collaborators" && location.hash) {          // jump to #swe / #ttta after the list is drawn
      const t = document.getElementById(decodeURIComponent(location.hash.slice(1)));
      if (t) requestAnimationFrame(() => t.scrollIntoView());
    }
  });
  document.querySelectorAll("[data-filter-root]").forEach(root =>
    wireFilter(root, () => root.querySelectorAll("[data-cat]"), el => el.dataset.search || el.textContent.toLowerCase()));
  if (D.opalAmazonUrl) document.querySelectorAll("[data-amazon]").forEach(a => {
    a.href = D.opalAmazonUrl; a.classList.remove("btn-soon"); a.removeAttribute("aria-disabled");
    a.querySelector("span").textContent = "Get OPAL on Amazon";
  });
  document.querySelectorAll("[data-stat]").forEach(el => {
    const k = el.dataset.stat;
    el.textContent = k === "experiments" ? (D.experiments || []).length : (D.labStats || {})[k] ?? 0;
  });

  /* ---------- Missing images show a labelled placeholder ---------- */
  const swapMissing = img => {
    if (img.dataset.swapped) return;
    img.dataset.swapped = "1";
    const box = document.createElement("div");
    box.className = "img-missing";
    box.textContent = img.dataset.label || img.getAttribute("src").split("/").pop();
    img.replaceWith(box);
  };
  window.addEventListener("error", e => { if (e.target.tagName === "IMG") swapMissing(e.target); }, true);
  document.querySelectorAll("img").forEach(img => { if (img.complete && img.naturalWidth === 0 && img.getAttribute("src")) swapMissing(img); });

  /* ---------- Pop-ups ---------- */
  document.body.insertAdjacentHTML("beforeend", `
    <div class="modal" id="modal-signin" role="dialog" aria-modal="true" aria-labelledby="signin-title">
      <div class="modal-box auth-box">
        <button class="modal-close" data-close aria-label="Close"><i class="ph ph-x"></i></button>
        <div id="signin-body"></div>
      </div>
    </div>
    <div class="modal" id="modal-account" role="dialog" aria-modal="true" aria-labelledby="account-title">
      <div class="modal-box">
        <button class="modal-close" data-close aria-label="Close"><i class="ph ph-x"></i></button>
        <div class="eyebrow">Your account</div>
        <h2 class="display-m" id="account-title"></h2>
        <p class="body">You can comment on podcast episodes and GEMS Lab experiments, and delete your own comments.</p>
        <button class="btn btn-dark shadow-pink" id="signout-btn" style="margin-top:24px">Sign out</button>
      </div>
    </div>
    <div class="modal" id="modal-media" role="dialog" aria-modal="true">
      <div class="modal-box wide">
        <button class="modal-close" data-close aria-label="Close"><i class="ph ph-x"></i></button>
        <div class="eyebrow" id="media-eyebrow"></div>
        <h2 class="display-m" id="media-title"></h2>
        <div class="video-frame" id="media-frame"></div>
        <p class="body" id="media-text"></p>
        <a class="text-link" id="media-link" href="#" target="_blank" rel="noopener" hidden style="margin-top:18px">Open in a new tab<i class="ph ph-arrow-up-right"></i></a>
      </div>
    </div>
  `);

  const openModal = id => { document.getElementById(id).classList.add("open"); document.body.style.overflow = "hidden"; };
  const closeModals = () => {
    document.querySelectorAll(".modal.open").forEach(m => m.classList.remove("open"));
    document.getElementById("media-frame").innerHTML = "";
    document.body.style.overflow = "";
  };

  const embed = url => {
    if (!url) return `<div class="img-missing" style="color:#F4F2EB;background:#1A1A1A">Video coming soon</div>`;
    const gd = url.match(/drive\.google\.com\/(?:file\/d\/|open\?id=)([\w-]+)/);
    if (gd) return `<iframe src="https://drive.google.com/file/d/${gd[1]}/preview" allow="autoplay; fullscreen" allowfullscreen></iframe>`;
    const yt = url.match(/(?:youtu\.be\/|v=|shorts\/|embed\/)([\w-]{11})/);
    if (yt) return `<iframe src="https://www.youtube.com/embed/${yt[1]}?autoplay=1" allow="autoplay; encrypted-media; fullscreen" allowfullscreen></iframe>`;
    if (/spotify\.com/.test(url)) return `<iframe src="${url.replace("open.spotify.com/", "open.spotify.com/embed/")}" allow="encrypted-media"></iframe>`;
    if (/\.(mp3|m4a|wav|ogg)$/i.test(url)) return `<audio controls autoplay src="${esc(url)}" style="width:100%;margin-top:40%"></audio>`;
    return `<video controls autoplay src="${esc(url)}"></video>`;
  };

  const showMedia = (eyebrow, item, url) => {
    const link = document.getElementById("media-link");
    link.hidden = !/^https?:/.test(url || "");
    if (!link.hidden) link.href = url;
    document.getElementById("media-eyebrow").textContent = eyebrow + (item.length ? " · " + item.length : "");
    document.getElementById("media-title").textContent = item.title;
    document.getElementById("media-text").textContent = item.text;
    document.getElementById("media-frame").innerHTML = embed(url && !/^https?:/.test(url) ? u(url) : url);
    openModal("modal-media");
  };

  document.addEventListener("click", e => {
    const t = e.target;
    const opener = t.closest("[data-open]");
    if (opener) { e.preventDefault(); closeModals(); document.body.classList.remove("menu-open"); openModal("modal-" + opener.dataset.open); return; }
    if (t.closest("[data-close]") || t.classList.contains("modal")) { closeModals(); return; }
    const exp = t.closest("[data-video]");
    if (exp) { const x = D.experiments[+exp.dataset.video]; showMedia("GEMS Lab", x, x.video); return; }
    const ep = t.closest("[data-episode]");
    if (ep) { const x = D.episodes[+ep.dataset.episode]; showMedia("Hidden GEMS · Episode " + (+ep.dataset.episode + 1), x, x.audio); return; }
    if (t.closest("[data-soon]")) e.preventDefault();
  });
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") closeModals();
  });

  /* ---------- Forms → email via FormSubmit (formsubmit.co) ----------
     Forms with data-formsubmit="Email subject" are sent to FORM_EMAIL.
     The first ever submission makes FormSubmit email an "Activate form" link to that inbox;
     nothing is delivered until it's clicked. */
  const FORM_EMAIL = "bubble.youthimpact@gmail.com";
  document.querySelectorAll("form[data-formsubmit]").forEach(form => {
    const status = form.querySelector(".form-status");
    const say = (msg, kind) => { if (!status) return; status.className = "form-status " + kind; status.innerHTML = msg; status.hidden = false; };
    form.addEventListener("submit", async e => {
      e.preventDefault();
      if (!form.reportValidity()) return;
      const btn = form.querySelector('[type="submit"]'), label = btn.innerHTML;
      const data = Object.fromEntries(new FormData(form).entries());
      if (data._honey) { form.reset(); say("Thanks — your message was sent.", "ok"); return; }   // bot trap
      delete data._honey;
      const payload = { ...data, _subject: form.dataset.formsubmit + (data.name || data.contact_name ? " — " + (data.name || data.contact_name) : ""),
                        _template: "table", _captcha: "false", page: location.href.split("#")[0] };
      if (window.GEMS_DEMO) { say("Preview only — on the real site this is emailed to GEMS.", "info"); return; }
      btn.disabled = true; btn.textContent = "Sending…";
      try {
        const r = await fetch("https://formsubmit.co/ajax/" + FORM_EMAIL, {
          method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(payload)
        });
        const j = await r.json().catch(() => ({}));
        if (r.ok && String(j.success) === "true") {
          form.reset();
          say(`<i class="ph ph-check-circle"></i><span><strong>Thanks — we got it.</strong> We'll reply to your email within a few days.</span>`, "ok");
        } else if (/activat/i.test(j.message || "")) {
          say(`<i class="ph ph-info"></i><span>This form is being set up and isn't sending yet. Please email <a href="mailto:${LINKS.email1}">${LINKS.email1}</a> for now.</span>`, "warn");
        } else throw new Error(j.message || "Send failed");
      } catch (x) {
        say(`<i class="ph ph-warning-circle"></i><span>Your message didn't send. Check your connection and try again, or email <a href="mailto:${LINKS.email1}">${LINKS.email1}</a>.</span>`, "err");
      }
      btn.disabled = false; btn.innerHTML = label;
    });
  });

  /* Contact page: ?topic=... preselects "I'd like to..." (e.g. from "Suggest a guest") */
  const topicSel = document.getElementById("c-topic"), topic = new URLSearchParams(location.search).get("topic");
  if (topicSel && topic) [...topicSel.options].forEach(o => { if (o.value === topic || o.dataset.key === topic) topicSel.value = o.value; });

  /* ---------- Marquee: duplicate the strip so it loops seamlessly ---------- */
  document.querySelectorAll(".marquee-track").forEach(tr => { tr.innerHTML += tr.innerHTML; });

  /* ---------- Accounts: sign-in / create account / reset password ---------- */
  const B = window.GEMS_BACKEND;
  const signinBody = document.getElementById("signin-body");
  let view = "signin";              // "signin" | "signup" | "reset" | "sent"
  let sentTo = "";

  const GOOGLE_ICON = `<svg class="g-icon" width="20" height="20" viewBox="0 0 48 48" aria-hidden="true"><path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z"/><path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/><path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z"/><path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z"/></svg>`;

  const field = (id, label, type, ac, extra = "") => `
    <div class="field auth-field">
      <div class="auth-label-row"><label for="${id}">${label}</label>${extra}</div>
      ${type === "password"
        ? `<div class="pass-wrap"><input id="${id}" type="password" autocomplete="${ac}" minlength="6" required>
             <button type="button" class="pass-toggle" data-toggle-pass="${id}" aria-label="Show password" aria-pressed="false"><i class="ph ph-eye"></i></button></div>`
        : `<input id="${id}" type="${type}" autocomplete="${ac}" ${type === "text" ? 'maxlength="40"' : ""} required>`}
    </div>`;

  const consent = () => `<p class="consent">By continuing, you agree to the GEMS <a href="${u("terms/")}">Terms of Service</a> and <a href="${u("privacy/")}">Privacy Policy</a>.${view === "signup" ? " Under 14? Ask a parent or guardian first." : ""}</p>`;
  const errorBox = `<p class="form-error auth-error" id="signin-error" role="alert" hidden><i class="ph ph-warning-circle"></i><span></span></p>`;
  const demoNote = () => B && B.mode === "demo" ? `<p class="auth-demo">Preview mode — accounts are saved only in this browser.</p>` : "";

  const VIEWS = {
    signin: () => `
      <div class="eyebrow orange">Welcome back</div>
      <h2 class="display-m auth-title" id="signin-title">Sign in to GEMS.</h2>
      <p class="auth-sub">Watch GEMS Lab experiments, listen to Hidden GEMS, and join the discussion.</p>
      <button type="button" class="btn btn-google" data-google>${GOOGLE_ICON}<span>Continue with Google</span></button>
      <div class="or-rule"><span>or sign in with email</span></div>
      <form id="signin-form" novalidate>
        ${field("auth-email", "Email", "email", "email")}
        ${field("auth-pass", "Password", "password", "current-password", `<button type="button" class="auth-link" data-view="reset">Forgot password?</button>`)}
        ${errorBox}
        <button class="btn btn-dark shadow-pink auth-submit" type="submit" data-busy="Signing in…">Sign in</button>
      </form>
      <p class="auth-switch">New to GEMS? <button type="button" class="auth-link strong" data-view="signup">Create an account</button></p>
      ${consent()}${demoNote()}`,

    signup: () => `
      <div class="eyebrow orange">It only takes a minute</div>
      <h2 class="display-m auth-title" id="signin-title">Create your account.</h2>
      <p class="auth-sub">Free for everyone. Your name appears on the comments you post.</p>
      <button type="button" class="btn btn-google" data-google>${GOOGLE_ICON}<span>Sign up with Google</span></button>
      <div class="or-rule"><span>or sign up with email</span></div>
      <form id="signin-form" novalidate>
        ${field("auth-name", "Name shown on comments", "text", "nickname")}
        ${field("auth-email", "Email", "email", "email")}
        ${field("auth-pass", "Password", "password", "new-password")}
        <p class="auth-hint" id="pass-hint"><i class="ph ph-check-circle"></i>At least 6 characters</p>
        ${errorBox}
        <button class="btn btn-dark shadow-pink auth-submit" type="submit" data-busy="Creating account…">Create account</button>
      </form>
      <p class="auth-switch">Already have an account? <button type="button" class="auth-link strong" data-view="signin">Sign in</button></p>
      ${consent()}${demoNote()}`,

    reset: () => `
      <button type="button" class="auth-back" data-view="signin"><i class="ph ph-arrow-left"></i>Back to sign in</button>
      <div class="eyebrow orange">Reset password</div>
      <h2 class="display-m auth-title" id="signin-title">Forgot your password?</h2>
      <p class="auth-sub">Enter the email you signed up with and we'll send you a link to choose a new one.</p>
      <form id="signin-form" novalidate>
        ${field("auth-email", "Email", "email", "email")}
        ${errorBox}
        <button class="btn btn-dark shadow-pink auth-submit" type="submit" data-busy="Sending…">Send reset link</button>
      </form>
      <p class="auth-switch">Signed up with Google? You don't need a password — just use <button type="button" class="auth-link strong" data-view="signin">Continue with Google</button>.</p>
      ${demoNote()}`,

    sent: () => `
      <div class="auth-sent-icon"><i class="ph ph-envelope-simple"></i></div>
      <div class="eyebrow orange">Check your inbox</div>
      <h2 class="display-m auth-title" id="signin-title">Reset link sent.</h2>
      <p class="auth-sub">If an account exists for <strong>${esc(sentTo)}</strong>, you'll get an email with a link to choose a new password. It can take a few minutes, so check your spam folder too.</p>
      <button type="button" class="btn btn-dark shadow-pink auth-submit" data-view="signin">Back to sign in</button>
      <p class="auth-switch">Didn't get it? <button type="button" class="auth-link strong" data-view="reset">Send again</button></p>`
  };

  const renderSignin = (focus = true) => {
    if (!B || B.mode === "off") {
      signinBody.innerHTML = `<div class="eyebrow orange">Coming soon</div>
        <h2 class="display-m auth-title" id="signin-title">Accounts are almost ready.</h2>
        <p class="auth-sub">Until then, you can still read every page on the site.</p>
        <button class="btn btn-dark shadow-pink auth-submit" data-close>Got it</button>`;
      return;
    }
    signinBody.innerHTML = VIEWS[view]();
    if (focus) requestAnimationFrame(() => {
      const first = signinBody.querySelector("input, .auth-submit");
      if (first && document.getElementById("modal-signin").classList.contains("open")) first.focus();
    });
  };
  renderSignin(false);

  const showError = msg => {
    const err = document.getElementById("signin-error");
    if (!err) return;
    err.querySelector("span").textContent = msg; err.hidden = false;
  };
  const setBusy = (btn, busy) => {
    if (!btn) return;
    if (busy) { btn.dataset.label = btn.textContent; btn.textContent = btn.dataset.busy || "Please wait…"; }
    else if (btn.dataset.label) btn.textContent = btn.dataset.label;
    btn.disabled = busy;
  };

  // Every "Sign in" button opens the pop-up on the sign-in screen
  document.addEventListener("click", e => {
    if (e.target.closest('[data-open="signin"]')) { view = "signin"; renderSignin(); }
  }, true);

  signinBody.addEventListener("click", async e => {
    const v = e.target.closest("[data-view]");
    if (v) {
      const keepEmail = (document.getElementById("auth-email") || {}).value || "";
      view = v.dataset.view; renderSignin();
      const em = document.getElementById("auth-email"); if (em && keepEmail) em.value = keepEmail;
      return;
    }
    const tog = e.target.closest("[data-toggle-pass]");
    if (tog) {
      const inp = document.getElementById(tog.dataset.togglePass), show = inp.type === "password";
      inp.type = show ? "text" : "password";
      tog.setAttribute("aria-pressed", show); tog.setAttribute("aria-label", show ? "Hide password" : "Show password");
      tog.innerHTML = `<i class="ph ${show ? "ph-eye-slash" : "ph-eye"}"></i>`;
      inp.focus();
      return;
    }
    const g = e.target.closest("[data-google]");
    if (g) {
      const err = document.getElementById("signin-error"); if (err) err.hidden = true;
      g.disabled = true; g.classList.add("busy");
      try { await B.signInWithGoogle(); if (B.user) closeModals(); }
      catch (x) { showError(x.message); }
      g.disabled = false; g.classList.remove("busy");
    }
  });

  signinBody.addEventListener("input", e => {
    if (e.target.id === "auth-pass") {
      const hint = document.getElementById("pass-hint");
      if (hint) hint.classList.toggle("ok", e.target.value.length >= 6);
    }
    const err = document.getElementById("signin-error"); if (err) err.hidden = true;
  });

  signinBody.addEventListener("submit", async e => {
    e.preventDefault();
    const btn = e.target.querySelector(".auth-submit");
    const val = id => (document.getElementById(id) || {}).value || "";
    const err = document.getElementById("signin-error"); if (err) err.hidden = true;
    setBusy(btn, true);
    try {
      if (view === "signin") { await B.signIn(val("auth-email"), val("auth-pass")); closeModals(); }
      else if (view === "signup") { await B.signUp(val("auth-name"), val("auth-email"), val("auth-pass")); closeModals(); }
      else if (view === "reset") { await B.resetPassword(val("auth-email")); sentTo = val("auth-email").trim(); view = "sent"; renderSignin(); return; }
    } catch (x) { showError(x.message); }
    setBusy(btn, false);
  });

  document.getElementById("signout-btn").addEventListener("click", async () => { await B.signOut(); closeModals(); });

  if (B) B.onAuth(user => {
    if (user && document.getElementById("modal-signin").classList.contains("open")) closeModals();
    document.querySelectorAll(".js-account").forEach(b => {
      b.dataset.open = user ? "account" : "signin";
      if (b.hasAttribute("data-icon")) {            // header: icon-only button
        b.innerHTML = `<i class="ph ${user ? "ph-user-check" : "ph-user"}"></i>`;
        b.classList.toggle("signed-in", !!user);
        b.setAttribute("aria-label", user ? "Account — signed in as " + user.name : "Sign in");
        b.title = user ? "Signed in as " + user.name : "Sign in";
      } else {
        b.textContent = user ? user.name : "Sign in";
        b.title = user ? "Signed in as " + user.name : "";
      }
    });
    document.getElementById("account-title").textContent = user ? "Hi, " + user.name + "." : "";
  });

  /* Testimonials viewer */
  const lb = document.getElementById("t-lightbox");
  if (lb) {
    const stage = lb.querySelector(".t-lb-stage"), cap = lb.querySelector(".t-lb-caption");
    let cur = null, lastFocus = null;
    const show = (si, mi) => {
      const t = D.testimonials[si], list = t.media;
      mi = (mi + list.length) % list.length; cur = { si, mi };
      const m = list[mi], src = u("assets/testimonials/" + m.src);
      stage.innerHTML = m.type === "video"
        ? `<video src="${src}" poster="${u("assets/testimonials/" + m.poster)}" controls autoplay playsinline preload="metadata"></video>`
        : `<img src="${src}" alt="${esc((t.name || "School " + t.school) + " — photo " + (mi + 1))}">`;
      cap.textContent = `${t.name || "School " + t.school} · ${mi + 1} / ${list.length}`;
      lb.querySelectorAll(".t-lb-nav").forEach(b => b.hidden = list.length < 2);
    };
    const open = (si, mi) => { lastFocus = document.activeElement; lb.hidden = false; document.body.classList.add("lb-open"); show(si, mi); lb.querySelector(".t-lb-close").focus(); };
    const close = () => { lb.hidden = true; stage.innerHTML = ""; document.body.classList.remove("lb-open"); if (lastFocus) lastFocus.focus(); };
    document.addEventListener("click", e => {
      const tile = e.target.closest(".t-tile");
      if (tile) return open(+tile.dataset.school, +tile.dataset.item);
      const more = e.target.closest(".t-more");
      if (more) {
        const sec = more.closest(".t-school"), on = !sec.classList.contains("show-all");
        sec.classList.toggle("show-all", on); more.setAttribute("aria-expanded", on);
        more.innerHTML = on ? `Show less<i class="ph ph-caret-up"></i>` : `Show all ${sec.querySelectorAll(".t-tile").length}<i class="ph ph-caret-down"></i>`;
        if (!on) sec.scrollIntoView({ block: "start" });
      }
    });
    lb.querySelector(".t-lb-close").addEventListener("click", close);
    lb.querySelector(".prev").addEventListener("click", () => show(cur.si, cur.mi - 1));
    lb.querySelector(".next").addEventListener("click", () => show(cur.si, cur.mi + 1));
    lb.addEventListener("click", e => { if (e.target === lb) close(); });
    document.addEventListener("keydown", e => {
      if (lb.hidden) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") show(cur.si, cur.mi - 1);
      if (e.key === "ArrowRight") show(cur.si, cur.mi + 1);
    });
  }

  /* Shared helpers for page scripts (watch.js) */
  window.GEMS_UTIL = { u, esc, plural, embed, openModal, closeModals, watchUrl };
})();
