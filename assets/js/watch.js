/* =========================================================
   Watch page: one podcast episode or GEMS Lab experiment,
   with its video and a comment thread.
   Address: hidden_gems/watch.html#podcast-<slug>
            gems_lab/watch.html#lab-<slug>
   ========================================================= */
(function () {
  const D = window.GEMS_DATA || {};
  const B = window.GEMS_BACKEND;
  const { u, esc, plural, embed, watchUrl, fillStats } = window.GEMS_UTIL;
  const root = document.getElementById("watch");
  let unsubscribe = () => {}, unAuth = () => {};

  const find = () => {
    const hash = decodeURIComponent(location.hash.slice(1));
    const m = hash.match(/^(podcast|lab)-(.+)$/);
    if (!m) return null;
    const kind = m[1];
    let list = kind === "podcast" ? (D.episodes || []) : (D.experiments || []);
    let i = list.findIndex(x => x.slug === m[2]);
    if (i < 0 && kind === "lab") { list = D.chapterVideos || []; i = list.findIndex(x => x.slug === m[2]); }
    return i < 0 ? null : { kind, i, item: list[i], list, target: kind + "-" + m[2] };
  };

  const render = () => {
    unsubscribe(); unAuth();
    const hit = find();
    const isPodcast = document.body.dataset.page === "hidden_gems";
    const back = isPodcast
      ? { href: u("hidden_gems/"), label: "All podcasts" }
      : { href: u("gems_lab/"), label: "All experiments" };

    if (!hit) {
      document.title = "Not found · GEMS";
      root.innerHTML = `<section class="watch-head wrap">
        <a class="text-link back-link" href="${back.href}"><i class="ph ph-arrow-left"></i>${back.label}</a>
        <h1 class="post-title" style="margin-top:40px">That page isn't here.</h1>
        <p class="body" style="margin-top:20px">It may have been renamed or removed.</p></section>`;
      return;
    }

    const { kind, i, item, list, target } = hit;
    const url = kind === "podcast" ? item.audio : item.video;
    const label = kind === "podcast"
      ? `Hidden GEMS · Episode ${i + 1}`
      : `GEMS Lab${item.subject ? " · Chapter video · " + item.subject : ""}${item.length ? " · " + item.length : ""}`;
    const prev = list[i - 1], next = list[i + 1];
    document.title = item.title + " · GEMS";

    root.innerHTML = `
      <section class="watch-head wrap">
        <div class="watch-top">
          <a class="text-link back-link" href="${back.href}"><i class="ph ph-arrow-left"></i>${back.label}</a>
          <span class="eyebrow">${esc(label)}</span>
        </div>
        <h1 class="post-title">${esc(item.title)}</h1>
        ${item.text ? `<p class="body watch-lede">${esc(item.text)}</p>` : ""}
        <div class="watch-player" id="player"></div>
        <div class="watch-meta">
          <span class="chip" data-stat="${target}" data-field="plays" data-base="${+item.views || 0}" data-word="play">${plural(item.views || 0, "play")}</span>
          <span id="open-link"></span>
        </div>
      </section>
      <div class="post-rule"></div>
      <section class="watch-comments wrap" aria-labelledby="comments-title">
        <div class="eyebrow">Discussion</div>
        <h2 class="display-l" id="comments-title">Comments <span class="count">(0)</span></h2>
        <div id="composer"></div>
        <div class="comment-rule"></div>
        <ol class="comment-list" id="comment-list" aria-live="polite"></ol>
        <div class="comment-more" id="comment-more"></div>
        <nav class="post-nav" aria-label="More ${kind === "podcast" ? "episodes" : "experiments"}">
          ${prev ? `<a href="${watchUrl(kind, prev)}"><span class="eyebrow">← Previous</span><span class="post-nav-title">${esc(prev.title)}</span></a>` : "<span></span>"}
          ${next ? `<a href="${watchUrl(kind, next)}" class="next"><span class="eyebrow">Next →</span><span class="post-nav-title">${esc(next.title)}</span></a>` : "<span></span>"}
        </nav>
      </section>`;
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });

    /* The player is only shown to signed-in members */
    const player = document.getElementById("player"), openLink = document.getElementById("open-link");
    const locked = () => B && B.mode !== "off" && !B.user;
    const drawPlayer = () => {
      if (locked()) {
        const bg = kind === "lab" && item.image ? `style="background-image:url('${esc(u(item.image))}')"` : "";
        player.innerHTML = `<div class="player-lock" ${bg}>
          <div class="lock-card">
            <i class="ph ph-lock-simple"></i>
            <h2>Members only</h2>
            <p>Sign in with Google or email to ${kind === "podcast" ? "listen to this episode" : "watch this experiment"}. It's free and takes a minute.</p>
            <button class="btn btn-pink shadow-ink" data-open="signin">Sign in to ${kind === "podcast" ? "listen" : "watch"}</button>
          </div></div>`;
        openLink.innerHTML = "";
        return;
      }
      player.innerHTML = embed(url && !/^https?:/.test(url) ? u(url) : url);
      countPlay();
      openLink.innerHTML = /^https?:/.test(url || "")
        ? `<a class="text-link" href="${esc(url)}" target="_blank" rel="noopener">Open in a new tab<i class="ph ph-arrow-up-right"></i></a>` : "";
    };

    /* Count one play per browser session per item, only for signed-in members (the player is locked otherwise) */
    const countPlay = () => {
      if (!(window.GEMS_DATA || {}).liveCounts || !B || B.mode === "off" || !B.user) return;
      const key = "gems-played:" + target + ":" + B.user.uid;
      try { if (sessionStorage.getItem(key)) return fillStats(); sessionStorage.setItem(key, "1"); } catch {}
      B.recordPlay(target).catch(() => {}).finally(fillStats);
    };
    fillStats();

    const composer = document.getElementById("composer");
    const listEl = document.getElementById("comment-list");
    const countEl = root.querySelector("#comments-title .count");
    let comments = [];
    const PAGE = 10;                       // comments shown at first, and added per "Show more"
    let shown = PAGE;
    const moreEl = document.getElementById("comment-more");

    const drawComposer = user => {
      if (!B || B.mode === "off") {
        composer.innerHTML = `<p class="body muted">Comments are coming soon.</p>`;
        return;
      }
      if (!user) {
        composer.innerHTML = `<div class="signin-prompt">
          <p class="body">Sign in to join the discussion. Anyone can read the comments.</p>
          <button class="btn btn-dark shadow-pink" data-open="signin">Sign in to comment</button></div>`;
        return;
      }
      composer.innerHTML = `
        <form id="comment-form" novalidate>
          <label class="commenting-as" for="comment-text">Posting as <strong>GEMS member</strong> <span class="anon-note">Your name isn't shown with comments.</span></label>
          <textarea id="comment-text" maxlength="2000" rows="4" placeholder="What did you notice? What would you try next?"></textarea>
          <div class="composer-row">
            <button class="btn btn-dark" type="submit" disabled>Post comment</button>
            <span class="char-count" id="char-count" aria-live="polite"></span>
          </div>
          <p class="form-error" id="comment-error" role="alert" hidden></p>
        </form>`;
      const ta = document.getElementById("comment-text"), btn = composer.querySelector('[type="submit"]'),
            cc = document.getElementById("char-count"), err = document.getElementById("comment-error");
      ta.addEventListener("input", () => {
        btn.disabled = !ta.value.trim();
        cc.textContent = ta.value.length > 1800 ? `${2000 - ta.value.length} left` : "";
      });
      composer.querySelector("form").addEventListener("submit", async e => {
        e.preventDefault(); err.hidden = true; btn.disabled = true;
        try { await B.addComment(target, ta.value); ta.value = ""; cc.textContent = ""; }
        catch (x) { err.textContent = x.message; err.hidden = false; btn.disabled = false; }
      });
    };

    const drawList = () => {
      const me = B && B.user;
      countEl.textContent = `(${comments.length})`;
      moreEl.innerHTML = "";
      if (!comments.length) {
        listEl.innerHTML = `<li class="comment-empty body muted">No comments yet.${me ? " Be the first." : ""}</li>`;
        return;
      }
      const left = comments.length - shown;
      if (left > 0) moreEl.innerHTML = `<button class="btn btn-cream shadow-ink" type="button" data-more>Show more comments (${left})<i class="ph ph-caret-down"></i></button>`;
      listEl.innerHTML = comments.slice(0, shown).map(c => {
        const mine = me && c.uid === me.uid;
        return `<li class="comment${mine ? " mine" : ""}" data-id="${esc(c.id)}">
          <div class="comment-head">
            <span class="comment-name">GEMS member${mine ? ' <span class="you">You</span>' : ""}</span>
          </div>
          <p class="body comment-text">${esc(c.text)}</p>
          ${mine ? `<div class="comment-actions">
              <button class="link-btn" data-del="${esc(c.id)}"><i class="ph ph-trash"></i>Delete</button>
              <span class="confirm" hidden>Delete this comment?
                <button class="link-btn danger" data-del-yes="${esc(c.id)}">Delete</button>
                <button class="link-btn" data-del-no>Keep</button></span>
            </div>` : ""}
        </li>`;
      }).join("");
    };

    moreEl.addEventListener("click", e => {
      if (!e.target.closest("[data-more]")) return;
      shown += PAGE; drawList();
    });

    listEl.addEventListener("click", async e => {
      const ask = e.target.closest("[data-del]"), yes = e.target.closest("[data-del-yes]"), no = e.target.closest("[data-del-no]");
      const li = e.target.closest(".comment");
      if (ask) { ask.hidden = true; li.querySelector(".confirm").hidden = false; }
      if (no) { li.querySelector(".confirm").hidden = true; li.querySelector("[data-del]").hidden = false; }
      if (yes) {
        yes.disabled = true;
        try { await B.deleteComment(yes.dataset.delYes); }
        catch (x) { yes.disabled = false; alertInline(li, x.message); }
      }
    });
    const alertInline = (li, msg) => {
      let p = li.querySelector(".form-error");
      if (!p) { p = document.createElement("p"); p.className = "form-error"; p.setAttribute("role", "alert"); li.appendChild(p); }
      p.textContent = msg;
    };

    if (B) {
      unAuth = B.onAuth(user => { drawPlayer(); drawComposer(user); drawList(); });
      unsubscribe = B.watchComments(target, list => {
        if (list === null) { listEl.innerHTML = `<li class="comment-empty body muted">Comments couldn't load. Refresh to try again.</li>`; return; }
        comments = list; drawList();
      });
    } else { drawPlayer(); drawComposer(null); drawList(); }
  };

  render();
  window.addEventListener("hashchange", render);
})();
