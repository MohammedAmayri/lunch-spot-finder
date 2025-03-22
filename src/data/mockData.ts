export interface LunchInclude {
  id: string;
  name: string;
}

export interface Allergen {
  id: string;
  name: string;
  description?: string;
}

export interface Tag {
  id: string;
  name: string;
}

export interface Image {
  id: string;
  url: string;
  createdAt: Date;
  createdBy: string;
}

export interface LunchMenuItem {
  id: string;
  name: string;
  description?: string;
  price: number;
  validFrom?: Date;
  validTo?: Date;
  images?: Image[];
  allergens?: Allergen[];
  tags: Tag[];
  lunchMenuId: string;
}

export interface LunchMenu {
  id: string;
  name: string;
  description?: string;
  lunchLink?: string;
  restaurantId: string;
  hoursId: string;
  lunchIncludes: LunchInclude[];
  lunchMenuItems: LunchMenuItem[];
}

export interface Hours {
  id: string;
  days: string[];
  startTime: string;
  endTime: string;
  type: "OPEN" | "LUNCH";
  restaurantId: string;
}

export interface Contact {
  id: string;
  phone: string;
  email?: string;
  website?: string;
  restaurantId: string;
}

export interface Location {
  id: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  city: string;
  address?: string;
  street?: string;
  postalCode?: string;
  restaurantId: string;
}

export interface Feature {
  id: string;
  name: string;
}

export interface Cuisine {
  id: string;
  name: string;
}

export interface Restaurant {
  id: string;
  name: string;
  cuisines: Cuisine[];
  location?: Location;
  contact?: Contact;
  hours: Hours[];
  rating: number;
  images: Image[];
  popularDishes: string[];
  reservationLinks: string[];
  features: Feature[];
  lunchMenus: LunchMenu[];
  createdAt: Date;
  updatedAt: Date;
}

export const popularCities = [
  { id: "1", name: "Stockholm" },
  { id: "2", name: "Gothenburg" },
  { id: "3", name: "Malmö" },
  { id: "4", name: "Uppsala" },
  { id: "5", name: "Västerås" },
  { id: "6", name: "Örebro" },
  { id: "7", name: "Linköping" },
  { id: "8", name: "Helsingborg" },
  { id: "9", name: "Jönköping" },
  { id: "10", name: "Norrköping" },
];

const commonTags: Tag[] = [
  { id: "t1", name: "Vegetarian" },
  { id: "t2", name: "Vegan" },
  { id: "t3", name: "Gluten-free" },
  { id: "t4", name: "Lunch special" },
  { id: "t5", name: "Coffee included" },
  { id: "t6", name: "Salad included" },
  { id: "t7", name: "Dessert included" },
  { id: "t8", name: "Meat" },
  { id: "t9", name: "Seafood" },
  { id: "t10", name: "Healthy" },
];

const commonIncludes: LunchInclude[] = [
  { id: "i1", name: "Coffee" },
  { id: "i2", name: "Salad" },
  { id: "i3", name: "Bread" },
  { id: "i4", name: "Dessert" },
  { id: "i5", name: "Water" },
];

const commonAllergens: Allergen[] = [
  { id: "a1", name: "Gluten", description: "Contains wheat, rye, barley or oats" },
  { id: "a2", name: "Lactose", description: "Contains milk products" },
  { id: "a3", name: "Nuts", description: "Contains various nuts" },
  { id: "a4", name: "Shellfish", description: "Contains shellfish" },
];

const commonFeatures: Feature[] = [
  { id: "f1", name: "Outdoor seating" },
  { id: "f2", name: "Accessible" },
  { id: "f3", name: "Takes reservations" },
  { id: "f4", name: "Free WiFi" },
  { id: "f5", name: "Parking" },
];

export const commonCuisines = [
  { id: "c1", name: "Italian" },
  { id: "c2", name: "Swedish" },
  { id: "c3", name: "Asian" },
  { id: "c4", name: "French" },
  { id: "c5", name: "American" },
  { id: "c6", name: "Vegetarian" },
  { id: "c7", name: "Vegan" },
  { id: "c8", name: "Seafood" },
  { id: "c9", name: "International" },
  { id: "c10", name: "Mexican" }
];

