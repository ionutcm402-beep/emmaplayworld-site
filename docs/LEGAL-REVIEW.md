# Legal pages: facts to confirm and review items

`privacy.html` and `terms.html` were written from what the site actually does (checked in the code on 20 Oct 2026). They are plain-language drafts, **not legal advice**, and they do not guarantee compliance with any law. Have them reviewed by a qualified professional before relying on them, especially because the game's audience includes children.

## What the site was verified to do (from the code)
- Sets no cookies and uses no local/session storage, analytics, advertising, forms, accounts or comments.
- Loads the Baloo 2 font from Google Fonts on every page view (Google receives the visitor's IP).
- Links to YouTube. Embedded video is created only after a tap, from `youtube-nocookie.com`. One video (the game trailer) is configured.
- Uses a `mailto:` link for contact.
- Served by Cloudflare (Pages).

## Please confirm (not knowable from the code)
1. **Who is the operator?** The pages say only "Emma Play World" and the contact email. Is there a registered company, sole trader, or other legal entity? If so, its legal name, registration number and registered address may need to appear on the site and in the policies. I have not invented any.
2. **Cloudflare settings.** In the Cloudflare dashboard, check that Web Analytics / Real User Monitoring is OFF for this project and domain, and that no cookies are set (browser DevTools → Application → Cookies, on emmaplayworld.com). If analytics is on, the privacy notice must change.
3. **Google Fonts.** Loading fonts from Google transfers visitor IPs to Google. Some regulators and courts have objected to this. Safest fix: host the Baloo 2 font files on the site (needs the font files downloaded; I cannot download them from this sandbox). Tell me to proceed if you want this.
4. **Email handling promises.** The notice says messages are kept "as long as needed" and that we delete a child's information on request. Confirm these are things you will actually do.
5. **Jurisdiction.** No governing law, supervisory authority, or data-protection representative is named, because your location and legal status are unknown. A lawyer should decide this.
6. **Ownership wording.** The terms say artwork and characters belong to "Emma Play World or its licensors". Confirm who owns the artwork (and whether any was AI-generated or licensed) and adjust.
7. **The game.** `privacy.html` now has an app section (`#app`, added 21 Oct 2026), written from the game code (v115–v117) and a rebuilt copy of the Android project (Capacitor 8, cordova-plugin-purchase 13.19.1, Google Play Billing 9). Before each app release, check it still matches: if any SDK, analytics, ads or accounts are added, update this section and the Play Console Data safety form in the same release. The backup paragraph assumes `android:allowBackup="true"` (the Capacitor default); remove it if backup is turned off.
8. **Children's audience.** If the game targets children, rules such as COPPA (US), UK Children's Code and GDPR provisions on children's data may apply. Professional review is recommended.
