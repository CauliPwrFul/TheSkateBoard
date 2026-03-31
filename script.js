const events = [
  {
    id: 1,
    name: "Friday Night Social Roller Skate Disco",
    day: "10", month: "Apr", year: "2026",
    venue: "Ramgarhia Sikh Sports Centre",
    location: "Leeds, LS7",
    price: "From £10-£15",
    types: ["disco", "social"],
    desc: "Weekly Friday night roller disco for ages 17+. All abilities welcome. Music, lights, and good vibes.",
    time: "7:00pm – 10:00pm",
    link: "https://www.theskatesanctuary.co.uk/book",
    free: false
  },
  {
    id: 2,
    name: "Improvers: Learn to Rollerskate",
    day: "02", month: "Apr", year: "2026",
    venue: "Skate Scholarship - Youth Hub",
    location: "Leeds, LS10",
    price: "From £8",
    types: ["lesson"],
    desc: "These sessions focus on improving technique, control, balance, and introducing new skills.",
    link: "https://www.theskatescholarship.com/product-page/improvers-learn-to-rollerskate",
    free: false
  },
  {
    id: 3,
    name: "Monday Community Roller Dance Class",
    day: "30", month: "Mar", year: "2026",
    venue: "Skate Scholarship - Yorks Dance",
    location: "Leeds, LS9",
    price: "From £9",
    types: ["lesson"],
    desc: "A friendly, no-pressure space to learn the art of roller dance together",
    link: "https://www.theskatescholarship.com/product-page/2026-monday-community-roller-dance",
    free: false
  },
  {
    id: 4,
    name: "AJ's Roller Disco — Sunday Session",
    day: "12", month: "Apr", year: "2026",
    venue: "AJ's Roller Disco",
    location: "Bradford, BD3",
    price: "£6–£8",
    types: ["disco", "family"],
    desc: "Classic roller disco every Sunday afternoon 2–4pm. All ages, all levels. Skate hire on site.",
    time: "2:00pm – 4:00pm",
    link: "https://www.ajsrollerdisco.co.uk/",
    free: false
  },
  {
    id: 5,
    name: "AJ's Roller Disco — Sunday Session",
    day: "19", month: "Apr", year: "2026",
    venue: "AJ's Roller Disco",
    location: "Bradford, BD3",
    price: "£6–£8",
    types: ["disco", "family"],
    desc: "Classic roller disco every Sunday afternoon 2–4pm. All ages, all levels. Skate hire on site.",
    time: "2:00pm – 4:00pm",
    link: "https://www.ajsrollerdisco.co.uk/",
    free: false
  },
  {
    id: 6,
    name: "Friday Nights for the Quad and Inline Skaters",
    day: "03", month: "Apr", year: "2026",
    venue: "LS-TEN Skatepark",
    location: "Leeds, LS10",
    price: "£11.50",
    types: ["social"],
    desc: "Open sessions at Leeds' premier indoor skatepark.",
    link: "https://ls-ten.org/quad-and-roller-skate-night",
    free: false
  },
  {
    id: 7,
    name: "Worldwide Rollout Day",
    day: "26", month: "Jul", year: "2026",
    venue: "Sovereign Square",
    location: "Leeds City Centre",
    price: "Free",
    types: ["outdoor", "social"],
    desc: "Annual Worldwide Rollout Day skate through Leeds city centre landmarks. One of the year's biggest community skate events.",
    link: "#",
    free: true
  },
  {
    id: 8,
    name: "Skate Meetup @ The Tetley",
    day: "04", month: "May", year: "2026",
    venue: "The Skate Sanctuary",
    location: "Leeds, LS9",
    price: "Free",
    types: ["outdoor", "social", "free"],
    desc: "This year's skate meetup is funded by Sports England. Attend and receive a voucher for a free gift.",
    time: "6:00pm – 8:00pm",
    link: "https://www.theskatesanctuary.co.uk/events/free-skate-meetup-the-tetley-2026-05-04-18-00",
    free: true
  },
  {
    id: 9,
    name: "Level 1 Roller Skate Fundamentals",
    day: "12", month: "Apr", year: "2026",
    venue: "The Skate Sanctuary",
    location: "Leeds, LS9",
    price: "£9",
    types: ["lesson"],
    desc: "Skate Sanctuary will support you to feel more confident on your wheels. Skate hire available for a small additional fee.",
    time: "10:00am – 11:00am",
    link: "https://www.theskatesanctuary.co.uk/book",
    free: false
  },
  {
    id: 10,
    name: "Level 1 Roller Skate Fundamentals",
    day: "19", month: "Apr", year: "2026",
    venue: "The Skate Sanctuary",
    location: "Leeds, LS9",
    price: "£9",
    types: ["lesson"],
    desc: "Skate Sanctuary will support you to feel more confident on your wheels. Skate hire available for a small additional fee.",
    time: "10:00am – 11:00am",
    link: "https://www.theskatesanctuary.co.uk/book",
    free: false
  },
  {
    id: 11,
    name: "Level 1 Roller Skate Fundamentals",
    day: "26", month: "Apr", year: "2026",
    venue: "The Skate Sanctuary",
    location: "Leeds, LS9",
    price: "£9",
    types: ["lesson"],
    desc: "Skate Sanctuary will support you to feel more confident on your wheels. Skate hire available for a small additional fee.",
    time: "10:00am – 11:00am",
    link: "https://www.theskatesanctuary.co.uk/book",
    free: false
  },
  {
    id: 12,
    name: "Roller Skate Super Session Level 2-4 (14+)",
    day: "26", month: "Apr", year: "2026",
    venue: "Ramgarhia Sikh Sports Centre",
    location: "Leeds, LS7",
    price: "£16-£20",
    types: ["lesson"],
    desc: "2hrs to develop new skills at the Sikh Sports Hall. Build on the techniques you have learnt in a larger space.",
    time: "4:00pm – 6:00pm",
    link: "https://www.theskatesanctuary.co.uk/book",
    free: false
  },
  {
    id: 13,
    name: "Roller Skate Super Session Level 2-4 (14+)",
    day: "24", month: "May", year: "2026",
    venue: "Ramgarhia Sikh Sports Centre",
    location: "Leeds, LS7",
    price: "£16-£20",
    types: ["lesson"],
    desc: "2hrs to develop new skills at the Sikh Sports Hall. Build on the techniques you have learnt in a larger space.",
    time: "4:00pm – 6:00pm",
    link: "https://www.theskatesanctuary.co.uk/book",
    free: false
  },
  {
    id: 14,
    name: "Roller Skate Super Session Level 2-4 (14+)",
    day: "26", month: "Jun", year: "2026",
    venue: "Ramgarhia Sikh Sports Centre",
    location: "Leeds, LS7",
    price: "£16-£20",
    types: ["lesson"],
    desc: "2hrs to develop new skills at the Sikh Sports Hall. Build on the techniques you have learnt in a larger space.",
    time: "4:00pm – 6:00pm",
    link: "https://www.theskatesanctuary.co.uk/book",
    free: false
  },
  {
    id: 15,
    name: "Roller Skate Super Session Level 2-4 (14+)",
    day: "26", month: "Jul", year: "2026",
    venue: "Ramgarhia Sikh Sports Centre",
    location: "Leeds, LS7",
    price: "£16-£20",
    types: ["lesson"],
    desc: "2hrs to develop new skills at the Sikh Sports Hall. Build on the techniques you have learnt in a larger space.",
    time: "4:00pm – 6:00pm",
    link: "https://www.theskatesanctuary.co.uk/book",
    free: false
  },
  {
    id: 16,
    name: "Roller Skate Super Session Level 2-4 (14+)",
    day: "23", month: "Aug", year: "2026",
    venue: "Ramgarhia Sikh Sports Centre",
    location: "Leeds, LS7",
    price: "£16-£20",
    types: ["lesson"],
    desc: "2hrs to develop new skills at the Sikh Sports Hall. Build on the techniques you have learnt in a larger space.",
    time: "4:00pm – 6:00pm",
    link: "https://www.theskatesanctuary.co.uk/book",
    free: false
  },
  {
    id: 17,
    name: "Roller Skate Super Session Level 2-4 (14+)",
    day: "20", month: "Sep", year: "2026",
    venue: "Ramgarhia Sikh Sports Centre",
    location: "Leeds, LS7",
    price: "£16-£20",
    types: ["lesson"],
    desc: "2hrs to develop new skills at the Sikh Sports Hall. Build on the techniques you have learnt in a larger space.",
    time: "4:00pm – 6:00pm",
    link: "https://www.theskatesanctuary.co.uk/book",
    free: false
  },
  {
    id: 18,
    name: "Roller Skate Super Session Level 2-4 (14+)",
    day: "18", month: "Oct", year: "2026",
    venue: "Ramgarhia Sikh Sports Centre",
    location: "Leeds, LS7",
    price: "£16-£20",
    types: ["lesson"],
    desc: "2hrs to develop new skills at the Sikh Sports Hall. Build on the techniques you have learnt in a larger space.",
    time: "4:00pm – 6:00pm",
    link: "https://www.theskatesanctuary.co.uk/book",
    free: false
  },
  {
    id: 19,
    name: "Roller Skate Super Session Level 2-4 (14+)",
    day: "22", month: "Nov", year: "2026",
    venue: "Ramgarhia Sikh Sports Centre",
    location: "Leeds, LS7",
    price: "£16-£20",
    types: ["lesson"],
    desc: "2hrs to develop new skills at the Sikh Sports Hall. Build on the techniques you have learnt in a larger space.",
    time: "4:00pm – 6:00pm",
    link: "https://www.theskatesanctuary.co.uk/book",
    free: false
  },
  {
    id: 20,
    name: "Adult Learn to Roller Skate Taster Session",
    day: "04", month: "Apr", year: "2026",
    venue: "The Skate Sanctuary",
    location: "Leeds, LS9",
    price: "£9.23",
    types: ["taster"],
    desc: "Get rolling with the big kids. Most of our adult sessions are attended by people 40+.",
    time: "10:00am – 11:00am",
    link: "https://www.theskatesanctuary.co.uk/book",
    free: false
  },
  {
    id: 21,
    name: "Adult Learn to Roller Skate Taster Session",
    day: "04", month: "Apr", year: "2026",
    venue: "The Skate Sanctuary",
    location: "Leeds, LS9",
    price: "£9.23",
    types: ["taster"],
    desc: "Get rolling with the big kids. Most of our adult sessions are attended by people 40+.",
    time: "11:00am – 12:00pm",
    link: "https://www.theskatesanctuary.co.uk/book",
    free: false
  },
  {
    id: 22,
    name: "Adult Learn to Roller Skate Taster Session",
    day: "13", month: "Apr", year: "2026",
    venue: "The Skate Sanctuary",
    location: "Leeds, LS9",
    price: "£9.23",
    types: ["taster"],
    desc: "Get rolling with the big kids. Most of our adult sessions are attended by people 40+.",
    time: "6:00pm – 7:00pm",
    link: "https://www.theskatesanctuary.co.uk/book",
    free: false
  },
  {
    id: 23,
    name: "Neurodivergent friendly - Wheels of Connection",
    day: "07", month: "Apr", year: "2026",
    venue: "The Skate Sanctuary",
    location: "Leeds, LS9",
    price: "£0-£3.08",
    types: ["lesson"],
    desc: "A session, with coaches, specifically for skaters with neurodivergence to come together in a low-stimulus environment.",
    time: "6:00pm – 7:00pm",
    link: "https://www.theskatesanctuary.co.uk/book",
    free: false
  },
  {
    id: 24,
    name: "Neurodivergent friendly - Wheels of Connection",
    day: "21", month: "Apr", year: "2026",
    venue: "The Skate Sanctuary",
    location: "Leeds, LS9",
    price: "£0-£3.08",
    types: ["lesson"],
    desc: "A session, with coaches, specifically for skaters with neurodivergence to come together in a low-stimulus environment.",
    time: "6:00pm – 7:00pm",
    link: "https://www.theskatesanctuary.co.uk/book",
    free: false
  },
  {
    id: 25,
    name: "Neurodivergent friendly - Wheels of Connection",
    day: "28", month: "Apr", year: "2026",
    venue: "The Skate Sanctuary",
    location: "Leeds, LS9",
    price: "£0-£3.08",
    types: ["lesson"],
    desc: "A session, with coaches, specifically for skaters with neurodivergence to come together in a low-stimulus environment.",
    time: "6:00pm – 7:00pm",
    link: "https://www.theskatesanctuary.co.uk/book",
    free: false
  },
  {
    id: 26,
    name: "Introduction to Dribbles and Crazy Legs",
    day: "07", month: "Apr", year: "2026",
    venue: "The Skate Sanctuary",
    location: "Leeds, LS9",
    price: "£13.33",
    types: ["lesson"],
    desc: "A session designed to introduce the roller dance skills and techniques.",
    time: "8:00pm – 9:15pm",
    link: "https://www.theskatesanctuary.co.uk/book",
    free: false
  },
  {
    id: 27,
    name: "Introduction to Combos & Re-Cap",
    day: "21", month: "Apr", year: "2026",
    venue: "The Skate Sanctuary",
    location: "Leeds, LS9",
    price: "£13.33",
    types: ["lesson"],
    desc: "A session designed to introduce the roller dance skills and techniques.",
    time: "8:00pm – 9:15pm",
    link: "https://www.theskatesanctuary.co.uk/book",
    free: false
  },
  {
    id: 28,
    name: "Roller Dance Drills - Level 2-3 (Age 17+)",
    day: "01", month: "Apr", year: "2026",
    venue: "The Skate Sanctuary",
    location: "Leeds, LS9",
    price: "£13.00",
    types: ["lesson"],
    desc: "A roller dance drills session to learn or revisit the most effective drills for roller dance. A good session to isolate skills and measure your progress.",
    time: "7:30pm – 9:00pm",
    link: "https://www.theskatesanctuary.co.uk/book",
    free: false
  },
  {
    id: 29,
    name: "LGBTQ+ Wheels of Connection",
    day: "02", month: "Apr", year: "2026",
    venue: "The Skate Sanctuary",
    location: "Leeds, LS9",
    price: "£3.08",
    types: ["lesson"],
    desc: "A supportive, affirming, and celebratory roller skate session for Trans, Gender Non-Conforming (GNC) folks, and their Allies!",
    time: "7:30pm – 9:00pm",
    link: "https://www.theskatesanctuary.co.uk/book",
    free: false
  },
  {
    id: 30,
    name: "LGBTQ+ Wheels of Connection",
    day: "09", month: "Apr", year: "2026",
    venue: "The Skate Sanctuary",
    location: "Leeds, LS9",
    price: "£3.08",
    types: ["lesson"],
    desc: "A supportive, affirming, and celebratory roller skate session for Trans, Gender Non-Conforming (GNC) folks, and their Allies!",
    time: "7:30pm – 9:00pm",
    link: "https://www.theskatesanctuary.co.uk/book",
    free: false
  },
  {
    id: 31,
    name: "LGBTQ+ Wheels of Connection",
    day: "16", month: "Apr", year: "2026",
    venue: "The Skate Sanctuary",
    location: "Leeds, LS9",
    price: "£3.08",
    types: ["lesson"],
    desc: "A supportive, affirming, and celebratory roller skate session for Trans, Gender Non-Conforming (GNC) folks, and their Allies!",
    time: "7:30pm – 9:00pm",
    link: "https://www.theskatesanctuary.co.uk/book",
    free: false
  },
  {
    id: 32,
    name: "LGBTQ+ Wheels of Connection",
    day: "23", month: "Apr", year: "2026",
    venue: "The Skate Sanctuary",
    location: "Leeds, LS9",
    price: "£3.08",
    types: ["lesson"],
    desc: "A supportive, affirming, and celebratory roller skate session for Trans, Gender Non-Conforming (GNC) folks, and their Allies!",
    time: "7:30pm – 9:00pm",
    link: "https://www.theskatesanctuary.co.uk/book",
    free: false
  },
  {
    id: 33,
    name: "LGBTQ+ Wheels of Connection",
    day: "30", month: "Apr", year: "2026",
    venue: "The Skate Sanctuary",
    location: "Leeds, LS9",
    price: "£3.08",
    types: ["lesson"],
    desc: "A supportive, affirming, and celebratory roller skate session for Trans, Gender Non-Conforming (GNC) folks, and their Allies!",
    time: "7:30pm – 9:00pm",
    link: "https://www.theskatesanctuary.co.uk/book",
    free: false
  },
  {
    id: 34,
    name: "Outdoor Confidence Workshop Level 2",
    day: "03", month: "Apr", year: "2026",
    venue: "The Skate Sanctuary",
    location: "Leeds, LS9",
    price: "£13.00",
    types: ["outdoor", "social"],
    desc: "Build confidence skating outdoors with coached guidance on terrain, stopping, and navigation.",
    time: "7:30pm – 9:00pm",
    link: "https://www.theskatesanctuary.co.uk/book",
    free: false
  },
  {
    id: 35,
    name: "Adult Roller Skate Taster Session, Level 2",
    day: "08", month: "Apr", year: "2026",
    venue: "The Skate Sanctuary",
    location: "Leeds, LS9",
    price: "£9.23",
    types: ["taster"],
    desc: "Taster session for those who can already skate a bit.",
    time: "6:30pm – 7:45pm",
    link: "https://www.theskatesanctuary.co.uk/book",
    free: false
  },
  {
    id: 36,
    name: "Adult Roller Skate Taster Session, Level 2",
    day: "13", month: "Apr", year: "2026",
    venue: "The Skate Sanctuary",
    location: "Leeds, LS9",
    price: "£9.23",
    types: ["taster"],
    desc: "Taster session for those who can already skate a bit.",
    time: "7:00pm – 8:00pm",
    link: "https://www.theskatesanctuary.co.uk/book",
    free: false
  },
  {
    id: 37,
    name: "Friday Night Social Roller Skate Disco",
    day: "24", month: "Apr", year: "2026",
    venue: "Ramgarhia Sikh Sports Centre",
    location: "Leeds, LS7",
    price: "From £10-£15",
    types: ["disco", "social"],
    desc: "Weekly Friday night roller disco for ages 17+. All abilities welcome. Music, lights, and good vibes.",
    time: "7:00pm – 10:00pm",
    link: "https://www.theskatesanctuary.co.uk/book",
    free: false
  },
  {
    id: 38,
    name: "Friday Night Social Roller Skate Disco",
    day: "08", month: "May", year: "2026",
    venue: "Ramgarhia Sikh Sports Centre",
    location: "Leeds, LS7",
    price: "From £10-£15",
    types: ["disco", "social"],
    desc: "Weekly Friday night roller disco for ages 17+. All abilities welcome. Music, lights, and good vibes.",
    time: "7:00pm – 10:00pm",
    link: "https://www.theskatesanctuary.co.uk/book",
    free: false
  },
  {
    id: 39,
    name: "Friday Night Social Roller Skate Disco",
    day: "22", month: "May", year: "2026",
    venue: "Ramgarhia Sikh Sports Centre",
    location: "Leeds, LS7",
    price: "From £10-£15",
    types: ["disco", "social"],
    desc: "Weekly Friday night roller disco for ages 17+. All abilities welcome. Music, lights, and good vibes.",
    time: "7:00pm – 10:00pm",
    link: "https://www.theskatesanctuary.co.uk/book",
    free: false
  },
  {
    id: 40,
    name: "Friday Night Social Roller Skate Disco",
    day: "05", month: "Jun", year: "2026",
    venue: "Ramgarhia Sikh Sports Centre",
    location: "Leeds, LS7",
    price: "From £10-£15",
    types: ["disco", "social"],
    desc: "Weekly Friday night roller disco for ages 17+. All abilities welcome. Music, lights, and good vibes.",
    time: "7:00pm – 10:00pm",
    link: "https://www.theskatesanctuary.co.uk/book",
    free: false
  },
  {
    id: 41,
    name: "Friday Night Social Roller Skate Disco",
    day: "27", month: "Jun", year: "2026",
    venue: "Ramgarhia Sikh Sports Centre",
    location: "Leeds, LS7",
    price: "From £10-£15",
    types: ["disco", "social"],
    desc: "Weekly Friday night roller disco for ages 17+. All abilities welcome. Music, lights, and good vibes.",
    time: "7:00pm – 10:00pm",
    link: "https://www.theskatesanctuary.co.uk/book",
    free: false
  },
  {
    id: 42,
    name: "Friday Night Social Roller Skate Disco",
    day: "03", month: "Jul", year: "2026",
    venue: "Ramgarhia Sikh Sports Centre",
    location: "Leeds, LS7",
    price: "From £10-£15",
    types: ["disco", "social"],
    desc: "Weekly Friday night roller disco for ages 17+. All abilities welcome. Music, lights, and good vibes.",
    time: "7:00pm – 10:00pm",
    link: "https://www.theskatesanctuary.co.uk/book",
    free: false
  },
  {
    id: 43,
    name: "Friday Night Social Roller Skate Disco",
    day: "24", month: "Jul", year: "2026",
    venue: "Ramgarhia Sikh Sports Centre",
    location: "Leeds, LS7",
    price: "From £10-£15",
    types: ["disco", "social"],
    desc: "Weekly Friday night roller disco for ages 17+. All abilities welcome. Music, lights, and good vibes.",
    time: "7:00pm – 10:00pm",
    link: "https://www.theskatesanctuary.co.uk/book",
    free: false
  },
  {
    id: 44,
    name: "Friday Night Social Roller Skate Disco",
    day: "07", month: "Aug", year: "2026",
    venue: "Ramgarhia Sikh Sports Centre",
    location: "Leeds, LS7",
    price: "From £10-£15",
    types: ["disco", "social"],
    desc: "Weekly Friday night roller disco for ages 17+. All abilities welcome. Music, lights, and good vibes.",
    time: "7:00pm – 10:00pm",
    link: "https://www.theskatesanctuary.co.uk/book",
    free: false
  },
  {
    id: 45,
    name: "Friday Night Social Roller Skate Disco",
    day: "04", month: "Sep", year: "2026",
    venue: "Ramgarhia Sikh Sports Centre",
    location: "Leeds, LS7",
    price: "From £10-£15",
    types: ["disco", "social"],
    desc: "Weekly Friday night roller disco for ages 17+. All abilities welcome. Music, lights, and good vibes.",
    time: "7:00pm – 10:00pm",
    link: "https://www.theskatesanctuary.co.uk/book",
    free: false
  },
  {
    id: 46,
    name: "Friday Night Social Roller Skate Disco",
    day: "18", month: "Sep", year: "2026",
    venue: "Ramgarhia Sikh Sports Centre",
    location: "Leeds, LS7",
    price: "From £10-£15",
    types: ["disco", "social"],
    desc: "Weekly Friday night roller disco for ages 17+. All abilities welcome. Music, lights, and good vibes.",
    time: "7:00pm – 10:00pm",
    link: "https://www.theskatesanctuary.co.uk/book",
    free: false
  },
  {
    id: 47,
    name: "Friday Night Social Roller Skate Disco",
    day: "01", month: "Oct", year: "2026",
    venue: "Ramgarhia Sikh Sports Centre",
    location: "Leeds, LS7",
    price: "From £10-£15",
    types: ["disco", "social"],
    desc: "Weekly Friday night roller disco for ages 17+. All abilities welcome. Music, lights, and good vibes.",
    time: "7:00pm – 10:00pm",
    link: "https://www.theskatesanctuary.co.uk/book",
    free: false
  },
  {
    id: 48,
    name: "Friday Night Social Roller Skate Disco",
    day: "16", month: "Oct", year: "2026",
    venue: "Ramgarhia Sikh Sports Centre",
    location: "Leeds, LS7",
    price: "From £10-£15",
    types: ["disco", "social"],
    desc: "Weekly Friday night roller disco for ages 17+. All abilities welcome. Music, lights, and good vibes.",
    time: "7:00pm – 10:00pm",
    link: "https://www.theskatesanctuary.co.uk/book",
    free: false
  },
  {
    id: 49,
    name: "Friday Night Social Roller Skate Disco",
    day: "06", month: "Nov", year: "2026",
    venue: "Ramgarhia Sikh Sports Centre",
    location: "Leeds, LS7",
    price: "From £10-£15",
    types: ["disco", "social"],
    desc: "Weekly Friday night roller disco for ages 17+. All abilities welcome. Music, lights, and good vibes.",
    time: "7:00pm – 10:00pm",
    link: "https://www.theskatesanctuary.co.uk/book",
    free: false
  },
  {
    id: 50,
    name: "Friday Night Social Roller Skate Disco",
    day: "20", month: "Nov", year: "2026",
    venue: "Ramgarhia Sikh Sports Centre",
    location: "Leeds, LS7",
    price: "From £10-£15",
    types: ["disco", "social"],
    desc: "Weekly Friday night roller disco for ages 17+. All abilities welcome. Music, lights, and good vibes.",
    time: "7:00pm – 10:00pm",
    link: "https://www.theskatesanctuary.co.uk/book",
    free: false
  },
  {
    id: 51,
    name: "Friday Night Social Roller Skate Disco",
    day: "04", month: "Dec", year: "2026",
    venue: "Ramgarhia Sikh Sports Centre",
    location: "Leeds, LS7",
    price: "From £10-£15",
    types: ["disco", "social"],
    desc: "Weekly Friday night roller disco for ages 17+. All abilities welcome. Music, lights, and good vibes.",
    time: "7:00pm – 10:00pm",
    link: "https://www.theskatesanctuary.co.uk/book",
    free: false
  },
  {
    id: 52,
    name: "Friday Night Social Roller Skate Disco",
    day: "18", month: "Dec", year: "2026",
    venue: "Ramgarhia Sikh Sports Centre",
    location: "Leeds, LS7",
    price: "From £10-£15",
    types: ["disco", "social"],
    desc: "Weekly Friday night roller disco for ages 17+. All abilities welcome. Music, lights, and good vibes.",
    time: "7:00pm – 10:00pm",
    link: "https://www.theskatesanctuary.co.uk/book",
    free: false
  },
    {
    id: 53,
    name: "Monday Community Roller Dance Class",
    day: "20", month: "Apr", year: "2026",
    venue: "Skate Scholarship - Yorks Dance",
    location: "Leeds, LS9",
    price: "From £9",
    types: ["lesson"],
    desc: "Beginner-friendly roller dance sessions alternating between taught lessons and skill shares. Block booking recommended.",
    link: "https://www.theskatescholarship.com/product-page/2026-monday-community-roller-dance",
    free: false
  },
    {
    id: 54,
    name: "Monday Community Roller Dance Class",
    day: "27", month: "Apr", year: "2026",
    venue: "Skate Scholarship - Yorks Dance",
    location: "Leeds, LS9",
    price: "From £9",
    types: ["lesson"],
    desc: "Beginner-friendly roller dance sessions alternating between taught lessons and skill shares. Block booking recommended.",
    link: "https://www.theskatescholarship.com/product-page/2026-monday-community-roller-dance",
    free: false
  },
    {
    id: 55,
    name: "Monday Community Roller Dance Class",
    day: "11", month: "May", year: "2026",
    venue: "Skate Scholarship - Yorks Dance",
    location: "Leeds, LS9",
    price: "From £9",
    types: ["lesson"],
    desc: "Beginner-friendly roller dance sessions alternating between taught lessons and skill shares. Block booking recommended.",
    link: "https://www.theskatescholarship.com/product-page/2026-monday-community-roller-dance",
    free: false
  },
    {
    id: 56,
    name: "Monday Community Roller Dance Class",
    day: "18", month: "May", year: "2026",
    venue: "Skate Scholarship - Yorks Dance",
    location: "Leeds, LS9",
    price: "From £9",
    types: ["lesson"],
    desc: "Beginner-friendly roller dance sessions alternating between taught lessons and skill shares. Block booking recommended.",
    link: "https://www.theskatescholarship.com/product-page/2026-monday-community-roller-dance",
    free: false
  },
    {
    id: 57,
    name: "Monday Community Roller Dance Class",
    day: "01", month: "Jun", year: "2026",
    venue: "Skate Scholarship - Yorks Dance",
    location: "Leeds, LS9",
    price: "From £9",
    types: ["lesson"],
    desc: "Beginner-friendly roller dance sessions alternating between taught lessons and skill shares. Block booking recommended.",
    link: "https://www.theskatescholarship.com/product-page/2026-monday-community-roller-dance",
    free: false
  },
    {
    id: 58,
    name: "Monday Community Roller Dance Class",
    day: "08", month: "Jun", year: "2026",
    venue: "Skate Scholarship - Yorks Dance",
    location: "Leeds, LS9",
    price: "From £9",
    types: ["lesson"],
    desc: "Beginner-friendly roller dance sessions alternating between taught lessons and skill shares. Block booking recommended.",
    link: "https://www.theskatescholarship.com/product-page/2026-monday-community-roller-dance",
    free: false
  },
    {
    id: 59,
    name: "Monday Community Roller Dance Class",
    day: "15", month: "Jun", year: "2026",
    venue: "Skate Scholarship - Yorks Dance",
    location: "Leeds, LS9",
    price: "From £9",
    types: ["skillshare", "lesson"],
    desc: "Beginner-friendly roller dance sessions alternating between taught lessons and skill shares. Block booking recommended.",
    link: "https://www.theskatescholarship.com/product-page/2026-monday-community-roller-dance",
    free: false
  },
    {
    id: 60,
    name: "Monday Community Roller Dance Class",
    day: "22", month: "Jun", year: "2026",
    venue: "Skate Scholarship - Yorks Dance",
    location: "Leeds, LS9",
    price: "From £9",
    types: ["lesson"],
    desc: "Beginner-friendly roller dance sessions alternating between taught lessons and skill shares. Block booking recommended.",
    link: "https://www.theskatescholarship.com/product-page/2026-monday-community-roller-dance",
    free: false
  },
    {
    id: 61,
    name: "Monday Community Roller Dance Class",
    day: "29", month: "Jun", year: "2026",
    venue: "Skate Scholarship - Yorks Dance",
    location: "Leeds, LS9",
    price: "From £9",
    types: ["lesson"],
    desc: "Beginner-friendly roller dance sessions alternating between taught lessons and skill shares. Block booking recommended.",
    link: "https://www.theskatescholarship.com/product-page/2026-monday-community-roller-dance",
    free: false
  },
      {
    id: 62,
    name: "Monday Community Roller Dance Class",
    day: "06", month: "Jul", year: "2026",
    venue: "Skate Scholarship - Yorks Dance",
    location: "Leeds, LS9",
    price: "From £9",
    types: ["skillshare", "lesson"],
    desc: "Beginner-friendly roller dance sessions alternating between taught lessons and skill shares. Block booking recommended.",
    link: "https://www.theskatescholarship.com/product-page/2026-monday-community-roller-dance",
    free: false
  }
];

