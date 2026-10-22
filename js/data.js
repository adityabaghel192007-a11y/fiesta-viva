/* ==========================================================================
   FIESTA VIVA — data.js
   All site content lives here, in plain JavaScript arrays and objects.
   Other files READ this data; nothing is duplicated elsewhere.

   Markup used inside team contribution text:
     [[spanish|english]]      → a Spanish word or phrase (counted for the 25-word check)
     [[valenciano|english|ca]] → a Valencian (Catalan-language) term, shown but NOT counted
   ========================================================================== */

/* ---------- Sources (cited near content and listed in the footer) ---------- */
const SOURCES = {
  "wiki-tomatina":   { title: "La Tomatina", publisher: "Wikipedia", url: "https://en.wikipedia.org/wiki/La_Tomatina" },
  "wiki-fallas":     { title: "Falles (Fallas)", publisher: "Wikipedia", url: "https://en.wikipedia.org/wiki/Fallas" },
  "cv-fallas":       { title: "The complete guide to las Fallas in València", publisher: "Comunitat Valenciana Tourism", url: "https://www.comunitatvalenciana.com/en/be-inspired/valencia-during-fallas" },
  "spain-sanfermin": { title: "Fiestas de San Fermín", publisher: "Spain.info (Turespaña)", url: "https://spain.info/es/agenda/fiestas-san-fermin/" },
  "wiki-sanfermin":  { title: "Festival of San Fermín", publisher: "Wikipedia", url: "https://en.wikipedia.org/wiki/Festival_of_San_Ferm%C3%ADn" },
  "unesco-muertos":  { title: "Indigenous festivity dedicated to the dead", publisher: "UNESCO Intangible Cultural Heritage", url: "https://ich.unesco.org/en/RL/traditional-mexican-festivities-dedicated-to-the-dead-00054" },
  "unam-ofrenda":    { title: "La ofrenda mexicana", publisher: "UNAM Boston", url: "https://www.boston.unam.mx/ofrenda/ofrenda-mexicana?lang=en" },
  "upo-feria":       { title: "Feria de Abril: historia y origen", publisher: "Universidad Pablo de Olavide", url: "https://www.upo.es/patio-colorado/2022/05/06/feria-de-abril-historia-y-origen/" },
  "zgz-pilar":       { title: "Historia de las Fiestas del Pilar", publisher: "Ayuntamiento de Zaragoza", url: "https://zaragoza.es/sede/portal/cultura/fiestas-pilar/historia" },
  "zgz-jota":        { title: "The Aragonese Jota", publisher: "Zaragoza Tourism", url: "https://www.zaragoza.es/sede/portal/turismo/post/jota-aragonesa?locale=en" },
  "unesco-barranquilla": { title: "Carnival of Barranquilla", publisher: "UNESCO Intangible Cultural Heritage", url: "https://ich.unesco.org/en/RL/carnival-of-barranquilla-00051" },
  "unesco-flamenco": { title: "Flamenco", publisher: "UNESCO Intangible Cultural Heritage", url: "https://ich.unesco.org/en/RL/flamenco-00363" },
  "vv-paella":       { title: "The Valencian Paella Recipe", publisher: "Visit València", url: "https://www.visitvalencia.com/en/node/78134" },
  "vv-sweets":       { title: "Traditional Valencian sweets", publisher: "Visit València", url: "https://www.visitvalencia.com/en/what-to-do-valencia/gastronomy/valencian-desserts" },
  "spain-tapas":     { title: "Tapas in Spain", publisher: "Spain.info (Turespaña)", url: "https://www.spain.info/en/discover-spain/tapas-spain/" },
  "wiki-tortilla":   { title: "Spanish omelette", publisher: "Wikipedia", url: "https://en.wikipedia.org/wiki/Spanish_omelette" },
  "wiki-churro":     { title: "Churro", publisher: "Wikipedia", url: "https://en.wikipedia.org/wiki/Churro" }
};

/* ---------- Festivals ----------
   featured: true → shown in the main Festivals section (Aditya).
   All festivals appear in the Explorer (Anay).
   categories: "food" | "music" | "art" | "tradition"                   */
