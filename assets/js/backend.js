/* =========================================================
   GEMS accounts + comments.

   One small interface (window.GEMS_BACKEND) with three possible engines:
   - "firebase": the real thing — Firebase Authentication (email + password)
                 and a Firestore "comments" collection. Used when
                 firebase-config.js has an apiKey.
   - "demo":     preview only — a display name instead of a password, and
                 comments kept in this browser. Turned on by window.GEMS_DEMO.
   - "off":      no config yet — the page says comments are coming soon.

   Who may post or delete is enforced by firestore.rules on the server,
   so the delete button only ever appears on a person's own comments,
   and even a tampered page can't remove anyone else's.
   ========================================================= */
(function () {
  const FB_VERSION = "10.12.2";
  const cfg = window.GEMS_FIREBASE_CONFIG || {};
  const mode = window.GEMS_DEMO ? "demo" : (cfg.apiKey ? "firebase" : "off");

  const authListeners = new Set();
  let currentUser = null;               // { uid, name } or null
  const setUser = u => { currentUser = u; authListeners.forEach(cb => cb(u)); };

  const api = {
    mode,
    get user() { return currentUser; },
    onAuth(cb) { authListeners.add(cb); cb(currentUser); return () => authListeners.delete(cb); },
    signIn: async () => { throw new Error("Accounts aren't connected yet."); },
    signUp: async () => { throw new Error("Accounts aren't connected yet."); },
    signInWithGoogle: async () => { throw new Error("Accounts aren't connected yet."); },
    resetPassword: async () => { throw new Error("Accounts aren't connected yet."); },
    signOut: async () => {},
    updateName: async () => { throw new Error("Accounts aren't connected yet."); },
    recordPlay: async () => {},                 // counts a play (and a new student) for a video/episode
    getStats: async () => ({}),                 // { "lab-slug": { plays, students }, ... }
    watchComments: (_target, cb) => { cb([]); return () => {}; },
    addComment: async () => { throw new Error("Comments aren't connected yet."); },
    deleteComment: async () => { throw new Error("Comments aren't connected yet."); }
  };
  const MAX = 2000;
  const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const checkEmail = e => { e = String(e || "").trim(); if (!EMAIL.test(e)) throw new Error("Enter a valid email address."); return e; };
  const checkPass = p => { if (String(p || "").length < 6) throw new Error("Use a password with at least 6 characters."); return p; };
  const checkName = n => { n = String(n || "").trim().slice(0, 40); if (!n) throw new Error("Enter a name first."); return n; };
  const clean = t => String(t || "").replace(/\r\n/g, "\n").trim().slice(0, MAX);

  /* ---------------- Demo engine (preview only) ---------------- */
  if (mode === "demo") {
    const store = {
      get(k, d) { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } },
      set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} }
    };
    const watchers = new Map();   // target -> Set(cb)
    const all = () => store.get("gems-demo-comments", []);
    const emit = target => (watchers.get(target) || []).forEach(cb =>
      cb(all().filter(c => c.target === target).sort((a, b) => b.createdAt - a.createdAt)));

    const saved = store.get("gems-demo-user", null);
    if (saved) currentUser = saved;

    Object.assign(api, {
      /* Preview only: accounts are remembered in this browser by email + name.
         Passwords are checked for length but never saved anywhere. */
      async signIn(email, password) {
        email = checkEmail(email).toLowerCase(); checkPass(password);
        const acct = store.get("gems-demo-accounts", {})[email];
        if (!acct) throw new Error("There's no account with that email yet. Create one instead.");
        const u = { uid: "demo-" + email, name: acct.name };
        store.set("gems-demo-user", u); setUser(u); return u;
      },
      async signUp(name, email, password) {
        name = String(name || "").trim().slice(0, 40);
        if (!name) throw new Error("Enter your name — it's shown on your comments.");
        email = checkEmail(email).toLowerCase(); checkPass(password);
        const accts = store.get("gems-demo-accounts", {});
        if (accts[email]) throw new Error("An account with that email already exists. Sign in instead.");
        accts[email] = { name }; store.set("gems-demo-accounts", accts);
        const u = { uid: "demo-" + email, name };
        store.set("gems-demo-user", u); setUser(u); return u;
      },
      async signInWithGoogle() {
        const u = { uid: "demo-google", name: "Google Student" };
        store.set("gems-demo-user", u); setUser(u); return u;
      },
      async resetPassword(email) {
        checkEmail(email);
        await new Promise(r => setTimeout(r, 500));      // pretend to send the email
      },
      async signOut() { try { localStorage.removeItem("gems-demo-user"); } catch {} setUser(null); },
      async updateName(name) {
        if (!currentUser) throw new Error("Sign in first.");
        name = checkName(name);
        const email = currentUser.uid.replace(/^demo-/, ""), accts = store.get("gems-demo-accounts", {});
        if (accts[email]) { accts[email].name = name; store.set("gems-demo-accounts", accts); }
        const u = { ...currentUser, name }; store.set("gems-demo-user", u); setUser(u);
      },
      async recordPlay(target) {
        if (!currentUser) return;
        const stats = store.get("gems-demo-stats", {}), seen = store.get("gems-demo-views", {});
        const key = target + "__" + currentUser.uid, s0 = stats[target] || { plays: 0, students: 0 };
        stats[target] = { plays: s0.plays + 1, students: s0.students + (seen[key] ? 0 : 1) };
        seen[key] = true; store.set("gems-demo-views", seen); store.set("gems-demo-stats", stats);
      },
      async getStats() { return store.get("gems-demo-stats", {}); },
      watchComments(target, cb) {
        if (!watchers.has(target)) watchers.set(target, new Set());
        watchers.get(target).add(cb); emit(target);
        return () => watchers.get(target).delete(cb);
      },
      async addComment(target, text) {
        if (!currentUser) throw new Error("Sign in to comment.");
        text = clean(text); if (!text) throw new Error("Write something first.");
        const list = all();
        list.push({ id: "c" + Date.now() + Math.random().toString(36).slice(2, 6), target, text,
                    uid: currentUser.uid, name: currentUser.name, createdAt: Date.now() });
        store.set("gems-demo-comments", list); emit(target);
      },
      async deleteComment(id) {
        const list = all(); const c = list.find(x => x.id === id);
        if (!c || !currentUser || c.uid !== currentUser.uid) throw new Error("You can only delete your own comments.");
        store.set("gems-demo-comments", list.filter(x => x.id !== id)); emit(c.target);
      }
    });
  }

  /* ---------------- Firebase engine ---------------- */
  if (mode === "firebase") {
    const base = `https://www.gstatic.com/firebasejs/${FB_VERSION}/`;
    const ready = (async () => {
      const [{ initializeApp }, A, F] = await Promise.all([
        import(base + "firebase-app.js"),
        import(base + "firebase-auth.js"),
        import(base + "firebase-firestore.js")
      ]);
      const app = initializeApp(cfg);
      const auth = A.getAuth(app);
      const db = F.getFirestore(app);
      A.onAuthStateChanged(auth, u => setUser(u ? { uid: u.uid, name: u.displayName || (u.email || "").split("@")[0] } : null));
      return { A, F, auth, db };
    })();

    ready.catch(() => {});                    // handled where it matters (comments show a retry message)

    const friendly = e => {
      const code = (e && e.code) || "";
      const map = {
        "auth/invalid-credential": "That email and password don't match. Check them and try again.",
        "auth/wrong-password": "That email and password don't match. Check them and try again.",
        "auth/user-not-found": "There's no account with that email yet. Create one instead.",
        "auth/email-already-in-use": "An account with that email already exists. Sign in instead.",
        "auth/weak-password": "Use a password with at least 6 characters.",
        "auth/invalid-email": "That email address doesn't look right.",
        "auth/missing-email": "Enter your email address.",
        "auth/network-request-failed": "Couldn't reach the server. Check your internet connection and try again.",
        "auth/too-many-requests": "Too many tries. Wait a minute, then try again.",
        "auth/unauthorized-domain": "Google sign-in isn't allowed on this web address yet. Add it under Firebase → Authentication → Settings → Authorized domains.",
        "auth/account-exists-with-different-credential": "That email already has an account. Sign in with your email and password instead.",
        "permission-denied": "You can only change your own comments."
      };
      return new Error(map[code] || "Something went wrong. Please try again.");
    };

    Object.assign(api, {
      async signIn(email, password) {
        const { A, auth } = await ready;
        email = checkEmail(email); checkPass(password);
        try { await A.signInWithEmailAndPassword(auth, email, password); } catch (e) { throw friendly(e); }
      },
      async signUp(name, email, password) {
        const { A, auth } = await ready;
        name = String(name || "").trim().slice(0, 40);
        if (!name) throw new Error("Enter your name — it's shown on your comments.");
        email = checkEmail(email); checkPass(password);
        try {
          const cred = await A.createUserWithEmailAndPassword(auth, email, password);
          await A.updateProfile(cred.user, { displayName: name });
          setUser({ uid: cred.user.uid, name });
        } catch (e) { throw friendly(e); }
      },
      async signInWithGoogle() {
        const { A, auth } = await ready;
        const provider = new A.GoogleAuthProvider();
        provider.setCustomParameters({ prompt: "select_account" });
        try { await A.signInWithPopup(auth, provider); }
        catch (e) {
          if (e && (e.code === "auth/popup-blocked" || e.code === "auth/operation-not-supported-in-this-environment")) {
            return A.signInWithRedirect(auth, provider);       // falls back to a full-page Google sign-in
          }
          if (e && (e.code === "auth/popup-closed-by-user" || e.code === "auth/cancelled-popup-request")) return;
          throw friendly(e);
        }
      },
      async resetPassword(email) {
        const { A, auth } = await ready;
        email = checkEmail(email);
        auth.languageCode = document.documentElement.lang || "en";
        try { await A.sendPasswordResetEmail(auth, email); }
        catch (e) {
          // Don't reveal whether an account exists; only report real problems.
          if (e && (e.code === "auth/user-not-found")) return;
          throw friendly(e);
        }
      },
      async signOut() { const { A, auth } = await ready; await A.signOut(auth); },
      async updateName(name) {
        const { A, auth } = await ready;
        if (!auth.currentUser) throw new Error("Sign in first.");
        name = checkName(name);
        try { await A.updateProfile(auth.currentUser, { displayName: name }); } catch (e) { throw friendly(e); }
        setUser({ uid: auth.currentUser.uid, name });
      },
      /* Plays and unique students. One private "views" record per person per item
         (views/<target>__<uid>) decides whether they're new; stats/<target> holds the totals.
         firestore.rules checks every change, so totals can only ever go up by one. */
      async recordPlay(target) {
        const { F, db, auth } = await ready;
        const user = auth.currentUser; if (!user) return;
        const viewRef = F.doc(db, "views", target + "__" + user.uid), statRef = F.doc(db, "stats", target);
        await F.runTransaction(db, async tx => {
          const [v, st] = [await tx.get(viewRef), await tx.get(statRef)];
          const cur = st.exists() ? st.data() : { plays: 0, students: 0 }, isNew = !v.exists();
          if (isNew) tx.set(viewRef, { target, uid: user.uid, at: F.serverTimestamp() });
          tx.set(statRef, { plays: (cur.plays || 0) + 1, students: (cur.students || 0) + (isNew ? 1 : 0) });
        });
      },
      async getStats() {
        const { F, db } = await ready;
        const snap = await F.getDocs(F.collection(db, "stats")), out = {};
        snap.forEach(d => { out[d.id] = d.data(); });
        return out;
      },
      watchComments(target, cb) {
        let unsub = () => {};
        ready.catch(() => cb(null));            // Firebase couldn't load (offline or blocked network)
        ready.then(({ F, db }) => {
          const q = F.query(F.collection(db, "comments"), F.where("target", "==", target));
          unsub = F.onSnapshot(q, snap => {
            const list = snap.docs.map(d => {
              const x = d.data();
              return { id: d.id, ...x, createdAt: x.createdAt && x.createdAt.toMillis ? x.createdAt.toMillis() : Date.now() };
            }).sort((a, b) => b.createdAt - a.createdAt);
            cb(list);
          }, () => cb(null));
        });
        return () => unsub();
      },
      async addComment(target, text) {
        const { F, db } = await ready;
        if (!currentUser) throw new Error("Sign in to comment.");
        text = clean(text); if (!text) throw new Error("Write something first.");
        try {
          await F.addDoc(F.collection(db, "comments"), {
            target, text, uid: currentUser.uid, name: String(currentUser.name || "Someone").slice(0, 40), createdAt: F.serverTimestamp()
          });
        } catch (e) { throw friendly(e); }
      },
      async deleteComment(id) {
        const { F, db } = await ready;
        try { await F.deleteDoc(F.doc(db, "comments", id)); } catch (e) { throw friendly(e); }
      }
    });
  }

  window.GEMS_BACKEND = api;
})();
