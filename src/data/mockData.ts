
// Define TypeScript interfaces for data structures
export interface City {
  id: number;
  name: string;
}

export interface Tag {
  id?: number;
  name: string;
}

export interface LunchMenuItem {
  id: number;
  name: string;
  description?: string;
  price: number;
  images?: { url: string }[];
  tags: Tag[];
  allergens?: Tag[];
}

export interface LunchInclude {
  id: number;
  name: string;
}

export interface LunchMenu {
  id: number;
  name: string;
  description?: string;
  lunchMenuItems: LunchMenuItem[];
  lunchIncludes: LunchInclude[];
}

export interface Restaurant {
  id: number;
  name: string;
  cityId: number;
  cuisines: Tag[];
  features: Tag[];
  rating: number;
  images: { url: string }[];
  location: {
    address: string;
    city: string;
    coordinates?: {
      lat: number;
      lng: number;
    }
  };
  hours: {
    startTime: string;
    endTime: string;
    day?: string;
  }[];
  lunchMenus: LunchMenu[];
  contact?: {
    phone?: string;
    website?: string;
    email?: string;
  };
  popularDishes: string[];
}

// Constants
export const PRICE_RANGES = ["Budget", "Mid-Range", "High-End"];
export const CUISINES = [
  "Italian",
  "Chinese",
  "Japanese",
  "Mexican",
  "Indian",
  "Thai",
  "American",
  "Mediterranean",
  "French",
  "Swedish",
  "Spanish",
  "Greek",
  "Lebanese",
  "Vietnamese",
  "Korean"
];

// Export the commonCuisines array so it can be imported in FilterBar.tsx
export const commonCuisines = CUISINES.slice(0, 10).map(cuisine => ({ name: cuisine }));

// Mock data for popular cities
export const popularCities: City[] = [
  { id: 1, name: "Stockholm" },
  { id: 2, name: "Gothenburg" },
  { id: 3, name: "Malmö" },
  { id: 4, name: "Uppsala" },
  { id: 5, name: "Linköping" },
];

// Mock data for restaurants
export const restaurants: Restaurant[] = [
  {
    id: 1,
    name: "Pasta Perfetta",
    cityId: 1,
    cuisines: [{ name: "Italian" }],
    features: [{ name: "Outdoor Seating" }, { name: "Vegetarian Options" }],
    rating: 4.5,
    images: [{ url: "/lovable-uploads/e859951d-9f4f-453b-a81d-649349a6043b.jpg" }],
    location: {
      address: "Vasagatan 15",
      city: "Stockholm",
      coordinates: { lat: 59.3323, lng: 18.0580 }
    },
    hours: [
      { startTime: "11:00", endTime: "22:00" }
    ],
    lunchMenus: [
      {
        id: 1,
        name: "Weekly Lunch Menu",
        lunchMenuItems: [
          { 
            id: 1, 
            name: "Spaghetti Carbonara", 
            description: "Classic carbonara with egg, pancetta, and parmesan", 
            price: 165, 
            tags: [{ name: "Popular" }, { name: "Coffee included" }],
            allergens: [{ name: "Gluten" }, { name: "Egg" }]
          },
          { 
            id: 2, 
            name: "Margherita Pizza", 
            description: "Simple pizza with tomato, mozzarella, and basil", 
            price: 140, 
            tags: [{ name: "Vegetarian" }, { name: "Salad included" }],
            allergens: [{ name: "Gluten" }, { name: "Lactose" }]
          }
        ],
        lunchIncludes: [
          { id: 1, name: "Coffee" },
          { id: 2, name: "Salad" }
        ]
      }
    ],
    contact: {
      phone: "08-123 45 67",
      website: "https://pastaperfetta.se"
    },
    popularDishes: ["Spaghetti Carbonara", "Tiramisu", "Risotto"]
  },
  {
    id: 2,
    name: "Sushi Palace",
    cityId: 1,
    cuisines: [{ name: "Japanese" }],
    features: [{ name: "Takeaway" }, { name: "Gluten-free Options" }],
    rating: 4.2,
    images: [{ url: "/lovable-uploads/49996553-e546-4965-81fb-1958a9a3859a.jpg" }],
    location: {
      address: "Drottninggatan 25",
      city: "Stockholm",
      coordinates: { lat: 59.3308, lng: 18.0629 }
    },
    hours: [
      { startTime: "12:00", endTime: "23:00" }
    ],
    lunchMenus: [
      {
        id: 2,
        name: "Lunch Special",
        lunchMenuItems: [
          { 
            id: 4, 
            name: "Salmon Nigiri Set", 
            description: "Fresh salmon on sushi rice, 8 pieces", 
            price: 145, 
            tags: [{ name: "Popular" }, { name: "Coffee included" }],
            allergens: [{ name: "Fish" }]
          },
          { 
            id: 5, 
            name: "Dragon Roll", 
            description: "Eel, cucumber, and avocado roll", 
            price: 180, 
            tags: [{ name: "Spicy" }, { name: "Dessert included" }],
            allergens: [{ name: "Fish" }, { name: "Sesame" }]
          }
        ],
        lunchIncludes: [
          { id: 3, name: "Coffee" },
          { id: 4, name: "Dessert" }
        ]
      }
    ],
    contact: {
      phone: "08-765 43 21",
      website: "https://sushipalace.se"
    },
    popularDishes: ["Salmon Nigiri", "Dragon Roll", "Mochi Ice Cream"]
  },
  {
    id: 3,
    name: "Taco Bar",
    cityId: 2,
    cuisines: [{ name: "Mexican" }],
    features: [{ name: "Fast Food" }, { name: "Budget-friendly" }],
    rating: 3.8,
    images: [{ url: "/lovable-uploads/69a99559-942d-4055-9499-9975525c9964.jpg" }],
    location: {
      address: "Avenyn 42",
      city: "Gothenburg",
      coordinates: { lat: 57.6988, lng: 11.9727 }
    },
    hours: [
      { startTime: "11:00", endTime: "24:00" }
    ],
    lunchMenus: [
      {
        id: 3,
        name: "Lunch Combo",
        lunchMenuItems: [
          { 
            id: 7, 
            name: "Chicken Taco Plate", 
            description: "3 tacos with grilled chicken, salsa, and guacamole", 
            price: 125, 
            tags: [{ name: "Popular" }, { name: "Salad included" }],
            allergens: [{ name: "Gluten" }]
          },
          { 
            id: 8, 
            name: "Veggie Burrito", 
            description: "Large burrito with rice, beans, and vegetables", 
            price: 115, 
            tags: [{ name: "Vegetarian" }],
            allergens: [{ name: "Gluten" }]
          }
        ],
        lunchIncludes: [
          { id: 5, name: "Salad" }
        ]
      }
    ],
    contact: {
      phone: "031-123 45 67",
      website: "https://tacobar.se"
    },
    popularDishes: ["Chicken Taco", "Burrito", "Churros"]
  }
];

// Helper functions to get data
export const getRestaurantsByCity = (cityName: string): Restaurant[] => {
  const city = popularCities.find(c => c.name.toLowerCase() === cityName.toLowerCase());
  if (!city) return [];
  return restaurants.filter(r => r.cityId === city.id);
};

export const getRestaurantById = (id: string): Restaurant | undefined => {
  return restaurants.find(r => r.id.toString() === id);
};