const FESTIVALS = [
  {
    id: "tomatina",
    name: "La Tomatina",
    english: "The tomato battle",
    country: "Spain",
    region: "Comunitat Valenciana",
    place: "Buñol, province of Valencia",
    when: "Last Wednesday of August (the exact date changes every year)",
    months: ["Aug"],
    categories: ["food", "tradition"],
    featured: true,
    image: "assets/illustrations/tomatina.svg",
    alt: "Illustration of a narrow Buñol street full of people in white T-shirts throwing squashed red tomatoes",
    summary: "A one-hour street battle in which thousands of people throw ripe tomatoes at each other in a small town near Valencia.",
    history: "The most commonly told story says the first tomato fight broke out in 1945 during a parade of gigantes y cabezudos (giants and big-headed figures), when a scuffle spread to a vegetable stall. Young people repeated it the following year, and it became an annual custom. These early details are not well documented, so treat the origin story as local tradition rather than verified history. The event was banned for a time in the 1950s before being officially allowed again. Since 2013 the town has limited participation with tickets.",
    traditions: [
      "The morning begins with the palo jabón: people try to climb a greased pole to grab a ham at the top.",
      "Trucks bring the tomatoes into the streets; the battle usually lasts about one hour.",
      "Safety rules ask everyone to squash tomatoes before throwing and to stop after the second signal shot.",
      "Afterwards, fire hoses wash the streets and participants rinse off."
    ],
    significance: "La Tomatina shows how a small-town custom can become internationally famous while remaining a local celebration with its own rules.",
    phrases: [
      { es: "¡Aplasta el tomate antes de lanzarlo!", en: "Squash the tomato before you throw it!" },
      { es: "La batalla dura una hora.", en: "The battle lasts one hour." }
    ],
    food: "Tomatoes are the 'ammunition', not a meal. In the days before the battle, the festival week has included a paella contest near the town square.",
    foodKind: "festival",
    music: "Festival week includes music bands and parades through the old town, but the tomato fight itself is not a music or dance event.",
    sources: ["wiki-tomatina"]
  },
  {
    id: "fallas",
    name: "Las Fallas",
    english: "The festival of fire (Falles in Valencian)",
    country: "Spain",
    region: "Comunitat Valenciana",
    place: "València city",
    when: "Main days 15–19 March; firecracker shows run daily from 1 March",
    months: ["Mar"],
    categories: ["art", "music", "food", "tradition"],
    featured: true,
    image: "assets/illustrations/fallas.svg",
    alt: "Illustration of a tall satirical falla monument with painted figures, beginning to burn against a night sky",
    summary: "Neighbourhoods build huge satirical monuments, then burn them on the night of 19 March, the feast of San José (Saint Joseph).",
    history: "The festival is tied to the feast of San José, Valencia's patron saint, on 19 March. One popular theory links it to carpenters who burned old wood at the end of winter, but several explanations exist and the origin is not settled. Las Fallas was added to UNESCO's list of Intangible Cultural Heritage in 2016.",
    traditions: [
      "Each neighbourhood association (casal faller) works all year to build a falla made of ninots, painted figures that often satirise current events.",
      "The mascletà, a deafening, rhythmic firecracker show, takes place at 2 pm in the City Hall square.",
      "On 17–18 March, falleros in traditional dress carry flowers to the Virgen de los Desamparados in the Ofrenda de Flores.",
      "On 19 March, the cremà burns the monuments; one ninot chosen by public vote (the ninot indultat) is saved for the Fallas museum."
    ],
    significance: "Las Fallas mixes art, satire, religious devotion and community work. Months of craft are deliberately turned to ashes, which gives the festival a powerful sense of renewal.",
    phrases: [
      { es: "Los ninots arden la noche del 19 de marzo.", en: "The ninots burn on the night of 19 March." },
      { es: "Vamos a ver la mascletà en la plaza.", en: "Let's go and watch the mascletà in the square." }
    ],
    food: "Street stalls sell buñuelos de calabaza (pumpkin fritters), churros and roasted chestnuts; neighbourhood associations often cook paella. Buñuelos are especially linked to Fallas.",
    foodKind: "festival",
    music: "Brass bands wake the city at 8 am (la despertà) and accompany processions. The dolçaina (a reed pipe) and tabalet (a small drum) are traditional Valencian instruments heard in the streets.",
    sources: ["wiki-fallas", "cv-fallas", "vv-sweets"]
  },
  {
    id: "sanfermin",
    name: "San Fermín",
    english: "The Sanfermines of Pamplona",
    country: "Spain",
    region: "Navarra",
    place: "Pamplona (Iruña), Navarre",
    when: "6 July at noon until midnight on 14 July",
    months: ["Jul"],
    categories: ["music", "tradition"],
    featured: true,
    image: "assets/illustrations/sanfermin.svg",
    alt: "Illustration of a crowd dressed in white with red neckerchiefs raised in front of Pamplona's town hall as a rocket bursts overhead",
    summary: "Nine days of celebration in honour of Saint Fermín, patron of Navarre, opened by a rocket fired from the Town Hall balcony.",
    history: "Saint Fermín's religious feast was moved from October to July in 1591 so it could coincide with Pamplona's summer trade fair; that merger is considered the start of the Sanfermines. International fame grew after Ernest Hemingway described the festival in his novel known in English as The Sun Also Rises (published in some editions as Fiesta).",
    traditions: [
      "El chupinazo: a rocket launched from the Town Hall balcony at noon on 6 July opens the festival.",
      "Most people dress in white with a red neckerchief (pañuelo) and often a red sash.",
      "The encierro (running of the bulls) takes place each morning from 7 to 14 July at 8:00 along a route of a little over 800 metres.",
      "Gigantes y cabezudos parade through the old town; on 7 July a procession carries the statue of the saint.",
      "At midnight on 14 July, crowds hold candles and sing 'Pobre de mí' to close the festival."
    ],
    significance: "San Fermín blends religious devotion, street celebration and local identity. The bull runs are also the subject of ongoing animal-welfare and safety debate, which is worth acknowledging when presenting it.",
    phrases: [
      { es: "¡Viva San Fermín!", en: "Long live San Fermín!" },
      { es: "Pobre de mí, ya se acaban las fiestas.", en: "Poor me, the festivities are ending now." }
    ],
    food: "The official guides focus on events rather than a specific dish, so we do not link a particular food to San Fermín here.",
    foodKind: "none",
    music: "La Pamplonesa, the city band, plays in the streets; the giants parade with pipers and txistularis (Basque flute players). Social clubs called peñas bring their own bands and songs.",
    sources: ["spain-sanfermin", "wiki-sanfermin"]
  },
  {
    id: "muertos",
    name: "Día de los Muertos",
    english: "The Day of the Dead",
    country: "Mexico",
    region: "Mexico (nationwide, strongest in Indigenous communities)",
    place: "Communities across Mexico",
    when: "Late October to early November, with 1 and 2 November as the central days",
    months: ["Oct", "Nov"],
    categories: ["food", "art", "tradition"],
    featured: true,
    worldNote: "Not a Spanish festival: Día de los Muertos is a Mexican tradition, part of the wider Spanish-speaking world.",
    image: "assets/illustrations/muertos.svg",
    alt: "Illustration of a home altar with marigold flowers, candles, bread of the dead and strings of cut-paper banners",
    summary: "Families welcome the souls of loved ones home with altars, flowers, food and candles. It is a joyful act of remembrance, not a sad one.",
    history: "UNESCO describes the festivity as a blend of pre-Hispanic Indigenous rites and Catholic feasts brought by Europeans in the sixteenth century. It also marks the end of the yearly maize cycle. It was inscribed on UNESCO's Representative List of Intangible Cultural Heritage in 2008.",
    traditions: [
      "Families build an ofrenda (altar offering) at home and decorate graves.",
      "Cempasúchil (marigold) petals are believed to light the way for returning souls.",
      "Altars often hold photos, candles, water, salt, copal incense and the favourite foods of the person remembered.",
      "Papel picado (cut-paper banners) and calaveras de azúcar (sugar skulls) decorate the space."
    ],
    significance: "The celebration keeps family memory alive and strengthens community bonds. It is also a strong example of how Indigenous and Spanish-colonial traditions combined in the Americas.",
    phrases: [
      { es: "Ponemos una ofrenda para recordar a nuestra familia.", en: "We set up an offering to remember our family." },
      { es: "Las flores de cempasúchil guían a las almas.", en: "Marigold flowers guide the souls." }
    ],
    food: "Pan de muerto, a sweet bread shaped to suggest bones, and the favourite dishes of the departed are placed on the altar.",
    foodKind: "festival",
    music: "Music varies by region and family; we found no single music style that defines the celebration, so we do not name one here.",
    sources: ["unesco-muertos", "unam-ofrenda"]
  },
  {
    id: "feria",
    name: "Feria de Abril",
    english: "Seville's April Fair",
    country: "Spain",
    region: "Andalucía",
    place: "Sevilla (Seville), Andalusia",
    when: "Usually two weeks after Easter Sunday, so the date moves every year (sometimes into early May)",
    months: ["Apr", "May"],
    categories: ["music", "food", "tradition"],
    featured: false,
    image: "assets/illustrations/feria.svg",
    alt: "Illustration of striped fair tents (casetas) lit with paper lanterns and a couple dancing sevillanas",
    summary: "A week of dancing, dressing up and meeting friends in hundreds of decorated tents called casetas.",
    history: "The fair was founded as a livestock-trading event; the first edition opened in April 1847. During the twentieth century it gradually became mainly a festive celebration.",
    traditions: [
      "Friends, families and associations gather in casetas, many with a wooden floor for dancing.",
      "Many women wear the traje de flamenca (flamenca dress).",
      "An illuminated decorative gateway (la portada) marks the fair's entrance each year."
    ],
    significance: "The Feria is one of the clearest places where Andalusian music, dress and social life meet.",
    phrases: [
      { es: "Vamos a bailar sevillanas en la caseta.", en: "Let's dance sevillanas in the tent." }
    ],
    food: "The classic fair drink is rebujito (sherry mixed with a lemon-lime soda); food is shared inside the casetas.",
    foodKind: "festival",
    music: "Sevillanas, a lively Andalusian folk dance for couples, are danced in the casetas.",
    sources: ["upo-feria"]
  },
  {
    id: "pilar",
    name: "Fiestas del Pilar",
    english: "Festival of Our Lady of the Pillar",
    country: "Spain",
    region: "Aragón",
    place: "Zaragoza, Aragon",
    when: "The week around 12 October (the feast day itself is 12 October)",
    months: ["Oct"],
    categories: ["music", "tradition"],
    featured: false,
    image: "assets/illustrations/pilar.svg",
    alt: "Illustration of a large mound of flowers offered in front of the domes of the Pilar basilica",
    summary: "Zaragoza's main festival, famous for a huge flower offering and performances of the Aragonese jota.",
    history: "The Virgen del Pilar has been celebrated on 12 October since 1613. The city's Ofrenda de Flores (flower offering) dates from the 1950s and the Ofrenda de Frutos from 1949.",
    traditions: [
      "The Ofrenda de Flores: people bring flowers to the Plaza del Pilar, building a large floral mantle.",
      "The Ofrenda de Frutos (offering of fruits of the land) and the Rosario de Cristal, a night procession of illuminated glass lanterns created in 1891.",
      "Gigantes y cabezudos parade through the streets."
    ],
    significance: "The festival connects religious devotion with Aragonese regional identity, especially through the jota.",
    phrases: [
      { es: "Llevamos flores a la Virgen del Pilar.", en: "We bring flowers to the Virgin of the Pillar." }
    ],
    food: "The Ofrenda de Frutos celebrates the region's harvest produce.",
    foodKind: "festival",
    music: "The Aragonese jota — sung and danced with castanets to a rondalla of guitars and bandurrias — is central, and the festival programme includes official jota contests (certámenes).",
    sources: ["zgz-pilar", "zgz-jota"]
  },
  {
    id: "barranquilla",
    name: "Carnaval de Barranquilla",
    english: "The Carnival of Barranquilla",
    country: "Colombia",
    region: "Atlántico (Caribbean coast)",
    place: "Barranquilla, Colombia",
    when: "The four days before Lent (February or March, depending on Easter)",
    months: ["Feb", "Mar"],
    categories: ["music", "art", "tradition"],
    featured: false,
    worldNote: "Not a Spanish festival: this carnival takes place in Colombia.",
    image: "assets/illustrations/barranquilla.svg",
    alt: "Illustration of carnival dancers in bright costumes and animal masks with drums and maracas",
    summary: "A Caribbean carnival that mixes European, African and Indigenous traditions in music, dance and handcrafted costumes.",
    history: "Barranquilla's port made it a meeting point of cultures, and the carnival blends all three heritages. UNESCO inscribed it on its Representative List in 2008.",
    traditions: [
      "Parades of floats and dance groups in handcrafted costumes and animal masks.",
      "Masked performers act out satirical scenes about history and current events.",
      "Dances include the African-rooted congo and the paloteo, which has Spanish roots."
    ],
    significance: "The carnival shows how the Spanish-speaking world includes African and Indigenous cultures, not only Spanish ones.",
    phrases: [
      { es: "La cumbia suena en las calles de Barranquilla.", en: "Cumbia plays in the streets of Barranquilla." }
    ],
    food: "We did not find a reliably documented signature carnival dish, so none is listed.",
    foodKind: "none",
    music: "Cumbia is the dominant genre, played with drums, maracas and wind instruments.",
    sources: ["unesco-barranquilla"]
  }
];

