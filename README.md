# Sohila Abd El Gawad — Data Analyst Portfolio

A premium, single-page portfolio: hero, about, skills, projects, experience timeline, an editable certificate gallery, and contact — built with plain HTML5, CSS3, and vanilla JavaScript (no frameworks).

Visual identity: bright blue/cyan/indigo palette, glassmorphism, floating "live dashboard" cards — designed to say **Data Analyst**, not AI engineer.

## Run it locally

No build step. Any static server works:

```bash
cd portfolio
python3 -m http.server 8080
# open http://localhost:8080
```

Or double-click `index.html` (a local server is safer for image loading in some browsers).

## Host it for free

**GitHub Pages**
1. Create a new GitHub repo, push everything in this folder to it.
2. Repo → Settings → Pages → Source: `main` branch, `/root` → Save.
3. Live at `https://<username>.github.io/<repo>/`.

**Vercel**
1. Push this folder to a GitHub repo.
2. vercel.com → New Project → import the repo → Deploy (no config needed, it's static).

## Editing content

- **Text (about, projects, experience, contact info):** edit directly in `index.html`.
- **Colors / fonts / spacing:** all in `css/style.css`, design tokens live at the top under `:root` (and the `[data-theme="night"]` block for night mode).
- **Profile photo:** replace `assets/images/profile/sohila.jpg`, or update the `src` in `index.html`.

## Certificates — add / edit / remove

Scroll to the Certificates section and use **+ Add certificate**, or hover any card to reveal **edit** and **delete** icons.

- Uploading an image stores it in the browser tab's **session** (no server, no account).
- Changes **last for the current browser tab/session only** — refreshing keeps them, closing the tab resets to the 6 baked-in certificates.
- To make an addition **permanent** for every visitor: open `js/script.js`, find `DEFAULT_CERTS` near the top, and add an entry pointing `img` at a file placed in `assets/images/certificates/`. Keep `data/certificates.json` in sync — it documents the same source list.

## Structure

```
index.html                     → all page content and section markup
css/style.css                  → design tokens, layout, components
css/animations.css             → keyframes (blobs, floating cards, particles)
css/responsive.css             → tablet / mobile / landscape breakpoints
js/script.js                   → nav, theme, reveal, counters, certs, contact form
js/animations.js               → hero parallax tilt, typing effect, magnetic buttons
js/chatbot.js                  → "Sohila AI" static Q&A assistant
data/certificates.json         → reference copy of the default certificate list
assets/images/profile/         → profile photo
assets/images/certificates/    → certificate images
assets/images/projects/        → project/dashboard screenshots
```

## Notes on content sourcing

Every fact on this site — education, skills, projects, experience, certifications, contact details — is taken directly from Sohila's CV and "About Me" document. Nothing was invented. If new projects, roles, or certificates come up, follow the same edit patterns above to add them.
