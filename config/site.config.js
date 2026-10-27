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
    intro: "Two games and two apps for little ones, made with Emma and her friends.",
    sign: "with Emma and her friends. Made for little moments of fun.",
    banner: { src: "assets/bloom/brand-banner-3.webp", alt: "Emma Play World: Emma lying in the garden with Bunny, Kitty and Konic the baby unicorn. Fun, play, learn, explore." },
    closingImage: { src: "assets/video/friends-together.webp", alt: "Emma lying in the grass with Bunny, Kitty and Konic the baby unicorn, bubbles floating above", width: 900, height: 900 }
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
   * theme:          "bubbles" (sky blue), "bloom" (pink) or "piggy" (lilac) or "pegs" (clay purple)
   * stores.<store>.status: "available" | "coming-soon" | "hidden"
   * stores.<store>.url:    the real listing URL (required for "available")
   * stores.<store>.badge:  path to the OFFICIAL badge image
   * Optional blocks (each appears only when filled in): features, trust, cover + videos,
   * screenshots, friends (shows the characters below), note, privacyUrl.
   */
  games: [
    {
      id: "bubbles",
      group: "game",
      short: "Bubbles",
      theme: "bubbles",
      kind: "Game",
      name: "Puc Puc Bubbles",
      tagline: "Play, learn and explore with Emma and her friends.",
      intro: "Choose a board of letters, numbers, animals and more, and pop away with Emma and her friends.",
      art: { src: "assets/video/hero-art-2.webp", alt: "Puc Puc Bubbles: Emma lying in the garden with Bunny, Kitty and Konic the baby unicorn, bubbles floating above" },

      stores: {
        googlePlay: { status: "coming-soon", url: "", badge: "assets/badges/google-play.png" },
        appStore:   { status: "coming-soon", url: "", badge: "assets/badges/app-store.png" }
      },

      features: [
        { emoji: "🫧", color: "pink",   title: "Free Play", text: "Pop any bubble you like!" },
        { emoji: "🔍", color: "blue",   title: "Discover",  text: "Pop to find what's hiding!" },
        { emoji: "⭐", color: "yellow", title: "Boards",    text: "Choose what to pop" }
      ],

      cover: { src: "assets/video/trailer-cover-4.webp", alt: "Puc Puc Bubbles with Emma, Bunny, Kitty and Konic. Watch the game video." },
      videos: [
        { id: "jwZMuZUtWeo", title: "Puc Puc Bubbles game video", note: "Watch the video on YouTube" }
      ],

      screenshots: [
        { src: "assets/screens/home-2.webp",               alt: "Puc Puc Bubbles home screen: Emma with Bunny, Kitty and Konic the baby unicorn, and a big Play button" },
        { src: "assets/screens/explore-2.webp",            alt: "Explore screen with Free Play and Discover, plus Boards and Collection" },
        { src: "assets/screens/free-play-letters-2.webp",  alt: "Free Play on the Letters board: rows of glossy rainbow letter bubbles, with Emma and Kitty cheering you on" },
        { src: "assets/screens/pet-friends-2.webp",        alt: "Free Play on the Pet friends board: glossy bubbles with a dog, bunny, bear, panda, fox, frog, duckling and more" },
        { src: "assets/screens/discover-2.webp",           alt: "Discover mode: Emma says pop a bubble to see what's hiding" }
      ],

      friends: true,
      privacyUrl: "privacy.html#app"
    },

    {
      id: "pegs",
      short: "Pegs",
      group: "game",
      theme: "pegs",
      kind: "Game",
      name: "Puc Puc Pegs",
      tagline: "Match the colours. Make the picture.",
      intro: "Pick a picture board, find the peg that matches each ring and push it in. Emma and her friends are there to help.",
      art: { src: "assets/pegs/icon-card2.webp", alt: "Emma winking and pressing a colourful peg into a pink peg board" },
      heroArt: { src: "assets/pegs/icon.webp", alt: "Emma winking and pressing a colourful peg into a pink peg board", square: true },

      stores: {
        googlePlay: { status: "coming-soon", url: "", badge: "assets/badges/google-play.png" },
        appStore:   { status: "hidden", url: "", badge: "" }
      },

      features: [
        { emoji: "🎨", color: "pink",   title: "Match the colours", text: "Find the peg in the tray that matches each ring." },
        { emoji: "🌈", color: "purple", title: "My own colours",    text: "Choose any colour you like for every hole." },
        { emoji: "🖼️", color: "blue",   title: "Picture boards",    text: "A strawberry, an ice cream, a sun and lots more, from Easy to Tricky." },
        { emoji: "⭐", color: "yellow", title: "Stars",             text: "Collect stars as you finish pictures." },
        { emoji: "🎁", color: "orange", title: "Surprise me!",      text: "Let the game pick a picture for you." },
        { emoji: "👧", color: "green",  title: "Friends to help",   text: "Emma and Kitty say what to do next." }
      ],

      momentsTitle: "Pictures to make",
      moments: [
        { src: "assets/pegs/b-strawberry.webp", alt: "The strawberry board: a smiling strawberry on a picnic blanket with red and green peg rings" },
        { src: "assets/pegs/b-icecream.webp",   alt: "The ice cream board: two smiling scoops on a cone at the beach, with pink, yellow and red peg rings" }
      ],

      trust: ["No ads", "No accounts", "Nothing leaves the device"],
      note: "Free to try with 2 pictures in each level, plus free play. Premium (a yearly subscription billed by Google Play, with a 3-day free trial) unlocks all 60 pictures.",

      screenshots: [
        { src: "assets/pegs/home.webp",        alt: "Puc Puc Pegs home screen: Match the colours and My own colours, Easy, Medium and Tricky levels, and picture boards" },
        { src: "assets/pegs/board.webp",       alt: "Strawberry board: a speech bubble from Emma, a smiling strawberry with six rings and a tray of coloured pegs" },
        { src: "assets/pegs/ice-cream.webp",   alt: "Ice cream board with Kitty saying find a peg in the tray that matches a ring" },
        { src: "assets/pegs/own-colours.webp", alt: "My own colours mode: the boards show plain rings you can colour as you like" }
      ],

      privacyUrl: "privacy-pegs.html"
    },

    {
      id: "piggy",
      group: "app",
      short: "Piggy",
      theme: "piggy",
      kind: "Piggy bank app",
      name: "Puc Puc Piggy",
      tagline: "Little coins, big dreams.",
      intro: "A private piggy bank for children, used together with a grown-up. Pop coins in, pick a dream and watch the jar fill up.",
      art: { src: "assets/piggy/hero-coin-piggy.webp", alt: "Emma laughing and holding a big gold star coin, with a smiling pink piggy bank beside her" },

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
        { src: "assets/piggy/piggy-wink.webp", alt: "Piggy, the pink piggy bank, winking with a big smile" },
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
    },

    {
      id: "bloom",
      group: "app",
      short: "Bloom",
      theme: "bloom",
      kind: "Habit tracker app",
      name: "Puc Puc Bloom",
      tagline: "Little habits, happy hearts.",
      intro: "A happy habit tracker for children, set up by grown-ups. Tick off small habits together and watch a garden grow.",
      art: { src: "assets/bloom/flower-glow.webp", alt: "A glowing pink flower sprouting from the soil while Kitty watches happily, with butterflies all around" },
      moments: [
        { src: "assets/bloom/emma-cheer.webp",     alt: "Emma cheering with a big happy smile" },
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
      ] },
    { name: "Konic", img: "assets/friends/konic.webp", thumb: "assets/friends/konic-thumb.webp", c: "#8a4cf0", pc: "#efe4ff", c2: "#ff5fb8",
      poses: [
        { src: "assets/poses/konic-sitting.webp", alt: "Konic the baby unicorn sitting and smiling" },
        { src: "assets/poses/konic-waving.webp", alt: "Konic waving a hoof and winking" },
        { src: "assets/poses/konic-heart.webp", alt: "Konic hugging a pink heart" },
        { src: "assets/poses/konic-bubbles.webp", alt: "Konic looking up at floating bubbles" },
        { src: "assets/poses/konic-dancing.webp", alt: "Konic dancing" },
        { src: "assets/poses/konic-cheering.webp", alt: "Konic jumping and cheering" },
        { src: "assets/poses/konic-leaping.webp", alt: "Konic leaping with his wings out" }
      ] }
  ]
};
