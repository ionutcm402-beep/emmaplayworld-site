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
      tagline: "Play, learn and explore with Emma and her friends.",

      stores: {
        /* Set to "available" and add the verified listing URL on launch day. */
        googlePlay: { status: "coming-soon", url: "", badge: "assets/badges/google-play.png" },
        appStore:   { status: "coming-soon", url: "", badge: "assets/badges/app-store.png" }
      },

      /* YouTube videos about this game. Add real ones; leave [] until then.
         { id: "YOUTUBE_VIDEO_ID", title: "Real title", note: "Short real description" } */
      videos: [
        { id: "IpUuGXhjGYk", title: "Puc Puc Bubbles game trailer", note: "Watch the trailer on YouTube" }
      ],

      /* Real game screenshots, e.g. { src: "assets/screens/free-play.jpg", alt: "Free play board" }.
         The page shows them in a gallery when this list is not empty. */
      screenshots: [
        { src: "assets/screens/home.webp",               alt: "Puc Puc Bubbles home screen with Emma, Bunny and Kitty under a rainbow and a big Play button" },
        { src: "assets/screens/free-play-letters.webp",  alt: "Free Play on the Letters board: rows of glossy rainbow letter bubbles" },
        { src: "assets/screens/pet-friends.webp",        alt: "Free Play on the Pet friends board: glossy bubbles with a cat, dog, bunny, panda, fox, frog and more" },
        { src: "assets/screens/discover.webp",           alt: "Discover mode: Emma says pop a bubble to see what's hiding" },
        { src: "assets/screens/explore.webp",            alt: "Explore screen with Free Play and Discover, plus Boards and Collection" }
      ],

      /* "The game" section. Wording comes from the game's own Explore screen.
         image: a real screenshot shown in the section (no image = a small pop-able bubble toy from keys). */
      board: {
        title: "Pop, play and",
        titleAccent: "explore",
        intro: "Choose a board of letters, numbers, animals and more, and pop away with Emma and her friends.",
        image: { src: "assets/screens/free-play-letters.webp", alt: "Free Play on the Letters board in Puc Puc Bubbles: rows of glossy rainbow letter bubbles with Emma and Kitty below" },
        features: [
          { icon: "play",  color: "pink",   title: "Free Play", text: "Pop any bubble you like!" },
          { icon: "bulb",  color: "blue",   title: "Discover",  text: "Pop to find what's hiding!" },
          { icon: "star",  color: "yellow", title: "Boards",    text: "Choose what to pop" }
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
   * CHARACTERS shown in "Emma's friends" (the friends in the current game: Bunny and Kitty).
   * say is optional. Add it only for lines a character really says in the game.
   * c = name colour, pc = soft background colour for the name pill.
   */
  characters: [
    { name: "Bunny", img: "assets/friends/bunny.webp", thumb: "assets/friends/bunny-thumb.webp", c: "#e2479a", pc: "#ffe0ef" },
    { name: "Kitty", img: "assets/friends/kitty.webp", thumb: "assets/friends/kitty-thumb.webp", c: "#c8651b", pc: "#ffe6d2" }
  ]
};