// ── Stats ──────────────────────────────────────────────────────────────────
document.getElementById('venue-count').textContent = new Set(events.map(e => e.venue)).size;

let currentFilter = 'all';
let currentMonth = null; // null = all months; "Apr 2026" format when set

// ── Month filter ───────────────────────────────────────────────────────────
function initMonthFilter() {
  const select = document.getElementById('month-filter');
  const monthMap = { Jan:0, Feb:1, Mar:2, Apr:3, May:4, Jun:5, Jul:6, Aug:7, Sep:8, Oct:9, Nov:10, Dec:11 };
  const monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

  // Collect unique month/year combos from events, sorted chronologically
  const months = [...new Set(events.map(e => `${e.month} ${e.year}`))]
    .sort((a, b) => {
      const [ma, ya] = a.split(' ');
      const [mb, yb] = b.split(' ');
      return new Date(parseInt(ya), monthMap[ma]) - new Date(parseInt(yb), monthMap[mb]);
    });

  months.forEach(m => {
    const opt = document.createElement('option');
    opt.value = m;
    opt.textContent = m;
    select.appendChild(opt);
  });

  // Default to current month if it has events
  const now = new Date();
  const currentKey = `${monthNames[now.getMonth()]} ${now.getFullYear()}`;
  if (months.includes(currentKey)) {
    select.value = currentKey;
    currentMonth = currentKey;
    select.classList.add('active');
  }
}