/* ---------- Cuisine (Pranshu) ----------
   kind: "festival" = documented festival link, "everyday" = general Spanish cuisine */
const DISHES = [
  {
    id: "paella",
    name: "Paella valenciana",
    english: "Valencian rice dish",
    kind: "regional",
    kindLabel: "Valencian regional dish",
    context: "Comunitat Valenciana. Neighbourhood associations often cook it during Fallas, and La Tomatina's festival week has included a paella contest — but it is eaten all year, not only at festivals.",
    ingredients: ["Rice", "Chicken", "Rabbit", "Flat green beans (ferraura)", "Butter beans (garrofó)", "Tomato", "Sweet paprika", "Saffron", "Olive oil", "Rosemary"],
    why: "Paella is cooked in a wide, shallow pan for many people at once, which makes it a natural dish for gatherings. The traditional Valencian version uses meat and vegetables, not seafood.",
    sentence: { es: "La paella se cocina en una sartén ancha y plana.", en: "Paella is cooked in a wide, flat pan." },
    image: "assets/illustrations/paella.svg",
    alt: "Illustration of a paella pan seen from above with yellow rice, green beans, chicken and a sprig of rosemary",
    sources: ["vv-paella"]
  },
  {
    id: "churros",
    name: "Churros con chocolate",
    english: "Fried dough sticks with thick hot chocolate",
    kind: "everyday",
    kindLabel: "Everyday Spanish food",
    context: "Found across Spain. Usually eaten for breakfast or as an afternoon snack; churro stalls are common at fairs and holidays.",
    ingredients: ["Flour", "Water", "Salt", "Oil for frying", "Thick drinking chocolate"],
    why: "The dough is piped through a star-shaped nozzle and fried until crisp, then dipped in hot chocolate. Thicker versions are called porras in some regions.",
    sentence: { es: "Mojamos los churros en el chocolate caliente.", en: "We dip the churros in the hot chocolate." },
    image: "assets/illustrations/churros.svg",
    alt: "Illustration of ridged churros next to a cup of thick hot chocolate",
    sources: ["wiki-churro"]
  },
  {
    id: "tapas",
    name: "Tapas",
    english: "Small shared plates",
    kind: "everyday",
    kindLabel: "Everyday Spanish food",
    context: "All over Spain. In the Basque Country, small bites are called pintxos (pinchos).",
    ingredients: ["Varies: olives, cheese, cured ham, croquettes, potatoes, seafood…"],
    why: "Going 'de tapas' means moving from bar to bar with friends, sharing small portions with a drink. It is as much a social habit as a type of food. Stories about the word's origin (food used to 'cover' a glass) are popular, but the true origin is uncertain.",
    sentence: { es: "¿Vamos de tapas esta noche?", en: "Shall we go out for tapas tonight?" },
    image: "assets/illustrations/tapas.svg",
    alt: "Illustration of several small clay dishes with olives, cheese and croquettes on a wooden bar",
    sources: ["spain-tapas"]
  },
  {
    id: "tortilla",
    name: "Tortilla española",
    english: "Spanish potato omelette (tortilla de patatas)",
    kind: "everyday",
    kindLabel: "Everyday Spanish food",
    context: "Found throughout Spain; often served at room temperature as a tapa called a pincho de tortilla. The earliest known written mention is from Navarre in 1817.",
    ingredients: ["Eggs", "Potatoes", "Olive oil", "Onion (optional — and hotly debated!)", "Salt"],
    why: "Simple, cheap ingredients make a filling dish that is easy to share in slices — a favourite for picnics, family meals and bars.",
    sentence: { es: "La tortilla lleva huevos, patatas y, a veces, cebolla.", en: "The omelette has eggs, potatoes and, sometimes, onion." },
    image: "assets/illustrations/tortilla.svg",
    alt: "Illustration of a thick golden potato omelette with one slice cut out",
    sources: ["wiki-tortilla"]
  },
  {
    id: "bunuelos",
    name: "Buñuelos de calabaza",
    english: "Pumpkin fritters",
    kind: "festival",
    kindLabel: "Festival food: Las Fallas",
    context: "València. Sold at street stalls during Las Fallas — a documented festival favourite.",
    ingredients: ["Pumpkin", "Flour", "Yeast", "Sugar", "Oil for frying"],
    why: "Valencia's tourism board describes them as a popular Fallas treat that goes especially well with a cup of hot chocolate.",
    sentence: { es: "Los buñuelos de calabaza son típicos de las Fallas.", en: "Pumpkin fritters are typical of Las Fallas." },
    image: "assets/illustrations/bunuelos.svg",
    alt: "Illustration of ring-shaped golden fritters dusted with sugar beside a cup of chocolate",
    sources: ["vv-sweets"]
  },
  {
    id: "pan-muerto",
    name: "Pan de muerto",
    english: "Bread of the dead",
    kind: "festival",
    kindLabel: "Festival food: Día de los Muertos (Mexico)",
    context: "Mexico. Placed on the ofrenda for Día de los Muertos — from the wider Hispanic world, not Spain.",
    ingredients: ["Flour", "Eggs", "Butter", "Sugar", "Sesame or sugar topping"],
    why: "Its decoration is shaped to suggest bones, connecting food directly to the meaning of the celebration.",
    sentence: { es: "El pan de muerto está en la ofrenda.", en: "The bread of the dead is on the altar offering." },
    image: "assets/illustrations/panmuerto.svg",
    alt: "Illustration of a round sweet bread decorated with bone-shaped strips and sugar",
    sources: ["unam-ofrenda"]
  }
];

