# Legal pages: facts to confirm and review items

`privacy.html` and `terms.html` were written from what the site actually does (checked in the code on 20 Oct 2026). They are plain-language drafts, **not legal advice**, and they do not guarantee compliance with any law. Have them reviewed by a qualified professional before relying on them, especially because the game's audience includes children.

## What the site was verified to do (from the code)
- Sets no cookies and uses no local/session storage, analytics, advertising, forms, accounts or comments.
- Fonts (Fredoka and Nunito, SIL Open Font License) are hosted on the site itself in `assets/fonts/`; nothing is loaded from Google.
- Links to YouTube. Embedded video is created only after a tap, from `youtube-nocookie.com`. One video (the game trailer) is configured.
- Uses a `mailto:` link for contact.
- Served by Cloudflare (Pages).

## Please confirm (not knowable from the code)
1. **Who is the operator?** The pages say only "Emma Play World" and the contact email. Is there a registered company, sole trader, or other legal entity? If so, its legal name, registration number and registered address may need to appear on the site and in the policies. I have not invented any.
2. **Cloudflare settings.** In the Cloudflare dashboard, check that Web Analytics / Real User Monitoring is OFF for this project and domain, and that no cookies are set (browser DevTools → Application → Cookies, on emmaplayworld.com). If analytics is on, the privacy notice must change.
3. **Fonts.** Resolved: Fredoka and Nunito are now self-hosted, so no visitor data goes to Google Fonts.
4. **Email handling promises.** The notice says messages are kept "as long as needed" and that we delete a child's information on request. Confirm these are things you will actually do.
5. **Jurisdiction.** No governing law, supervisory authority, or data-protection representative is named, because your location and legal status are unknown. A lawyer should decide this.
6. **Ownership wording.** The terms say artwork and characters belong to "Emma Play World or its licensors". Confirm who owns the artwork (and whether any was AI-generated or licensed) and adjust.
7. **The game.** Re-checked on 23 Oct 2026 against the final release build (game version 233): what is saved on the device (no child name or age), the hashed PIN, Emma's on-device voice, and Premium (one payment through Google Play plus a free 3-day trial run on the device). The app has not been publicly released yet (closed testing in Play Console as of 23 Oct 2026), so no public user ever had the yearly plan or the old name box. `privacy.html` now has an app section (`#app`, added 21 Oct 2026), written from the game code (v115–v117; the final game is v227, so **re-check it against the final build before release**, e.g. it mentions the buddy, treasure pals and badges, which the final version may hide or remove) and a rebuilt copy of the Android project (Capacitor 8, cordova-plugin-purchase 13.19.1, Google Play Billing 9). Before each app release, check it still matches: if any SDK, analytics, ads or accounts are added, update this section and the Play Console Data safety form in the same release. The backup paragraph assumes `android:allowBackup="true"` (the Capacitor default); remove it if backup is turned off.
8. **Children's audience.** If the game targets children, rules such as COPPA (US), UK Children's Code and GDPR provisions on children's data may apply. Professional review is recommended.

## 28 Oct 2026: four-app legal review
- Checked against Google Play policy text (Subscriptions 9900533, Families 9893335, User Data 10144311, Data safety 10787469) and Google Play Help on cancelling/trials.
- New app terms pages: `terms-pegs.html`, `terms-piggy.html`, `terms-bubbles.html` (Bloom already had `terms-bloom.html`). Product pages link "Terms and subscription for …"; `terms.html` lists all four apps' terms and privacy pages.
- Model stated by the owner for all four apps: free 3-day trial for eligible new subscribers, then £2.99/year in the UK, auto-renewing; local price shown by Google Play elsewhere. Removed the invented "cancel at least 24 hours before the trial ends" rule (Google: cancel before the trial ends).
- Verified against source code: **Pegs only** (frozen 1.0 build). Bubbles, Piggy and Bloom source was not available in this review: their app-specific statements were left as previously written and must be re-checked against each app's frozen build (see the report).
- Pegs in-app Premium text still contains the 24-hour sentence: needs an app text change and rebuild before upload.
- Policy risk to review: Google requires subscriptions to give "sustained or recurring value"; Premium that unlocks a fixed set of content (Pegs, Bubbles) is at risk unless content keeps being added or it is sold as a one-time product.
- Update (later on 28 Oct): **Bloom** statements re-checked against the frozen Bloom 1.0.1 (code 2, tag v1.0.1-final) source: 2 free / 20 Premium habits, offline Premium 14 days after Google Play's last confirmation, habits 3+ paused (not deleted) when Premium ends, Delete all, printing via Android's print screen, `allowBackup="true"`, permissions INTERNET + BILLING only, AD_ID removed, in-app links to privacy-bloom.html and terms-bloom.html. **Bubbles** re-checked by the Bubbles session against its frozen v12 build (commit 84ee27f). **Piggy** is still not verified against source.
- All four privacy pages now have a "Keeping information safe" section (Google Play User Data policy asks for secure-handling information). Pegs wording changed from "follows the principles of … COPPA" to "designed with … in mind" (not a compliance claim).
