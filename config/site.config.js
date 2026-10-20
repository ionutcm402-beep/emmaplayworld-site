/*
 * Emma Play World: central site configuration.
 *
 * Almost everything that changes over time lives in this one file:
 * store links, availability, videos, characters and future games.
 * The page (index.html + js/) reads it and builds itself, so you normally
 * never need to edit the HTML or CSS.
 *
 * RULES BUILT INTO THE PAGE
 *  - A store badge is clickable only when its status is "available" AND its
 *    url is a real store listing (Google Play: https://play.google.com/store/apps/details?id=...,
 *    App Store: https://apps.apple.com/...). Anything else shows "Coming soon".
 *  - Only put things here that are true and verified. Leave a field empty
 *    ("" or []) and the page simply hides that part.
 */
window.SITE = {
  brand: {
    name: "Emma Play World",
    domain: "emmaplayworld.com",
    url: "https://emmaplayworld.com",
    contactEmail: "contact.emmaplayworld@gmail.com",
    sign: "with Emma and her friends. Made for little moments of fun."
  },

  youtube: {
    handle: "@emmapucpuc",
    url: "https://www.youtube.com/@emmapucpuc"
  },

  /* Optional. Shown in the footer only when set. Add the real URLs once they exist. */
  legal: {
    privacyUrl: "privacy.html",
    termsUrl: "terms.html"
  },

  /*
   * GAMES. Add a new game by adding an object to this list.
   * The game with featured:true fills the top of the homepage.
   * Every other game appears as a card in the "More games" section.
   *
   * stores.<store>.status: "available" | "coming-soon" | "hidden"
   * stores.<store>.url:    the real listing URL (required for "available")
   * stores.<store>.badge:  path to the OFFICIAL badge image, e.g. "assets/badges/google-play.png"
   *                        (leave "" to show a plain placeholder badge)
   */
  games: [
    {
      id: "puc-puc-bubbles",
      featured: true,
      name: "Puc Puc Bubbles",
      tagline: "Play, learn and discover with Emma and her friends.",

      stores: {
        /* Set to "available" and add the verified listing URL on launch day. */
        googlePlay: { status: "coming-soon", url: "", badge: "assets/badges/google-play.png" },
        appStore:   { status: "coming-soon", url: "", badge: "assets/badges/app-store.png" }
      },

      /* YouTube videos about this game. Add real ones; leave [] until then.
         { id: "YOUTUBE_VIDEO_ID", title: "Real title", note: "Short real description" } */
      videos: [
        { id: "IpUuGXhjGYk", title: "Puc Puc Bubbles game trailer", note: "See Emma pop, spell, ride and collect" }
      ],

      /* Real game screenshots, e.g. { src: "assets/screens/free-play.jpg", alt: "Free play board" }.
         The page shows them in a gallery when this list is not empty. */
      screenshots: [],

      /* The letter board shown in "A fun way to learn and play". */
      board: {
        title: "A fun way to learn and play",
        intro: "Pop the bubbles, explore letters and discover new surprises!",
        keys: "ABCDEFGHIJKLMNOPQRSTUVWXYZ.,?!".split(""),
        features: [
          { icon: "play",  color: "pink",   title: "Play",     text: "Simple and fun" },
          { icon: "star",  color: "yellow", title: "Learn",    text: "Letters and more" },
          { icon: "bulb",  color: "blue",   title: "Discover", text: "New surprises" }
        ]
      }
    }

    /* EXAMPLE of a future game (copy, fill in real details, remove the comment marks):
    ,{
      id: "my-next-game",
      featured: false,
      name: "My Next Game",
      tagline: "One true sentence about the game.",
      gradient: "linear-gradient(155deg,#62bcff,#4f6bf0)",
      stores: {
        googlePlay: { status: "coming-soon", url: "", badge: "" },
        appStore:   { status: "hidden",      url: "", badge: "" }
      }
    }
    */
  ],

  /*
   * CHARACTERS shown in "Emma's friends".
   * say is optional. Add it only for lines a character really says in the game.
   * c = name colour, pc = soft background colour for the name pill.
   */
  characters: [
    { name: "Ollie",   img: "assets/friends/ollie.jpg",   thumb: "assets/friends/ollie-thumb.jpg",   say: "Hoo-ray!", c: "#8a5cf7", pc: "#ece2ff" },
    { name: "Leo",     img: "assets/friends/leo.jpg",     thumb: "assets/friends/leo-thumb.jpg",     c: "#2f7be0", pc: "#dfeaff" },
    { name: "Lily",    img: "assets/friends/lily.jpg",    thumb: "assets/friends/lily-thumb.jpg",    c: "#d99a00", pc: "#fff3c4" },
    { name: "Max",     img: "assets/friends/max.jpg",     thumb: "assets/friends/max-thumb.jpg",     c: "#2f6fd0", pc: "#dfeaff" },
    { name: "Mia",     img: "assets/friends/mia.jpg",     thumb: "assets/friends/mia-thumb.jpg",     c: "#e2479a", pc: "#ffe0ef" },
    { name: "Charlie", img: "assets/friends/charlie.jpg", thumb: "assets/friends/charlie-thumb.jpg", c: "#23964f", pc: "#dcf5e5" },
    { name: "Bella",   img: "assets/friends/bella.jpg",   thumb: "assets/friends/bella-thumb.jpg",   c: "#e2479a", pc: "#ffe0ef" },
    { name: "Nina",    img: "assets/friends/nina.jpg",    thumb: "assets/friends/nina-thumb.jpg",    c: "#8a4fe0", pc: "#ece2ff" },
    { name: "Benny",   img: "assets/friends/benny.jpg",   thumb: "assets/friends/benny-thumb.jpg",   c: "#c8651b", pc: "#ffe6d2" }
  ]
};