/* ---------- Music & dance (Shreyam) ---------- */
const MUSIC = [
  {
    id: "flamenco",
    name: "Flamenco",
    english: "Song, dance and guitar from southern Spain",
    region: "Andalusia (also historic roots in Murcia and Extremadura)",
    text: "Flamenco joins three arts: cante (singing), baile (dance) and toque (guitar). The Gitano (Roma) community has played a central role in its development, and it is passed down through families and flamenco clubs. UNESCO added it to its Intangible Cultural Heritage list in 2010. It is strongly Andalusian — it is not the soundtrack of every Spanish festival.",
    image: "assets/illustrations/flamenco.svg",
    alt: "Illustration of a flamenco dancer in a red ruffled dress with one arm raised",
    sources: ["unesco-flamenco"]
  },
  {
    id: "palmas",
    name: "Guitarra y palmas",
    english: "Guitar and rhythmic handclapping",
    region: "Flamenco performance",
    text: "In flamenco the guitar has grown from simple accompaniment into a solo art. Palmas (handclaps), footwork (zapateado) and sometimes castanets add percussion. Performers keep a shared rhythmic cycle called the compás — try the demo below to hear one.",
    image: "assets/illustrations/guitarra.svg",
    alt: "Illustration of a Spanish guitar with two clapping hands beside it",
    sources: ["unesco-flamenco"]
  },
  {
    id: "jota",
    name: "Jota aragonesa",
    english: "The jota of Aragon",
    region: "Aragón (Zaragoza)",
    text: "The jota combines song, dance and music. Dancers use heel-and-toe steps and small jumps, arms raised and curved, often with castanets and colourful regional costume. A rondalla of guitars, lutes and bandurrias plays, and the sung jota is especially admired. It takes centre stage during the Fiestas del Pilar.",
    image: "assets/illustrations/jota.svg",
    alt: "Illustration of two jota dancers in Aragonese regional costume mid-jump",
    sources: ["zgz-jota"]
  },
  {
    id: "street",
    name: "Bandas y música de calle",
    english: "Bands and street music",
    region: "Valencia, Pamplona, Barranquilla",
    text: "Many festivals sound like brass bands, drums and pipes rather than flamenco. In Valencia, bands lead the 8 am despertà and the dolçaina and tabalet are traditional. In Pamplona, La Pamplonesa band and txistularis accompany the giants. In Barranquilla, cumbia drums and maracas drive the carnival.",
    image: "assets/illustrations/banda.svg",
    alt: "Illustration of a street band with a drum, a trumpet and a reed pipe",
    sources: ["wiki-fallas", "spain-sanfermin", "unesco-barranquilla"]
  }
];

