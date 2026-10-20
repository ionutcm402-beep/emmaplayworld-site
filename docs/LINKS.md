# Link and claim verification record

Last checked: 20 Oct 2026. Rule: nothing is linked or claimed unless verified. Unverified items are recorded here, not guessed.

| Item | Status | Evidence / what is missing |
|---|---|---|
| YouTube channel `https://www.youtube.com/@emmapucpuc` | Confirmed from the owner's own screenshot of the channel (name "Emma Play World", handle @emmapucpuc). Not fetched by the tooling (YouTube is blocked in the build sandbox). | Open it once in a browser to confirm. |
| Subscribe button (`...?sub_confirmation=1`) | Standard YouTube parameter, same channel. Not click-tested against YouTube. | Click it once in a browser. |
| Google Play listing | **NOT VERIFIED. No link is shown.** Badge shows "Coming soon" and is not clickable. | A web search found no listing for Puc Puc Bubbles. Needs the real URL (`https://play.google.com/store/apps/details?id=...`) from Play Console. |
| Apple App Store | **No listing exists.** Official badge shown, not clickable, with a "Coming soon" pill. No Apple link is created. | Needs a real `https://apps.apple.com/...` URL once the app is live there. |
| Official store badges | Supplied by the owner as artwork; used unmodified apart from cropping (`assets/badges/`). | |
| Game videos | **None supplied.** The video box links to the channel. | Needs real YouTube video IDs. |
| Gameplay screenshots | **None supplied.** Gallery is hidden. | Needs genuine screenshots from the game. |
| Contact email `contact.emmaplayworld@gmail.com` | Supplied by the owner; rendered as a `mailto:` link. Delivery not tested. | Send one test message to it. |
| Privacy policy / Terms | **None.** Footer links are hidden. | Needs the real URLs (`legal.privacyUrl`, `legal.termsUrl`). |
| Internal navigation (Watch, The game, Friends, logo, footer) | Tested on mobile (390 px) and desktop (1280 px): every anchor reaches an existing section. | |