function setMonth(value) {
  const select = document.getElementById('month-filter');
  currentMonth = value === 'all' ? null : value;
  select.classList.toggle('active', value !== 'all');
  renderEvents();
}

// ── Type filter ────────────────────────────────────────────────────────────
function setFilter(type, btn) {
  currentFilter = type;
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderEvents();
}

// ── Render ─────────────────────────────────────────────────────────────────
function renderEvents() {
  const grid = document.getElementById('events-grid');
  const noResults = document.getElementById('no-results');
  let visible = 0;
  grid.innerHTML = '';

  // Build today's date at midnight for comparison
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const monthMap = { Jan:0, Feb:1, Mar:2, Apr:3, May:4, Jun:5, Jul:6, Aug:7, Sep:8, Oct:9, Nov:10, Dec:11 };

  // Filter out past events, apply month filter, and sort ascending
  const upcoming = events
    .filter(e => {
      const eventDate = new Date(parseInt(e.year), monthMap[e.month], parseInt(e.day));
      if (eventDate < today) return false;
      if (currentMonth && `${e.month} ${e.year}` !== currentMonth) return false;
      return true;
    })
    .sort((a, b) => {
      const da = new Date(parseInt(a.year), monthMap[a.month], parseInt(a.day));
      const db = new Date(parseInt(b.year), monthMap[b.month], parseInt(b.day));
      return da - db;
    });

  // Update the upcoming count stat
  document.getElementById('upcoming-count').textContent = upcoming.length;

  upcoming.forEach((e) => {
    const show = currentFilter === 'all'
      || e.types.includes(currentFilter)
      || (currentFilter === 'free' && e.free);
    if (!show) return;
    visible++;

    const tagHtml = e.types.map(t => `<span class="tag tag-${t}">${t}</span>`).join('')
      + (e.free ? '<span class="tag tag-free">free</span>' : '');

    const card = document.createElement('div');
    card.className = 'event-card';
    card.style.animationDelay = `${(visible - 1) * 0.05}s`;
    card.innerHTML = `
      <div class="card-top">
        <div class="event-date">
          <span class="date-day">${e.day}</span>
          <span class="date-month">${e.month} '${e.year.slice(2)}</span>
        </div>
        <div class="event-tags">${tagHtml}</div>
      </div>
      <div class="event-name">${e.name}</div>
      <div class="event-meta">
        <div class="meta-row"><span class="meta-icon">📍</span>${e.venue}</div>
        <div class="meta-row"><span class="meta-icon">🗺</span>${e.location}</div>
        ${e.time ? `<div class="meta-row"><span class="meta-icon">🕐</span>${e.time}</div>` : ''}
      </div>
      <div class="event-desc">${e.desc}</div>
      <div class="card-footer">
        <span class="event-price">${e.price}</span>
        ${e.link && e.link !== '#'
          ? `<a href="${e.link}" target="_blank" rel="nofollow noopener" class="event-link">More info →</a>`
          : `<span style="color:var(--muted);font-size:0.78rem">Details TBC</span>`}
      </div>
    `;
    grid.appendChild(card);
  });

  noResults.classList.toggle('visible', visible === 0);
}

initMonthFilter();
renderEvents();

// ── Fillout popup ──────────────────────────────────────────────────────────
// Trigger the Fillout popup programmatically from any element on the page
function openFillout() {
  const btn = document.querySelector('[data-fillout-id="wkoEmzfZQ4us"] button');
  if (btn) {
    btn.click();
  } else {
    // Fallback: open the form directly in a new tab if the embed hasn't loaded
    window.open('https://forms.fillout.com/t/wkoEmzfZQ4us', '_blank');
  }
}