/* ---------- Vocabulary (Palabras para celebrar) ---------- */
const VOCABULARY = [
  // Fiesta
  { es: "la fiesta", en: "celebration, party", cat: "Fiesta" },
  { es: "la tradición", en: "tradition", cat: "Fiesta" },
  { es: "la cultura", en: "culture", cat: "Fiesta" },
  { es: "el desfile", en: "parade", cat: "Fiesta" },
  { es: "el fuego", en: "fire", cat: "Fiesta" },
  { es: "los fuegos artificiales", en: "fireworks", cat: "Fiesta" },
  { es: "el traje", en: "costume, outfit", cat: "Fiesta" },
  { es: "la máscara", en: "mask", cat: "Fiesta" },
  { es: "la ofrenda", en: "offering", cat: "Fiesta" },
  { es: "las flores", en: "flowers", cat: "Fiesta" },
  { es: "la vela", en: "candle", cat: "Fiesta" },
  { es: "el pañuelo", en: "neckerchief, handkerchief", cat: "Fiesta" },
  { es: "el santo patrón", en: "patron saint", cat: "Fiesta" },
  { es: "la procesión", en: "procession", cat: "Fiesta" },
  { es: "el carnaval", en: "carnival", cat: "Fiesta" },
  // Comida
  { es: "la comida", en: "food, lunch", cat: "Comida" },
  { es: "el sabor", en: "flavour, taste", cat: "Comida" },
  { es: "el arroz", en: "rice", cat: "Comida" },
  { es: "el pan", en: "bread", cat: "Comida" },
  { es: "el huevo", en: "egg", cat: "Comida" },
  { es: "la patata", en: "potato", cat: "Comida" },
  { es: "la cebolla", en: "onion", cat: "Comida" },
  { es: "el tomate", en: "tomato", cat: "Comida" },
  { es: "el azafrán", en: "saffron", cat: "Comida" },
  { es: "el aceite de oliva", en: "olive oil", cat: "Comida" },
  { es: "el dulce", en: "sweet, dessert", cat: "Comida" },
  { es: "la receta", en: "recipe", cat: "Comida" },
  // Música y baile
  { es: "la música", en: "music", cat: "Música y baile" },
  { es: "el baile", en: "dance", cat: "Música y baile" },
  { es: "el ritmo", en: "rhythm", cat: "Música y baile" },
  { es: "la canción", en: "song", cat: "Música y baile" },
  { es: "la guitarra", en: "guitar", cat: "Música y baile" },
  { es: "las palmas", en: "rhythmic handclaps", cat: "Música y baile" },
  { es: "las castañuelas", en: "castanets", cat: "Música y baile" },
  { es: "el tambor", en: "drum", cat: "Música y baile" },
  { es: "la banda", en: "band", cat: "Música y baile" },
  // Gente y lugares
  { es: "la ciudad", en: "city", cat: "Gente y lugares" },
  { es: "el pueblo", en: "town, village; a people", cat: "Gente y lugares" },
  { es: "la plaza", en: "town square", cat: "Gente y lugares" },
  { es: "la calle", en: "street", cat: "Gente y lugares" },
  { es: "la gente", en: "people", cat: "Gente y lugares" },
  { es: "la familia", en: "family", cat: "Gente y lugares" },
  { es: "el barrio", en: "neighbourhood", cat: "Gente y lugares" },
  { es: "el país", en: "country", cat: "Gente y lugares" },
  // Verbos
  { es: "celebrar", en: "to celebrate", cat: "Verbos" },
  { es: "bailar", en: "to dance", cat: "Verbos" },
  { es: "cantar", en: "to sing", cat: "Verbos" },
  { es: "comer", en: "to eat", cat: "Verbos" },
  { es: "compartir", en: "to share", cat: "Verbos" },
  { es: "aprender", en: "to learn", cat: "Verbos" },
  { es: "descubrir", en: "to discover", cat: "Verbos" },
  { es: "recordar", en: "to remember", cat: "Verbos" },
  // Expresiones
  { es: "la alegría", en: "joy", cat: "Expresiones" },
  { es: "¡Viva!", en: "Long live…! / Hooray!", cat: "Expresiones" },
  { es: "¡Qué bonito!", en: "How beautiful!", cat: "Expresiones" },
  { es: "¡Buen provecho!", en: "Enjoy your meal!", cat: "Expresiones" },
  { es: "¡Felices fiestas!", en: "Happy holidays / happy festivities!", cat: "Expresiones" }
];

/* ---------- Quiz (Aritra) ----------
   answer = index (0–3) of the correct option in `options`.
   Options are shuffled at the start of each attempt; the code tracks the
   correct option by its text, so shuffling can never break the answer key. */
