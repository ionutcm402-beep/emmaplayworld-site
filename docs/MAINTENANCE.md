# Maintenance guide

The site is plain HTML, CSS and JavaScript. There is no build step, no database and no paid service. Pushing to the `main` branch on GitHub redeploys it automatically on Cloudflare Pages (about a minute). It is completely separate from the Android game: nothing here changes the game, its package ID, signing keys or release process.

Almost everything you will change lives in **`config/site.config.js`**. Edit it on GitHub (pencil icon) or locally, commit, and the site updates.

## Make Google Play live
1. Copy the real listing URL from Play Console (`https://play.google.com/store/apps/details?id=...`).
2. In the config, under the game's `stores.googlePlay`, set `status: "available"` and `url: "<the URL>"`.
3. Open the link once yourself. The button is clickable only if the status is `"available"` and the URL is a real Google Play address; otherwise it stays "Coming soon".

## Make the App Store live (later)
Same as above under `stores.appStore`, with a real `https://apps.apple.com/...` URL. Until a genuine listing exists, leave `status: "coming-soon"`. Never add a placeholder link.

## Add a YouTube video
In the game's `videos` list add `{ id: "VIDEO_ID", title: "Real title", note: "Short real description" }`. The ID is the 11 characters after `v=` in the video address. The video appears in the list and plays on the page when tapped. Use real videos only.

## Add real gameplay screenshots
1. Put the image files in `assets/screens/` (JPG or WebP, around 1000 px tall).
2. In the game's `screenshots` list add `{ src: "assets/screens/name.jpg", alt: "What the screenshot shows" }`.
The Gallery section and its menu link appear automatically. Use genuine screenshots only. The "Pop, play and explore" section shows `board.image` (a game screenshot); remove `board.image` to fall back to the interactive bubble toy.

## Change artwork or characters
- Emma: replace `assets/emma/emma-full.webp` (transparent background, keep the file name).
- Friends (currently Kitty and Bunny, each with 5 pose pictures in `assets/poses/`; add or swap poses in the `poses` list of a character, and remove `poses` to get the one-at-a-time picker instead). Single picture: replace the image in `assets/friends/` (keep the file names), or add a new entry in the config's `characters` list with `name`, `img`, `thumb` and colours. `say` is optional and should only be a line the character really says in the game.
- Share-preview image: `assets/og-image.jpg` (1200 × 630).

## Official store badges
Files live in `assets/badges/` and are linked from the config (`badge`). Replace the files if Google or Apple publish new artwork.

## Add another game
Copy the commented example at the bottom of the `games` list, set `featured: false`, fill in real details, remove the comment marks. A "More games" section and menu link appear automatically. The `featured: true` game fills the top of the homepage.

## Legal pages and contact
- Contact email: `brand.contactEmail` in the config.
- Pages: `privacy.html`, `terms.html`. They describe only what the site actually does. If you add analytics, a form, or any new third-party service, update them first. See `docs/LEGAL-REVIEW.md` for open items.

## Before you push
1. Open `index.html` in a browser (or run `python3 -m http.server`) and check the page, on a phone-sized window too.
2. Check every link you added.
3. Keep `docs/LINKS.md` up to date for anything you could not verify.

## Roll back
In Cloudflare: Workers & Pages → emmaplayworld-site → Deployments → pick an earlier deployment → Rollback. Or revert the commit on GitHub.

## After changing CSS or JS
`index.html` links the CSS and scripts with a `?v=...` suffix. Change that suffix (for example `?v=20261101`) whenever you edit `css/`, `js/` or `config/`, so visitors' phones fetch the new files instead of an old cached copy.
