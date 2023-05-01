import bcrypt from "bcryptjs";

const data = {
  users: [
    {
      name: "Ali",
      email: "admin@test.com",
      password: bcrypt.hashSync("12345678"),
      isAdmin: true,
    },
    {
      name: "John",
      email: "user@test.com",
      password: bcrypt.hashSync("12345678"),
      isAdmin: false,
    },
  ],
  games: [
    {
      name: "God of War",
      slug: "god-of-war",
      coverImage: "/gameimages/godofwar/GodofWarfront.jpg",
      price: 39.99,
      platform: "Steam",
      description:
        "His vengeance against the Gods of Olympus years behind him, Kratos now lives as a man in the realm of Norse Gods and monsters. It is in this harsh, unforgiving world that he must fight to survive… and teach his son to do the same.",
      gameCodes: [
        "2L9H-K9TR-779Z-D3ZV",
        "XDNZ-Z5WG-BBQM-JMYV",
        "CN93-MRES-QVYR-5MLK",
        "6DGE-WQ68-QXG3-LBTB",
      ],
    },
    {
      name: "The Last of Us Part 1",
      slug: "the-last-of-us-part-1",
      coverImage: "/gameimages/thelastofuspart1/thelastofusp1Main.webp",
      price: 49.99,
      platform: "Steam",
      description:
        "In a ravaged civilization, where infected and hardened survivors run rampant, Joel, a weary protagonist, is hired to smuggle 14-year-old Ellie out of a military quarantine zone. However, what starts as a small job soon transforms into a brutal cross-country journey.",
      gameCodes: [
        "9YHG-HSMW-57QV-7XUY",
        "LJZH-7ZY2-GPUP-4FRE",
        "YWVM-HYZE-ASWE-9LZP",
        "XE3N-EN48-UVC5-4CM4",
      ],
    },
    {
      name: "Ori and the Blind Forest Definitive Edition",
      slug: "ori-and-the-blind-forest-definitive-edition",
      coverImage: "/gameimages/oriandtheblindforest/oriMain.jpg",
      price: 14.99,
      platform: "Steam",
      description:
        "The forest of Nibel is dying. After a powerful storm sets a series of devastating events in motion, Ori must journey to find courage and confront a dark nemesis to save the forest of Nibel. “Ori and the Blind Forest” tells the tale of a young orphan destined for heroics, through a visually stunning Action-Platformer crafted by Moon Studios. Featuring hand-painted artwork, meticulously animated character performance, a fully orchestrated score and dozens of new features in the Definitive Edition, “Ori and the Blind Forest” explores a deeply emotional story about love and sacrifice, and the hope that exists in us all.",
      gameCodes: ["EPZ3-VKUX-J5V5-VAJX", "2UXQ-2D7X-2F25-G95K"],
    },
    {
      name: "Curse of the Dead Gods",
      slug: "curse-of-the-dead-gods",
      coverImage: "/gameimages/curseofthedeadgods/CurseOfTheDeadGodsMain.jpg",
      price: 17.99,
      platform: "Steam",
      description:
        "You seek untold riches, eternal life, divine powers - it leads to this accursed temple, a seemingly-infinite labyrinth of bottomless pits, deadly traps, and monsters.",
      gameCodes: [
        "7UE7-LZ2L-UKKF-3TKN",
        "JD2E-DXZW-HAVB-YKXA",
        "7P2Z-PKPA-F3F9-TCZ6",
        "4966-KW5M-KH5Q-XJ34",
        "NUEA-FGEY-4XYV-CVHL",
        "NWFL-MJ88-NCHZ-7N2Y",
      ],
    },
    {
      name: "Hollow Knight",
      slug: "hollow-knight",
      coverImage: "/gameimages/hollowknight/hollowknightMain.png",
      price: 12.79,
      platform: "Steam",
      description:
        "Beneath the fading town of Dirtmouth sleeps an ancient, ruined kingdom. Many are drawn below the surface, searching for riches, or glory, or answers to old secrets.",
      gameCodes: [
        "LA67-UWLU-EG4M-PXZL",
        "YGQ8-H5CQ-YPH9-AQZL",
        "FTF3-K8BH-CQNN-MS2X",
        "YZQ7-HUUX-AL79-MJLH",
        "TXGG-4MB9-Q3BH-ZAB4",
      ],
    },
    {
      name: "Borderlands 3",
      slug: "borderlands-3",
      coverImage: "/gameimages/borderlands3/borderlands3Main.webp",
      price: 49.99,
      platform: "Epic Games",
      description:
        "Stop the fanatical Calypso Twins from uniting the bandit clans and claiming the galaxy’s ultimate power. Only you, a thrill-seeking Vault Hunter, have the arsenal and allies to take them down.",
      gameCodes: ["YCPV-Q5ZS-DXVS-MHX5"],
    },
  ],
};

export default data;