const QUIZ_QUESTIONS = [
  { id: 1, topic: "Locations", question: "In which town is La Tomatina held?",
    options: ["Buñol", "Pamplona", "Sevilla", "Zaragoza"], answer: 0,
    explanation: "La Tomatina takes place in Buñol, a town in the province of Valencia." },
  { id: 2, topic: "Festivals", question: "When does La Tomatina usually take place?",
    options: ["On 19 March", "On the last Wednesday of August", "From 6 to 14 July", "On 12 October"], answer: 1,
    explanation: "It is held on the last Wednesday of August, so the exact date changes each year." },
  { id: 3, topic: "Festivals", question: "What happens during 'la cremà' at Las Fallas?",
    options: ["A flower offering to the Virgin", "A tomato battle", "The falla monuments are burned", "A bull run through the streets"], answer: 2,
    explanation: "La cremà is the burning of the fallas on the night of 19 March, the climax of the festival." },
  { id: 4, topic: "Festivals", question: "Las Fallas honours which saint, whose feast day is 19 March?",
    options: ["San Fermín", "San José (Saint Joseph)", "Santiago (Saint James)", "San Juan (Saint John)"], answer: 1,
    explanation: "Las Fallas is tied to the feast of San José, Valencia's patron saint, on 19 March." },
  { id: 5, topic: "Festivals", question: "What is the 'ninot indultat'?",
    options: ["The largest falla in the city", "A firecracker show at 2 pm", "The festival queen", "A figure saved from the fire by popular vote"], answer: 3,
    explanation: "Each year one ninot is 'pardoned' by public vote and kept in the Fallas museum instead of burning." },
  { id: 6, topic: "Festivals", question: "How does San Fermín officially begin?",
    options: ["With el chupinazo, a rocket fired from the Town Hall balcony at noon on 6 July", "With the first bull run at midnight", "With a flower offering in the cathedral", "With the song 'Pobre de mí'"], answer: 0,
    explanation: "El chupinazo opens the festival; 'Pobre de mí' is sung at the very end, on 14 July." },
  { id: 7, topic: "Culture", question: "What do most people traditionally wear at San Fermín?",
    options: ["Black clothes and a hat", "Flamenca dresses", "White clothes with a red neckerchief", "Animal masks"], answer: 2,
    explanation: "White clothing with a red pañuelo (neckerchief) is the classic San Fermín outfit." },
  { id: 8, topic: "Culture", question: "Which statement about Día de los Muertos is accurate?",
    options: ["It began in Spain and spread to Mexico", "It is a Mexican tradition blending Indigenous rites and Catholic feasts", "It is held on the last Wednesday of August", "It is mainly a music competition"], answer: 1,
    explanation: "UNESCO describes it as an Indigenous Mexican festivity blended with Catholic feasts brought in the sixteenth century." },
  { id: 9, topic: "Vocabulary", question: "What is 'cempasúchil'?",
    options: ["A marigold flower", "A sugar skull", "A type of candle", "A sweet bread"], answer: 0,
    explanation: "Cempasúchil is the Mexican marigold; its petals are believed to guide souls to the ofrenda." },
  { id: 10, topic: "Cuisine", question: "Which two meats are traditional in paella valenciana?",
    options: ["Prawns and mussels", "Pork and beef", "Lamb and duck", "Chicken and rabbit"], answer: 3,
    explanation: "The traditional Valencian recipe uses chicken and rabbit with green beans, butter beans and saffron." },
  { id: 11, topic: "Cuisine", question: "Which sweet is especially linked to Las Fallas?",
    options: ["Pan de muerto", "Buñuelos de calabaza", "Tortilla española", "Rebujito"], answer: 1,
    explanation: "Pumpkin fritters (buñuelos de calabaza) are a popular Fallas treat, often eaten with hot chocolate." },
  { id: 12, topic: "Vocabulary", question: "'Mojamos los churros en el chocolate.' What are we doing?",
    options: ["Buying churros at the market", "Frying churros in oil", "Dipping churros in chocolate", "Sharing churros with friends"], answer: 2,
    explanation: "Mojar means 'to dip' — we dip the churros in the chocolate." },
  { id: 13, topic: "Cuisine", question: "In the Basque Country, small tapas-style bites are called…",
    options: ["Pintxos", "Porras", "Buñuelos", "Garrofó"], answer: 0,
    explanation: "Pintxos (pinchos in Spanish spelling) are the Basque name for small bar snacks." },
  { id: 14, topic: "Music & dance", question: "Flamenco combines cante, baile and toque. What is 'toque'?",
    options: ["Singing", "Handclapping", "Footwork", "Guitar playing"], answer: 3,
    explanation: "Cante is singing, baile is dance and toque is guitar playing." },
  { id: 15, topic: "Music & dance", question: "Which region is the heartland of flamenco?",
    options: ["Navarra", "Andalucía", "Aragón", "Comunitat Valenciana"], answer: 1,
    explanation: "Flamenco is rooted in Andalusia in southern Spain — it is not the music of every Spanish festival." },
  { id: 16, topic: "Music & dance", question: "The jota aragonesa is most closely associated with which festival?",
    options: ["La Tomatina", "Carnaval de Barranquilla", "Fiestas del Pilar in Zaragoza", "Día de los Muertos"], answer: 2,
    explanation: "The Aragonese jota is central to Zaragoza's Fiestas del Pilar, whose programme includes official jota contests." },
  { id: 17, topic: "Vocabulary", question: "What does 'las palmas' mean in flamenco?",
    options: ["Palm trees on stage", "Rhythmic handclaps", "The dancer's shoes", "A type of guitar"], answer: 1,
    explanation: "Palmas are the rhythmic handclaps that keep the compás (rhythmic cycle)." },
  { id: 18, topic: "Vocabulary", question: "Translate: 'el desfile'",
    options: ["The fire", "The costume", "The parade", "The square"], answer: 2,
    explanation: "El desfile means 'the parade'. Fire = el fuego, costume = el traje, square = la plaza." },
  { id: 19, topic: "Culture", question: "What is the dominant music style of the Carnaval de Barranquilla?",
    options: ["Cumbia", "Flamenco", "Jota", "Sevillanas"], answer: 0,
    explanation: "UNESCO identifies cumbia as the main genre of the Colombian carnival." },
  { id: 20, topic: "Vocabulary", question: "Which verb means 'to share'?",
    options: ["Celebrar", "Compartir", "Descubrir", "Aprender"], answer: 1,
    explanation: "Compartir = to share. Celebrar = to celebrate, descubrir = to discover, aprender = to learn." }
];

/* ---------- Team contributions ----------
   Each `content` paragraph uses [[spanish|english]] markup so the site can
   count the distinct Spanish words actually used in THAT student's text. */
