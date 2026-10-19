# GEMS website (gems-jk.org)

A plain HTML/CSS/JS rebuild of the GEMS site that was on Bubble. No build step, so it runs on GitHub Pages as-is.

## Pages

| URL | File |
|---|---|
| `/` | `index.html` |
| `/about/` | `about/index.html` |
| `/initiatives/` | `initiatives/index.html` |
| `/hidden_gems/` | `hidden_gems/index.html` |
| `/newsletter/` | `newsletter/index.html` |
| `/contact/` | `contact/index.html` |
| `/get_involved/` | `get_involved/index.html` |
| `/gems_lab/` | `gems_lab/index.html` |

The header and footer live in `assets/js/site.js`, so a menu change only has to be made once.

## Adding experiments, episodes and briefings

Edit `assets/js/data.js`. Each experiment, podcast episode and newsletter briefing is one block there. Copy a block, change the text, save. The home page shows the first 3 experiments and episodes automatically, and the "10 EXPERIMENTS" count updates itself.

Video/audio links go in the `video` / `audio` fields. A YouTube link, a Spotify episode link, or a file you upload (for example `assets/media/pendulum.mp4`) all work.

## Images

Put images in `assets/img/` with these exact names. Until a file is there, the site shows a striped placeholder with its name.

| File | Where it shows |
|---|---|
| `gems-logo.png` | Header logo + browser tab icon |
| `og-image.png` | Preview picture when the link is shared |
| `home/hero.webp` | Home: big photo at the top |
| `home/baraka-workshop.webp` | Home: "Latest / Baraka Little Library Workshop" |
| `home/hidden-gems-podcast.webp` | Home: podcast section |
| `about/five-ways-1.webp` | About: square image (600×600) |
| `about/five-ways-2.webp` | About: wide image (600×240) |
| `initiatives/opal.webp` | Initiatives: OPAL (square) |
| `initiatives/workshops.webp` | Initiatives: workshops (square) |
| `initiatives/podcast.webp` | Initiatives: podcast (square) |
| `hidden-gems/hero.webp` | Hidden GEMS: top image (square) |
| `hidden-gems/photo-1.webp`, `photo-2.webp` | Hidden GEMS: two photos under the cards |
| `lab/pendulum.webp` … `lab/handkerchief.webp` | GEMS Lab thumbnails (names are listed in `data.js`) |

JPG or PNG work too. Just change the extension in the HTML or `data.js` to match.

## Publishing on GitHub Pages

1. Create a repository (for example `gems-site`) and upload everything in this folder, including the hidden `.nojekyll` file.
2. In the repo: **Settings → Pages → Source: Deploy from a branch → `main` / root**.
3. Custom domain: the `CNAME` file already says `gems-jk.org`. At your domain registrar, point the domain to GitHub:
   - `A` records for `@` → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - `CNAME` record for `www` → `<your-github-username>.github.io`
4. Back in **Settings → Pages**, tick **Enforce HTTPS** once the certificate is issued.

## Accounts and comments (Firebase)

Every podcast episode and GEMS Lab experiment has its own page (`hidden_gems/watch.html#podcast-…`, `gems_lab/watch.html#lab-…`) with a comment thread. Anyone can read comments. Only signed-in people can post, and people can delete only their own. Until Firebase is connected, the pages say "Comments are coming soon."

To switch it on (about 10 minutes, free tier):

1. Go to console.firebase.google.com → **Add project** (Google Analytics not needed).
2. **Build → Authentication → Get started → Email/Password → Enable**.
3. Under **Authentication → Settings → Authorized domains**, add `gems-jk.org` (and `<username>.github.io` if you test there).
4. **Build → Firestore Database → Create database** (production mode, a region near Korea such as `asia-northeast3`).
5. **Firestore → Rules**: paste everything from `firestore.rules`, then **Publish**. These rules are what stop people from posting as someone else or deleting other people's comments.
6. **Project settings → General → Your apps → Web (`</>`)** → register an app → copy the config values into `assets/js/firebase-config.js`.

## Still to connect

- **View and play counts** (fixed numbers in `data.js` for now)
- **Contact form** (`contact/index.html`)
- **Newsletter signup** (`newsletter/index.html`)

## Credits

Fonts: Archivo Black, DM Sans, Fraunces (SIL Open Font License), self-hosted in `assets/fonts/`.
Icons: Phosphor Icons and Ionicons (MIT), self-hosted in `assets/vendor/` and `assets/icons/`.
