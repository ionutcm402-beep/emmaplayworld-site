/*
 * Emma Play World: central site configuration.
 *
 * Almost everything that changes over time lives in this one file:
 * the apps and games, store links, videos, screenshots and characters.
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
    tagline: "Little games. Big smiles.",
    intro: "A bubble-popping game, a happy habit tracker and a piggy bank, made with Emma and her friends.",
    sign: "with Emma and her friends. Made for little moments of fun.",
    banner: { src: "assets/bloom/brand-banner.webp", alt: "Emma Play World: Emma lying in the grass with Bunny and Kitty, colourful bubbles and a rainbow castle behind them" },
    closingImage: { src: "assets/video/friends-hug.webp", alt: "Emma hugging Bunny and Kitty among the flowers" }
  },

  youtube: {
    handle: "@emmapucpuc",
    url: "https://www.youtube.com/@emmapucpuc"
  },

  /* Footer links (only shown when set). */
  legal: {
    privacyUrl: "privacy.html",
    termsUrl: "terms.html"
  },

  /*
   * The apps and games of Emma Play World. Add one by adding an object to this list.
   *
   * theme:          "bubbles" (sky blue), "bloom" (pink) or "piggy" (lilac)
   * stores.<store>.status: "available" | "coming-soon" | "hidden"
   * stores.<store>.url:    the real listing URL (required for "available")
   * stores.<store>.badge:  path to the OFFICIAL badge image
   * Optional blocks (each appears only when filled in): features, trust, cover + videos,
   * screenshots, friends (shows the characters below), note, privacyUrl.
   */
  games: [
    {
      id: "bubbles",
      short: "Bubbles",
      theme: "bubbles",
      kind: "Game",
      name: "Puc Puc Bubbles",
      tagline: "Play, learn and explore with Emma and her friends.",
      intro: "Choose a board of letters, numbers, animals and more, and pop away with Emma and her friends.",
      art: { src: "assets/video/hero-art.webp", alt: "Puc Puc Bubbles: Emma, Bunny and Kitty playing with colourful bubbles in a magical garden" },

      stores: {
        googlePlay: { status: "coming-soon", url: "", badge: "assets/badges/google-play.png" },
        appStore:   { status: "coming-soon", url: "", badge: "assets/badges/app-store.png" }
      },

      features: [
        { emoji: "🫧", color: "pink",   title: "Free Play", text: "Pop any bubble you like!" },
        { emoji: "🔍", color: "blue",   title: "Discover",  text: "Pop to find what's hiding!" },
        { emoji: "⭐", color: "yellow", title: "Boards",    text: "Choose what to pop" }
      ],

      cover: { src: "assets/video/trailer-cover.webp", alt: "Puc Puc Bubbles with Emma, Bunny and Kitty. Watch the game video." },
      videos: [
        { id: "jwZMuZUtWeo", title: "Puc Puc Bubbles game video", note: "Watch the video on YouTube" }
      ],

      screenshots: [
        { src: "assets/screens/home.webp",               alt: "Puc Puc Bubbles home screen with Emma, Bunny and Kitty under a rainbow and a big Play button" },
        { src: "assets/screens/free-play-letters.webp",  alt: "Free Play on the Letters board: rows of glossy rainbow letter bubbles" },
        { src: "assets/screens/pet-friends.webp",        alt: "Free Play on the Pet friends board: glossy bubbles with a cat, dog, bunny, panda, fox, frog and more" },
        { src: "assets/screens/discover.webp",           alt: "Discover mode: Emma says pop a bubble to see what's hiding" },
        { src: "assets/screens/explore.webp",            alt: "Explore screen with Free Play and Discover, plus Boards and Collection" }
      ],

      friends: true,
      privacyUrl: "privacy.html#app"
    },

    {
      id: "bloom",
      short: "Bloom",
      theme: "bloom",
      kind: "Habit tracker app",
      name: "Puc Puc Bloom",
      tagline: "Little habits, happy hearts.",
      intro: "A happy habit tracker for children, set up by grown-ups. Tick off small habits together and watch a garden grow.",
      art: { src: "assets/bloom/checklist-panel.webp", alt: "Emma watering a glowing pink flower while Kitty watches, with butterflies all around" },
      moments: [
        { src: "assets/bloom/habits-panel.webp",   alt: "Emma watering a little flower: build healthy habits" },
        { src: "assets/bloom/progress-panel.webp", alt: "A calendar with ticks and a gold star beside two seedlings: track daily progress" },
        { src: "assets/bloom/garden-panel.webp",   alt: "Emma, Bunny and Kitty beside a tree full of gold stars: grow your garden" }
      ],

      stores: {
        googlePlay: { status: "coming-soon", url: "", badge: "assets/badges/google-play.png" },
        appStore:   { status: "hidden",      url: "", badge: "" }
      },

      features: [
        { emoji: "✅", color: "green",  title: "Tick it off",       text: "Tap a habit when it's done. Emma cheers when the day is complete." },
        { emoji: "🫙", color: "yellow", title: "Star Jar",          text: "Every ticked habit drops a star in the jar. Fill it up to earn a treat." },
        { emoji: "🌱", color: "green",  title: "Grow a garden",     text: "A little garden grows with every tick." },
        { emoji: "🏷️", color: "pink",   title: "Sticker book",      text: "Collect happy stickers along the way." },
        { emoji: "🌈", color: "purple", title: "Month ring",        text: "Watch the month fill with colour on the Progress screen." },
        { emoji: "🌸", color: "blue",   title: "Your week in bloom", text: "A friendly recap of how the week went." }
      ],

      trust: ["No ads", "No accounts", "Nothing leaves the device"],
      note: "Free to try with up to 2 habits. Premium (a yearly subscription billed by Google Play) lets you add more.",

      screenshots: [
        { src: "assets/bloom/home.webp",       alt: "Puc Puc Bloom home screen: today's habits (drink water, read a book, exercise, tidy up) with coloured tick circles and Emma with her unicorn at the top" },
        { src: "assets/bloom/progress.webp",   alt: "Progress screen: a colourful ring showing every day of the month, with this month's percentage and streaks" },
        { src: "assets/bloom/star-jar.webp",   alt: "Star Jar: a grown-up chooses a treat and how many stars fill the jar" },
        { src: "assets/bloom/stickers.webp",   alt: "My sticker book: 9 of 16 stickers collected" },
        { src: "assets/bloom/add-habit.webp",  alt: "Add a habit: pick a name, an icon, a colour and how often" },
        { src: "assets/bloom/week-recap.webp", alt: "Your week in bloom: a weekly recap with a star for each day" }
      ],

      privacyUrl: "privacy-bloom.html"
    },

    {
      id: "piggy",
      short: "Piggy",
      theme: "piggy",
      kind: "Piggy bank app",
      name: "Puc Puc Piggy",
      tagline: "Little coins, big dreams.",
      intro: "A private piggy bank for children, used together with a grown-up. Pop coins in, pick a dream and watch the jar fill up.",
      art: { src: "assets/piggy/card.webp", alt: "Emma feeding a gold coin into her pink piggy bank" },

      stores: {
        googlePlay: { status: "coming-soon", url: "", badge: "assets/badges/google-play.png" },
        appStore:   { status: "hidden",      url: "", badge: "" }
      },

      features: [
        { emoji: "🐷", color: "pink",   title: "Pop it in",     text: "Tap the coins and notes you're putting in, then watch the piggy gulp them up." },
        { emoji: "📒", color: "yellow", title: "Coin diary",    text: "Every entry is written down, with Undo if you tap by mistake." },
        { emoji: "🫙", color: "purple", title: "Dreams",        text: "Pick something to save for and watch its jar fill up." },
        { emoji: "🏅", color: "orange", title: "Stickers",      text: "Collect 20 stickers as you save." },
        { emoji: "🛒", color: "green",  title: "Coin shop",     text: "Practise paying the exact price with pretend money, so the piggy stays full." },
        { emoji: "🎀", color: "blue",   title: "Dress up Piggy", text: "Give the piggy new colours, hats and glasses (Premium)." }
      ],

      momentsTitle: "Emma and her piggy",
      moments: [
        { src: "assets/piggy/emma-hug.webp",   alt: "Emma sitting down and hugging her piggy bank" },
        { src: "assets/piggy/emma-coin.webp",  alt: "Emma laughing and holding a big gold star coin" },
        { src: "assets/piggy/emma-dream.webp", alt: "Emma lying on the grass, dreaming" }
      ],

      trust: ["No ads", "No accounts", "Nothing leaves the device"],
      note: "Free to try with one dream. Premium (a yearly subscription billed by Google Play) unlocks more dreams and extra games. The money in the app is only a record of savings, not real money.",

      screenshots: [
        { src: "assets/piggy/home.webp",      alt: "Puc Puc Piggy home screen: a pink piggy holding £8.00, Add money and Take out buttons, and the Coin diary" },
        { src: "assets/piggy/add-money.webp", alt: "Add money: tap glossy coins and notes, choose where the money is from, then press Pop it in" },
        { src: "assets/piggy/dreams.webp",    alt: "My dreams: a Bike dream with £8.00 saved of £10.00, and a sticker collection" },
        { src: "assets/piggy/new-dream.webp", alt: "New goal: pick a picture, a name and a price for a dream" },
        { src: "assets/piggy/play.webp",      alt: "Play: the Coin shop with Easy, Medium and Tricky, plus Need or want and Dress up Piggy" }
      ],

      privacyUrl: "privacy-piggy.html"
    }
  ],

  /* "poses": square pictures (assets/poses/). The first is shown; tapping the friend shows the next one. */
  characters: [
    { name: "Kitty", img: "assets/friends/kitty.webp", thumb: "assets/friends/kitty-thumb.webp", c: "#e0661a", pc: "#ffe6d2", c2: "#ff8a3d",
      poses: [
        { src: "assets/poses/kitty-circle.webp", alt: "Kitty jumping for joy" },
        { src: "assets/poses/kitty-sitting.webp", alt: "Kitty sitting and waving" },
        { src: "assets/poses/kitty-winking.webp", alt: "Kitty winking" },
        { src: "assets/poses/kitty-heart.webp", alt: "Kitty holding a pink heart" },
        { src: "assets/poses/kitty-playing.webp", alt: "Kitty playing" }
      ] },
    { name: "Bunny", img: "assets/friends/bunny.webp", thumb: "assets/friends/bunny-thumb.webp", c: "#e2479a", pc: "#ffe0ef", c2: "#9b5cf0",
      poses: [
        { src: "assets/poses/bunny-wave.webp", alt: "Bunny sitting and waving" },
        { src: "assets/poses/bunny-winking.webp", alt: "Bunny winking" },
        { src: "assets/poses/bunny-jumping.webp", alt: "Bunny jumping for joy" },
        { src: "assets/poses/bunny-playing.webp", alt: "Bunny playing with a bubble wand" }
      ] }
  ]
};