export const restaurants: Restaurant[] = [
  {
    id: "1",
    name: "Kebab Kungen",
    cuisines: [{ id: "c4", name: "French" }],
    rating: 4.2,
    popularDishes: ["Kebab Meny", "Falafel Roll"],
    reservationLinks: [],
    features: [commonFeatures[0], commonFeatures[3]],
    createdAt: new Date("2023-01-15"),
    updatedAt: new Date("2023-06-10"),
    images: [
      {
        id: "img1",
        url: "/lovable-uploads/b92b18c1-d260-4631-94dd-77e401d774d6.png",
        createdAt: new Date("2023-01-15"),
        createdBy: "user1",
      }
    ],
    location: {
      id: "loc1",
      coordinates: { lat: 56.0465, lng: 12.6945 },
      city: "Helsingborg",
      address: "Storgatan 45",
      restaurantId: "1",
    },
    contact: {
      id: "con1",
      phone: "042-123456",
      website: "https://kebabkungen.se",
      restaurantId: "1",
    },
    hours: [
      {
        id: "h1",
        days: ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY"],
        startTime: "11:30",
        endTime: "15:00",
        type: "LUNCH",
        restaurantId: "1",
      }
    ],
    lunchMenus: [
      {
        id: "lm1",
        name: "Lunch Menu",
        restaurantId: "1",
        hoursId: "h1",
        lunchIncludes: [commonIncludes[0], commonIncludes[1]],
        lunchMenuItems: [
          {
            id: "1-1",
            name: "Kebab Meny",
            description: "Freshly made kebab with vegetables in homemade bread.",
            price: 119,
            lunchMenuId: "lm1",
            tags: [commonTags[7], commonTags[3], commonTags[4], commonTags[5]],
            images: [
              {
                id: "img1-1",
                url: "https://images.unsplash.com/photo-1633321702518-7feccafb94d5?q=80&w=3540&auto=format&fit=crop",
                createdAt: new Date("2023-01-15"),
                createdBy: "user1",
              }
            ],
          },
          {
            id: "1-2",
            name: "Falafel Roll",
            description: "Crispy falafel with vegetables and tahini sauce.",
            price: 109,
            lunchMenuId: "lm1",
            tags: [commonTags[0], commonTags[3], commonTags[4]],
            images: [
              {
                id: "img1-2",
                url: "https://images.unsplash.com/photo-1593001872095-7d5b3668fc03?q=80&w=3540&auto=format&fit=crop",
                createdAt: new Date("2023-01-15"),
                createdBy: "user1",
              }
            ],
          }
        ]
      },
      {
        id: "lm1-2",
        name: "Weekend Special",
        restaurantId: "1",
        hoursId: "h1",
        lunchIncludes: [commonIncludes[0], commonIncludes[1], commonIncludes[3]],
        lunchMenuItems: [
          {
            id: "1-3",
            name: "Deluxe Kebab Platter",
            description: "Premium mixed kebab with rice, salad, and special sauce.",
            price: 159,
            lunchMenuId: "lm1-2",
            tags: [commonTags[7], commonTags[3], commonTags[4], commonTags[5], commonTags[6]],
            allergens: [commonAllergens[0], commonAllergens[1]],
            images: [
              {
                id: "img1-3",
                url: "https://images.unsplash.com/photo-1529563021893-cc83c992d75d?q=80&w=3540&auto=format&fit=crop",
                createdAt: new Date("2023-02-10"),
                createdBy: "user1",
              }
            ],
          }
        ]
      }
    ]
  },
  {
    id: "2",
    name: "Strandhuset",
    cuisines: [
      { id: "c1", name: "Italian" },
      { id: "c9", name: "International" }
    ],
    rating: 4.4,
    popularDishes: ["Gulashsoppa", "Catch of the Day"],
    reservationLinks: ["https://bookatable.com/strandhuset"],
    features: [commonFeatures[0], commonFeatures[2], commonFeatures[4]],
    createdAt: new Date("2023-02-10"),
    updatedAt: new Date("2023-07-15"),
    images: [
      {
        id: "img2",
        url: "/lovable-uploads/2b997d73-8864-42c8-b802-2b9fae102614.png",
        createdAt: new Date("2023-02-10"),
        createdBy: "user1",
      }
    ],
    location: {
      id: "loc2",
      coordinates: { lat: 56.0390, lng: 12.6963 },
      city: "Helsingborg",
      address: "Hamnvägen 12",
      restaurantId: "2",
    },
    contact: {
      id: "con2",
      phone: "042-654321",
      website: "https://strandhuset.se",
      restaurantId: "2",
    },
    hours: [
      {
        id: "h2",
        days: ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY"],
        startTime: "11:30",
        endTime: "15:00",
        type: "LUNCH",
        restaurantId: "2",
      }
    ],
    lunchMenus: [
      {
        id: "lm2",
        name: "Daily Lunch",
        restaurantId: "2",
        hoursId: "h2",
        lunchIncludes: [commonIncludes[0], commonIncludes[1], commonIncludes[3]],
        lunchMenuItems: [
          {
            id: "2-1",
            name: "Gulashsoppa",
            description: "Traditional goulash soup with tender beef and vegetables.",
            price: 139,
            lunchMenuId: "lm2",
            tags: [commonTags[7], commonTags[3], commonTags[4], commonTags[5], commonTags[6]],
            allergens: [commonAllergens[1]],
            images: [
              {
                id: "img2-1",
                url: "https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=3541&auto=format&fit=crop",
                createdAt: new Date("2023-02-10"),
                createdBy: "user1",
              }
            ],
          },
          {
            id: "2-2",
            name: "Catch of the Day",
            description: "Fresh local fish with seasonal vegetables and potatoes.",
            price: 159,
            lunchMenuId: "lm2",
            tags: [commonTags[8], commonTags[3], commonTags[4], commonTags[5]],
            allergens: [commonAllergens[3]],
            images: [
              {
                id: "img2-2",
                url: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=3540&auto=format&fit=crop",
                createdAt: new Date("2023-02-10"),
                createdBy: "user1",
              }
            ],
          }
        ]
      },
      {
        id: "lm2-2",
        name: "Executive Menu",
        restaurantId: "2",
        hoursId: "h2",
        lunchIncludes: [commonIncludes[0], commonIncludes[1], commonIncludes[2], commonIncludes[3], commonIncludes[4]],
        lunchMenuItems: [
          {
            id: "2-3",
            name: "Swedish Meatballs",
            description: "Traditional Swedish meatballs with lingonberry, mashed potatoes and gravy.",
            price: 169,
            lunchMenuId: "lm2-2",
            tags: [commonTags[7], commonTags[3], commonTags[4], commonTags[5], commonTags[6]],
            allergens: [commonAllergens[0], commonAllergens[1]],
            images: [
              {
                id: "img2-3",
                url: "https://images.unsplash.com/photo-1515516969-d4008cc6241a?q=80&w=3540&auto=format&fit=crop",
                createdAt: new Date("2023-03-15"),
                createdBy: "user1",
              }
            ],
          }
        ]
      }
    ]
  },
  {
    id: "3",
    name: "Pasta Paradiso",
    cuisines: [{ id: "c2", name: "Swedish" }],
    rating: 4.7,
    popularDishes: ["Pasta Carbonara", "Margherita Pizza"],
    reservationLinks: ["https://bookatable.com/pasta-paradiso"],
    features: [commonFeatures[0], commonFeatures[2], commonFeatures[3]],
    createdAt: new Date("2023-03-01"),
    updatedAt: new Date("2023-08-10"),
    images: [
      {
        id: "img3",
        url: "/lovable-uploads/c2cdbdc2-9f1e-4ec7-a20c-8ace633be697.png",
        createdAt: new Date("2023-03-01"),
        createdBy: "user1",
      }
    ],
    location: {
      id: "loc3",
      coordinates: { lat: 59.3293, lng: 18.0686 },
      city: "Stockholm",
      address: "Kungsgatan 25",
      restaurantId: "3",
    },
    contact: {
      id: "con3",
      phone: "08-123456",
      website: "https://pastaparadiso.se",
      restaurantId: "3",
    },
    hours: [
      {
        id: "h3",
        days: ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY"],
        startTime: "11:00",
        endTime: "14:30",
        type: "LUNCH",
        restaurantId: "3",
      }
    ],
    lunchMenus: [
      {
        id: "lm3",
        name: "Lunch Specials",
        restaurantId: "3",
        hoursId: "h3",
        lunchIncludes: [commonIncludes[0], commonIncludes[2]],
        lunchMenuItems: [
          {
            id: "3-1",
            name: "Pasta Carbonara",
            description: "Creamy pasta with pancetta, egg, and parmesan cheese.",
            price: 129,
            lunchMenuId: "lm3",
            tags: [commonTags[7], commonTags[3], commonTags[4]],
            allergens: [commonAllergens[0], commonAllergens[1]],
            images: [
              {
                id: "img3-1",
                url: "https://images.unsplash.com/photo-1588013273468-315fd88ea34c?q=80&w=3540&auto=format&fit=crop",
                createdAt: new Date("2023-03-01"),
                createdBy: "user1",
              }
            ],
          },
          {
            id: "3-2",
            name: "Margherita Pizza",
            description: "Classic pizza with tomato sauce, mozzarella, and fresh basil.",
            price: 119,
            lunchMenuId: "lm3",
            tags: [commonTags[0], commonTags[3], commonTags[4]],
            allergens: [commonAllergens[0], commonAllergens[1]],
            images: [
              {
                id: "img3-2",
                url: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?q=80&w=3540&auto=format&fit=crop",
                createdAt: new Date("2023-03-01"),
                createdBy: "user1",
              }
            ],
          }
        ]
      },
      {
        id: "lm3-2",
        name: "Chef's Selection",
        restaurantId: "3",
        hoursId: "h3",
        lunchIncludes: [commonIncludes[0], commonIncludes[1], commonIncludes[2], commonIncludes[3]],
        lunchMenuItems: [
          {
            id: "3-3",
            name: "Risotto ai Funghi",
            description: "Creamy risotto with wild mushrooms and truffle oil.",
            price: 159,
            lunchMenuId: "lm3-2",
            tags: [commonTags[0], commonTags[3], commonTags[4], commonTags[5], commonTags[6]],
            allergens: [commonAllergens[1]],
            images: [
              {
                id: "img3-3",
                url: "https://images.unsplash.com/photo-1623431103558-a3c337d5f340?q=80&w=3432&auto=format&fit=crop",
                createdAt: new Date("2023-04-15"),
                createdBy: "user1",
              }
            ],
          },
          {
            id: "3-4",
            name: "Osso Buco",
            description: "Slow-cooked veal shank with gremolata and saffron risotto.",
            price: 189,
            lunchMenuId: "lm3-2",
            tags: [commonTags[7], commonTags[3], commonTags[4], commonTags[5], commonTags[6]],
            allergens: [commonAllergens[1]],
            images: [
              {
                id: "img3-4",
                url: "https://images.unsplash.com/photo-1544782331-9cc5c535a6f4?q=80&w=3474&auto=format&fit=crop",
                createdAt: new Date("2023-04-15"),
                createdBy: "user1",
              }
            ],
          }
        ]
      }
    ]
  },
  {
    id: "4",
    name: "Sushi Wave",
    cuisines: [
      { id: "c3", name: "Asian" },
      { id: "c8", name: "Seafood" }
    ],
    rating: 4.6,
    popularDishes: ["Salmon Nigiri", "Dragon Roll"],
    reservationLinks: ["https://bookatable.com/sushi-wave"],
    features: [commonFeatures[2], commonFeatures[3]],
    createdAt: new Date("2023-04-05"),
    updatedAt: new Date("2023-09-20"),
    images: [
      {
        id: "img4",
        url: "/lovable-uploads/d17e11fa-ff15-4eb8-89b7-279feb816a8a.png",
        createdAt: new Date("2023-04-05"),
        createdBy: "user1",
      }
    ],
    location: {
      id: "loc4",
      coordinates: { lat: 59.3350, lng: 18.0707 },
      city: "Stockholm",
      address: "Sveavägen 48",
      restaurantId: "4",
    },
    contact: {
      id: "con4",
      phone: "08-765432",
      website: "https://sushiwave.se",
      restaurantId: "4",
    },
    hours: [
      {
        id: "h4",
        days: ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY"],
        startTime: "11:30",
        endTime: "15:00",
        type: "LUNCH",
        restaurantId: "4",
      }
    ],
    lunchMenus: [
      {
        id: "lm4",
        name: "Sushi Lunch",
        restaurantId: "4",
        hoursId: "h4",
        lunchIncludes: [commonIncludes[0], commonIncludes[4]],
        lunchMenuItems: [
          {
            id: "4-1",
            name: "Salmon Nigiri Set",
            description: "8 pieces of fresh salmon nigiri with miso soup.",
            price: 149,
            lunchMenuId: "lm4",
            tags: [commonTags[8], commonTags[3], commonTags[4]],
            allergens: [commonAllergens[3]],
            images: [
              {
                id: "img4-1",
                url: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=3540&auto=format&fit=crop",
                createdAt: new Date("2023-04-05"),
                createdBy: "user1",
              }
            ],
          },
          {
            id: "4-2",
            name: "Dragon Roll",
            description: "Shrimp tempura roll topped with avocado and eel sauce.",
            price: 159,
            lunchMenuId: "lm4",
            tags: [commonTags[8], commonTags[3], commonTags[4]],
            allergens: [commonAllergens[0], commonAllergens[3]],
            images: [
              {
                id: "img4-2",
                url: "https://images.unsplash.com/photo-1617196034738-26c5f7c977ce?q=80&w=3540&auto=format&fit=crop",
                createdAt: new Date("2023-04-05"),
                createdBy: "user1",
              }
            ],
          }
        ]
      },
      {
        id: "lm4-2",
        name: "Bento Box",
        restaurantId: "4",
        hoursId: "h4",
        lunchIncludes: [commonIncludes[0], commonIncludes[4]],
        lunchMenuItems: [
          {
            id: "4-3",
            name: "Chicken Teriyaki Bento",
            description: "Chicken teriyaki with rice, salad, gyoza, and miso soup.",
            price: 169,
            lunchMenuId: "lm4-2",
            tags: [commonTags[7], commonTags[3], commonTags[4], commonTags[5]],
            allergens: [commonAllergens[0], commonAllergens[1]],
            images: [
              {
                id: "img4-3",
                url: "https://images.unsplash.com/photo-1535140728325-a4d3707eee61?q=80&w=3540&auto=format&fit=crop",
                createdAt: new Date("2023-05-10"),
                createdBy: "user1",
              }
            ],
          },
          {
            id: "4-4",
            name: "Vegetarian Bento",
            description: "Vegetable tempura, avocado rolls, edamame, and miso soup.",
            price: 149,
            lunchMenuId: "lm4-2",
            tags: [commonTags[0], commonTags[1], commonTags[3], commonTags[4], commonTags[5]],
            allergens: [commonAllergens[0]],
            images: [
              {
                id: "img4-4",
                url: "https://images.unsplash.com/photo-1615361200141-f45961382ce8?q=80&w=3464&auto=format&fit=crop",
                createdAt: new Date("2023-05-10"),
                createdBy: "user1",
              }
            ],
          }
        ]
      }
    ]
  },
  {
    id: "5",
    name: "Tandoori Palace",
    cuisines: [{ id: "c7", name: "Vegan" }],
    rating: 4.3,
    popularDishes: ["Butter Chicken", "Vegetable Biryani"],
    reservationLinks: ["https://bookatable.com/tandoori-palace"],
    features: [commonFeatures[0], commonFeatures[2], commonFeatures[3], commonFeatures[4]],
    createdAt: new Date("2023-05-12"),
    updatedAt: new Date("2023-10-05"),
    images: [
      {
        id: "img5",
        url: "/lovable-uploads/309fd144-3819-4e34-a69a-d6ede0b59cab.png",
        createdAt: new Date("2023-05-12"),
        createdBy: "user1",
      }
    ],
    location: {
      id: "loc5",
      coordinates: { lat: 59.3126, lng: 18.0549 },
      city: "Stockholm",
      address: "Hornsgatan 85",
      restaurantId: "5",
    },
    contact: {
      id: "con5",
      phone: "08-987654",
      website: "https://tandooripalace.se",
      restaurantId: "5",
    },
    hours: [
      {
        id: "h5",
        days: ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY"],
        startTime: "11:00",
        endTime: "14:30",
        type: "LUNCH",
        restaurantId: "5",
      }
    ],
    lunchMenus: [
      {
        id: "lm5",
        name: "Lunch Thali",
        restaurantId: "5",
        hoursId: "h5",
        lunchIncludes: [commonIncludes[0], commonIncludes[2], commonIncludes[4]],
        lunchMenuItems: [
          {
            id: "5-1",
            name: "Butter Chicken Thali",
            description: "Creamy butter chicken with rice, naan, raita, and dal.",
            price: 139,
            lunchMenuId: "lm5",
            tags: [commonTags[7], commonTags[3], commonTags[4]],
            allergens: [commonAllergens[0], commonAllergens[1]],
            images: [
              {
                id: "img5-1",
                url: "https://images.unsplash.com/photo-1585937421612-70a008356cf4?q=80&w=3456&auto=format&fit=crop",
                createdAt: new Date("2023-05-12"),
                createdBy: "user1",
              }
            ],
          },
          {
            id: "5-2",
            name: "Vegetable Biryani",
            description: "Aromatic rice with mixed vegetables, served with raita and papadum.",
            price: 129,
            lunchMenuId: "lm5",
            tags: [commonTags[0], commonTags[3], commonTags[4]],
            allergens: [commonAllergens[1]],
            images: [
              {
                id: "img5-2",
                url: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=3540&auto=format&fit=crop",
                createdAt: new Date("2023-05-12"),
                createdBy: "user1",
              }
            ],
          }
        ]
      },
      {
        id: "lm5-2",
        name: "Tandoori Specials",
        restaurantId: "5",
        hoursId: "h5",
        lunchIncludes: [commonIncludes[0], commonIncludes[2], commonIncludes[3], commonIncludes[4]],
        lunchMenuItems: [
          {
            id: "5-3",
            name: "Tandoori Chicken",
            description: "Marinated chicken grilled in tandoor, served with rice and mint chutney.",
            price: 149,
            lunchMenuId: "lm5-2",
            tags: [commonTags[7], commonTags[3], commonTags[4], commonTags[6]],
            allergens: [commonAllergens[1]],
            images: [
              {
                id: "img5-3",
                url: "https://images.unsplash.com/photo-1610057099431-d73a1c9d2f2f?q=80&w=3387&auto=format&fit=crop",
                createdAt: new Date("2023-06-20"),
                createdBy: "user1",
              }
            ],
          },
          {
            id: "5-4",
            name: "Paneer Tikka Masala",
            description: "Cottage cheese cubes in spiced tomato gravy with rice and naan.",
            price: 139,
            lunchMenuId: "lm5-2",
            tags: [commonTags[0], commonTags[3], commonTags[4], commonTags[6]],
            allergens: [commonAllergens[0], commonAllergens[1]],
            images: [
              {
                id: "img5-4",
                url: "https://images.unsplash.com/photo-1574484284002-952d92456975?q=80&w=3474&auto=format&fit=crop",
                createdAt: new Date("2023-06-20"),
                createdBy: "user1",
              }
            ],
          }
        ]
      }
    ]
  }
];