const TEAM = [
  {
    id: "aditya",
    name: "Aditya Baghel",
    reg: "25BAI1628",
    role: "Festivals — origins, traditions and history",
    accent: "burgundy",
    feature: "Festivals section (#festivals) and the accessible “Learn more” dialog",
    researched: [
      "Origins and dates of La Tomatina, Las Fallas, San Fermín and Día de los Muertos",
      "Which details are documented and which are local legend",
      "UNESCO recognition of Las Fallas (2016) and Día de los Muertos (2008)",
      "How Spanish festivals differ from celebrations elsewhere in the Spanish-speaking world"
    ],
    content: [
      "Every [[fiesta|festival]] I researched grows out of one particular [[ciudad|city]] and its [[historia|history]]. In Buñol, La Tomatina is said to have started in 1945, when a scuffle during a parade of [[gigantes y cabezudos|giants and big-headed figures]] became a [[batalla|battle]] fought with [[tomates|tomatoes]] in the [[plaza|town square]]. Because this story is not well documented, I learned to separate a [[leyenda|legend]] from recorded fact.",
      "Las Fallas honours Saint Joseph, the [[santo patrón|patron saint]] of Valencia, whose [[día|day]] is 19 March. Each [[barrio|neighbourhood]] builds a [[falla|satirical monument]] full of painted [[ninots|figures|ca]]. After days of [[música|music]], [[flores|flowers]] and the daily [[mascletà|firecracker show|ca]], everything is given to the [[fuego|fire]] in [[la cremà|the burning|ca]] — except one figure saved by public vote.",
      "San Fermín opens in Pamplona with [[el chupinazo|the opening rocket]] at noon on 6 July. The [[gente|people]] dress in white with a red [[pañuelo|neckerchief]], the [[encierro|bull run]] takes place every morning, and the festival ends on 14 July when crowds hold [[velas|candles]] and sing “Pobre de mí”. Its religious [[tradición|tradition]] moved to July in 1591 to join a summer fair, and the [[procesión|procession]] of the saint is still held on 7 July.",
      "El Día de los Muertos taught me the most. It is a Mexican celebration, not a Spanish one. [[Familias|families]] build an [[ofrenda|altar offering]] with [[cempasúchil|marigold flowers]], [[pan de muerto|bread of the dead]] and photographs to welcome the [[almas|souls]] of loved ones. UNESCO explains that it joins Indigenous rites with Catholic feasts from the sixteenth century. Comparing it with Spain showed me how one [[idioma|language]] connects many different [[culturas|cultures]] and how [[recordar|to remember]] can itself be a form of [[alegría|joy]]."
    ],
    reflection: "Before this project I thought of Spanish festivals mainly as colourful events I had seen in photos. Researching their origins changed that: I learned that La Tomatina's famous origin story is not fully documented, that Las Fallas burns months of artwork on purpose, and that Día de los Muertos belongs to Mexico rather than Spain. [Add your own: which fact surprised you most, and why?] Writing about these festivals made me more careful about checking dates and sources. [Add your own: how did you feel when comparing these festivals with a festival from your own region?]",
    codeNote: "The four festival articles are generated from the FESTIVALS array in js/data.js by renderFestivals() in script.js. Each “Learn more” button calls openFestivalDialog(id), which fills a native <dialog> element, moves keyboard focus into it, closes on Esc or the close button, and returns focus to the button that opened it."
  },
  {
    id: "pranshu",
    name: "Pranshu Suresh Gupta",
    reg: "25BAI1620",
    role: "Festival cuisine — dishes, ingredients and meaning",
    accent: "tomato",
    feature: "Cuisine section (#cuisine) with festival vs everyday labels",
    researched: [
      "The traditional ingredients of paella valenciana",
      "Which foods are documented festival foods (buñuelos at Fallas, pan de muerto) and which are everyday Spanish cuisine",
      "Tapas as a social custom and regional names such as pintxos",
      "The earliest written reference to the tortilla de patatas"
    ],
    content: [
      "For me, [[la comida|food]] is the easiest door into a culture. At a celebration, people [[comparten|share]] [[platos|dishes]] at long [[mesas|tables]], and the [[sabor|flavour]] of an old [[receta|recipe]] carries the memory of a whole [[pueblo|town]].",
      "[[La paella|the Valencian rice dish]] began as a countryside meal. The traditional Valencian version uses [[arroz|rice]], [[pollo|chicken]], [[conejo|rabbit]], two kinds of beans, [[tomate|tomato]], sweet paprika and [[azafrán|saffron]], cooked in [[aceite de oliva|olive oil]] in a wide, shallow pan. The crispy rice at the bottom is called [[socarrat|toasted crust|ca]]. During Fallas, neighbourhood clubs cook paella to raise money, and Buñol has held a paella contest during Tomatina week.",
      "Not every dish belongs to one festival. [[Churros|fried dough sticks]] dipped in thick [[chocolate|hot chocolate]] are a [[desayuno|breakfast]] or afternoon snack, sold at fairs all over Spain. [[Tapas|small shared plates]] are really a social habit — [[ir de tapas|going from bar to bar]] with [[amigos|friends]]. In the Basque Country they are called [[pinchos|small bar snacks]]. The [[tortilla de patatas|potato omelette]] needs only [[huevos|eggs]], [[patatas|potatoes]], oil and — a famous debate — [[cebolla|onion]].",
      "Some sweets truly are festival food. In Valencia, [[buñuelos de calabaza|pumpkin fritters]] are sold at stalls during Fallas, usually with hot chocolate. In Mexico, [[pan de muerto|bread of the dead]] and [[calaveras de azúcar|sugar skulls]] are placed on the ofrenda. I learned to label clearly which foods are documented festival [[costumbres|customs]] and which are simply part of everyday Spanish [[cocina|cooking]]."
    ],
    reflection: "I chose cuisine because food is how many families, including mine, celebrate. [Personalise: name a dish your family makes for a festival.] While researching, I was surprised that traditional paella valenciana uses chicken and rabbit instead of seafood, and that the tortilla's onion is still argued about. I also realised how easy it is to wrongly call a dish the 'official' food of a festival, so I separated festival foods from everyday dishes. [Add your own: what did you feel or learn about sharing food as a community?]",
    codeNote: "renderDishes() in script.js loops over the DISHES array and builds one card per dish. Each card shows a coloured label from the dish's `kind` field — festival, regional or everyday — so the accuracy rule (don't call every dish a festival food) is enforced by the data itself, not by hand-written HTML."
  },
  {
    id: "shreyam",
    name: "Shreyam Manna",
    reg: "25BAI1343",
    role: "Music, dance, instruments and performance",
    accent: "gold",
    feature: "Music & Dance section (#music) and the interactive compás (rhythm) player",
    researched: [
      "UNESCO's description of flamenco: cante, baile and toque",
      "The Aragonese jota: steps, costume and the rondalla",
      "Street bands and traditional instruments at Fallas and San Fermín",
      "The 12-beat compás and how palmas keep rhythm"
    ],
    content: [
      "I discovered that the [[música|music]] of a Spanish [[fiesta|festival]] is far more varied than I expected. [[El flamenco|flamenco]] comes from Andalusia, where it joins three arts: [[el cante|singing]], [[el baile|dance]] and [[el toque|guitar playing]]. It is not the soundtrack of every festival, and presenting it that way would be inaccurate.",
      "In a flamenco performance on the [[escenario|stage]], the [[guitarra|guitar]] carries the melody while [[las palmas|rhythmic handclaps]], the dancer's [[zapateado|footwork]] and sometimes [[castañuelas|castanets]] build the [[ritmo|rhythm]]. Everyone follows the same cycle of beats, called [[el compás|the rhythmic cycle]]. For styles such as soleá, the cycle has twelve beats with accents on 3, 6, 8, 10 and 12 — the pattern I programmed into our demo.",
      "In Aragón, [[la jota|the Aragonese folk dance]] is sung and danced with [[saltos|jumps]] and raised arms, wearing a colourful regional [[traje|costume]]. A [[rondalla|string ensemble]] of guitars and [[bandurrias|small mandolin-like instruments]] accompanies the dancers. In Seville's Feria, couples dance [[sevillanas|Andalusian folk dances]] in the decorated [[casetas|fair tents]].",
      "Elsewhere, festivals sound like a [[banda|band]] of brass and [[tambores|drums]] marching through the [[calles|streets]]. In Pamplona, pipers accompany the giants in the [[desfile|parade]]. In Barranquilla, [[la cumbia|Colombian cumbia]] drives the carnival. What connects them all is participation: people [[cantan|sing]], [[bailan|dance]] and clap together, so music turns a crowd into a [[comunidad|community]]."
    ],
    reflection: "Music was the part of this project I connected with most easily. [Personalise: mention any music or dance you play or enjoy.] I did not know that flamenco is specifically Andalusian or that its rhythm is counted in a twelve-beat cycle. Building the compás demo helped me actually hear the accents instead of only reading about them. [Add your own: how did it feel to try clapping along, and what would you like to learn next?]",
    codeNote: "The compás player uses the browser's Web Audio API — no audio files or external services. A short burst of filtered noise is generated for each beat (louder on accented beats), and a timer moves a highlight across twelve beat markers. Sound starts only when the user presses Play, and the Stop button and tempo slider are fully keyboard-accessible."
  },
  {
    id: "anay",
    name: "Anay Parth",
    reg: "25BAI1273",
    role: "Interactive festival explorer and cultural comparisons",
    accent: "green",
    feature: "Festival Explorer (#explore): filters, details panel and side-by-side comparison",
    researched: [
      "Where each festival takes place: region, city and country",
      "Calendar timing, and which dates move every year",
      "Three extra celebrations for comparison: Feria de Abril, Fiestas del Pilar and the Carnaval de Barranquilla",
      "Similarities and differences between festivals in Spain and in Latin America"
    ],
    content: [
      "My job was to help visitors explore festivals by [[lugar|place]] and [[fecha|date]]. I started with a simple question: in which [[país|country]], [[región|region]] and [[ciudad|city]] does each celebration happen? Five of our festivals are in Spain, but each belongs to a different part of it — from Valencia on the eastern [[costa|coast]] to Navarra in the [[norte|north]] and Andalusia in the [[sur|south]].",
      "Next I built a [[calendario|calendar]] view in my head. Las Fallas arrives at the end of [[invierno|winter]], in [[marzo|March]]; the Feria de Abril moves with Easter in [[primavera|spring]]; San Fermín fills [[julio|July]] and La Tomatina ends [[el verano|summer]] in [[agosto|August]]. In [[otoño|autumn]], Zaragoza celebrates the Pilar in [[octubre|October]], and Mexico remembers its dead at the start of [[noviembre|November]].",
      "To show the wider Hispanic world, I added the Carnaval de Barranquilla in Colombia, held in [[febrero|February]] or March. Comparing festivals revealed clear [[semejanzas|similarities]]: almost all have [[desfiles|parades]], [[música|music]] and shared food. The [[diferencias|differences]] were just as interesting — fire in Valencia, flowers in Zaragoza, masks in Barranquilla.",
      "The explorer lets you [[elegir|choose]] filters and [[comparar|compare]] two festivals [[lado a lado|side by side]]. Every result comes from the same data used elsewhere on the site, so nothing is invented for the [[mapa|map]]-like list. I hope it encourages visitors to plan an imaginary [[viaje|trip]] across the Spanish-speaking [[mundo|world]]."
    ],
    reflection: "I enjoyed turning research into something people can interact with. [Personalise: say which festival you would most like to visit and why.] Comparing festivals side by side showed me patterns I had missed when reading about them one at a time — for example, how many celebrations include parades and giant figures. [Add your own: what was hardest about organising the data, and how did you solve it?]",
    codeNote: "explorer.js reads the FESTIVALS array and keeps the current filters in one `state` object. applyFilters() uses Array.filter() to keep festivals that match the chosen country/region and category, then re-renders the list. Selecting a festival shows its details; the compare form takes two festival IDs and builds a table row by row for location, timing, traditions, food and music."
  },
  {
    id: "aritra",
    name: "Aritra Biswas",
    reg: "25BAI1460",
    role: "Spanish quiz, vocabulary challenge and learning reflection",
    accent: "terracotta",
    feature: "Spanish Quiz (#quiz) and the searchable vocabulary flashcards (#vocab)",
    researched: [
      "How to write fair multiple-choice questions with plausible wrong answers",
      "Checking accents and meanings for every vocabulary word",
      "How to give useful feedback that explains the correct answer",
      "The browser Speech Synthesis API for a pronunciation aid"
    ],
    content: [
      "I designed the [[prueba|quiz]] so that every [[pregunta|question]] teaches something, even when the [[respuesta|answer]] is wrong. Each question has four options and a short [[explicación|explanation]]. When you choose, the site shows the [[respuesta correcta|correct answer]] in green and your choice in red if it was [[incorrecta|incorrect]], with words as well as colours.",
      "Your [[puntuación|score]] grows with every [[acierto|correct answer]], and a progress bar shows how many questions remain. At the end, the results screen gives a [[porcentaje|percentage]] and lists each [[error|mistake]] with its explanation so you can [[repasar|review]]. Some questions are [[fácil|easy]], others more [[difícil|difficult]], and the [[siguiente|next]] button only appears after you answer. Press restart for another [[intento|attempt]]: the questions are shuffled again, but none is repeated or skipped.",
      "For the vocabulary challenge I collected more than forty [[palabras|words]]. You can search by Spanish or English [[significado|meaning]], filter by topic and flip each [[tarjeta|card]] to test your [[memoria|memory]]. A small button lets you [[escuchar|listen]] to the [[pronunciación|pronunciation]] using the voice built into your browser.",
      "Writing questions taught me that a good [[ejemplo|example]] sentence makes vocabulary easier to [[aprender|learn]]. My advice for beginners: [[practicar|practise]] a little each [[día|day]], say each word aloud, then [[repetir|repeat]] the quiz. When you finish with a high score, the site says [[¡Bien hecho!|Well done!]] — and you will have learned real [[español|Spanish]] along the way."
    ],
    reflection: "Making the quiz forced me to understand the whole website, because every question depends on facts my teammates researched. [Personalise: which question did you find hardest to write?] I learned that clear feedback matters more than the score itself, and that small details like accents (á, é, ñ) change meaning. [Add your own: how has your confidence with Spanish vocabulary changed during this project?]",
    codeNote: "quiz.js shuffles the QUIZ_QUESTIONS array with the Fisher–Yates algorithm once per attempt and stores the order, so no question repeats or is skipped. selectAnswer() locks the options, compares the chosen text with the correct text, updates the score and shows the explanation. showResults() calculates Math.round(score / total × 100) and lists every incorrect answer. vocabulary.js filters the VOCABULARY array by search text and category."
  }
];
