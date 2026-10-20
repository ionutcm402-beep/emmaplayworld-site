# Emma Play World website

Static site (plain HTML, CSS and JavaScript). No build step, no dependencies, no database.
It is independent of the Puc Puc Bubbles Android project: changing the site never requires a game release.

## Update content
Everything that changes lives in `config/site.config.js`:
- Store availability and links (`games[].stores`)
- YouTube videos (`games[].videos`) and real screenshots (`games[].screenshots`)
- Characters, privacy/terms URLs, contact email

A store badge is clickable only when `status` is `"available"` AND `url` is a real Google Play / App Store listing. Otherwise it shows "Coming soon" and is not a link. Apple stays "coming-soon" until a genuine App Store listing exists.

## Official store badges
Download the official badge artwork from Google and Apple, put the files in `assets/badges/`, and set `badge` in the config (e.g. `"assets/badges/google-play.svg"`). Until then a plain placeholder is shown.

## Add a game
Copy the commented example in the config, fill in real details, and set `featured: false`. A "More games" section appears automatically.

## Preview locally
Open `index.html` in a browser, or run `python3 -m http.server` in this folder.

## Hosting
Any static host works (Cloudflare Pages: no build command, output directory `/`).
